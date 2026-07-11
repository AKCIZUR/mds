(function () {
  const removeSkeleton = () => {
    const overlay = document.querySelector('.skeleton-overlay');
    if (overlay) overlay.classList.add('is-hidden');
    window.setTimeout(() => overlay?.remove(), 300);
  };

  if (document.readyState === 'complete') {
    removeSkeleton();
  } else {
    window.addEventListener('load', removeSkeleton, { once: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js-ready');

    document.querySelectorAll('img:not([loading])').forEach((img) => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });

    document.querySelectorAll('iframe:not([loading])').forEach((iframe) => {
      iframe.setAttribute('loading', 'lazy');
    });
  });
})();
