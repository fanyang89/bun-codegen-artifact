// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/CommonJS.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(id,parent) {  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__requireMap.__intrinsic__get(id) === undefined,"$requireMap.$get(id) === undefined", "Module " + JSON.stringify(id) + " should not be in the map"):void 0);
  !(IS_BUN_DEVELOPMENT?$assert(id.endsWith(".node"),"id.endsWith(\".node\")"):void 0);

  const module = __intrinsic__createCommonJSModule(id, {}, true, parent);
  process.dlopen(module, id);
  __intrinsic__requireMap.__intrinsic__set(id, module);
  return module.exports;
}).$$capture_end$$;
