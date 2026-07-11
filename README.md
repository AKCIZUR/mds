# VCCSD Docs Pro v3

Production-ready docs starter with:

- full-text search
- CZ / EN structure
- auto menu generation
- web edit links
- language switching
- command palette `Ctrl+K`
- lazy loading
- skeleton loading
- language-aware code styling
- blog
- versioned docs
- Mermaid diagrams
- OpenAPI page
- generated Markdown index

## Install

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt
python scripts/generate_assets.py
mkdocs serve
```

## Build

```bash
python scripts/generate_assets.py
mkdocs build --strict
```

## Notes

- "Edit on web" is implemented through GitHub edit links and the visible `content.action.edit` button.
- Search, command palette and nav indexes run client-side from generated JSON.
- Menu order is controlled by generated `.pages` files.
