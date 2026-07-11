# VCCSD Docs Dark Prod v5

Produkční dokumentační starter s dark shadcn-like vzhledem, postavený na stabilním MkDocs Material jádru.

## Co je uvnitř

- minimalistický dark layout inspirovaný shadcn/ui
- výrazně lepší code block boxy s vlastním toolbarem
- CZ / EN jazykový toggle
- skeleton loading shell
- jemnější scroll behavior a reveal animace
- GitHub Pages deploy workflow
- čistá struktura bez chybějících override cest

## Spuštění lokálně

```bash
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Deploy

Workflow `.github/workflows/deploy.yml` publikuje obsah na GitHub Pages z větve `main`.

## Co upravit před nasazením

- `site_url`, `repo_url` a `repo_name` v `mkdocs.yml`
- logo a favicon v `docs/assets/`
- vlastní texty v `docs/`
- CZ / EN obsah pro celý web
