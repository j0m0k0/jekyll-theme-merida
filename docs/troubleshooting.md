# Troubleshooting

## `bundle exec jekyll serve` Fails

Run:

```sh
bundle install
```

Then try again:

```sh
bundle exec jekyll serve
```

If the error mentions `webrick`, confirm the bundle includes the theme gem dependencies or add:

```ruby
gem "webrick"
```

## CSS Changes Do Not Appear

The generated stylesheet is `assets/css/merida.css`. Rebuild it:

```sh
npm run css:build
```

During development, use:

```sh
npm run dev
```

Do not edit `assets/css/merida.css` manually.

## `_config.yml` Changes Do Not Appear

Jekyll does not always reload configuration changes while serving. Restart the server or use:

```sh
npm run dev
```

The `dev` script restarts Jekyll when `_config.yml` changes.

## Search Modal Opens But Search Does Not Work

Confirm Pagefind output exists:

```sh
ls _site/pagefind
```

If it does not exist:

```sh
npm install
bundle exec jekyll build
```

If the site is deployed under a subpath, confirm `/pagefind/pagefind.js` resolves correctly or override `assets/scripts/search.js`.

## `npx pagefind` Fails

Install npm dependencies:

```sh
npm install
```

For CI stability, add Pagefind explicitly to the consuming site:

```sh
npm install --save-dev pagefind
```

## Publications Do Not Render

Check:

- `jekyll-scholar` is listed in `_config.yml`.
- `_bibliography/references.bib` exists.
- `scholar.bibliography` matches the BibTeX file name.
- The publications page uses `layout: publications`.
- BibTeX syntax is valid.

## Navigation Active State Is Missing

The active state is based on exact URL matching:

```liquid
item.url == page.url
```

Make sure `_data/menu.yaml` URLs match page permalinks. For example, if a page has:

```yaml
permalink: /blog
```

use:

```yaml
url: /blog
```

## Images Are Broken

Check whether the image path is root-relative, relative, or external:

```markdown
![Alt](/assets/img/profile_photo.jpg)
```

For subpath deployments, prefer Liquid in custom templates:

```liquid
{{ "/assets/img/profile_photo.jpg" | relative_url }}
```

## GitHub Pages Build Fails

Use GitHub Actions to build and deploy the site instead of the built-in Pages Jekyll builder. See [Deployment](deployment.md).

## Theme Toggle Does Not Work

Confirm `assets/scripts/theme-switch.js` loads in the browser. If you overrode `_includes/header.html`, include:

```html
<script src="/assets/scripts/theme-switch.js"></script>
```

For subpath deployments, adjust the path with `relative_url`.

## Math Does Not Render

Confirm `_includes/header.html` still loads:

```html
<script src="/assets/scripts/mathjax-config.js"></script>
<script async id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
```

Use supported delimiters:

```markdown
$inline$

$$
display
$$
```

## `npm run release:gem` Says The Version Is Already Published

Bump `package.json`, update `CHANGELOG.md`, run:

```sh
npm install --package-lock-only
```

Then release again.
