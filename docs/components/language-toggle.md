# Language toggle

<div class="lang-switch" data-lang-switch>
  <button type="button" data-switch-to="cs">CZ</button>
  <button type="button" data-switch-to="en">EN</button>
</div>

<div data-lang="cs">
Přepínač mění viditelný text napříč stránkou a pamatuje si poslední volbu v prohlížeči.
</div>

<div data-lang="en">
The toggle changes visible text across the page and remembers the last choice in the browser.
</div>

## Behavior

- visible in the top shell and reusable inside content
- accessible via keyboard
- stores language in localStorage
- falls back to browser language on first load
- updates instantly without a full page reload
