(() => {
  const STORAGE_KEY = 'site-lang';
  const DEFAULT_LANG = (() => {
    const browser = (navigator.language || 'en').toLowerCase();
    return browser.startsWith('cs') ? 'cs' : 'en';
  })();

  const setLanguage = (lang) => {
    const normalized = lang === 'cs' ? 'cs' : 'en';
    document.documentElement.dataset.lang = normalized;
    document.documentElement.dataset.langReady = 'true';
    localStorage.setItem(STORAGE_KEY, normalized);

    document.querySelectorAll('[data-lang-switch]').forEach((switcher) => {
      switcher.querySelectorAll('button[data-switch-to]').forEach((button) => {
        const active = button.dataset.switchTo === normalized;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    });
  };

  const initLanguageToggle = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setLanguage(saved || DEFAULT_LANG);

    document.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-switch-to]');
      if (!button) return;
      setLanguage(button.dataset.switchTo);
    });
  };

  const initReveal = () => {
    const candidates = document.querySelectorAll('.feature-card, .skeleton-card, .wireframe-link');
    if (!('IntersectionObserver' in window) || !candidates.length) return;

    candidates.forEach((el) => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    candidates.forEach((el) => observer.observe(el));
  };

  const enhanceCopyButtons = () => {
    document.querySelectorAll('pre > code').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.enhanced === 'true') return;
      pre.dataset.enhanced = 'true';
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initReveal();
    enhanceCopyButtons();
  });
})();
