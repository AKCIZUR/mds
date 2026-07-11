# MkDocs Shadcn GitHub Ready v3

Produkční dokumentační šablona pro GitHub Pages s jemným dark glass stylem, CZ/EN strukturou, syntax-aware code bloky, skeleton loadingem a plynulejším scrollováním.

## Co je uvnitř

- levý panel s plnou navigací
- horní lišta s logem, vyhledáváním a odkazy
- pravý panel s obsahem stránky
- minimalistické code bloky s barevným zvýrazněním podle jazyka
- CZ/EN přepínání
- skeleton overlay při načítání
- lazy loading médií
- plynulejší scroll s jemným inertia efektem

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
- český a anglický text v `docs/` a `docs/en/`
