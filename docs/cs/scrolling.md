---
title: Scrolling
---

# Scrolling

Plynulý scroll by měl být jemný, ne lepkavý.

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}
```

## Doporučení

- používat CSS smooth scrolling
- anchor offset řešit přes `scroll-padding-top`
- respektovat `prefers-reduced-motion`
- nepoužívat těžké scroll knihovny bez důvodu
