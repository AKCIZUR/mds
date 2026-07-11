# Komponenty a bloky

## Hero

### Dokumentace, která působí hotově

Text lze použít na úvodní stránku, release notes i interní portál.

## Code block component prototype

```ts
export function greet(name: string) {
  return `Hello, ${name}`
}
```

Po načtení stránky se blok automaticky obalí do toolbar shellu s jazykovým štítkem a copy akcí.

## Language toggle example

<div class="markup-hero__actions">
  <a class="primary" href="#cs">CZ</a>
  <a href="#en">EN</a>
</div>

<div data-lang="cs" id="cs">
  <p><strong>Čeština</strong> je výchozí pro lokální obsah a onboarding.</p>
</div>

<div data-lang="en" id="en">
  <p><strong>English</strong> is available for global teams and shared docs.</p>
</div>

## Feature cards

| Blok | Využití |
| --- | --- |
| Hero | hlavní sdělení |
| Card grid | přehled funkcí |
| Alert | upozornění |
| Tabs | varianty konfigurace |
| Accordion | FAQ |
| Timeline | release historie |

## Callouty

!!! note
    Poznámky pro čtenáře.

!!! tip
    Krátké doporučení.

!!! warning
    Rizikové kroky nebo omezení.

## Checklist

- [x] dark-only styl
- [x] menu
- [x] toc panel
- [x] deploy workflow
- [x] code block vylepšení
- [x] jazykový toggle
- [x] skeleton loading vzor
