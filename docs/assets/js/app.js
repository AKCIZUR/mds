(() => {
  const APP_BASE = new URL('.', document.currentScript?.src || window.location.href);
  const state = { items: [], active: 0 };

  const escape = (s) => s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const loadIndex = async () => {
    const res = await fetch(new URL('../json/search-index.json', APP_BASE), { cache: 'no-store' });
    state.items = await res.json();
  };

  const createToolbar = () => {
    const toolbar = document.createElement('div');
    toolbar.className = 'vcc-toolbar';
    const path = window.location.pathname;
    const switchLang = (from, to) => path.includes(`/${from}/`) ? path.replace(`/${from}/`, `/${to}/`) : `/${to}/index/`;
    toolbar.innerHTML = `
      <a class="vcc-pill" href="${switchLang('en', 'cs')}">CZ</a>
      <a class="vcc-pill" href="${switchLang('cs', 'en')}">EN</a>
      <button class="vcc-palette-trigger" type="button" aria-label="Open command palette">Ctrl+K</button>
    `;
    document.body.appendChild(toolbar);
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
      const filtered = !q ? state.items.slice(0, 12) : state.items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.join(' ').toLowerCase().includes(q)
      ).slice(0, 12);
      results.innerHTML = filtered.map((item, i) => `
        <div class="vcc-result ${i === state.active ? 'is-active' : ''}" data-href="${escape(item.href)}">
          <strong>${escape(item.title)}</strong>
          <small>${escape(item.summary)}</small>
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

  const setupLazyLoading = () => {
    document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
    document.querySelectorAll('iframe:not([loading])').forEach(frame => frame.loading = 'lazy');
  };

  const setupSkeleton = () => {
    document.documentElement.classList.add('vcc-skeleton');
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('vcc-skeleton');
      document.documentElement.classList.add('vcc-loaded');
    });
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

  const setupMeta = () => {
    const meta = window.VCC_META || {};
    const links = document.querySelectorAll('a[href]');
    links.forEach(a => {
      if (a.getAttribute('href')?.startsWith('/cs/') || a.getAttribute('href')?.startsWith('/en/')) {
        a.dataset.local = 'true';
      }
    });
  };

  const bootstrap = async () => {
    setupSkeleton();
    createToolbar();
    createPalette();
    setupKeyboard();
    setupLazyLoading();
    setupMeta();
    await loadIndex();
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
