window.vccRenderOpenAPI = function () {
  const mount = document.querySelector('[data-openapi-src]');
  if (!mount) return;
  const src = mount.getAttribute('data-openapi-src');
  mount.innerHTML = `
    <div class="vcc-card">
      <strong>OpenAPI</strong>
      <p class="vcc-muted">Spec je připravená jako statický YAML soubor. V produkci se sem dá napojit Redoc nebo Swagger UI.</p>
      <pre style="white-space:pre-wrap;overflow:auto;max-height:60vh;">Loading ${src}…</pre>
    </div>`;
  fetch(new URL(src, window.location.href)).then(r => r.text()).then(text => {
    mount.innerHTML = `<div class="vcc-openapi"><pre style="margin:0;padding:1rem;white-space:pre-wrap;overflow:auto;height:72vh;">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre></div>`;
  }).catch(() => {
    mount.innerHTML = '<div class="vcc-card">OpenAPI spec could not be loaded.</div>';
  });
};
