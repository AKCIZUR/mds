# MkDocs Shadcn GitHub Ready v2

Produční dokumentační šablona pro GitHub Pages postavená na `mkdocs-shadcn`.

## Co je uvnitř

- levý panel s plnou navigací
- horní lišta s logem, vyhledáváním a odkazy
- pravý panel s obsahem stránky
- vynucený dark režim
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
