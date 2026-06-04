# Installation

There are three practical ways to start with Merida. Choose based on whether you want a ready-made site, want to work on the theme source, or already have a Jekyll project.

## Option 1: Use `merida-starter`

Use this when you want to build a personal, academic, project, or technical writing site with the least setup. The starter is a content-focused Jekyll site that already uses the `jekyll-theme-merida` gem.

```sh
git clone https://github.com/j0m0k0/merida-starter.git my-website
cd my-website
bundle install
bundle exec jekyll serve
```

The starter includes:

```text
_config.yml
Gemfile
_bibliography/references.bib
_data/menu.yaml
_data/repos.yaml
_data/social.yaml
_news/*.md
_pages/about.md
_pages/blog.md
_pages/news.md
_pages/projects.md
_pages/publications.md
_plugins/pagefind.rb
_posts/*.md
assets/img/
downloads/
```

Pros:

- Fastest path to a working Merida site.
- Includes example content for pages, posts, news, projects, publications, images, and data files.
- Keeps your site focused on content and configuration instead of theme internals.
- Uses the theme gem, so updates can come through normal Bundler dependency updates.

Cons:

- Less convenient if you want to edit layouts, includes, JavaScript, or Tailwind source directly.
- You still need to replace the sample content and review all site settings before launching your site.
- The Pagefind hook runs `npx pagefind`, so Node.js and npm are needed if you keep search enabled.

## Option 2: Clone This Theme Repository

Use this when you want to develop Merida itself, customize the theme deeply, or inspect the theme source.

```sh
git clone https://github.com/j0m0k0/jekyll-theme-merida.git
cd jekyll-theme-merida
bundle install
npm install
npm run css:build
npm run dev
```

This repository includes the theme source:

```text
_includes/              Shared Liquid partials
_layouts/               Page, post, and collection layouts
assets/brand/           Project logo and brand assets
assets/css/             Tailwind source and compiled theme CSS
assets/favicon/         Default favicon set
assets/scripts/         Browser JavaScript used by the theme
_data/                  Default data files included with the theme
docs/                   User and developer documentation
tools/                  Local development scripts
package.json            Tailwind, Pagefind, and development commands
jekyll-theme-merida.gemspec
```

Pros:

- Best option for changing layouts, includes, assets, scripts, and CSS.
- Includes Tailwind and local development scripts for theme work.
- Lets you test theme changes locally before using them in a site.

Cons:

- More moving parts than a normal Merida website because it needs both Ruby and Node dependencies.
- Not the cleanest starting point for your own public site because it contains developer docs, local scripts, gemspec files, and theme source.
- You are responsible for rebuilding `assets/css/merida.css` when testing CSS changes from source.

## Option 3: Add Merida To An Existing Jekyll Project

Use this when you already have a Jekyll site and want to adopt Merida without starting from the starter repository.

Add the gem to your `Gemfile`:

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

For the full Merida experience, copy or recreate the content structure used by `merida-starter`:

```text
_bibliography/references.bib
_data/menu.yaml
_data/repos.yaml
_data/social.yaml
_news/*.md
_pages/about.md
_pages/blog.md
_pages/news.md
_pages/projects.md
_pages/publications.md
_plugins/pagefind.rb
_posts/*.md
assets/img/
downloads/
```

Pros:

- Keeps your existing repository, history, deployment setup, and custom content.
- Lets you adopt Merida gradually instead of replacing your whole site structure at once.
- Works well if your site already has custom collections, plugins, or deployment rules.

Cons:

- Requires more manual integration than `merida-starter`.
- You need to align your existing pages, collections, data files, and permalinks with Merida's layouts.
- Existing CSS, layouts, includes, or plugins may conflict with the theme and need cleanup.
- Search, publications, projects, news, and navigation only work after the matching data files, collections, and plugins are configured.

## Requirements

Install these tools before using Merida:

- Ruby compatible with Jekyll 4.4.
- Bundler.
- Git if you clone `merida-starter` or this theme repository.
- Node.js and npm if you keep the Pagefind hook or work on theme CSS.

## GitHub Pages Notes

Merida uses plugins that are not all included in GitHub Pages' built-in safe plugin list. For GitHub Pages, use a GitHub Actions workflow that runs `bundle exec jekyll build` and deploys the generated `_site` directory.

See [Deployment](deployment.md) for a complete workflow.
