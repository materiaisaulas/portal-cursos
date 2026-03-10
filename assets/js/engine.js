window.docComponents = [];

window.registerComponent = function(component) {
  window.docComponents.push(component);
  console.log("componente registrado:", window.docComponents.length);
};

window.processComponents = function(markdown, vm) {
  console.log("processComponents executou. Total de componentes:", window.docComponents.length);

  window.docComponents.forEach(component => {
    markdown = component(markdown, vm);
  });

  return markdown;
};