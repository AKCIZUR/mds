(() => {
  const root = document.documentElement;
  const body = document.body;

  const accentMap = {
    python: ['#8b5cf6', 'rgba(139, 92, 246, 0.16)'],
    py: ['#8b5cf6', 'rgba(139, 92, 246, 0.16)'],
    javascript: ['#f59e0b', 'rgba(245, 158, 11, 0.16)'],
    js: ['#f59e0b', 'rgba(245, 158, 11, 0.16)'],
    typescript: ['#38bdf8', 'rgba(56, 189, 248, 0.16)'],
    ts: ['#38bdf8', 'rgba(56, 189, 248, 0.16)'],
    bash: ['#34d399', 'rgba(52, 211, 153, 0.16)'],
    sh: ['#34d399', 'rgba(52, 211, 153, 0.16)'],
    json: ['#f472b6', 'rgba(244, 114, 182, 0.16)'],
    yaml: ['#60a5fa', 'rgba(96, 165, 250, 0.16)'],
    yml: ['#60a5fa', 'rgba(96, 165, 250, 0.16)'],
    html: ['#fb7185', 'rgba(251, 113, 133, 0.16)'],
    css: ['#22d3ee', 'rgba(34, 211, 238, 0.16)'],
    md: ['#a78bfa', 'rgba(167, 139, 250, 0.16)'],
    text: ['#94a3b8', 'rgba(148, 163, 184, 0.16)'],
  };

  const detectLang = (value) => {
    if (!value) return 'text';
    const lang = String(value).trim().toLowerCase();
    return accentMap[lang] ? lang : (lang.split('-')[0] || 'text');
  };

  const setCodeAccent = () => {
    document.querySelectorAll('pre code[class*="language-"], pre code[class*="lang-"]').forEach((code) => {
      const match = code.className.match(/language-([a-z0-9#+-]+)/i) || code.className.match(/lang-([a-z0-9#+-]+)/i);
      const lang = detectLang(match ? match[1] : '');
      const pre = code.closest('pre');
      if (!pre) return;
      const [accent, glow] = accentMap[lang] || accentMap.text;
      pre.dataset.lang = lang;
      pre.style.setProperty('--code-accent', accent);
      pre.style.setProperty('--code-glow', glow);
    });
  };

  const addCopyButtons = () => {
    document.querySelectorAll('pre').forEach((pre) => {
      if (pre.dataset.copyReady === '1') return;
      pre.dataset.copyReady = '1';

      const code = pre.querySelector('code');
      if (!code) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = 'Copy';

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          button.textContent = 'Copied';
          window.setTimeout(() => (button.textContent = 'Copy'), 1200);
        } catch {
          button.textContent = 'Failed';
          window.setTimeout(() => (button.textContent = 'Copy'), 1200);
        }
      });

      pre.appendChild(button);
    });
  };

  const addLazyLoading = () => {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
    document.querySelectorAll('iframe:not([loading])').forEach((iframe) => {
      iframe.loading = 'lazy';
    });
  };

  const setupLanguageSwitcher = () => {
    if (document.querySelector('[data-lang-switcher]')) return;

    const current = location.pathname.replace(/\/+/g, '/');
    const isEnglish = /^\/en(\/|$)/.test(current);
    const targetCs = isEnglish ? current.replace(/^\/en/, '') || '/' : current || '/';
    const targetEn = isEnglish
      ? current || '/en/'
      : (current === '/' ? '/en/' : `/en${current.startsWith('/') ? '' : '/'}${current}`);

    const switcher = document.createElement('div');
    switcher.setAttribute('data-lang-switcher', '');
    switcher.setAttribute('aria-label', 'Language switcher');
    switcher.innerHTML = `
      <button type="button" data-lang="cs" aria-pressed="${String(!isEnglish)}">CZ</button>
      <button type="button" data-lang="en" aria-pressed="${String(isEnglish)}">EN</button>
    `;

    const navigate = (url, lang) => {
      localStorage.setItem('mds-lang', lang);
      location.assign(url);
    };

    switcher.querySelector('[data-lang="cs"]').addEventListener('click', () => navigate(targetCs, 'cs'));
    switcher.querySelector('[data-lang="en"]').addEventListener('click', () => navigate(targetEn, 'en'));
    document.body.appendChild(switcher);
  };

  const setupSkeleton = () => {
    if (document.querySelector('[data-page-skeleton]')) return;

    const skeleton = document.createElement('div');
    skeleton.setAttribute('data-page-skeleton', '');
    skeleton.innerHTML = `
      <div class="skeleton-shell" aria-hidden="true">
        <div class="skeleton-row">
          <div class="skeleton-block is-lg"></div>
          <div class="skeleton-block is-md"></div>
          <div class="skeleton-block is-sm"></div>
        </div>
        <div class="skeleton-grid">
          <div class="skeleton-card">
            <div class="skeleton-block"></div>
            <div class="skeleton-block"></div>
            <div class="skeleton-ghost"></div>
          </div>
          <div class="skeleton-card">
            <div class="skeleton-block is-md"></div>
            <div class="skeleton-block is-sm"></div>
            <div class="skeleton-ghost"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(skeleton);

    const hide = () => skeleton.classList.add('is-hidden');
    if (document.readyState === 'complete') {
      requestAnimationFrame(() => requestAnimationFrame(hide));
    } else {
      window.addEventListener('load', () => requestAnimationFrame(hide), { once: true });
    }
  };

  const setupSmoothWheel = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = null;
    const friction = 0.09;

    const tick = () => {
      current += (target - current) * friction;
      const diff = Math.abs(target - current);
      window.scrollTo(0, current);
      if (diff > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, target);
        raf = null;
      }
    };

    window.addEventListener('wheel', (event) => {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaY) < 10) return;
      event.preventDefault();
      target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, target + event.deltaY * 0.9));
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: false });
  };

  const enhanceAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const removeLoadingState = () => {
    root.classList.add('is-ready');
    body?.classList.add('is-ready');
  };

  const init = () => {
    setCodeAccent();
    addCopyButtons();
    addLazyLoading();
    setupLanguageSwitcher();
    setupSkeleton();
    enhanceAnchors();
    setupSmoothWheel();
    removeLoadingState();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('pageshow', () => {
    setCodeAccent();
    addCopyButtons();
    addLazyLoading();
  });
})();
