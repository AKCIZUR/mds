# Komponenty a bloky

## Hero

### Dokumentace, která působí hotově

Krátké texty, jasná hierarchie a dost prostoru kolem bloků.

## Doporučené UI bloky

| Blok | Využití |
| --- | --- |
| Hero | hlavní sdělení |
| Card grid | přehled funkcí |
| Alert | upozornění |
| Tabs | varianty konfigurace |
| Accordion | FAQ |
| Timeline | release historie |

## Code block

```python
def theme(accent: str) -> str:
    return f"minimal-{accent}"
```

```bash
mkdocs build --strict
```

## Tabs

=== "Config"

    `mkdocs.yml`

=== "Content"

    markdown soubory v `docs/`

## Checklist

- [x] dark-only základ
- [x] CZ/EN struktura
- [x] code highlights
- [x] skeleton loading
- [x] plynulejší scroll
