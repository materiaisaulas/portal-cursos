registerComponent(
  function (markdown, vm) {
    function compile(content) {
      return compileMarkdown(
        vm,
        content,
      );
    }

    markdown = markdown.replace(
      /(?:^|\r?\n):::exercise\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
      (_, content) => {
        docCounters.exercise++;
        return `
<div class="doc-exercise">
<strong>Exercício ${docCounters.exercise}</strong>
<div class="doc-exercise-text">
${compile(content)}
</div>
</div>`;
      },
    );

    markdown = markdown.replace(
      /(?:^|\r?\n):::question\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
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
      },
    );

    markdown = markdown.replace(
      /(?:^|\r?\n):::definition(?:\s+(.*))?\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
      (_, title, content) => {
        docCounters.definition++;

        const header = title
          ? title
          : `Definição ${docCounters.definition}`;

        return `
<div class="doc-definition">
<strong>${header}</strong>
<div class="doc-definition-text">
${compile(content)}
</div>
</div>`;
      },
    );

    markdown = markdown.replace(
      /(?:^|\r?\n)\s*:::example\s*\r?\n([\s\S]*?)\r?\n\s*:::(?=\r?\n|$)/g,
      (_, content) => {
        docCounters.example++;
        return `
<div class="doc-example">
<strong>Exemplo ${docCounters.example}</strong>
<div class="doc-example-text">
${compile(content)}
</div>
</div>`;
      },
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
      },
    );

    markdown = markdown.replace(
      /(?:^|\r?\n):::tip\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
      (_, content) => `
<div class="doc-tip">
<div class="doc-tip-text">
${compile(content)}
</div>
</div>`,
    );

    markdown = markdown.replace(
      /(?:^|\n):::note(?:\s+(.*))?\n([\s\S]*?)\n:::\s*(?=\n|$)/g,
      (_, title, content) => `
<div class="doc-note-postit">
  <div class="doc-note-title">${title || "Observação"}</div>
  <div class="doc-note-text">
    ${compile(content)}
  </div>
</div>`,
    );

    markdown = markdown.replace(
      /(?:^|\n):::compare(?:\s+(.*))?\n([\s\S]*?)\n:::/g,
      (_, title, content) => {
        const parts =
          content.split(/\n---\n/);

        const footer = parts.pop();
        const columns = parts;

        const colsHTML = columns
          .map(
            (col) =>
              `<div class="doc-compare-item">${compile(col)}</div>`,
          )
          .join("");

        return `
<div class="doc-compare">

  ${title ? `<div class="doc-compare-title">${title}</div>` : ""}

  <div class="doc-compare-grid">
    ${colsHTML}
  </div>

  <div class="doc-compare-footer">
    ${compile(footer)}
  </div>

</div>
`;
      },
    );

    markdown = markdown.replace(
      /(?:^|\n):::pitfall(?:\s+(.*))?\n([\s\S]*?)\n:::(?=\n|$)/g,
      (_, title, content) => {
        const parts =
          content.split(/\n---\n/);

        const first =
          parts[0]?.trim() || "";
        const second =
          parts[1]?.trim() || "";
        const third =
          parts[2]?.trim() || "";

        const hasImage =
          /!\[.*?\]\(.*?\)/.test(
            second,
          ) || /<img/i.test(second);

        const codeHTML = compile(first);
        const imageHTML = hasImage
          ? compile(second)
          : "";
        const footerHTML = compile(
          hasImage ? third : second,
        );

        return `
<div class="doc-pitfall">
  <div class="doc-pitfall-header">
    <span class="doc-pitfall-icon">⚠</span>
    <span class="doc-pitfall-title">${title || "Atenção"}</span>
  </div>

  <div class="doc-pitfall-body ${hasImage ? "has-image" : "no-image"}">
    <div class="doc-pitfall-code">
      ${codeHTML}
    </div>
    ${
      hasImage
        ? `
    <div class="doc-pitfall-image">
      ${imageHTML}
    </div>
    `
        : ""
    }
  </div>

  <div class="doc-pitfall-footer">
    ${footerHTML}
  </div>
</div>
`;
      },
    );

    markdown = markdown.replace(
      /(?:^|\r?\n):::warning\r?\n([\s\S]*?)\r?\n:::(?=\r?\n|$)/g,
      (_, content) => `
<div class="doc-warning">
<strong>Atenção</strong>
<div class="doc-warning-text">
${compile(content)}
</div>
</div>`,
    );

    return markdown;
  },
);
