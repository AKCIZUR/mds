# Code blocks

Kód je tady prezentovaný jako důležitý obsah, ne jako odřezek na konci stránky.

## TypeScript

```ts
export function greet(name: string) {
  return `Hello, ${name}`
}
```

## Bash

```bash
mkdocs build --strict
```

## JSON

```json
{
  "site_name": "VCCSD Docs Dark",
  "theme": "shadcn"
}
```

## Doporučení pro implementaci

- používej monospaced font s dobrou čitelností
- zachovej kontrast mezi syntaxí a pozadím
- přidej copy action jen tehdy, když je opravdu potřeba
- drž radius a border konzistentní s ostatními card prvky

!!! note
    Pokud budeš chtít jemnější shadcn feeling, vyplatí se sjednotit code block header, border a spacing se zbytkem karet.
