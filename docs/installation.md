# Installation

Merida can be installed as a Jekyll gem theme or used through the companion starter repository. Most users should start with `merida-starter`; this repository is primarily the theme source.

## Recommended: Clone The Starter

The easiest way to build a website with Merida is to clone the ready-made starter site:

```sh
git clone https://github.com/j0m0k0/merida-starter.git my-website
cd my-website
bundle install
npm install
npm run dev
```

[merida-starter](https://github.com/j0m0k0/merida-starter) is a simple website already configured to use Merida. It includes starter pages, data files, posts, news, images, bibliography entries, downloads, the Pagefind plugin, and a working `_config.yml`.

Use the starter when you want to customize a website. Use this theme repository when you want to change the theme itself or install it into an existing Jekyll site.

## Requirements

Install these tools before using the theme:

- Ruby compatible with Jekyll 4.4.
- Bundler.
- Node.js and npm.
- Git.

Maintainers also need:

- `jq` for the release script.
- A RubyGems account with permission to publish `jekyll-theme-merida`.

## Install As A Gem Theme

Add Merida to your `Gemfile`:

```ruby
source "https://rubygems.org"

gem "jekyll-theme-merida", "~> 0.0"
```

Add the theme to `_config.yml`:

```yaml
theme: jekyll-theme-merida
```

Install Ruby dependencies:

```sh
bundle install
```

Create the pages and data files your site needs. A minimal Merida-style site should include:

```text
_config.yml
_data/menu.yaml
_pages/about.md
_pages/blog.md
_posts/YYYY-MM-DD-my-post.md
```

Serve locally:

```sh
bundle exec jekyll serve
```

## Copy Starter Files Manually

If you do not want to clone `merida-starter`, copy these files and directories into your existing site:

```text
_bibliography/
_data/
_news/
_pages/
_plugins/pagefind.rb
_posts/
assets/favicon/
assets/img/
downloads/
robots.txt
```

Then configure the theme in `_config.yml`:

```yaml
theme: jekyll-theme-merida
```

Replace the sample content with your own before publishing.

## Work Directly In This Repository

Clone the repository, then install dependencies:

```sh
bundle install
npm install
```

Build the theme CSS:

```sh
npm run css:build
```

Run the local development server:

```sh
npm run dev
```

The `dev` script runs Tailwind in watch mode and runs Jekyll with LiveReload. It also restarts Jekyll when `_config.yml` changes.

## Generated Files

These files are generated locally and are intentionally ignored by Git:

- `_site/`
- `.jekyll-cache/`
- `node_modules/`
- `assets/css/merida.css`
- `*.gem`

The gem release script builds `assets/css/merida.css` before packaging because gem users need compiled CSS.

## GitHub Pages Notes

Merida uses plugins that are not all included in GitHub Pages' built-in safe plugin list. For GitHub Pages, use a GitHub Actions workflow that runs `bundle exec jekyll build` and deploys the generated `_site` directory.

See [Deployment](deployment.md) for a complete workflow.
