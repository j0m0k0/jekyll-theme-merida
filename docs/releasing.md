# Releasing

This guide is for maintainers who publish Merida to RubyGems and synchronize the starter repository.

## Release Requirements

- RubyGems publishing permission for `jekyll-theme-merida`.
- `jq`.
- Ruby and Bundler.
- Node.js and npm.
- Clean working tree.
- Updated `CHANGELOG.md`.
- GitHub secret `MERIDA_STARTER_SYNC_TOKEN` configured if using starter synchronization.

## Version Source

The gemspec reads the version from `package.json`:

```json
{
  "version": "0.0.11"
}
```

Bump this value for every release.

Update the lockfile after changing package metadata:

```sh
npm install --package-lock-only
```

## Manual Release Checklist

1. Confirm all public docs are current.
2. Update `CHANGELOG.md`.
3. Bump `package.json`.
4. Run `npm install --package-lock-only`.
5. Run `npm run css:build`.
6. Run `bundle exec jekyll build`.
7. Inspect the generated site.
8. Commit the changes.
9. Run `npm run release:gem`.
10. Create and push a Git tag.
11. Publish a GitHub release.
12. Confirm the starter sync workflow opens or updates a pull request.

## Release Script

Run:

```sh
npm run release:gem
```

The script:

1. Reads the version from `package.json`.
2. Checks RubyGems to make sure the version is not already published.
3. Builds Tailwind CSS into `assets/css/merida.css`.
4. Temporarily prepends `theme: jekyll-theme-merida` to `_config.yml` for gem packaging.
5. Builds the gem.
6. Pushes the gem to RubyGems.
7. Restores the original `_config.yml`.

The generated `.gem` file is ignored by Git.

## Starter Repository Synchronization

`.github/workflows/sync-starter.yaml` runs when a GitHub release is published or manually triggered.

It copies starter-facing files into `j0m0k0/merida-starter`:

- `_bibliography`
- `_data`
- `_news`
- `_pages`
- `_plugins`
- `_posts`
- `assets/img`
- `downloads`
- `_config.yml`
- `Gemfile`

The workflow prepends:

```yaml
theme: jekyll-theme-merida
```

to the starter `_config.yml`, then opens a pull request in the starter repository.

## Tagging

Use tags that match the package version:

```sh
git tag v0.0.12
git push origin v0.0.12
```

## Changelog

Keep `CHANGELOG.md` user-facing. Group entries by version and describe changes in terms users understand:

```markdown
## v0.0.12

- Add documentation for public publishing.
- Fix release script theme name.
```

## Failed Releases

If `gem push` fails before publishing, fix the issue and rerun the script.

If RubyGems accepted the version, do not reuse the same version. Bump `package.json`, update `CHANGELOG.md`, rebuild, and publish a new version.
