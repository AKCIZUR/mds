# Coherent MkDocs Pro

Produkční starter pro technickou dokumentaci.

## Hlavní části

- česká a anglická mutace
- fulltextové vyhledávání
- command palette
- blog
- verzování
- Mermaid diagramy
- OpenAPI sekce
- edit odkazy
- dark-first vzhled

## Rychlý start

```bash
python scripts/generate_indexes.py
mkdocs serve
```

## Architektura

```mermaid
graph TD
  A[Docs] --> B[CS]
  A --> C[EN]
  A --> D[Blog]
  A --> E[API]
  A --> F[Versions]
  A --> G[Search]
```
