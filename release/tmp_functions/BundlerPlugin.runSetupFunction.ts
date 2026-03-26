// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/BundlerPlugin.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(setup,config,promises,is_last,isBake,) {  this.promises = promises;
  var onLoadPlugins = new Map<string, [filter: RegExp, callback: OnLoadCallback][]>();
  var onResolvePlugins = new Map<string, [filter: RegExp, OnResolveCallback][]>();
  var onBeforeParsePlugins = new Map<
    string,
    [RegExp, napiModule: unknown, symbol: string, external?: undefined | unknown][]
  >();

  function validate(filterObject: PluginConstraints, callback, map, symbol, external) {
    if (!filterObject || !__intrinsic__isObject(filterObject)) {
      __intrinsic__throwTypeError('Expected an object with "filter" RegExp');
    }

    let isOnBeforeParse = false;
    if (map === onBeforeParsePlugins) {
      isOnBeforeParse = true;
      // TODO: how to check if it a napi module here?
      if (!callback || !__intrinsic__isObject(callback) || !callback.__intrinsic__napiDlopenHandle) {
        __intrinsic__throwTypeError(
          "onBeforeParse `napiModule` must be a Napi module which exports the `BUN_PLUGIN_NAME` symbol.",
        );
      }

      if (typeof symbol !== "string") {
        __intrinsic__throwTypeError("onBeforeParse `symbol` must be a string");
      }
    } else {
      if (!callback || !__intrinsic__isCallable(callback)) {
        __intrinsic__throwTypeError("lmao callback must be a function");
      }
    }

    var { filter, namespace = "file" } = filterObject;

    if (!filter) {
      __intrinsic__throwTypeError('Expected an object with "filter" RegExp');
    }

    if (!__intrinsic__isRegExpObject(filter)) {
      __intrinsic__throwTypeError("filter must be a RegExp");
    }

    if (namespace && !(typeof namespace === "string")) {
      __intrinsic__throwTypeError("namespace must be a string");
    }

    if ((namespace?.length ?? 0) === 0) {
      namespace = "file";
    }

    if (!/^([/__intrinsic__a-zA-Z0-9_\\-]+)$/.test(namespace)) {
      __intrinsic__throwTypeError("namespace can only contain $a-zA-Z0-9_\\-");
    }

    var callbacks = map.__intrinsic__get(namespace);

    if (!callbacks) {
      map.__intrinsic__set(namespace, [isOnBeforeParse ? [filter, callback, symbol, external] : [filter, callback]]);
    } else {
      __intrinsic__arrayPush(callbacks, isOnBeforeParse ? [filter, callback, symbol, external] : [filter, callback]);
    }
  }

  function onLoad(this: PluginBuilder, filterObject: PluginConstraints, callback: OnLoadCallback): PluginBuilder {
    validate(filterObject, callback, onLoadPlugins, undefined, undefined);
    return this;
  }

  function onResolve(this: PluginBuilder, filterObject: PluginConstraints, callback): PluginBuilder {
    validate(filterObject, callback, onResolvePlugins, undefined, undefined);
    return this;
  }

  function onBeforeParse(
    this: PluginBuilder,
    filterObject: PluginConstraints,
    { napiModule, external, symbol }: { napiModule: unknown; symbol: string; external?: undefined | unknown },
  ): PluginBuilder {
    validate(filterObject, napiModule, onBeforeParsePlugins, symbol, external);
    return this;
  }

  const self = this;
  function onStart(this: PluginBuilder, callback): PluginBuilder {
    if (isBake) {
      __intrinsic__throwTypeError("onStart() is not supported in Bake yet");
    }
    if (!__intrinsic__isCallable(callback)) {
      __intrinsic__throwTypeError("callback must be a function");
    }

    const ret = callback();
    if (__intrinsic__isPromise(ret)) {
      if ((__intrinsic__getPromiseInternalField(ret, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) != __intrinsic__promiseStateFulfilled) {
        self.promises ??= [];
        self.promises.push(ret);
      }
    }
    return this;
  }

  function onEnd(this: PluginBuilder, callback: Function): PluginBuilder {
    if (!__intrinsic__isCallable(callback)) throw __intrinsic__makeErrorWithCode(118, "callback", "function", callback);

    if (!self.onEndCallbacks) self.onEndCallbacks = [];

    __intrinsic__arrayPush(self.onEndCallbacks, callback);

    return this;
  }

  const processSetupResult = () => {
    var anyOnLoad = false,
      anyOnResolve = false;

    for (let [namespace, callbacks] of onLoadPlugins.entries()) {
      for (var [filter] of callbacks) {
        this.addFilter(filter, namespace, 1);
        anyOnLoad = true;
      }
    }

    for (let [namespace, callbacks] of onResolvePlugins.entries()) {
      for (var [filter] of callbacks) {
        this.addFilter(filter, namespace, 0);
        anyOnResolve = true;
      }
    }

    for (let [namespace, callbacks] of onBeforeParsePlugins.entries()) {
      for (let [filter, addon, symbol, external] of callbacks) {
        this.onBeforeParse(filter, namespace, addon, symbol, external);
      }
    }

    if (anyOnResolve) {
      var onResolveObject = this.onResolve;
      if (!onResolveObject) {
        this.onResolve = onResolvePlugins;
      } else {
        for (let [namespace, callbacks] of onResolvePlugins.entries()) {
          var existing = onResolveObject.__intrinsic__get(namespace) as [RegExp, AnyFunction][];

          if (!existing) {
            onResolveObject.__intrinsic__set(namespace, callbacks);
          } else {
            onResolveObject.__intrinsic__set(namespace, existing.concat(callbacks));
          }
        }
      }
    }

    if (anyOnLoad) {
      var onLoadObject = this.onLoad;
      if (!onLoadObject) {
        this.onLoad = onLoadPlugins;
      } else {
        for (let [namespace, callbacks] of onLoadPlugins.entries()) {
          var existing = onLoadObject.__intrinsic__get(namespace) as [RegExp, AnyFunction][];

          if (!existing) {
            onLoadObject.__intrinsic__set(namespace, callbacks);
          } else {
            onLoadObject.__intrinsic__set(namespace, existing.concat(callbacks));
          }
        }
      }
    }

    if (is_last) {
      this.promises = undefined;
    }

    return this.promises;
  };

  var setupResult = setup({
    config: config,
    onDispose: () => void __intrinsic__throwTypeError(`${"On-dispose callbacks"} is not implemented yet. See https://github.com/oven-sh/bun/issues/2771`),
    onEnd,
    onLoad,
    onResolve,
    onBeforeParse,
    onStart,
    resolve: () => void __intrinsic__throwTypeError(`${"build.resolve()"} is not implemented yet. See https://github.com/oven-sh/bun/issues/2771`),
    module: () => {
      __intrinsic__throwTypeError("module() is not supported in Bun.build() yet. Only via Bun.plugin() at runtime");
    },
    addPreload: () => {
      __intrinsic__throwTypeError("addPreload() is not supported in Bun.build() yet.");
    },
    // esbuild's options argument is different, we provide some interop
    initialOptions: {
      ...config,
      bundle: true,
      entryPoints: config.entrypoints ?? config.entryPoints ?? [],
      minify: typeof config.minify === "boolean" ? config.minify : false,
      minifyIdentifiers: config.minify === true || (config.minify as MinifyObj)?.identifiers,
      minifyWhitespace: config.minify === true || (config.minify as MinifyObj)?.whitespace,
      minifySyntax: config.minify === true || (config.minify as MinifyObj)?.syntax,
      outbase: config.root,
      platform: config.target === "bun" ? "node" : config.target,
    },
    esbuild: {},
  } as PluginBuilderExt);

  if (setupResult && __intrinsic__isPromise(setupResult)) {
    if (__intrinsic__getPromiseInternalField(setupResult, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateFulfilled) {
      setupResult = __intrinsic__getPromiseInternalField(setupResult, __intrinsic__promiseFieldReactionsOrResult);
    } else {
      return setupResult.__intrinsic__then(() => {
        if (is_last && self.promises !== undefined && self.promises.length > 0) {
          const awaitAll = Promise.all(self.promises);
          return awaitAll.__intrinsic__then(processSetupResult);
        }
        return processSetupResult();
      });
    }
  }

  if (is_last && this.promises !== undefined && this.promises.length > 0) {
    const awaitAll = Promise.all(this.promises);
    return awaitAll.__intrinsic__then(processSetupResult);
  }

  return processSetupResult();
}).$$capture_end$$;
