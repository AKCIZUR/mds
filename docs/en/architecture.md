---
title: Architecture
---

# Architecture

The repository is split into three layers:

1. **MkDocs core** for documentation rendering
2. **Overrides** for template injection and build-safe extension
3. **CSS + JS** for the shadcn-like visual language and interactions

## Structure

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

## Guidelines

- keep components small
- avoid duplicate plugins
- define color tokens only once
- map navigation to real files
