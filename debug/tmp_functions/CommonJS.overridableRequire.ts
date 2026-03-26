// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/CommonJS.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(originalId,options) {  const id = __intrinsic__resolveSync(originalId, this.filename, false, false, options ? options.paths : undefined);
  if (id.startsWith("node:")) {
    if (id !== originalId) {
      // A terrible special case where Node.js allows non-prefixed built-ins to
      // read the require cache. Though they never write to it, which is so silly.
      const existing = __intrinsic__requireMap.__intrinsic__get(originalId);
      if (existing) {
        const c = __intrinsic__evaluateCommonJSModule(existing, this);
        if (c && c.indexOf(existing) === -1) {
          c.push(existing);
        }
        return existing.exports;
      }
    }

    return this.__intrinsic__requireNativeModule(id);
  } else {
    const existing = __intrinsic__requireMap.__intrinsic__get(id);
    if (existing) {
      // Scenario where this is necessary:
      //
      // In an ES Module, we have:
      //
      //    import "react-dom/server"
      //    import "react"
      //
      // Synchronously, the "react" import is created first, and then the
      // "react-dom/server" import is created. Then, at ES Module link time, they
      // are evaluated. The "react-dom/server" import is evaluated first, and
      // require("react") was previously created as an ESM module, so we wait
      // for the ESM module to load
      //
      // ...and then when this code is reached, unless
      // we evaluate it "early", we'll get an empty object instead of the module
      // exports.
      //
      const c = __intrinsic__evaluateCommonJSModule(existing, this);
      if (c && c.indexOf(existing) === -1) {
        c.push(existing);
      }
      return existing.exports;
    }
  }

  if (id.endsWith(".node")) {
    return __intrinsic__internalRequire(id, this);
  }

  if (id === "bun:test") {
    return Bun.jest(this.filename);
  }

  // To handle import/export cycles, we need to create a module object and put
  // it into the map before we import it.
  const mod = __intrinsic__createCommonJSModule(id, {}, false, this);
  __intrinsic__requireMap.__intrinsic__set(id, mod);

  var out: LoaderModule | -1;

  // This is where we load the module. We will see if Module._load and
  // Module._compile are actually important for compatibility.
  //
  // Note: we do not need to wrap this in a try/catch for release, if it throws
  // the C++ code will clear the module from the map.
  //
  if (IS_BUN_DEVELOPMENT) {
    !(IS_BUN_DEVELOPMENT?$assert(mod.id === id,"mod.id === id"):void 0);
    try {
      out = this.__intrinsic__require(
        id,
        mod,
        // did they pass a { type } object?
        __intrinsic__argumentCount(),
        // the object containing a "type" attribute, if they passed one
        // maybe this will be "paths" in the future too.
        __intrinsic__argument(1),
      );
    } catch (E) {
      !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__requireMap.__intrinsic__get(id) === undefined,"$requireMap.$get(id) === undefined", "Module " + JSON.stringify(id) + " should no longer be in the map"):void 0);
      throw E;
    }
  } else {
    out = this.__intrinsic__require(id, mod, __intrinsic__argumentCount(), __intrinsic__argument(1));
  }

  // -1 means we need to lookup the module from the ESM registry.
  if (out === -1) {
    try {
      out = __intrinsic__requireESM(id);
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

      return (mod.exports = namespace["module.exports"] ?? namespace);
    }
  }

  const c = __intrinsic__evaluateCommonJSModule(mod, this);
  if (c && c.indexOf(mod) === -1) {
    c.push(mod);
  }
  return mod.exports;
}).$$capture_end$$;
