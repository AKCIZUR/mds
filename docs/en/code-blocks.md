---
title: Code blocks
---

# Code blocks

The code box is treated as a real product component, not a generic `<pre>` wrapper.

## TypeScript

```ts title="button.tsx"
export function Button() {
  return <button className="btn">Click</button>
}
```

## Python

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
```

## Bash

```bash
npm install
mkdocs serve
```

## JSON

```json
{
  "name": "ShadDocs Dark",
  "theme": "dark"
}
```

## HTML

```html
<div class="card">Hello</div>
```
