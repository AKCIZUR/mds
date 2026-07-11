(function () {
  const langPairs = [
    ['cs', 'en'],
    ['en', 'cs'],
  ];

  const languageLabels = {
    cs: 'Čeština',
    en: 'English',
  };

  const icon = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5l7 7-7 7M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  function currentLanguage() {
    const match = window.location.pathname.match(/\/(cs|en)\//);
    return match ? match[1] : null;
  }

  function targetUrl(nextLang) {
    const path = window.location.pathname;
    if (path === '/' || path === '') return `/${nextLang}/`;
    const current = currentLanguage();
    if (!current) return `/${nextLang}/`;
    return path.replace(`/${current}/`, `/${nextLang}/`);
  }

  function setLanguageSwitcher() {
    const current = currentLanguage() || 'cs';
    const switcher = document.createElement('div');
    switcher.className = 'shd-topbar';
    switcher.innerHTML = `
      <a class="shd-topbar__brand" href="/">
        ${icon}
        <span>ShadDocs Dark</span>
      </a>
      <div class="shd-lang-switcher" role="group" aria-label="Language switcher">
        <a href="${targetUrl('cs')}" class="${current === 'cs' ? 'is-active' : ''}" data-lang="cs">CZ</a>
        <a href="${targetUrl('en')}" class="${current === 'en' ? 'is-active' : ''}" data-lang="en">EN</a>
      </div>
    `;
    document.body.appendChild(switcher);
  }

  function enhanceCodeBlocks() {
    const blocks = Array.from(document.querySelectorAll('div.highlight, pre code'));
    blocks.forEach((node) => {
      const highlight = node.classList.contains('highlight') ? node : node.closest('.highlight');
      if (!highlight || highlight.dataset.shdEnhanced === '1') return;
      highlight.dataset.shdEnhanced = '1';

      const code = highlight.querySelector('code') || highlight.querySelector('pre > code') || highlight.querySelector('pre');
      if (!code) return;

      const classes = Array.from(code.classList);
      const langClass = classes.find((c) => c.startsWith('language-')) || 'language-text';
      const lang = langClass.replace('language-', '').toLowerCase();
      const filename = code.getAttribute('data-filename') || code.getAttribute('title') || '';

      const shell = document.createElement('div');
      shell.className = `code-shell ${langClass}`;
      shell.innerHTML = `
        <div class="code-shell__bar">
          <div class="code-shell__meta">
            <span class="code-shell__dot" aria-hidden="true"></span>
            <span class="code-shell__label">${prettyLang(lang)}</span>
            ${filename ? `<span class="code-shell__filename">${escapeHtml(filename)}</span>` : ''}
          </div>
          <div class="code-shell__actions">
            <button type="button" data-action="copy">Copy</button>
            <button type="button" data-action="wrap">Wrap</button>
            <button type="button" data-action="collapse">Collapse</button>
          </div>
        </div>
        <div class="code-shell__body"></div>
      `;

      const pre = code.closest('pre') || highlight.querySelector('pre');
      const body = shell.querySelector('.code-shell__body');
      if (pre) {
        pre.parentNode.replaceChild(shell, pre);
        body.appendChild(pre);
      } else {
        const existing = highlight.querySelector('pre');
        if (existing) {
          existing.parentNode.removeChild(existing);
          body.appendChild(existing);
          highlight.parentNode.replaceChild(shell, highlight);
        }
      }

      shell.addEventListener('click', async (event) => {
        const btn = event.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        if (action === 'copy') {
          const text = code.innerText;
          try {
            await navigator.clipboard.writeText(text);
            const original = btn.textContent;
            btn.textContent = 'Copied ✓';
            setTimeout(() => (btn.textContent = original), 1400);
          } catch {
            const original = btn.textContent;
            btn.textContent = 'Copy failed';
            setTimeout(() => (btn.textContent = original), 1400);
          }
        }
        if (action === 'wrap') shell.classList.toggle('is-wrapped');
        if (action === 'collapse') shell.classList.toggle('is-collapsed');
      });
    });
  }

  function prettyLang(lang) {
    const map = {
      ts: 'TypeScript',
      typescript: 'TypeScript',
      js: 'JavaScript',
      javascript: 'JavaScript',
      python: 'Python',
      bash: 'Bash',
      sh: 'Shell',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      vue: 'Vue',
      md: 'Markdown',
    };
    return map[lang] || lang.toUpperCase();
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[ch]));
  }

  function addSkeleton() {
    const wrap = document.createElement('div');
    wrap.className = 'page-skeleton';
    wrap.innerHTML = `
      <div class="skel skel--header"></div>
      <div class="skel skel--hero"></div>
      <div class="shd-grid">
        <div class="skel skel--card"></div>
        <div class="skel skel--card"></div>
        <div class="skel skel--code" style="grid-column: span 12"></div>
      </div>
    `;
    document.body.appendChild(wrap);
  }

  function removeLoading() {
    document.documentElement.classList.remove('is-loading');
  }

  function lazyDecorations() {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      if (!img.closest('.md-header')) img.loading = 'lazy';
    });
  }

  function smoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', () => {
        const id = decodeURIComponent(a.getAttribute('href').slice(1));
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    addSkeleton();
    setLanguageSwitcher();
    enhanceCodeBlocks();
    lazyDecorations();
    smoothAnchors();
  });

  window.addEventListener('load', () => {
    setTimeout(removeLoading, 140);
  });
})();
