# Rychlý start

## Instalace

```bash
pip install -r requirements.txt
```

## Lokální spuštění

```bash
mkdocs serve
```

## Produkční build

```bash
mkdocs build --strict
```

## Lazy loading strategie

- obrázky přes `loading="lazy"`
- dlouhé sekce přes `IntersectionObserver`
- skeletony pro rychlejší first impression
- minimum JS na prvním vykreslení

## Nasazení

Po pushi do `main` se repozitář publikuje přes GitHub Actions.
