# Contributing

Thanks for helping improve Merida. This guide explains how to work on the theme, prepare changes, and submit pull requests.

## Local Setup

Install dependencies:

```sh
bundle install
npm install
```

Build CSS:

```sh
npm run css:build
```

Start local development:

```sh
npm run dev
```

## Development Workflow

1. Create a branch for your change.
2. Make the smallest coherent change that solves the issue.
3. Update documentation when behavior, configuration, or public APIs change.
4. Build the CSS if you changed `assets/css/merida.src.css`.
5. Build the site before opening a pull request.

Validation commands:

```sh
npm run css:build
bundle exec jekyll build
```

## Pull Request Expectations

Pull requests should include:

- A short summary of the change.
- Screenshots for visual changes.
- Notes about configuration or migration impact.
- Documentation updates for user-facing changes.
- Confirmation that the site builds locally.

Avoid unrelated formatting churn. Keep changes focused.

## Code Style

- Follow the existing Liquid, HTML, CSS, JavaScript, Ruby, and YAML style.
- Prefer readable Liquid over clever logic.
- Keep JavaScript dependency-free unless a dependency clearly improves the theme.
- Do not edit generated files manually.
- Build `assets/css/merida.css` with `npm run css:build` when preparing a gem release.

## Documentation Style

- Prefer direct instructions and copyable examples.
- Document supported keys and file paths.
- Call out limitations clearly.
- Keep examples generic enough for personal, academic, and technical sites.

## Reporting Issues

When reporting a bug, include:

- Merida version.
- Jekyll version.
- Ruby version.
- Node.js version if the issue involves CSS or search.
- Build command.
- Full error output.
- A minimal reproduction when possible.

## Maintainer Release Workflow

See [docs/releasing.md](docs/releasing.md) for the full release checklist.

Short version:

1. Update docs and `CHANGELOG.md`.
2. Bump `package.json`.
3. Run `npm install --package-lock-only`.
4. Run `npm run css:build`.
5. Run `bundle exec jekyll build`.
6. Commit changes.
7. Run `npm run release:gem`.
8. Tag and publish a GitHub release.
