(function () {
  function componentPlugin(hook, vm) {
    hook.beforeEach(function (markdown) {
      console.log("plugin beforeEach executou");
      return processComponents(markdown, vm);
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(componentPlugin);
})();