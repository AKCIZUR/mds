(function () {
  const mount = () => {
    if (document.querySelector('.skeleton-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'skeleton-overlay';
    overlay.innerHTML = `
      <div style="padding: 18vh 0 0;">
        <div class="skeleton-bar wide"></div>
        <div class="skeleton-bar"></div>
        <div class="skeleton-bar short"></div>
        <div class="skeleton-bar"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  };

  if (document.readyState === 'loading') {
    mount();
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
