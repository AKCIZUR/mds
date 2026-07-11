(() => {
  const APP_BASE = new URL('.', document.currentScript?.src || window.location.href);
  const state = { items: [], versions: [], active: 0 };

  const esc = (s) => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const currentPath = () => window.location.pathname.replace(/index\.html?$/, '');

  const langLinks = () => {
    const path = currentPath();
    const isCS = /\/cs\//.test(path);
    const isEN = /\/en\//.test(path);
    const cs = isEN ? path.replace('/en/', '/cs/') : (isCS ? path : '/cs/');
    const en = isCS ? path.replace('/cs/', '/en/') : (isEN ? path : '/en/');
    return { cs, en };
  };

  const createToolbar = () => {
    const toolbar = document.createElement('div');
    toolbar.className = 'vcc-toolbar';
    const { cs, en } = langLinks();
    toolbar.innerHTML = `
      <a class="vcc-pill" href="${esc(cs)}">CZ</a>
      <a class="vcc-pill" href="${esc(en)}">EN</a>
      <select class="vcc-version-select" aria-label="Version"></select>
      <button class="vcc-theme-trigger" type="button" aria-label="Toggle theme">Theme</button>
      <button class="vcc-palette-trigger" type="button" aria-label="Open command palette">Ctrl+K</button>
    `;
    document.body.appendChild(toolbar);

    const select = toolbar.querySelector('.vcc-version-select');
    state.versions.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.path;
      opt.textContent = v.label;
      select.appendChild(opt);
    });
    select.addEventListener('change', () => {
      window.location.href = select.value;
    });

    toolbar.querySelector('.vcc-theme-trigger').addEventListener('click', () => {
      const doc = document.documentElement;
      const dark = doc.getAttribute('data-md-color-scheme') === 'slate';
      doc.setAttribute('data-md-color-scheme', dark ? 'default' : 'slate');
      localStorage.setItem('vcc-theme', dark ? 'default' : 'slate');
    });

    toolbar.querySelector('.vcc-palette-trigger').addEventListener('click', openPalette);
  };

  const createPalette = () => {
    const modal = document.createElement('div');
    modal.className = 'vcc-search-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="vcc-search-card" role="dialog" aria-modal="true" aria-label="Command palette">
        <header>
          <span>⌘</span>
          <input id="vcc-search-input" type="search" placeholder="Hledej v dokumentaci…" autocomplete="off" />
          <span class="vcc-muted">Ctrl+K</span>
        </header>
        <div class="vcc-results" id="vcc-results"></div>
      </div>`;
    document.body.appendChild(modal);

    const input = modal.querySelector('#vcc-search-input');
    const results = modal.querySelector('#vcc-results');

    const render = () => {
      const q = input.value.trim().toLowerCase();
      const filtered = !q
        ? state.items.slice(0, 12)
        : state.items.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.summary.toLowerCase().includes(q) ||
            item.tags.join(' ').toLowerCase().includes(q)
          ).slice(0, 12);

      results.innerHTML = filtered.map((item, i) => `
        <div class="vcc-result ${i === state.active ? 'is-active' : ''}" data-href="${esc(item.href)}">
          <strong>${esc(item.title)}</strong>
          <small>${esc(item.summary)}</small>
        </div>`).join('') || '<div class="vcc-result">Nic nenalezeno.</div>';

      results.querySelectorAll('.vcc-result[data-href]').forEach(el => {
        el.addEventListener('click', () => location.href = el.dataset.href);
      });
    };

    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePalette();
      if (e.key === 'Enter') {
        const first = results.querySelector('.vcc-result[data-href]');
        if (first) location.href = first.dataset.href;
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    window.__vccPalette = { modal, input, render };
    render();
  };

  const openPalette = () => {
    if (!window.__vccPalette) createPalette();
    window.__vccPalette.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.__vccPalette.input.focus();
    window.__vccPalette.render();
  };

  const closePalette = () => {
    if (!window.__vccPalette) return;
    window.__vccPalette.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const loadIndexes = async () => {
    const [items, versions] = await Promise.all([
      fetch(new URL('../json/search-index.json', APP_BASE), { cache: 'no-store' }).then(r => r.json()),
      fetch(new URL('../json/versions.json', APP_BASE), { cache: 'no-store' }).then(r => r.json()).catch(() => [])
    ]);
    state.items = items;
    state.versions = versions;
  };

  const setupLazyLoading = () => {
    document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
    document.querySelectorAll('iframe:not([loading])').forEach(frame => frame.loading = 'lazy');
  };

  const setupSkeleton = () => {
    document.documentElement.classList.add('vcc-skeleton');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('vcc-skeleton');
      document.documentElement.classList.add('vcc-loaded');
    });
  };

  const setupTheme = () => {
    const saved = localStorage.getItem('vcc-theme');
    if (saved) document.documentElement.setAttribute('data-md-color-scheme', saved);
  };

  const setupKeyboard = () => {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
      if (e.key === 'Escape') closePalette();
    });
  };

  const setEditLink = () => {
    const base = (window.VCC_META && VCC_META.editBase) || '';
    const edit = document.querySelector('.md-content a[href*="edit/main"]');
    if (edit && base) {
      // keep native Material button, no-op placeholder for optional future routing
    }
  };

  const bootstrap = async () => {
    setupSkeleton();
    setupTheme();
    await loadIndexes();
    createToolbar();
    createPalette();
    setupKeyboard();
    setupLazyLoading();
    setEditLink();
    window.vccRenderMermaid?.();
    window.vccRenderOpenAPI?.();
    const observer = new MutationObserver(() => {
      setupLazyLoading();
      window.vccRenderMermaid?.();
      window.vccRenderOpenAPI?.();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
