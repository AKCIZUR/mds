window.vccRenderMermaid = function () {
  document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
    const pre = code.parentElement;
    const svg = document.createElement('div');
    svg.className = 'vcc-card';
    svg.innerHTML = '<strong>Mermaid diagram</strong><pre style="white-space:pre-wrap;margin-top:.75rem;">' +
      code.textContent.replace(/</g, '&lt;') + '</pre>';
    pre.replaceWith(svg);
  });
};
