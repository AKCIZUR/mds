window.vccRenderMermaid = function () {
  document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'vcc-card';
    wrapper.innerHTML = '<strong>Mermaid diagram</strong><pre style="white-space:pre-wrap;margin-top:.75rem;">' +
      code.textContent.replace(/</g, '&lt;') + '</pre>';
    code.parentElement.replaceWith(wrapper);
  });
};
