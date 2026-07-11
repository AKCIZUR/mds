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
- statické skeletony pro titulky, karty a code bloky
- minimum JS pro okamžitý first paint

## Nasazení

Po pushi do `main` se repozitář publikuje přes GitHub Actions.

## Doporučený postup

1. uprav `site_url`
2. uprav `repo_url`
3. nahraď logo a favicon
4. doplň vlastní obsah
5. přidej sekce pro CZ / EN varianty
