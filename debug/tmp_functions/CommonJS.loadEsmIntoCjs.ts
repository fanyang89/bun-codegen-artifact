// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/CommonJS.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(resolvedSpecifier) {  var loader = Loader;
  var queue = __intrinsic__createFIFO();
  let key = resolvedSpecifier;
  const registry = loader.registry;

  while (key) {
    // we need to explicitly check because state could be $ModuleFetch
    // it will throw this error if we do not:
    //    $throwTypeError("Requested module is already fetched.");
    let entry = registry.__intrinsic__get(key)!,
      moduleRecordPromise,
      state = 0,
      // entry.fetch is a Promise<SourceCode>
      // SourceCode is not a string, it's a JSC::SourceCode object
      fetch: Promise<JSCSourceCodeObject> | undefined;

    if (entry) {
      ({ state, fetch } = entry);
    }

    if (
      !entry ||
      // if we need to fetch it
      (state <= __intrinsic__ModuleFetch &&
        // either:
        // - we've never fetched it
        // - a fetch is in progress
        (!__intrinsic__isPromise(fetch) ||
          (__intrinsic__getPromiseInternalField(fetch, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) === __intrinsic__promiseStatePending))
    ) {
      // force it to be no longer pending
      __intrinsic__fulfillModuleSync(key);

      entry = registry.__intrinsic__get(key)!;

      // the state can transition here
      // https://github.com/oven-sh/bun/issues/8965
      if (entry) {
        ({ state = 0, fetch } = entry);
      }
    }

    if (state < __intrinsic__ModuleLink && __intrinsic__isPromise(fetch)) {
      // This will probably never happen, but just in case
      if ((__intrinsic__getPromiseInternalField(fetch, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) === __intrinsic__promiseStatePending) {
        registry.__intrinsic__delete(resolvedSpecifier);

        __intrinsic__throwTypeError(`require() async module "${key}" is unsupported. use "await import()" instead.`);
      }

      // this pulls it out of the promise without delaying by a tick
      // the promise is already fulfilled by $fulfillModuleSync
      const sourceCodeObject = __intrinsic__getPromiseInternalField(fetch, __intrinsic__promiseFieldReactionsOrResult);
      moduleRecordPromise = loader.parseModule(key, sourceCodeObject);
    }
    let mod = entry?.module;

    if (moduleRecordPromise && __intrinsic__isPromise(moduleRecordPromise)) {
      let reactionsOrResult = __intrinsic__getPromiseInternalField(moduleRecordPromise, __intrinsic__promiseFieldReactionsOrResult);
      let flags = __intrinsic__getPromiseInternalField(moduleRecordPromise, __intrinsic__promiseFieldFlags);
      let state = flags & __intrinsic__promiseStateMask;
      // this branch should never happen, but just to be safe
      if (state === __intrinsic__promiseStatePending || (reactionsOrResult && __intrinsic__isPromise(reactionsOrResult))) {
        registry.__intrinsic__delete(resolvedSpecifier);

        __intrinsic__throwTypeError(`require() async module "${key}" is unsupported. use "await import()" instead.`);
      } else if (state === __intrinsic__promiseStateRejected) {
        if (!reactionsOrResult?.message) {
          __intrinsic__throwTypeError(
            `${
              reactionsOrResult + "" ? reactionsOrResult : "An error occurred"
            } occurred while parsing module \"${key}\"`,
          );
        }

        throw reactionsOrResult;
      }
      entry.module = mod = reactionsOrResult;
    } else if (moduleRecordPromise && !mod) {
      entry.module = mod = moduleRecordPromise as LoaderModule;
    }

    // This is very similar to "requestInstantiate" in ModuleLoader.js in JavaScriptCore.
    __intrinsic__setStateToMax(entry, __intrinsic__ModuleLink);
    const dependenciesMap = mod.dependenciesMap;
    const requestedModules = loader.requestedModules(mod);
    const dependencies = __intrinsic__newArrayWithSize<string>(requestedModules.length);
    for (var i = 0, length = requestedModules.length; i < length; ++i) {
      const depName = requestedModules[i];
      // optimization: if it starts with a slash then it's an absolute path
      // we don't need to run the resolver a 2nd time
      const depKey = depName[0] === "/" ? depName : loader.resolve(depName, key);
      const depEntry = loader.ensureRegistered(depKey);

      if (depEntry.state < __intrinsic__ModuleLink) {
        queue.push(depKey);
      }

      __intrinsic__putByValDirect(dependencies, i, depEntry);
      dependenciesMap.__intrinsic__set(depName, depEntry);
    }

    entry.dependencies = dependencies;
    // All dependencies resolved, set instantiate and satisfy field directly.
    entry.instantiate = Promise.__intrinsic__resolve(entry);
    entry.satisfy = Promise.__intrinsic__resolve(entry);
    entry.isSatisfied = true;

    key = queue.shift();
    while (key && (registry.__intrinsic__get(key)?.state ?? __intrinsic__ModuleFetch) >= __intrinsic__ModuleLink) {
      key = queue.shift();
    }
  }

  var linkAndEvaluateResult = loader.linkAndEvaluateModule(resolvedSpecifier, undefined);
  if (linkAndEvaluateResult && __intrinsic__isPromise(linkAndEvaluateResult)) {
    registry.__intrinsic__delete(resolvedSpecifier);

    // if you use top-level await, or any dependencies use top-level await, then we throw here
    // this means the module will still actually load eventually, but that's okay.
    __intrinsic__throwTypeError(
      `require() async module \"${resolvedSpecifier}\" is unsupported. use "await import()" instead.`,
    );
  }

  return registry.__intrinsic__get(resolvedSpecifier);
}).$$capture_end$$;
