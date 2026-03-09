window.compileMarkdown = function(vm, content) {
  return vm.compiler.compile('\n' + content.trim() + '\n');
};