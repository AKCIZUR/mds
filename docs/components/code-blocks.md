# Code blocks

<div data-lang="cs">
Každý blok kódu má mít jasný jazykový štítek, copy tlačítko a syntaxi s dobře čitelným kontrastem.
</div>

<div data-lang="en">
Every code block should have a clear language label, a copy button, and syntax with readable contrast.
</div>

## TypeScript sample

```ts title="src/main.ts"
const createCard = (title: string, body: string) => ({
  title,
  body,
})
```

## Python sample

```python title="scripts/build.py"
def build_release(name: str) -> None:
    print(f"building {name}")
```

## Bash sample

```bash title="release.sh"
mkdocs build --strict
zip -r release.zip site/
```

## Styling rules

- use one card frame for every language
- keep the label short and obvious
- let syntax colors do the language-specific work
- avoid neon contrast unless the app is in a dark shell
