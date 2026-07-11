# Design system

<div data-lang="cs">
Tato vrstva definuje šířku layoutu, radius, kontrast, code blocks i skeletony tak, aby vizuál držel jednu linii.
</div>

<div data-lang="en">
This layer defines layout width, radius, contrast, code blocks, and skeletons so the visual language stays aligned.
</div>

## Token direction

```css
:root {
  --radius: 18px;
  --surface: rgba(255, 255, 255, 0.82);
  --border: rgba(24, 24, 27, 0.12);
  --accent: #4f46e5;
}
```

## Components

- cards with soft borders
- pill toggles for language selection
- readable code panels with language emphasis
- skeletons with stable dimensions
- smooth anchors with reduced-motion respect
