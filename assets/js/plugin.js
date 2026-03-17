// (function () {
//   function componentPlugin(hook, vm) {
//     hook.beforeEach(function (markdown) {
//       console.log("plugin beforeEach executou");
//       return processComponents(markdown, vm);
//     });
//   }

//   window.$docsify = window.$docsify || {};
//   window.$docsify.plugins = (window.$docsify.plugins || []).concat(componentPlugin);
// })();

(function () {

  function componentPlugin(hook, vm) {

    hook.beforeEach(function (markdown) {
      return processComponents(markdown, vm);
    });

    hook.doneEach(function () {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ]
        });
      }
    });

  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(componentPlugin);

})();