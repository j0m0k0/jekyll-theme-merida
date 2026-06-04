# Customization

Merida uses normal Jekyll theme override rules. In a site that uses the gem, any local file with the same path as a theme file overrides the gem file.

## Override A Layout

To customize the post layout, copy the theme file into your site:

```text
_layouts/post.html
```

Then edit the local copy. Jekyll will use your local layout instead of the gem layout.

Use the same pattern for:

- `_layouts/about.html`
- `_layouts/blog.html`
- `_layouts/news.html`
- `_layouts/projects.html`
- `_layouts/publications.html`
- `_layouts/base.html`

## Override An Include

Shared UI is split into includes:

```text
_includes/header.html
_includes/navbar.html
_includes/footer.html
_includes/latest-news.html
_includes/latest-posts.html
_includes/search-modal.html
_includes/post-body.html
```

Copy the include you want to change into your site and edit it there.

## Navigation

Edit `_data/menu.yaml`:

```yaml
items:
  - title: Home
    url: /
  - title: Writing
    url: /blog
```

The active state is based on an exact match between `item.url` and `page.url`.

## Footer Links

Edit `_data/social.yaml`:

```yaml
items:
  - name: GitHub
    url: https://github.com/your-name
```

Delete the file or use `items: []` to remove these links.

## Profile Image

Change the about page front matter:

```yaml
profile:
  image: /assets/img/profile_photo.jpg
  alt: Profile photo
  caption: Optional caption
```

Put your image in `assets/img` or use an external URL.

## Favicons

Default favicon files live in `assets/favicon`.

Replace these files to brand your site:

```text
assets/favicon/favicon.ico
assets/favicon/favicon-16x16.png
assets/favicon/favicon-32x32.png
assets/favicon/apple-touch-icon.png
assets/favicon/android-chrome-192x192.png
assets/favicon/android-chrome-512x512.png
assets/favicon/site.webmanifest
```

If you use different paths, override `_includes/header.html`.

## CSS Source

The source stylesheet is:

```text
assets/css/merida.src.css
```

It imports Tailwind CSS and the typography plugin, defines CSS variables for theme colors, and adds custom component styling. The compiled file is:

```text
assets/css/merida.css
```

Build it with:

```sh
npm run css:build
```

Watch it during development:

```sh
npm run css:watch
```

## Theme Colors

Merida uses CSS custom properties for light, dark, and system modes. The main groups are:

- `:root`
- `html[data-theme="light"]`
- `html[data-theme="dark"]`
- `html[data-theme="system"]` inside `prefers-color-scheme` media queries

Common variables:

```css
--bg-main
--border-main
--navbar-bg
--navbar-active-item
--text
--text-bold
--modal
--footer
--tag
--tag-text
--post-cover
--card
--bibtext
--table-header
--table-header-bg
--table-text
--table-row-hover
--search-row-hover
--search-bar-bg
--time
--research-box-bg
```

Change variables in `assets/css/merida.src.css`, then rebuild CSS.

## Content Width

The site width is controlled by:

```css
.max-w-theme {
  @apply max-w-4xl;
}
```

Change this utility if you want a wider or narrower layout.

## Fonts

The source CSS imports Source Sans 3 from Google Fonts and maps it to the Tailwind theme:

```css
--font-main: var(--font-sans);
```

To change fonts, update the import and `@theme` font variables, then rebuild CSS.

## JavaScript

Theme scripts live in `assets/scripts`:

- `theme-switch.js`: light, dark, and system mode toggle.
- `navbar.js`: mobile menu.
- `search.js`: Pagefind modal behavior.
- `copy-code.js`: copy buttons for code blocks and BibTeX blocks.
- `table-wrapper.js`: responsive table wrappers.
- `without-prose.js`: prevents Tailwind Typography styling where needed.
- `mathjax-config.js`: MathJax delimiters.

Scripts are loaded by `_includes/header.html` and `_includes/post-body.html`. Override those includes if you want to remove or replace scripts.

## Search UI

The search button is in `_includes/navbar.html`, and the modal is in `_includes/search-modal.html`. The JavaScript expects these IDs and classes:

- `#search-modal`
- `#search-input`
- `#search-clear`
- `#search-results`
- `.search-open`

Keep these selectors if you restyle the search markup without changing `assets/scripts/search.js`.

## MathJax

MathJax is loaded from jsDelivr in `_includes/header.html`. To disable math, remove these lines from a local override of the include:

```html
<script src="/assets/scripts/mathjax-config.js"></script>
<script async id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
```

## Base URL Compatibility

Most generated links use Jekyll URLs, but some theme assets and sample navigation links are written as root-relative paths such as `/assets/scripts/theme-switch.js` and `/blog`. If you deploy to a subpath, review local overrides for header, post-body, menu data, and footer links so paths include the correct `baseurl`.
