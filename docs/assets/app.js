(() => {
      const STORAGE_KEY = 'ui-language';
      const SUPPORTED = ['cs', 'en'];

      const languagePalette = {
        ts: 'blue',
        tsx: 'blue',
        js: 'amber',
        jsx: 'amber',
        vue: 'green',
        html: 'orange',
        css: 'cyan',
        scss: 'cyan',
        json: 'violet',
        yaml: 'violet',
        yml: 'violet',
        bash: 'emerald',
        sh: 'emerald',
        shell: 'emerald',
        python: 'gold',
        py: 'gold',
        md: 'slate',
        markdown: 'slate',
        text: 'slate',
        plain: 'slate',
      };

      const languageLabel = (raw) => {
        const value = String(raw || 'plain').toLowerCase();
        const labelMap = {
          ts: 'TypeScript',
          tsx: 'TypeScript',
          js: 'JavaScript',
          jsx: 'JavaScript',
          vue: 'Vue',
          html: 'HTML',
          css: 'CSS',
          scss: 'SCSS',
          json: 'JSON',
          yaml: 'YAML',
          yml: 'YAML',
          bash: 'Bash',
          sh: 'Bash',
          shell: 'Shell',
          python: 'Python',
          py: 'Python',
          md: 'Markdown',
          markdown: 'Markdown',
          text: 'Text',
          plain: 'Code',
        };
        return labelMap[value] || value.toUpperCase();
      };

      const createSplash = () => {
        const splash = document.createElement('div');
        splash.className = 'app-splash';
        splash.innerHTML = `
          <div class="app-splash__panel">
            <div class="app-splash__header">
              <div class="skeleton skeleton-line long"></div>
              <div class="skeleton skeleton-line medium"></div>
            </div>
            <div class="app-splash__body">
              <div class="skeleton-grid">
                <div class="skeleton-card">
                  <div class="skeleton skeleton-line long"></div>
                  <div class="skeleton skeleton-line medium"></div>
                  <div class="skeleton skeleton-line short"></div>
                </div>
                <div class="skeleton-card">
                  <div class="skeleton skeleton-line long"></div>
                  <div class="skeleton skeleton-line medium"></div>
                  <div class="skeleton skeleton-line short"></div>
                </div>
              </div>
            </div>
          </div>`;
        document.documentElement.classList.add('app-shell-loading');
        document.body.appendChild(splash);
        window.setTimeout(() => {
          splash.classList.add('is-hidden');
          document.documentElement.classList.remove('app-shell-loading');
          window.setTimeout(() => splash.remove(), 220);
        }, 140);
      };

      const readStoredLang = () => {
        try {
          return localStorage.getItem(STORAGE_KEY);
        } catch {
          return null;
        }
      };

      const writeStoredLang = (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, value);
        } catch {
          /* ignore */
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

      const enhanceCodeBlocks = () => {
        const blocks = Array.from(document.querySelectorAll('.md-typeset pre'));

        blocks.forEach((pre) => {
          if (pre.closest('.code-card')) return;
          const code = pre.querySelector('code');
          if (!code) return;

          const existingWrapper = pre.parentElement;
          if (existingWrapper && existingWrapper.classList.contains('highlight') && existingWrapper.closest('.md-typeset') === null) return;

          const codeClass = Array.from(code.classList).find((className) => className.startsWith('language-')) || 'language-plain';
          const rawLang = codeClass.replace('language-', '').toLowerCase();
          const label = languageLabel(rawLang);
          const accent = languagePalette[rawLang] || 'slate';
          const lines = Math.max(1, code.textContent.replace(/
+$/u, '').split('
').length);

          const figure = document.createElement('figure');
          figure.className = 'code-card';
          figure.dataset.lang = rawLang;
          figure.dataset.accent = accent;

          const toolbar = document.createElement('figcaption');
          toolbar.className = 'code-toolbar';
          toolbar.innerHTML = `
            <div class="code-toolbar__left">
              <span class="code-language">${label}</span>
              <span class="code-pill">${lines} lines</span>
            </div>
            <div class="code-actions">
              <button type="button" class="code-action code-action--wrap" aria-pressed="false">Wrap</button>
              <button type="button" class="code-action code-action--copy">Copy</button>
            </div>
          `;

          pre.parentNode.insertBefore(figure, pre);
          figure.appendChild(toolbar);
          figure.appendChild(pre);

          const wrapButton = toolbar.querySelector('.code-action--wrap');
          const copyButton = toolbar.querySelector('.code-action--copy');

          const syncWrap = (enabled) => {
            figure.classList.toggle('is-wrapped', enabled);
            wrapButton.classList.toggle('is-active', enabled);
            wrapButton.setAttribute('aria-pressed', String(enabled));
            wrapButton.textContent = enabled ? 'Wrap on' : 'Wrap';
          };

          syncWrap(false);

          wrapButton.addEventListener('click', () => {
            syncWrap(!figure.classList.contains('is-wrapped'));
          });

          copyButton.addEventListener('click', async () => {
            const text = code.innerText;
            try {
              await navigator.clipboard.writeText(text);
              const labelText = copyButton.textContent;
              copyButton.textContent = 'Copied';
              copyButton.classList.add('is-active');
              window.setTimeout(() => {
                copyButton.textContent = labelText;
                copyButton.classList.remove('is-active');
              }, 1100);
            } catch {
              const labelText = copyButton.textContent;
              copyButton.textContent = 'Failed';
              window.setTimeout(() => {
                copyButton.textContent = labelText;
              }, 1100);
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

      const revealOnScroll = () => {
        const targets = document.querySelectorAll('.feature-card, .skeleton-card, .code-card, .wireframe-frame, .markup-hero, .md-typeset table, .md-typeset .admonition');
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          });
        }, { threshold: 0.12 });
        targets.forEach((target) => io.observe(target));
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
        enhanceCodeBlocks();
        enhanceImages();
        revealOnScroll();
        smoothAnchorScrolling();
        window.setTimeout(() => document.documentElement.classList.add('is-ready'), 60);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
      } else {
        boot();
      }
    })();
