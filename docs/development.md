# Development

Use this guide when changing the Merida theme itself.

## Setup

Install Ruby dependencies:

```sh
bundle install
```

Install Node dependencies:

```sh
npm install
```

Build CSS:

```sh
npm run css:build
```

Run the development server:

```sh
npm run dev
```

## Scripts

`package.json` defines:

```json
{
  "css:build": "npx @tailwindcss/cli -i assets/css/merida.src.css -o assets/css/merida.css --minify",
  "css:watch": "npx @tailwindcss/cli -i assets/css/merida.src.css -o assets/css/merida.css --minify --watch",
  "jekyll:serve": "node tools/jekyll-serve-config-watch.cjs",
  "dev": "concurrently \"npm:css:watch\" \"npm:jekyll:serve\"",
  "release:gem": "bash ./tools/release-gem.sh"
}
```

## Build Locally

```sh
npm run css:build
bundle exec jekyll build
```

Jekyll writes output to `_site`. Pagefind runs after the build through `_plugins/pagefind.rb`.

## Theme Gem Contents

The gemspec includes theme files from:

```text
assets/
_data/
_layouts/
_includes/
_sass/
LICENSE
README
_config.yml
```

It excludes the Tailwind source CSS and starter images:

```ruby
source_css = "assets/css/merida.src.css"
.reject { |f| f == source_css || f.start_with?("assets/img/") }
```

`assets/css/merida.css` is added to the gem if it exists. Build CSS before building the gem.

## Adding A Layout

1. Add the layout to `_layouts`.
2. Add or update a sample page in `_pages` if the layout is user-facing.
3. Add Tailwind source paths if the new files live outside the existing scanned directories.
4. Document front matter in [Content Guide](content.md).
5. Run `npm run css:build` and `bundle exec jekyll build`.

## Adding JavaScript

1. Add the script to `assets/scripts`.
2. Load it from `_includes/header.html` or `_includes/post-body.html`.
3. Keep selectors stable or document required selectors.
4. Test the behavior in a local browser.

## Adding CSS

Edit `assets/css/merida.src.css`, then run:

```sh
npm run css:build
```

Do not edit `assets/css/merida.css` manually. It is generated.

## Working With `_config.yml`

Use:

```sh
npm run dev
```

instead of calling Jekyll directly while editing `_config.yml`. The wrapper in `tools/jekyll-serve-config-watch.cjs` restarts Jekyll after config changes.

## Versioning

The theme version is read from `package.json` by the gemspec. Bump `package.json` before building a new gem.

After editing `package.json`, update `package-lock.json`:

```sh
npm install --package-lock-only
```

## Validation

Before opening a pull request:

```sh
npm run css:build
bundle exec jekyll build
```

Then inspect the generated site for:

- desktop and mobile navigation
- theme toggle
- search modal and search results
- blog listing and post page
- news listing and detail page
- projects page
- publications page
- math rendering
- syntax highlighting and copy buttons
