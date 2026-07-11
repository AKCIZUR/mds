# Coherent MkDocs Pro Release

Produkční dokumentační starter pro GitHub Pages.

## Co obsahuje

- dark-first vizuál inspirovaný shadcn estetikou
- CZ / EN obsah
- fulltext search
- command palette `Ctrl+K`
- automatický index Markdown souborů
- blog
- verzování dokumentace
- Mermaid diagramy
- OpenAPI stránku
- edit odkazy na GitHub
- lazy loading a skeleton loading přes JS/CSS
- build skripty a GitHub Actions deploy

## Spuštění

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
python scripts/generate_indexes.py
mkdocs serve
```

## Build

```bash
python scripts/generate_indexes.py
mkdocs build --strict
```

## Nasazení verzí

Verze dokumentace je připravená pro `mike`:

```bash
mike deploy --push --update-aliases 2.0 latest
mike set-default --push latest
```

## Struktura

- `docs/cs/` a `docs/en/` pro jazykové mutace
- `docs/blog/` pro články
- `docs/api/` pro OpenAPI
- `docs/versions/` pro verzované stránky
- `docs/assets/js/app.js` pro palette a language switch
- `scripts/generate_indexes.py` pro indexy a menu data
