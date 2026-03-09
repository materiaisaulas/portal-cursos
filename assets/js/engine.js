window.docComponents = [];

window.registerComponent = function(component) {
  window.docComponents.push(component);
};

window.processComponents = function(markdown, vm) {

  window.docComponents.forEach(component => {
    markdown = component(markdown, vm);
  });

  return markdown;

};