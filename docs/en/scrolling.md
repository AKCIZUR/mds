---
title: Scrolling
---

# Scrolling

Smooth scrolling should feel crisp, not sticky.

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}
```

## Guidance

- use native CSS smooth scrolling first
- offset anchors with `scroll-padding-top`
- respect `prefers-reduced-motion`
- avoid heavy scroll libraries unless there is a real need
