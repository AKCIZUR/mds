# VCCSD Docs

<div class="markup-hero">
  <div class="markup-hero__eyebrow">Minimalist release / dark UI / bilingual shell</div>

  <div data-lang="cs">
    <p>Moderní dokumentační základ s levým menu, horním panelem, obsahem stránky a s plynulejším UX pro čtení kódu i textu.</p>
  </div>

  <div data-lang="en">
    <p>A modern documentation base with left navigation, a top bar, page content, and a smoother UX for reading code and prose.</p>
  </div>

  <div class="markup-hero__actions">
    <a class="primary" href="getting-started/">Rychlý start</a>
    <a href="components/">Komponenty</a>
    <a href="releases/">Release notes</a>
  </div>
</div>

## Co je připraveno

- plná navigace v levém panelu
- rychlé vyhledávání
- pravý panel s obsahem stránky
- syntax highlighting s jasnou typografií
- jazykový toggle Czech / English
- skeleton a lazy loading strategii pro těžší obsah
- GitHub Pages deploy přes Actions

## Minimalistický layout

<div class="skeleton-grid">
  <section class="feature-card">
    <h3>Header</h3>
    <p>Úzká horní lišta s identitou, search, jazykem a rychlými akcemi.</p>
  </section>
  <section class="feature-card">
    <h3>Content shell</h3>
    <p>Středový prostor drží maximální čitelnost a malou vizuální hlučnost.</p>
  </section>
  <section class="feature-card">
    <h3>Code blocks</h3>
    <p>Bloky kódu mají vlastní hlavičku, jazykový štítek a copy akci.</p>
  </section>
  <section class="feature-card">
    <h3>Loading state</h3>
    <p>Skeletons pomáhají skrýt čekání a zachovat stabilní layout.</p>
  </section>
</div>

## Skeleton ukázka

<div class="skeleton-card">
  <div class="skeleton skeleton-line long"></div>
  <div class="skeleton skeleton-line medium"></div>
  <div class="skeleton skeleton-line short"></div>
</div>

## Ukázka použití

```bash
mkdocs serve
```

## Co dál

- doplnit vlastní články
- vyměnit branding
- přidat API reference
- připojit repository na GitHub Pages
