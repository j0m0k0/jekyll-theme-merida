# Search

Merida uses Pagefind for static search. Pagefind scans the generated `_site` output after Jekyll finishes writing files, then writes a searchable index into `_site/pagefind`.

## Files Involved

- `_plugins/pagefind.rb`: runs Pagefind after each Jekyll build.
- `_includes/search-modal.html`: modal markup.
- `_includes/navbar.html`: search open buttons.
- `assets/scripts/search.js`: loads Pagefind and renders results.
- `_layouts/base.html`: marks body content for Pagefind.

## How Indexing Works

The plugin registers a `site, post_write` hook:

```ruby
Jekyll::Hooks.register :site, :post_write do |site|
  system("npx pagefind --site _site")
end
```

After `bundle exec jekyll build`, Pagefind reads `_site` and creates:

```text
_site/pagefind/
```

The browser script loads:

```js
import("/pagefind/pagefind.js")
```

## Install Pagefind

The plugin runs `npx pagefind`, so npm can download Pagefind automatically if it is not already present. For more predictable CI builds, add Pagefind to your own project:

```sh
npm install --save-dev pagefind
```

## Searchable Content

The base layout marks the page body with:

```html
<body data-pagefind-body>
```

Some repeated UI areas are ignored:

```html
data-pagefind-ignore
```

Use `data-pagefind-ignore` in custom layouts to exclude navigation, footers, repeated widgets, or content that should not appear in search results.

## Disable Search

To remove search from a site:

1. Delete or disable `_plugins/pagefind.rb`.
2. Override `_includes/navbar.html` and remove the search buttons.
3. Override `_includes/post-body.html` and remove `assets/scripts/search.js`.
4. Override `_includes/search-modal.html` or stop including it from the navbar.

## Troubleshooting Search

If the modal opens but searches never return:

- Confirm `_site/pagefind/pagefind.js` exists after build.
- Confirm your deployed site includes the `pagefind` directory.
- Confirm the site is served from a path where `/pagefind/pagefind.js` resolves correctly.
- Confirm browser console errors do not show a failed JavaScript import.

If `npx pagefind` fails during build:

- Run `npm install`.
- Add `pagefind` as a dev dependency in the consuming site.
- Confirm Node.js and npm are available in CI.

## Subpath Deployments

The current search script imports Pagefind from `/pagefind/pagefind.js`. On a project site hosted under a subpath, override `assets/scripts/search.js` or serve the site from a root path/custom domain so the import resolves correctly.
