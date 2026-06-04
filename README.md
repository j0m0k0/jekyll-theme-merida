<p align="center">
  <img src="assets/brand/merida-logo.svg" alt="Merida" width="520">
</p>

<p align="center">
  <a href="https://rubygems.org/gems/jekyll-theme-merida"><img alt="RubyGems" src="https://img.shields.io/gem/v/jekyll-theme-merida?style=for-the-badge&label=RubyGems&color=55A194"></a>
  <a href="https://rubygems.org/gems/jekyll-theme-merida"><img alt="Gem downloads" src="https://img.shields.io/gem/dt/jekyll-theme-merida?style=for-the-badge&color=F16A6F"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/github/license/j0m0k0/jekyll-theme-merida?style=for-the-badge&color=2D6CDF"></a>
  <img alt="Jekyll" src="https://img.shields.io/badge/Jekyll-4.4-CC0000?style=for-the-badge&logo=jekyll&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

<p align="center">
  A minimal, responsive Jekyll theme for personal, academic, and technical writing websites.
</p>

Merida ships with layouts for an about page, blog, news, projects, and publications, plus dark mode, MathJax, Rouge syntax highlighting, copy buttons for code blocks, Pagefind search, SEO metadata, RSS feeds, and sitemap generation.

## Start Here

The easiest way to use Merida is to clone the ready-made starter site:

```sh
git clone https://github.com/j0m0k0/merida-starter.git my-website
cd my-website
bundle install
npm install
npm run dev
```

[merida-starter](https://github.com/j0m0k0/merida-starter) is a simple website already wired to Merida. It includes the pages, sample content, data files, assets, bibliography, Pagefind plugin, and configuration you need, so you can start by replacing content instead of assembling a Jekyll site from scratch.

Use this repository when you want to contribute to the theme itself, inspect the source, or install `jekyll-theme-merida` as a gem in an existing Jekyll site.

## Features

- Responsive Tailwind CSS design with light, dark, and system theme modes.
- Blog and news collections with dedicated listing layouts.
- About page layout with optional profile image, latest posts, and latest news.
- Project list driven by `_data/repos.yaml`.
- Publication list driven by BibTeX and `jekyll-scholar`.
- Search modal powered by Pagefind after each Jekyll build.
- MathJax support for inline and display math.
- Rouge syntax highlighting with line numbers and copy buttons.
- SEO, sitemap, and feed support through standard Jekyll plugins.
- Release tooling for building and publishing the theme gem.

## Requirements

- Ruby compatible with Jekyll 4.4.
- Bundler.
- Node.js and npm for Tailwind CSS and Pagefind.
- `jq` if you use `npm run release:gem`.

The theme depends on:

- `jekyll`
- `jekyll-feed`
- `jekyll-last-modified-at`
- `jekyll-scholar`
- `jekyll-seo-tag`
- `jekyll-sitemap`
- `rouge`
- `webrick`

## Use Merida In An Existing Site

If you already have a Jekyll site, add the gem to your `Gemfile`:

```ruby
source "https://rubygems.org"

gem "jekyll-theme-merida", "~> 0.0"
```

Set the theme in `_config.yml`:

```yaml
theme: jekyll-theme-merida
```

Install dependencies and serve:

```sh
bundle install
bundle exec jekyll serve
```

For the full Merida experience, copy or recreate the content structure used by [merida-starter](https://github.com/j0m0k0/merida-starter): `_pages`, `_data`, `_posts`, `_news`, `_bibliography`, assets, and `_plugins/pagefind.rb`.

## Develop This Theme

Install the Ruby and Node dependencies:

```sh
bundle install
npm install
```

Build the CSS once:

```sh
npm run css:build
```

Serve the demo site locally:

```sh
npm run dev
```

The development command runs Tailwind in watch mode and starts Jekyll with LiveReload. The helper script restarts Jekyll when `_config.yml` changes because Jekyll does not reliably reload configuration changes inside a running server.

## Documentation

- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Content Guide](docs/content.md)
- [Customization](docs/customization.md)
- [Search](docs/search.md)
- [Deployment](docs/deployment.md)
- [Development](docs/development.md)
- [Releasing](docs/releasing.md)
- [Troubleshooting](docs/troubleshooting.md)

## Repository Structure

```text
_bibliography/          BibTeX entries for the publications page
_data/                  Navigation, social links, and project data
_includes/              Shared Liquid partials
_layouts/               Page, post, and collection layouts
_news/                  News collection items
_pages/                 Static pages rendered by the theme
_plugins/               Local Jekyll plugins, including Pagefind indexing
_posts/                 Blog posts
assets/css/             Source CSS and syntax highlighting CSS
assets/brand/           Project logo and brand assets
assets/favicon/         Default favicon set
assets/img/             Starter/demo images
assets/scripts/         Browser JavaScript used by the theme
downloads/              Example downloadable files
docs/                   User and maintainer documentation
tools/                  Local development and release scripts
```

## Configuration Summary

Most site settings live in `_config.yml`:

```yaml
title: Your Name
tagline: A text-focused Jekyll theme
description: A minimal, responsive and feature-rich Jekyll theme for technical writing.
url: "https://example.com"
baseurl: ""
permalink: /blog/:slug/

footer:
  show_last_update: true
```

Navigation and footer links are data-driven:

- `_data/menu.yaml` controls the navigation bar.
- `_data/social.yaml` controls footer social links.
- `_data/repos.yaml` controls the projects page.

See [Configuration](docs/configuration.md) for every supported key and data shape.

## Creating Content

Create posts in `_posts`:

```markdown
---
layout: post
title: "My Post"
date: 2026-06-03 09:00:00 -0500
tags: [Jekyll, Writing]
---

Post content goes here.
```

Create news items in `_news`:

```markdown
---
layout: post
title: "New Release"
date: 2026-06-03
description: "Merida is ready for public publishing."
---

Optional long-form news body.
```

Add publications to `_bibliography/references.bib`. Merida renders entries through `jekyll-scholar` and `_layouts/bib.html`.

## Development Commands

```sh
npm run dev          # Tailwind watch + Jekyll serve
npm run css:build    # Build minified assets/css/merida.css
npm run css:watch    # Rebuild CSS on changes
bundle exec jekyll build
npm run release:gem  # Maintainers only: build CSS, build gem, push to RubyGems
```

## Public Publishing Checklist

Before publishing a release:

- Confirm [merida-starter](https://github.com/j0m0k0/merida-starter) still works as the recommended starting point.
- Replace all sample profile, blog, news, project, and bibliography content in the starter repository.
- Set `title`, `tagline`, `description`, `url`, and `baseurl` in `_config.yml`.
- Review `_data/menu.yaml`, `_data/social.yaml`, and `_data/repos.yaml`.
- Confirm `assets/css/merida.css` is built before building the gem.
- Confirm `LICENSE`, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `SUPPORT.md` are current.
- Run `bundle exec jekyll build` and inspect the generated site.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, contribution guidelines, pull request expectations, and maintainer release steps.

## Support And Security

- For usage questions, see [SUPPORT.md](SUPPORT.md).
- For vulnerability reports, see [SECURITY.md](SECURITY.md).

## License

Merida is released under the MIT License. See [LICENSE](LICENSE).
