# Deployment

Merida builds to static HTML, CSS, JavaScript, and assets through Jekyll. Any static host can serve the generated `_site` directory.

## Production Build

Install dependencies:

```sh
bundle install
npm install
```

Build CSS:

```sh
npm run css:build
```

Build the site:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

The output is written to:

```text
_site/
```

## Pre-Deploy Checklist

- Replace all sample content in `_pages`, `_posts`, `_news`, `_data`, and `_bibliography`.
- Set `url` and `baseurl` correctly in `_config.yml`.
- Confirm `title`, `tagline`, and `description` are final.
- Confirm favicons and profile images are final.
- Run `npm run css:build`.
- Run `JEKYLL_ENV=production bundle exec jekyll build`.
- Open the generated site and test navigation, search, theme toggle, posts, news, projects, publications, math, and code copy buttons.

## GitHub Pages With GitHub Actions

Merida uses plugins that are better deployed through Actions than through GitHub Pages' built-in Jekyll builder.

Create `.github/workflows/pages.yml` in the consuming site:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run css:build
      - run: JEKYLL_ENV=production bundle exec jekyll build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

In the repository settings, set Pages to deploy from GitHub Actions.

## Custom Domains

For a root-domain deployment:

```yaml
url: "https://example.com"
baseurl: ""
```

For a GitHub Pages project site:

```yaml
url: "https://username.github.io"
baseurl: "/repository-name"
```

Review [Customization](customization.md#base-url-compatibility) before deploying to a subpath because some starter paths are root-relative.

## Static Hosts

For Netlify, Vercel, Cloudflare Pages, or another static host:

- Build command: `npm run css:build && JEKYLL_ENV=production bundle exec jekyll build`
- Output directory: `_site`

Make sure the host installs Ruby and Node dependencies before running the build command.

## Search Deployment

Pagefind writes search assets into `_site/pagefind`. Confirm your deployment uploads that directory. Search will not work if a deploy step filters it out.

## Robots And Sitemap

The repository includes `robots.txt`, and `jekyll-sitemap` generates `sitemap.xml`. Set `url` correctly so sitemap URLs are canonical.
