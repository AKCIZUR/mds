# Architektura

## Obsahové vrstvy

- `docs/cs/` a `docs/en/` pro jazykový obsah
- `docs/blog/` pro články a release notes
- `docs/api/` pro OpenAPI specifikaci
- `docs/versions/` pro starší vydání
- `docs/assets/` pro JS, CSS a obrázky

## Datový tok

```mermaid
sequenceDiagram
  participant Author
  participant Repo
  participant CI
  participant Site
  Author->>Repo: push Markdown
  Repo->>CI: GitHub Actions build
  CI->>Site: publish static docs
```
