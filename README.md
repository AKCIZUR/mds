# MkDocs Shadcn GitHub Ready v2.1

Produkční dokumentační šablona pro GitHub Pages postavená na `mkdocs-shadcn`.

## Co je uvnitř

- minimalistický dark layout
- code block komponenta s toolbar stylem
- jazykový toggle Czech / English
- skeleton loading vzory
- lazy loading a jemnější scroll behavior
- připravený GitHub Actions deploy
- více stránek pro start, architekturu, komponenty, reference, FAQ a release notes

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
mkdocs build
```

## Deploy

Workflow `.github/workflows/deploy.yml` publikuje obsah na GitHub Pages z větve `main`.

## Co upravit před nasazením

- `site_url`, `repo_url` a `repo_name` v `mkdocs.yml`
- logo a favicon v `docs/assets/`
- vlastní texty v `docs/`
- CZ / EN obsah pro celý web
