window.vccRenderOpenAPI = function () {
  const mount = document.querySelector('[data-openapi-src]');
  if (!mount) return;
  const src = mount.getAttribute('data-openapi-src');
  fetch(new URL(src, window.location.href))
    .then(r => r.text())
    .then(text => {
      mount.innerHTML = '<div class="vcc-openapi"><pre style="margin:0;padding:1rem;white-space:pre-wrap;overflow:auto;height:72vh;">' +
        text.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre></div>';
    })
    .catch(() => {
      mount.innerHTML = '<div class="vcc-card">OpenAPI spec could not be loaded.</div>';
    });
};
