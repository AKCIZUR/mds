# MkDocs MaterialX Pro

Coherent production starter pro dokumentaci na bázi Material for MkDocs a vlastního dark-first MaterialX stylu.

## Co obsahuje

- CZ / EN dokumentaci
- automatické indexy z Markdownu
- fulltext search
- command palette `Ctrl+K`
- blog
- verze přes `mike`
- Mermaid diagramy
- OpenAPI stránku
- edit odkazy na GitHub
- lazy loading
- skeleton loading
- dark UI s MaterialX override vrstvou

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

## Release

```bash
mike deploy --push --update-aliases 2.0 latest
mike set-default --push latest
```
