# VCCSD Docs Pro Release

Produkční dokumentační repozitář s:

- fulltextovým vyhledáváním
- CZ / EN strukturou
- automatickou navigací
- editací přes GitHub
- syntax highlightingem
- lazy loadingem
- skeleton loadingem
- command palette `Ctrl+K`
- verzováním dokumentace
- blogem
- Mermaid diagramy
- OpenAPI stránkou
- automatickým indexem Markdown souborů

## Spuštění

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux / macOS:
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

## Struktura

- `docs/cs/` a `docs/en/` pro dvě jazykové mutace
- `docs/blog/` pro články a release posty
- `docs/api/openapi.yaml` pro API dokumentaci
- `docs/assets/js/app.js` pro command palette a lazy loading
- `scripts/generate_indexes.py` pro automatickou navigaci a indexy

## Nasazení

Repo je připravené pro GitHub Pages přes standardní MkDocs build.
