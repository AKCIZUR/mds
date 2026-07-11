---
title: Installation
description: Install and run the MaterialX docs starter locally.
---

# Installation

## Local setup

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

## Production build

```bash
mkdocs build
```

## Deploy

The repository already contains a GitHub Actions workflow. After pushing to the default branch, the site is published to GitHub Pages.
