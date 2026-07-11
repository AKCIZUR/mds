(() => {
  const STORAGE_KEY = 'site-lang';

  const getDefaultLanguage = () => {
    try {
      const browser = (navigator.language || 'en').toLowerCase();
      return browser.startsWith('cs') ? 'cs' : 'en';
    } catch {
      return 'en';
    }
  };

  const setLanguage = (lang) => {
    const normalized = lang === 'cs' ? 'cs' : 'en';
    document.documentElement.dataset.lang = normalized;
    document.documentElement.dataset.langReady = 'true';

    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch {
      /* storage may be blocked */
    }

    document.querySelectorAll('[data-lang-switch]').forEach((switcher) => {
      switcher.querySelectorAll('button[data-switch-to]').forEach((button) => {
        const active = button.dataset.switchTo === normalized;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    });
  };

  const initLanguageToggle = () => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }

    setLanguage(saved || getDefaultLanguage());

    document.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-switch-to]');
      if (!button) return;
      setLanguage(button.dataset.switchTo);
    });
  };

  const initReveal = () => {
    const candidates = document.querySelectorAll(
      '.feature-card, .skeleton-card, .wireframe-link, .md-typeset .highlight, .md-typeset .codehilite'
    );

    if (!('IntersectionObserver' in window) || !candidates.length) return;

    candidates.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '24px 0px' });

    candidates.forEach((el) => observer.observe(el));
  };

  const initAnchorScrolling = () => {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      const header = document.querySelector('.md-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const offset = Math.max(16, headerHeight + 12);
      const top = window.scrollY + target.getBoundingClientRect().top - offset;

      event.preventDefault();
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  const initCopyHints = () => {
    document.querySelectorAll('pre > code').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.enhanced === 'true') return;
      pre.dataset.enhanced = 'true';
    });
  };

  const onReady = () => {
    initLanguageToggle();
    initReveal();
    initAnchorScrolling();
    initCopyHints();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
})();
