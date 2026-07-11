window.vccRenderMermaid = function () {
  document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
    const pre = code.parentElement;
    const box = document.createElement('div');
    box.className = 'vcc-card';
    box.innerHTML = '<strong>Mermaid diagram</strong><pre style="white-space:pre-wrap;margin-top:.75rem;">' +
      code.textContent.replace(/</g, '&lt;') + '</pre>';
    pre.replaceWith(box);
  });
};
