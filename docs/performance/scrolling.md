# Smooth scrolling

<div data-lang="cs">
Scroll má působit klidně a přesně. Pomáhá natívní smooth behavior, správný offset pro anchor odkazy a respekt k reduced motion.
</div>

<div data-lang="en">
Scrolling should feel calm and precise. Native smooth behavior, correct anchor offsets, and reduced-motion support do most of the work.
</div>

## Recommended CSS

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 88px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

## Notes

- avoid heavy custom scroll physics
- keep animations short and meaningful
- never fight the browser on touch devices
- offset anchor jumps when a sticky header is present
