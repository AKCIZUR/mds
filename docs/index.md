---
title: ShadDocs Dark
---

<div class="shd-hero">
  <div class="shd-hero__eyebrow">Dark shadcn-inspired docs system</div>
  <h1>Build documentation that looks intentional.</h1>
  <p>
    A clean MkDocs foundation with a dark shadcn-like visual layer, stronger code blocks,
    bilingual routing, skeleton loading, and smooth navigation.
  </p>

  <div class="shd-pillbar">
    <span class="shd-pill">Override-first structure</span>
    <span class="shd-pill">Copy / Wrap / Collapse code boxes</span>
    <span class="shd-pill">CZ + EN content</span>
    <span class="shd-pill">GitHub Pages ready</span>
  </div>
</div>

## What this repo gives you

<div class="shd-grid">
  <a class="shd-card" href="cs/">
    <h3 class="shd-card__title">Česky</h3>
    <div class="shd-card__meta">Start here if your audience is Czech.</div>
  </a>
  <a class="shd-card" href="en/">
    <h3 class="shd-card__title">English</h3>
    <div class="shd-card__meta">Start here if your audience is international.</div>
  </a>
  <a class="shd-card" href="code-blocks/">
    <h3 class="shd-card__title">Code block system</h3>
    <div class="shd-card__meta">A polished box UI for snippets and examples.</div>
  </a>
  <a class="shd-card" href="loading/">
    <h3 class="shd-card__title">Loading states</h3>
    <div class="shd-card__meta">Skeletons, lazy assets, and smoother perceived speed.</div>
  </a>
</div>

## Quick highlights

| Area | Result |
| --- | --- |
| Visual style | Dark, minimal, shadcn-inspired |
| Code blocks | Header bar, label, copy, wrap, collapse |
| Language toggle | CZ / EN route switch |
| Loading | Skeleton overlay + lazy images |
| Scroll | Smooth anchors with restrained motion |

## Sample code block

```ts
export function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ")
}
```
