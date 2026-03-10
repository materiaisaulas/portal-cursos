registerComponent(function (markdown, vm) {

  function compile(content) {
    return compileMarkdown(vm, content);
  }

  console.log("blocks.js carregado");

  markdown = markdown.replace(
    /(?:^|\r?\n):::definition\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => {
      docCounters.definition++;
      return `
<div class="doc-definition">
<strong>Definição ${docCounters.definition}</strong>
<div class="doc-definition-text">
${compile(content)}
</div>
</div>`;
    }
  );

  markdown = markdown.replace(
    /(?:^|\r?\n):::example\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => {
      docCounters.example++;
      return `
<div class="doc-example">
<strong>Exemplo ${docCounters.example}</strong>
<div class="doc-example-text">
${compile(content)}
</div>
</div>`;
    }
  );

  markdown = markdown.replace(
    /(?:^|\r?\n):::algorithm\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => {
      docCounters.algorithm++;
      return `
<div class="doc-algorithm">
<strong>Algoritmo ${docCounters.algorithm}</strong>
<div class="doc-algorithm-text">
${compile(content)}
</div>
</div>`;
    }
  );

  markdown = markdown.replace(
    /(?:^|\r?\n):::tip\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => `
<div class="doc-tip">
<strong>Dica</strong>
<div class="doc-tip-text">
${compile(content)}
</div>
</div>`
  );

  markdown = markdown.replace(
    /(?:^|\r?\n):::note\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => `
<div class="doc-note">
<strong>Observação</strong>
<div class="doc-note-text">
${compile(content)}
</div>
</div>`
  );

  markdown = markdown.replace(
    /(?:^|\r?\n):::warning\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
    (_, content) => `
<div class="doc-warning">
<strong>Atenção</strong>
<div class="doc-warning-text">
${compile(content)}
</div>
</div>`
  );

  return markdown;

});