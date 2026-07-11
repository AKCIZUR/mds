(() => {
  const APP_BASE = new URL('.', document.currentScript?.src || window.location.href);
  const state = { items: [], ready: false };

  const escape = (s) => String(s).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  const currentLang = () => {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/cs/')) return 'cs';
    return 'cs';
  };

  const langLink = (target) => {
    const path = window.location.pathname;
    if (path.includes('/en/')) return path.replace('/en/', `/${target}/`);
    if (path.includes('/cs/')) return path.replace('/cs/', `/${target}/`);
    return `/${target}/index/`;
  };

  const loadIndex = async () => {
    if (state.ready) return;
    const res = await fetch(new URL('../json/search-index.json', APP_BASE), { cache: 'no-store' });
    state.items = await res.json();
    state.ready = true;
  };

  const ensureToolbar = () => {
    if (document.querySelector('.vcc-toolbar')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'vcc-toolbar';
    toolbar.innerHTML = `
      <a class="vcc-pill" href="${langLink('cs')}">CZ</a>
      <a class="vcc-pill" href="${langLink('en')}">EN</a>
      <button class="vcc-pill" type="button" data-palette>Ctrl+K</button>
    `;
    document.body.appendChild(toolbar);
    toolbar.querySelector('[data-palette]').addEventListener('click', openPalette);
  };

  const ensurePalette = () => {
    if (window.__vccPalette) return window.__vccPalette;
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

      results.innerHTML = filtered.length
        ? filtered.map(item => `
            <div class="vcc-result" data-href="${escape(item.href)}">
              <strong>${escape(item.title)}</strong>
              <small>${escape(item.summary)}</small>
            </div>`).join('')
        : '<div class="vcc-result">Nic nenalezeno.</div>';

      results.querySelectorAll('[data-href]').forEach(node => {
        node.addEventListener('click', () => location.href = node.dataset.href);
      });
    };

    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePalette();
      if (e.key === 'Enter') {
        const first = results.querySelector('[data-href]');
        if (first) location.href = first.dataset.href;
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    window.__vccPalette = { modal, input, render };
    return window.__vccPalette;
  };

  const openPalette = async () => {
    await loadIndex();
    const palette = ensurePalette();
    palette.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    palette.input.focus();
    palette.render();
  };

  const closePalette = () => {
    if (!window.__vccPalette) return;
    window.__vccPalette.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const setupSkeleton = () => {
    document.documentElement.classList.add('vcc-skeleton');
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('vcc-skeleton');
      document.documentElement.classList.add('vcc-loaded');
    });
  };

  const setupLazy = () => {
    document.querySelectorAll('img:not([loading])').forEach(img => img.loading = 'lazy');
    document.querySelectorAll('iframe:not([loading])').forEach(frame => frame.loading = 'lazy');
  };

  const bootstrap = async () => {
    setupSkeleton();
    ensureToolbar();
    await loadIndex();
    setupLazy();
    window.vccRenderMermaid?.();
    window.vccRenderOpenAPI?.();

    const observer = new MutationObserver(() => {
      setupLazy();
      window.vccRenderMermaid?.();
      window.vccRenderOpenAPI?.();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
      if (e.key === 'Escape') closePalette();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
