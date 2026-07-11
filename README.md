# ShadDocs Dark

A production-ready MkDocs documentation repo with a shadcn-inspired dark UI.

## What is included

- Material for MkDocs base
- custom dark shadcn-like theme layer
- override-first structure
- enhanced code block shells with Copy, Wrap, Collapse
- Czech and English page sets
- skeleton loading overlay
- smooth scroll helpers
- lazy image handling
- GitHub Pages workflow
- build-safe config for `mkdocs build --strict`

## Local run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

## Strict build

```bash
mkdocs build --strict
```

## Structure

- `docs/` source content
- `overrides/` template overrides
- `docs/assets/css/theme.css` theme layer
- `docs/assets/js/app.js` UI enhancements
- `.github/workflows/` CI and deploy

## Notes

Replace `site_url`, repository links and branding to match your project.
