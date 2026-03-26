// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/CommonJS.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(id) {  !(IS_BUN_DEVELOPMENT?$assert(this,"this"):void 0);
  try {
    __intrinsic__requireESM(id);
  } catch (exception) {
    // Since the ESM code is mostly JS, we need to handle exceptions here.
    __intrinsic__requireMap.__intrinsic__delete(id);
    throw exception;
  }

  const esm = Loader.registry.__intrinsic__get(id);

  // If we can pull out a ModuleNamespaceObject, let's do it.
  if (esm?.evaluated && (esm.state ?? 0) >= __intrinsic__ModuleReady) {
    const namespace = Loader.getModuleNamespaceObject(esm!.module);
    // In Bun, when __esModule is not defined, it's a CustomAccessor on the prototype.
    // Various libraries expect __esModule to be set when using ESM from require().
    // We don't want to always inject the __esModule export into every module,
    // And creating an Object wrapper causes the actual exports to not be own properties.
    // So instead of either of those, we make it so that the __esModule property can be set at runtime.
    // It only supports "true" and undefined. Anything non-truthy is treated as undefined.
    // https://github.com/oven-sh/bun/issues/14411
    if (namespace.__esModule === undefined) {
      try {
        namespace.__esModule = true;
      } catch {
        // https://github.com/oven-sh/bun/issues/17816
      }
    }

    this.exports = namespace["module.exports"] ?? namespace;
    return;
  }
}).$$capture_end$$;
