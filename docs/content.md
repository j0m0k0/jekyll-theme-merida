# Content Guide

Merida is designed for a personal or academic site with five main content areas: about, blog, news, projects, and publications.

## Pages

Static pages live in `_pages`. Each page must have front matter:

```markdown
---
layout: blog
title: Blog
permalink: /blog
excerpt: "My blog"
---

# Blog

My latest writing.
```

Use these included pages as starting points:

- `_pages/about.md`
- `_pages/blog.md`
- `_pages/news.md`
- `_pages/projects.md`
- `_pages/publications.md`
- `_pages/404.md`

## About Page

The about page uses `layout: about`:

```yaml
---
layout: about
title: "About Me"
permalink: /
profile:
  image: /assets/img/profile_photo.jpg
  alt: Profile photo
  caption: Optional caption
latest_posts:
  enabled: true
latest_news:
  enabled: true
---
```

Supported keys:

- `profile.image`: path or URL for the profile image.
- `profile.alt`: accessible alt text.
- `profile.caption`: optional caption rendered below the image.
- `latest_posts.enabled`: shows the five latest posts.
- `latest_news.enabled`: shows the five latest news items.

If you do not want a profile image, remove `profile` or leave `profile.image` empty.

## Blog Posts

Posts live in `_posts` and use Jekyll's standard file name format:

```text
YYYY-MM-DD-title.md
```

Example:

```markdown
---
layout: post
title: "The Ultimate Markdown"
date: 2026-06-03 09:00:00 -0500
tags: [Markdown, Jekyll, Typography]
background:
  file: /assets/img/backgrounds/bg-1.jpg
  opacity: 0.8
  size: cover
  x: 50%
  y: 50%
  blur: 0.1
---

Write your post in Markdown.
```

Supported post keys:

- `layout`: use `post`.
- `title`: post title.
- `date`: publication date. If omitted, Jekyll reads the date from the file name.
- `tags`: optional list of tags shown on the listing and post header.
- `last_modified_at`: optional explicit update date. Otherwise `jekyll-last-modified-at` may provide one.
- `background.file`: optional header image URL or path.
- `background.opacity`: CSS opacity for the header image.
- `background.size`: CSS `background-size`, such as `cover` or `150%`.
- `background.x`: horizontal background position.
- `background.y`: vertical background position.
- `background.blur`: small numeric value multiplied by 10 for CSS blur pixels.

If no background file is provided, the post header uses the theme's default cover color.

## News Items

News items live in `_news` and render through the same `post` layout for detail pages.

```markdown
---
layout: post
title: "Conference Talk"
date: 2026-06-03
description: "I will present Merida at a Jekyll meetup."
---

Optional long-form news body.
```

Supported news keys:

- `layout`: use `post` if the item has a detail page.
- `title`: detail page title.
- `date`: news date.
- `description`: short text shown in news lists.

If the body is empty, list pages show only the description and do not render a "Read more" link.

## Projects

Projects are data entries, not Markdown files. Edit `_data/repos.yaml`:

```yaml
items:
  - name: Example Project
    description: Short project description.
    date: 2026-06-03
    user_name: example
    repo_name: project
    author: your-github-username
    host: https://github.com
    category: Research

orders: [Research]
```

The projects layout groups items by `category`, sorts each group by `date` descending, links to `host/user_name/repo_name`, and shows a GitHub star badge from Shields.io. For the `Open Source Contributions` category, repo names link to closed pull requests by `author` in that repository.

## Publications

Publications live in `_bibliography/references.bib`.

Example:

```bibtex
@article{example2026merida,
  title   = {Merida: A Minimal Jekyll Theme},
  author  = {Doe, Jane and Smith, John},
  journal = {Journal of Static Sites},
  year    = {2026},
  url     = {https://example.com/paper},
  code    = {https://github.com/example/project},
  slides  = {/downloads/slides/sample-presentation.pdf},
  abstract = {A short abstract.}
}
```

Merida's bibliography layout uses:

- `title`
- `author`
- `booktitle`
- `journal`
- `year`
- `abstract`
- `url`
- `code`
- `slides`
- `bibtex`

The `url`, `code`, `slides`, and `bibtex` fields render action links when present.

## Markdown Support

Merida supports standard Kramdown Markdown, including:

- headings
- bold and italic text
- links
- images
- tables
- blockquotes
- ordered and unordered lists
- task lists
- fenced code blocks
- inline and display math

Use fenced code blocks with a language for Rouge highlighting:

````markdown
```ruby
puts "Hello, Merida"
```
````

Use MathJax delimiters for math:

```markdown
Inline math: $E = mc^2$

Display math:

$$
E = mc^2
$$
```

## Images And Downloads

Put site images in `assets/img`. Put downloadable files in `downloads`.

Use `relative_url` in custom Liquid templates when possible:

```liquid
{{ "/assets/img/example.jpg" | relative_url }}
```

In Markdown, use normal paths:

```markdown
![Alt text](/assets/img/example.jpg)
```

## 404 Page

The 404 page lives at `_pages/404.md`:

```yaml
---
layout: 404
permalink: /404.html
title: "404"
short_message: "Page not found"
long_message: "The page you are looking for does not exist."
nav_exclude: true
---
```

`nav_exclude: true` hides the navbar on the 404 page.
