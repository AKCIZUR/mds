# Architecture

## Layout flow

```text
header
  content shell
    sidebar | main article | toc
```

<div data-lang="cs">
Jádro webu drží jen to, co čtenář potřebuje hned. Všechno ostatní se přidává až po načtení obsahu.
</div>

<div data-lang="en">
The core shell keeps only what the reader needs immediately. Everything else arrives after the content is ready.
</div>

### Rules

- use directory sections for logical grouping
- keep code samples close to their explanation
- put performance behavior into dedicated pages
- keep tokens and spacing centralized in the CSS layer
