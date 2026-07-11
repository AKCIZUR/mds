# Shadcn documentation shell

:::info
This release uses a compact, production-minded MkDocs stack with a shadcn-inspired visual layer on top of Material for MkDocs.
:::

<div class="lang-switch" data-lang-switch>
  <button type="button" data-switch-to="cs">CZ</button>
  <button type="button" data-switch-to="en">EN</button>
</div>

<div data-lang="cs">
Moderní dokumentační základ s čistším layoutem, lepší čitelností kódu, rychlejším načítáním a plynulejším pohybem po stránkách.
</div>

<div data-lang="en">
A modern documentation base with a cleaner layout, stronger code readability, faster perceived loading, and smoother page movement.
</div>

## Wireframe

<a class="wireframe-link glightbox" href="assets/wireframe-home.svg" data-type="image">
  <img src="assets/wireframe-home.svg" alt="Homepage wireframe" class="wireframe-preview" />
</a>

## What the shell includes

<div class="feature-grid">
  <section class="feature-card">
    <h3>Shadcn-inspired layout</h3>
    <p>Whitespace, soft borders, and restrained accents keep the interface calm and crisp.</p>
  </section>
  <section class="feature-card">
    <h3>Code focus</h3>
    <p>Code blocks use a header, syntax tinting, and consistent spacing for each language.</p>
  </section>
  <section class="feature-card">
    <h3>Language toggle</h3>
    <p>Users can switch Czech and English through a visible control with local persistence.</p>
  </section>
  <section class="feature-card">
    <h3>Loading states</h3>
    <p>Skeletons preserve layout and remove the feeling of an empty or broken page.</p>
  </section>
</div>

## Quick sample

```ts title="src/app.ts"
export function greet(name: string) {
  return `Hello, ${name}`
}
```

## Design system

See the [token layer](design-system.md) for the visual rules behind the shadcn-inspired shell.
