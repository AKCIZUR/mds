# Struktura projektu

```text
.
├── .github/workflows/deploy.yml
├── docs/
│   ├── index.md
│   ├── getting-started.md
│   ├── architecture.md
│   ├── navigation.md
│   ├── components.md
│   ├── reference.md
│   ├── faq.md
│   ├── releases.md
│   ├── changelog.md
│   ├── en/
│   │   ├── index.md
│   │   ├── getting-started.md
│   │   └── ...
│   └── assets/
│       ├── custom.css
│       ├── app.js
│       ├── logo.svg
│       └── favicon.svg
├── mkdocs.yml
├── requirements.txt
└── README.md
```

## Smysl rozdělení

- `index.md`: landing page
- `getting-started.md`: instalace a první kroky
- `navigation.md`: menu a layout
- `components.md`: bloky, callouty, code blocks
- `reference.md`: technický přehled
- `faq.md`: krátké odpovědi
- `releases.md` a `changelog.md`: historie změn
- `en/`: anglická varianta se stejnou strukturou
