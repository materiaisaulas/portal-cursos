(function () {

  function componentPlugin(hook, vm) {

    hook.beforeEach(function (markdown) {

      markdown = processComponents(markdown, vm);

      return markdown;

    });

  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(componentPlugin, window.$docsify.plugins || []);

})();