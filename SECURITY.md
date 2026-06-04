# Security Policy

## Supported Versions

Security fixes are handled on the latest released version of Merida. If a vulnerability affects older versions, the maintainer may publish a new release and document the affected versions in the release notes.

## Reporting A Vulnerability

Do not report vulnerabilities in public issues.

Email the maintainer listed in `jekyll-theme-merida.gemspec` with:

- A clear description of the vulnerability.
- Steps to reproduce.
- Affected versions or commits if known.
- Any proof-of-concept code.
- Suggested mitigation if you have one.

Please allow reasonable time for triage before public disclosure.

## Scope

Relevant reports include:

- Cross-site scripting introduced by theme templates or scripts.
- Unsafe handling of user-provided content.
- Dependency vulnerabilities that affect generated sites or theme development.
- Release or packaging issues that could affect users.

Static-site content authored by a site owner is generally outside the theme's security scope unless the theme renders it in an unexpectedly unsafe way.
