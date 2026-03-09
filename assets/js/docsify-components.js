// (function () {

//   function componentPlugin(hook, vm) {

//     let counters = {
//       algorithm: 0,
//       exercise: 0,
//       example: 0,
//       definition: 0
//     };

//     function compile(content) {
//       return vm.compiler.compile('\n' + content.trim() + '\n');
//     }

//     hook.beforeEach(function (markdown) {

//       /* ===============================
//          IMG + TEXTO
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::imgtext\s*([^\n]*)\n([\s\S]*?):::/g,
//         function (_, img, content) {

//           img = img.trim();

//           if (!img) {
//             const lines = content.trim().split("\n");
//             img = lines.shift();
//             content = lines.join("\n");
//           }

//           content = compile(content);

//           return `
// <div class="doc-image-text">

// <img src="${img}">

// <div class="doc-image-text-content">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          TIP
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::tip\n([\s\S]*?):::/g,
//         function (_, content) {

//           content = compile(content);

//           return `
// <div class="doc-tip">

// <strong>Dica</strong>

// <div class="doc-tip-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          WARNING
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::warning\n([\s\S]*?):::/g,
//         function (_, content) {

//           content = compile(content);

//           return `
// <div class="doc-warning">

// <strong>Atenção</strong>

// <div class="doc-warning-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          INFO
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::info\n([\s\S]*?):::/g,
//         function (_, content) {

//           content = compile(content);

//           return `
// <div class="doc-info">

// <strong>Informação</strong>

// <div class="doc-info-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          DEFINITION
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::definition\n([\s\S]*?):::/g,
//         function (_, content) {

//           counters.definition++;

//           content = compile(content);

//           return `
// <div class="doc-definition">

// <strong>Definição ${counters.definition}</strong>

// <div class="doc-definition-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          EXAMPLE
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::example\n([\s\S]*?):::/g,
//         function (_, content) {

//           counters.example++;

//           content = compile(content);

//           return `
// <div class="doc-example">

// <strong>Exemplo ${counters.example}</strong>

// <div class="doc-example-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//          ALGORITHM
//       =============================== */

//       markdown = markdown.replace(
//         /(?:^|\n):::algorithm\n([\s\S]*?):::/g,
//         function (_, content) {

//           counters.algorithm++;

//           content = compile(content);

//           return `
// <div class="doc-algorithm">

// <strong>Algoritmo ${counters.algorithm}</strong>

// <div class="doc-algorithm-text">
// ${content}
// </div>

// </div>
// `;
//         }
//       );

//       /* ===============================
//    EXERCISE
// =============================== */

// markdown = markdown.replace(
//   /(?:^|\n):::exercise\n([\s\S]*?):::/g,
//   function (_, content) {

//     counters.exercise++;

//     content = compile(content);

//     return `
// <div class="doc-exercise">
// <strong>Exercício ${counters.exercise}</strong>
// <div class="doc-exercise-text">
// ${content}
// </div>
// </div>
// `;
//   }
// );

// /* ===============================
//    QUESTION
// =============================== */

// markdown = markdown.replace(
//   /(?:^|\n):::question\n([\s\S]*?):::/g,
//   function (_, content) {

//     counters.exercise++;

//     content = compile(content);

// return `
// <div class="doc-question">
// <span class="doc-question-number">(${counters.exercise}).</span>
// <div class="doc-question-text">
// <div class="doc-question-body">
// ${content}
// </div>
// </div>

// </div>
// `;
//   }
// );

// return markdown;

//     });


    
//   }

  

//   window.$docsify = window.$docsify || {};
//   window.$docsify.plugins = [].concat(componentPlugin, window.$docsify.plugins || []);

// })();

(function () {

  function componentPlugin(hook, vm) {

    /* ===============================
       CONTADORES
    =============================== */

    let counters = {
      algorithm: { value: 0 },
      exercise: { value: 0 },
      example: { value: 0 },
      definition: { value: 0 }
    };

    /* ===============================
       COMPILAR MARKDOWN
    =============================== */

    function compile(content) {
      return vm.compiler.compile('\n' + content.trim() + '\n');
    }

    /* ===============================
       CRIAR BLOCO GENÉRICO
    =============================== */

    function createBlock(markdown, name, title, counter = null) {

      const regex = new RegExp(`(?:^|\\n):::${name}\\n([\\s\\S]*?):::`, "g");

      return markdown.replace(regex, function (_, content) {

        if (counter) counter.value++;

        content = compile(content);

        const number = counter ? " " + counter.value : "";

        return `
<div class="doc-${name}">
<strong>${title}${number}</strong>

<div class="doc-${name}-text">
${content}
</div>

</div>
`;
      });

    }

    /* ===============================
       PROCESSAR MARKDOWN
    =============================== */

    hook.beforeEach(function (markdown) {

      /* ===============================
         IMG + TEXTO
      =============================== */

      markdown = markdown.replace(
        /(?:^|\n):::imgtext\s*([^\n]*)\n([\s\S]*?):::/g,
        function (_, img, content) {

          img = img.trim();

          if (!img) {
            const lines = content.trim().split("\n");
            img = lines.shift();
            content = lines.join("\n");
          }

          content = compile(content);

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

      /* ===============================
         BLOCOS SIMPLES
      =============================== */

      markdown = createBlock(markdown, "tip", "Dica");
      markdown = createBlock(markdown, "warning", "Atenção");
      markdown = createBlock(markdown, "info", "Informação");

      /* ===============================
         BLOCOS NUMERADOS
      =============================== */

      markdown = createBlock(markdown, "definition", "Definição", counters.definition);
      markdown = createBlock(markdown, "example", "Exemplo", counters.example);
      markdown = createBlock(markdown, "algorithm", "Algoritmo", counters.algorithm);
      markdown = createBlock(markdown, "exercise", "Exercício", counters.exercise);

      /* ===============================
         QUESTION (lista de exercícios)
      =============================== */

      markdown = markdown.replace(
        /(?:^|\n):::question\n([\s\S]*?):::/g,
        function (_, content) {

          counters.exercise.value++;

          content = compile(content);

          return `
<div class="doc-question">

<span class="doc-question-number">(${counters.exercise.value}).</span>

<div class="doc-question-text">

<div class="doc-question-body">
${content}
</div>

</div>

</div>
`;
        }
      );

      return markdown;

    });

  }

  /* ===============================
     REGISTRAR PLUGIN
  =============================== */

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(componentPlugin, window.$docsify.plugins || []);

})();