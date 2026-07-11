---
title: Architektura
---

# Architektura

Tento repo je rozdělené do tří vrstev:

1. **MkDocs core** pro generování dokumentace
2. **Overrides** pro template injection a build-safe rozšíření
3. **CSS + JS** pro shadcn-like vzhled a interakce

## Struktura

```text
docs/
overrides/
.github/workflows/
mkdocs.yml
requirements.txt
```

## Design tokens

```css
:root {
  --background: #09090b;
  --card: #111113;
  --border: #27272a;
  --radius: 16px;
}
```

## Doporučení

- držet komponenty malé
- nezdvojovat pluginy se stejnou funkcí
- barvy definovat pouze v tokens
- navigaci mapovat přímo na reálné soubory
