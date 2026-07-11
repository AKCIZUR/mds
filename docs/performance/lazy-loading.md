# Lazy loading

<div data-lang="cs">
Skeleton zobrazuje tvar stránky ještě před tím, než se načte finální obsah. Tím zmizí prázdný a nejistý mezikrok.
</div>

<div data-lang="en">
Skeletons show the page shape before the final content arrives. That removes the empty, uncertain in-between step.
</div>

## Skeleton example

<div class="skeleton-card">
  <div class="skeleton skeleton-line long"></div>
  <div class="skeleton skeleton-line medium"></div>
  <div class="skeleton skeleton-line short"></div>
</div>

## Techniques

- `loading="lazy"` for images
- `IntersectionObserver` for reveals
- `content-visibility: auto` for long sections
- small fade transitions after content swap
