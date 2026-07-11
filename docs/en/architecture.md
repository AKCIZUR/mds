# Project structure

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

## Why this split works

- `index.md`: landing page
- `getting-started.md`: onboarding
- `navigation.md`: menu and layout
- `components.md`: blocks, callouts, code blocks
- `reference.md`: technical overview
- `faq.md`: quick answers
- `releases.md` and `changelog.md`: history
- `en/`: English mirror with the same structure
