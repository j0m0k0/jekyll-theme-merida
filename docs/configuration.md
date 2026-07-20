# Configuration

Merida follows normal Jekyll configuration rules. Site-wide settings live in `_config.yml`; navigation, social links, and projects live in YAML files under `_data`.

## Core Site Settings

```yaml
baseurl: ""
permalink: /blog/:slug/

title: Your Name
tagline: A text-focused Jekyll theme
description: A minimal, responsive and feature-rich Jekyll theme for technical writing.
url: "https://example.com"
lang: en-US
```

- `baseurl`: subpath for the site, such as `/blog`. Use an empty string for root-domain deployments.
- `permalink`: permalink pattern for posts. The default places posts under `/blog/`.
- `title`: site title used by layouts, SEO tags, and the footer.
- `tagline`: short subtitle for SEO metadata.
- `description`: longer site description for SEO metadata and feeds.
- `url`: canonical site origin, including protocol.
- `lang`: optional HTML language. Defaults to `en-US`.

## Plugins

The default configuration enables:

```yaml
plugins:
  - jekyll-last-modified-at
  - jekyll-scholar
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

Keep these plugins unless you remove the matching feature:

- `jekyll-last-modified-at`: post update dates and footer update metadata.
- `jekyll-scholar`: publications from BibTeX.
- `jekyll-feed`: RSS feed.
- `jekyll-sitemap`: sitemap.
- `jekyll-seo-tag`: SEO and social metadata.

## Collections

```yaml
collections:
  pages:
    output: true
  news:
    output: true
    permalink: /news/:slug/
  research:
    output: true
```

- `pages`: renders Markdown files in `_pages`.
- `news`: renders files in `_news` and lists them on the news page.
- `research`: reserved for research content if your site needs it.

## Footer

```yaml
footer:
  show_last_update: true
```

Set `show_last_update` to `false` to hide the build date from the footer.

## Markdown And Syntax Highlighting

```yaml
markdown: kramdown
kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    css_class: "highlight"
    span:
      line_numbers: false
    block:
      line_numbers: true
      start_line: 1
```

Merida styles Rouge output and adds copy buttons to common code block structures.

## Publications

```yaml
scholar:
  bibliography: references.bib
  style: apa
  bibliography_template: bib
  bibliography_list_tag: ul
  sort_by: year
  order: descending
```

- `bibliography`: file name inside `_bibliography`.
- `style`: citation style used by `jekyll-scholar`.
- `bibliography_template`: layout for each entry. Merida provides `_layouts/bib.html`.
- `sort_by` and `order`: default publication ordering.

## SEO Verification

`jekyll-seo-tag` reads `webmaster_verifications`:

```yaml
webmaster_verifications:
  google:
  bing:
  alexa:
  yandex:
  baidu:
  facebook:
```

Fill in only the services you use.

## Navigation Data

`_data/menu.yaml` controls navbar items:

```yaml
items:
  - title: About
    url: /
  - title: Projects
    url: /projects
  - title: Blog
    url: /blog
```

Each item supports:

- `title`: visible label.
- `url`: target URL.

Use URLs that match your page permalinks.

## Social Data

`_data/social.yaml` controls footer links:

```yaml
items:
  - name: GitHub
    url: https://github.com/your-name
  - name: LinkedIn
    url: https://www.linkedin.com/in/your-name/
```

Each item supports:

- `name`: visible label.
- `url`: target URL.

Delete the file or set `items: []` if you do not want social links.

## Project Data

`_data/repos.yaml` controls the projects page:

```yaml
items:
  - name: Merida
    description: A minimal Jekyll theme for technical writing.
    date: 2026-06-03
    user_name: j0m0k0
    repo_name: jekyll-theme-merida
    author: j0m0k0
    host: https://github.com
    category: Open Source Projects

orders:
  - Open Source Projects
```

Each item supports:

- `name`: project title.
- `description`: short project summary.
- `date`: date used for sorting within its category.
- `user_name`: account or organization name used for the repository URL and GitHub star badge.
- `repo_name`: repository name used for the repository URL and GitHub star badge.
- `author`: GitHub username used for contribution links in the `Open Source Contributions` category.
- `host`: repository host URL, usually `https://github.com`.
- `category`: group heading.

`orders` is optional. Categories listed in `orders` render first in that order. Any remaining categories render after them.

## Page Front Matter

Common page keys:

```yaml
layout: about
title: About Me
permalink: /
excerpt: Short page summary
nav_exclude: true
```

- `layout`: one of Merida's layouts.
- `title`: page title.
- `permalink`: public URL.
- `excerpt`: optional SEO/feed summary.
- `nav_exclude`: hides the navbar when set to `true`.

## Layouts

Merida provides these layouts:

- `base`: shared HTML shell.
- `about`: biography page with optional profile image, latest posts, and latest news.
- `blog`: post listing.
- `post`: blog and news detail pages.
- `news`: news listing.
- `projects`: project listing from `_data/repos.yaml`.
- `publications`: bibliography page from `_bibliography/references.bib`.
- `404`: not-found page.
- `bib`: individual publication entry template for `jekyll-scholar`.

See [Content Guide](content.md) for layout-specific front matter.

## Excluded Files

The default `_config.yml` excludes development and documentation files from the generated site:

```yaml
exclude:
  - README.md
  - DESIGN.md
  - tailwind_enabler.css
  - CHANGELOG.md
  - "*.gem"
  - "*.gemspec"
  - docs
  - LICENSE
  - "*.config.js"
  - "package*.json"
  - assets/css/merida.src.css
```

If you want to publish the documentation as part of a website, remove `docs` from `exclude` and add pages/layouts for it.
