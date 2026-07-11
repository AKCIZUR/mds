# VCCSD Docs Dark

Produční dokumentační starter pro GitHub Pages postavený na `mkdocs-shadcn` s dark-only shadcn-like vizuálem.

## Co je uvnitř

- minimalistický dark layout
- levý panel s navigací
- horní lišta se search a brandingem
- pravý panel s obsahem stránky
- syntax highlighting pro kód
- připravený GitHub Actions deploy
- obsahové stránky pro design system, code blocks, performance a reference

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

## Produkční build

```bash
mkdocs build --strict
```

## Deploy

Workflow `.github/workflows/deploy.yml` publikuje obsah na GitHub Pages z větve `main`.

## Před nasazením uprav

- `site_url`, `repo_url` a `repo_name` v `mkdocs.yml`
- logo a favicon v `docs/assets/`
- vlastní brand texty v `docs/`
