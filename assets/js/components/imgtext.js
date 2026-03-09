registerComponent(function(markdown, vm) {

  return markdown.replace(
    /(?:^|\n):::imgtext\s*([^\n]*)\n([\s\S]*?):::/g,
    function (_, img, content) {

      img = img.trim();

      if (!img) {
        const lines = content.trim().split("\n");
        img = lines.shift();
        content = lines.join("\n");
      }

      content = compileMarkdown(vm, content);

      return `
<div class="doc-image-text">

<img src="${img}">

<div class="doc-image-text-content">
${content}
</div>

</div>
`;
    }
  );

});