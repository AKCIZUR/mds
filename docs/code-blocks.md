# Code blocks

Code block je v této verzi hlavní vizuální komponenta. Má vlastní rám, toolbar, language badge, copy akci a wrap toggle.

## Box anatomy

```text
┌──────────────────────────────────────────────────────┐
│ ● TypeScript                          Copy  Wrap    │
├──────────────────────────────────────────────────────┤
│ const hello = (name: string) => {                    │
│   return `Hello, ${name}`                            │
│ }                                                    │
└──────────────────────────────────────────────────────┘
```

## Example

```ts
export function greet(name: string) {
  return `Hello, ${name}`
}
```

## Language accents

| Language | Accent |
| --- | --- |
| TypeScript | Blue |
| JavaScript | Yellow |
| Bash | Green |
| JSON | Violet |
| HTML | Orange |
| CSS | Cyan |
| Python | Amber |

## Diff example

```diff
- old line
+ new line
```
