registerComponent(function(markdown, vm) {

  function compile(content) {
    return compileMarkdown(vm, content);
  }

  markdown = markdown.replace(
    /(?:^|\n):::definition\n([\s\S]*?):::/g,
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
    /(?:^|\n):::example\n([\s\S]*?):::/g,
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
    /(?:^|\n):::algorithm\n([\s\S]*?):::/g,
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

  return markdown;

});