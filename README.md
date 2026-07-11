# Shadcn MkDocs Release v4.0.0

Kompaktní dokumentační starter pro GitHub Pages postavený na MkDocs Material, ale vizuálně laděný do čistého shadcn/ui stylu.

## Co balík obsahuje

- shadcn-inspired light/dark theme layer
- bilingual UX CZ / EN v jednom webu
- skeleton loading vzory pro lepší perceived performance
- jemné smooth scrolling chování s offsetem pro anchor odkazy
- code block styling se syntaxí a důrazem na čitelnost
- GLightbox pro obrázky
- literate-nav a section-index pro přehlednou strukturu
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
mkdocs build --strict
```

## Nasazení

Workflow v `.github/workflows/deploy.yml` publikuje na GitHub Pages.

## Co upravit před nasazením

- `site_url`, `repo_url`, `repo_name` v `mkdocs.yml`
- texty v `docs/`
- vizuální tokeny v `docs/assets/custom.css`
- případně cesty na logo a favicon
