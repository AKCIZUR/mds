# MkDocs MaterialX Production Starter

Production-ready documentation repository for **GitHub Pages** using **MkDocs + MaterialX**.

## Features

- automatic navigation from the folder structure
- full-text search
- breadcrumbs
- page table of contents with active section tracking
- previous / next navigation
- GitHub edit links
- SEO and Open Graph tags
- lazy loading helpers
- skeleton loading
- custom syntax highlighting accents per language
- GitHub Actions deployment to Pages
- custom theme overrides without modifying theme source

## Quick start

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

Before publishing, update these values in `mkdocs.yml`:

- `site_url`
- `repo_url`
- `edit_uri`

If you use a project site, keep the Pages source as **GitHub Actions** in repository settings.

## Folder structure

- `docs/` — Markdown content
- `docs/assets/` — CSS and JavaScript
- `docs/overrides/` — theme overrides
- `scripts/` — build helpers
- `.github/workflows/` — GitHub Pages deploy workflow

## Notes

MaterialX follows the same MkDocs-style workflow as Material. The repo is structured so the site can grow without changing the core theme files.
