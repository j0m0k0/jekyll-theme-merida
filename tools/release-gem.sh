#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_JSON="$ROOT_DIR/package.json"
CONFIG_YML="$ROOT_DIR/_config.yml"
GEM_NAME="jekyll-theme-merida"
RELEASE_THEME_LINE="theme: jekyll-theme-chirpy"

cd "$ROOT_DIR"

CONFIG_BACKUP="$(mktemp)"
cp "$CONFIG_YML" "$CONFIG_BACKUP"

restore_config() {
  cp "$CONFIG_BACKUP" "$CONFIG_YML"
  rm -f "$CONFIG_BACKUP"
}

trap restore_config EXIT

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required to read version from package.json." >&2
  exit 1
fi

VERSION="$(jq -r '.version' "$PACKAGE_JSON")"

if [[ -z "$VERSION" || "$VERSION" == "null" ]]; then
  echo "Error: package.json does not contain a valid version." >&2
  exit 1
fi

echo "Checking RubyGems for $GEM_NAME version $VERSION..."

if curl --silent --fail "https://rubygems.org/api/v1/versions/$GEM_NAME.json" \
  | jq -e --arg version "$VERSION" 'map(.number) | index($version) != null' >/dev/null; then
  echo "Version $VERSION of $GEM_NAME is already published on RubyGems. Bump package.json and try again." >&2
  exit 1
fi

echo "Building Tailwind CSS..."
npx @tailwindcss/cli -i ./assets/css/merida.src.css -o ./assets/css/merida.css --minify

echo "Preparing _config.yml for gem build..."
{
  printf '%s\n' "$RELEASE_THEME_LINE"
  cat "$CONFIG_BACKUP"
} > "$CONFIG_YML"

echo "Building gem..."
gem build ./jekyll-theme-merida.gemspec

echo "Pushing gem..."
gem push "./$GEM_NAME-$VERSION.gem"
