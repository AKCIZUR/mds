window.vccRenderOpenAPI = function () {
  document.querySelectorAll('[data-openapi-src]').forEach(async (mount) => {
    const src = mount.getAttribute('data-openapi-src');
    mount.innerHTML = '<div class="vcc-card"><strong>OpenAPI</strong><p class="vcc-muted">Loading specification…</p></div>';
    try {
      const text = await fetch(new URL(src, window.location.href)).then(r => r.text());
      mount.innerHTML = '<div class="vcc-openapi"><pre style="margin:0;padding:1rem;white-space:pre-wrap;overflow:auto;height:72vh;">' +
        text.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre></div>';
    } catch (err) {
      mount.innerHTML = '<div class="vcc-card">OpenAPI spec could not be loaded.</div>';
    }
  });
};
