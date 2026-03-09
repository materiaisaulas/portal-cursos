registerComponent(function(markdown, vm) {

  function compile(content) {
    return compileMarkdown(vm, content);
  }

  markdown = markdown.replace(
    /(?:^|\n):::exercise\n([\s\S]*?):::/g,
    (_, content) => {
      docCounters.exercise++;
      return `
<div class="doc-exercise">
<strong>Exercício ${docCounters.exercise}</strong>
<div class="doc-exercise-text">
${compile(content)}
</div>
</div>`;
    }
  );

  markdown = markdown.replace(
    /(?:^|\n):::question\n([\s\S]*?):::/g,
    (_, content) => {
      docCounters.exercise++;
      return `
<div class="doc-question">
<span class="doc-question-number">(${docCounters.exercise}).</span>
<div class="doc-question-text">
<div class="doc-question-body">
${compile(content)}
</div>
</div>
</div>`;
    }
  );

  return markdown;

});