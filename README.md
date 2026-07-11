# Minimalist MkDocs Release v3.0

Komplexní dokumentační starter pro GitHub Pages postavený na ověřených MkDocs prvcích a Material for MkDocs.

## Co balík obsahuje

- minimalistický dark layout
- bilingvní obsah CZ / EN v jednom webu
- skeleton loading vzory
- jemnější scrolling a instant navigation
- code block styling s toolbarem a syntaxy
- lightbox pro obrázky přes GLightbox
- literate nav a section-index pro přehlednou strukturu
- minifikaci výstupu přes build plugin

## Lokální spuštění

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build
```

## Nasazení

Workflow v `.github/workflows/deploy.yml` publikuje na GitHub Pages.

## Co upravit před nasazením

- `site_url`, `repo_url`, `repo_name` v `mkdocs.yml`
- texty v `docs/`
- branding v `docs/assets/custom.css`
- případně cesty na logo a favicon
