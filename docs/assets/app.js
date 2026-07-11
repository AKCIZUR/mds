(() => {
  const STORAGE_KEY = 'ui-language';

  const createSplash = () => {
    const splash = document.createElement('div');
    splash.className = 'app-splash';
    splash.innerHTML = `
      <div class="app-splash__panel">
        <div class="app-splash__row">
          <div class="skeleton skeleton-line long"></div>
          <div class="skeleton skeleton-line medium"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>`;
    document.documentElement.classList.add('app-shell-loading');
    document.body.appendChild(splash);
    window.setTimeout(() => {
      splash.classList.add('is-hidden');
      document.documentElement.classList.remove('app-shell-loading');
      window.setTimeout(() => splash.remove(), 260);
    }, 180);
  };
  const SUPPORTED = ['cs', 'en'];

  const readStoredLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const writeStoredLang = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      /* ignore storage failures */
    }
  };

  const detectInitialLang = () => {
    const saved = readStoredLang();
    if (SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || navigator.userLanguage || 'cs').toLowerCase();
    return nav.startsWith('en') ? 'en' : 'cs';
  };

  const setLang = (lang) => {
    const next = SUPPORTED.includes(lang) ? lang : 'cs';
    document.documentElement.dataset.uiLang = next;
    writeStoredLang(next);
    document.querySelectorAll('[data-lang-button]').forEach((btn) => {
      const active = btn.dataset.langButton === next;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  const buildLanguageToggle = () => {
    if (document.querySelector('[data-ui-language-toggle]')) return;

    const toggle = document.createElement('div');
    toggle.className = 'lang-toggle';
    toggle.setAttribute('data-ui-language-toggle', 'true');
    toggle.setAttribute('role', 'group');
    toggle.setAttribute('aria-label', 'Přepínač jazyka');

    toggle.innerHTML = `
      <button type="button" data-lang-button="cs" aria-pressed="false">CZ</button>
      <button type="button" data-lang-button="en" aria-pressed="false">EN</button>
    `;

    toggle.addEventListener('click', (event) => {
      const button = event.target.closest('[data-lang-button]');
      if (!button) return;
      setLang(button.dataset.langButton);
    });

    document.body.appendChild(toggle);
  };

  const addCopyButtons = () => {
    const blocks = document.querySelectorAll('.md-typeset pre');
    blocks.forEach((pre) => {
      const wrapper = pre.closest('.highlight') || pre.parentElement;
      if (!wrapper || wrapper.dataset.copyReady === 'true' || wrapper.classList.contains('code-card') || wrapper.closest('.code-card')) return;
      wrapper.dataset.copyReady = 'true';

      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';
      toolbar.innerHTML = `
        <span class="code-language">${(pre.querySelector('code')?.className || 'Code').replace(/^language-/, '')}</span>
        <div class="code-actions">
          <button type="button" class="copy-button">Copy</button>
        </div>
      `;

      const host = document.createElement('div');
      host.className = 'code-card';
      wrapper.parentNode.insertBefore(host, wrapper);
      host.appendChild(toolbar);
      host.appendChild(wrapper);

      const copyButton = toolbar.querySelector('.copy-button');
      copyButton.addEventListener('click', async () => {
        const code = pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          copyButton.textContent = 'Copied';
          copyButton.classList.add('is-active');
          window.setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('is-active');
          }, 1200);
        } catch (error) {
          copyButton.textContent = 'Failed';
          window.setTimeout(() => { copyButton.textContent = 'Copy'; }, 1200);
        }
      });
    });
  };

  const enhanceImages = () => {
    document.querySelectorAll('.md-typeset img').forEach((img) => {
      img.loading = img.loading || 'lazy';
      img.decoding = img.decoding || 'async';
    });
  };

  const smoothAnchorScrolling = () => {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const header = document.querySelector('.md-header');
      const offset = (header?.offsetHeight || 0) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    });
  };

  const boot = () => {
    createSplash();
    document.documentElement.dataset.uiLang = detectInitialLang();
    buildLanguageToggle();
    setLang(document.documentElement.dataset.uiLang);
    addCopyButtons();
    enhanceImages();
    smoothAnchorScrolling();
    window.setTimeout(() => {
      document.documentElement.classList.add('is-ready');
    }, 60);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
