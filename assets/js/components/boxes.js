registerComponent(function(markdown, vm) {

  function compile(content) {
    return compileMarkdown(vm, content);
  }

  markdown = markdown.replace(
    /(?:^|\n):::tip\n([\s\S]*?):::/g,
    (_, content) => `
<div class="doc-tip">
<strong>Dica</strong>
<div class="doc-tip-text">
${compile(content)}
</div>
</div>`
  );

  markdown = markdown.replace(
    /(?:^|\n):::warning\n([\s\S]*?):::/g,
    (_, content) => `
<div class="doc-warning">
<strong>Atenção</strong>
<div class="doc-warning-text">
${compile(content)}
</div>
</div>`
  );

  markdown = markdown.replace(
    /(?:^|\n):::info\n([\s\S]*?):::/g,
    (_, content) => `
<div class="doc-info">
<strong>Informação</strong>
<div class="doc-info-text">
${compile(content)}
</div>
</div>`
  );

  return markdown;

});