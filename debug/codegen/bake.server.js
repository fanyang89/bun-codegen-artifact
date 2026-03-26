(($separateSSRGraph,$importMeta) => {let unloadedModuleRegistry={},config={separateSSRGraph:$separateSSRGraph},server_exports;
  // @bun
  var __require = $importMeta.require;
  if (true) {
    globalThis.DEBUG = {
      ASSERT: function ASSERT(condition, message) {
        if (!condition) {
          if (typeof Bun === "undefined") {
            console.assert(false, "ASSERTION FAILED" + (message ? `: ${message}` : ""));
          } else {
            console.error("ASSERTION FAILED" + (message ? `: ${message}` : ""));
          }
        }
      }
    };
  }
  var __name = (target, name) => {
    Object.defineProperty(target, "name", {
      value: name,
      enumerable: false,
      configurable: true
    });
    return target;
  };
  var __legacyDecorateClassTS = function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1;i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __legacyDecorateParamTS = (index, decorator) => (target, key) => decorator(target, key, index);
  var __legacyMetadataTS = (k, v) => {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __using = (stack, value, async) => {
    if (value != null) {
      if (typeof value !== "object" && typeof value !== "function")
        throw TypeError('Object expected to be assigned to "using" declaration');
      let dispose;
      if (async)
        dispose = value[Symbol.asyncDispose];
      if (dispose === undefined)
        dispose = value[Symbol.dispose];
      if (typeof dispose !== "function")
        throw TypeError("Object not disposable");
      stack.push([async, dispose, value]);
    } else if (async) {
      stack.push([async]);
    }
    return value;
  };
  var __callDispose = (stack, error, hasError) => {
    let fail = (e) => error = hasError ? new SuppressedError(e, error, "An error was suppressed during disposal") : (hasError = true, e), next = (it) => {
      while (it = stack.pop()) {
        try {
          var result = it[1] && it[1].call(it[2]);
          if (it[0])
            return Promise.resolve(result).then(next, (e) => (fail(e), next()));
        } catch (e) {
          fail(e);
        }
      }
      if (hasError)
        throw error;
    };
    return next();
  };
  var registry = new Map;
  var registrySourceMapIds = new Map;
  var serverManifest = {};
  var ssrManifest = {};
  var eventHandlers = {};
  var refreshRuntime;
  var lazyDynamicImportWithOptions = null;
  async function loadExports(id) {
    const m = await loadModuleAsync(id, false, null);
    return m.esm ? m.exports : m.cjs.exports;
  }
  
  class HMRModule {
    id;
    esm;
    state = 0;
    exports = null;
    cjs;
    failure = null;
    imports = null;
    updateImport = null;
    onDispose = null;
    selfAccept = null;
    depAccepts = null;
    importers = new Set;
    data = {};
    constructor(id, isCommonJS) {
      this.id = id;
      this.esm = !isCommonJS;
      this.cjs = isCommonJS ? {
        id,
        exports: {},
        require: this.require.bind(this)
      } : null;
    }
    requireResolve(id) {
      return id;
    }
    require(id) {
      try {
        const mod = loadModuleSync(id, true, this);
        return mod.esm ? mod.cjs ??= toCommonJS(mod.exports) : mod.cjs.exports;
      } catch (e) {
        if (e instanceof AsyncImportError) {
          e.message = `Cannot require "${id}" because "${e.asyncId}" uses top-level await, but 'require' is a synchronous operation.`;
        }
        throw e;
      }
    }
    dynamicImport(id, opts) {
      const found = loadModuleAsync(id, true, this);
      if (found) {
        if (found.id === id)
          return Promise.resolve(getEsmExports(found));
        return found.then(getEsmExports);
      }
      return opts ? (lazyDynamicImportWithOptions ??= new Function("specifier, opts", "import(specifier, opts)"))(id, opts) : import(id);
    }
    reactRefreshAccept() {
      if (isReactRefreshBoundary(this.exports)) {
        this.accept();
      }
    }
    get importMeta() {
      const importMeta = {
        url: `${location.origin}/${this.id}`,
        main: false,
        require: this.require.bind(this),
        get hot() {
          throw new Error("import.meta.hot cannot be used indirectly.");
        }
      };
      Object.defineProperty(this, "importMeta", { value: importMeta });
      return importMeta;
    }
    accept(arg1, arg2) {
      if (arg2 == undefined) {
        if (arg1 == undefined) {
          this.selfAccept = implicitAcceptFunction;
          return;
        }
        if (typeof arg1 !== "function") {
          throw new Error("import.meta.hot.accept requires a callback function");
        }
        this.selfAccept = arg1;
      } else {
        throw new Error('"import.meta.hot.accept" must be directly called with string literals for the specifiers. This way, the bundler can pre-process the arguments.');
      }
    }
    acceptSpecifiers(specifiers, cb) {
      this.depAccepts ??= {};
      const isArray = Array.isArray(specifiers);
      const accept = {
        modules: isArray ? specifiers : [specifiers],
        cb,
        single: !isArray
      };
      if (isArray) {
        for (const specifier of specifiers) {
          this.depAccepts[specifier] = accept;
        }
      } else {
        this.depAccepts[specifiers] = accept;
      }
    }
    decline() {}
    dispose(cb) {
      (this.onDispose ??= []).push(cb);
    }
    prune(cb) {}
    invalidate() {
      emitEvent("bun:invalidate", null);
      throw new Error("TODO: implement ImportMetaHot.invalidate");
    }
    on(event, cb) {
      if (event.startsWith("vite:")) {
        event = "bun:" + event.slice(4);
      }
      (eventHandlers[event] ??= []).push(cb);
      this.dispose(() => this.off(event, cb));
    }
    off(event, cb) {
      const handlers = eventHandlers[event];
      if (!handlers)
        return;
      const index = handlers.indexOf(cb);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
    send(event, cb) {
      throw new Error("TODO: implement ImportMetaHot.send");
    }
  }
  if (true) {
    HMRModule.prototype.builtin = (id) => $importMeta.bakeBuiltin($importMeta.resolve(id));
  }
  HMRModule.prototype.indirectHot = new Proxy({}, {
    get(_, prop) {
      if (typeof prop === "symbol")
        return;
      throw new Error(`import.meta.hot.${prop} cannot be used indirectly.`);
    },
    set() {
      throw new Error(`The import.meta.hot object cannot be mutated.`);
    }
  });
  function loadModuleSync(id, isUserDynamic, importer) {
    let mod = registry.get(id);
    if (mod) {
      if (mod.state === 3)
        throw mod.failure;
      if (mod.state === 1) {
        mod.state = 0;
        isUserDynamic = false;
      } else {
        if (importer) {
          mod.importers.add(importer);
        }
        return mod;
      }
    }
    const loadOrEsmModule = unloadedModuleRegistry[id];
    if (!loadOrEsmModule)
      throwNotFound(id, isUserDynamic);
    if (typeof loadOrEsmModule === "function") {
      if (!mod) {
        mod = new HMRModule(id, true);
        registry.set(id, mod);
      } else if (mod.esm) {
        mod.esm = false;
        mod.cjs = {
          id,
          exports: {},
          require: mod.require.bind(this)
        };
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      try {
        const cjs = mod.cjs;
        loadOrEsmModule(mod, cjs, cjs.exports);
      } catch (e) {
        mod.state = 1;
        mod.cjs.exports = {};
        throw e;
      }
      mod.state = 2;
    } else {
      if (true) {
        try {
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[0]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[1]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[2]));
          DEBUG.ASSERT(typeof loadOrEsmModule[3] === "function");
          DEBUG.ASSERT(typeof loadOrEsmModule[4] === "boolean");
        } catch (e) {
          console.warn(id, loadOrEsmModule);
          throw e;
        }
      }
      const { [0]: deps, [3]: load, [4]: isAsync } = loadOrEsmModule;
      if (isAsync) {
        throw new AsyncImportError(id);
      }
      if (!mod) {
        mod = new HMRModule(id, false);
        registry.set(id, mod);
      } else if (!mod.esm) {
        mod.esm = true;
        mod.cjs = null;
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      const { list: depsList } = parseEsmDependencies(mod, deps, loadModuleSync);
      const exportsBefore = mod.exports;
      mod.imports = depsList.map(getEsmExports);
      load(mod);
      mod.imports = depsList;
      if (mod.exports === exportsBefore)
        mod.exports = {};
      mod.cjs = null;
      mod.state = 2;
    }
    return mod;
  }
  function loadModuleAsync(id, isUserDynamic, importer) {
    let mod = registry.get(id);
    if (mod) {
      const { state } = mod;
      if (state === 3)
        throw mod.failure;
      if (state === 1) {
        mod.state = 0;
        isUserDynamic = false;
      } else {
        if (importer) {
          mod.importers.add(importer);
        }
        return mod;
      }
    }
    const loadOrEsmModule = unloadedModuleRegistry[id];
    if (!loadOrEsmModule) {
      if (isUserDynamic)
        return null;
      throwNotFound(id, isUserDynamic);
    }
    if (typeof loadOrEsmModule === "function") {
      if (!mod) {
        mod = new HMRModule(id, true);
        registry.set(id, mod);
      } else if (mod.esm) {
        mod.esm = false;
        mod.cjs = {
          id,
          exports: {},
          require: mod.require.bind(this)
        };
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      try {
        const cjs = mod.cjs;
        loadOrEsmModule(mod, cjs, cjs.exports);
      } catch (e) {
        mod.state = 1;
        mod.cjs.exports = {};
        throw e;
      }
      mod.state = 2;
      return mod;
    } else {
      if (true) {
        try {
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[0]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[1]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[2]));
          DEBUG.ASSERT(typeof loadOrEsmModule[3] === "function");
          DEBUG.ASSERT(typeof loadOrEsmModule[4] === "boolean");
        } catch (e) {
          console.warn(id, loadOrEsmModule);
          throw e;
        }
      }
      const [deps, , , load] = loadOrEsmModule;
      if (!mod) {
        mod = new HMRModule(id, false);
        registry.set(id, mod);
      } else if (!mod.esm) {
        mod.esm = true;
        mod.exports = null;
        mod.cjs = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      const { list, isAsync } = parseEsmDependencies(mod, deps, loadModuleAsync);
      DEBUG.ASSERT(isAsync ? list.some((x) => x instanceof Promise) : list.every((x) => x instanceof HMRModule));
      return isAsync ? Promise.all(list).then((list2) => finishLoadModuleAsync(mod, load, list2), (e) => {
        mod.state = 3;
        mod.failure = e;
        throw e;
      }) : finishLoadModuleAsync(mod, load, list);
    }
  }
  function finishLoadModuleAsync(mod, load, modules) {
    try {
      const exportsBefore = mod.exports;
      mod.imports = modules.map(getEsmExports);
      const shouldPatchImporters = !mod.selfAccept || mod.selfAccept === implicitAcceptFunction;
      const p = load(mod);
      mod.imports = modules;
      if (p) {
        return p.then(() => {
          mod.state = 2;
          if (mod.exports === exportsBefore)
            mod.exports = {};
          mod.cjs = null;
          if (shouldPatchImporters)
            patchImporters(mod);
          return mod;
        });
      }
      if (mod.exports === exportsBefore)
        mod.exports = {};
      mod.cjs = null;
      if (shouldPatchImporters)
        patchImporters(mod);
      mod.state = 2;
      return mod;
    } catch (e) {
      mod.state = 3;
      mod.failure = e;
      throw e;
    }
  }
  function parseEsmDependencies(parent, deps, enqueueModuleLoad) {
    let i = 0;
    let list = [];
    let isAsync = false;
    const { length } = deps;
    while (i < length) {
      const dep = deps[i];
      DEBUG.ASSERT(typeof dep === "string");
      let expectedExportKeyEnd = i + 2 + deps[i + 1];
      DEBUG.ASSERT(typeof deps[i + 1] === "number");
      const promiseOrModule = enqueueModuleLoad(dep, false, parent);
      list.push(promiseOrModule);
      const unloadedModule = unloadedModuleRegistry[dep];
      if (!unloadedModule) {
        throwNotFound(dep, false);
      }
      if (typeof unloadedModule !== "function") {
        const availableExportKeys = unloadedModule[1];
        i += 2;
        while (i < expectedExportKeyEnd) {
          const key = deps[i];
          DEBUG.ASSERT(typeof key === "string");
          i++;
        }
        isAsync ||= promiseOrModule instanceof Promise;
      } else {
        DEBUG.ASSERT(!registry.get(dep)?.esm);
        i = expectedExportKeyEnd;
        if (true) {
          DEBUG.ASSERT(list[list.length - 1] instanceof HMRModule);
        }
      }
    }
    return { list, isAsync };
  }
  function getEsmExports(m) {
    return m.esm ? m.exports : m.exports ??= toESM(m.cjs.exports);
  }
  async function replaceModules(modules, sourceMapId) {
    Object.assign(unloadedModuleRegistry, modules);
    emitEvent("bun:beforeUpdate", null);
    const toReload = new Set;
    const toAccept = [];
    let failures = null;
    const toDispose = [];
    outer:
      for (const key of Object.keys(modules)) {
        if (false) {}
        const existing = registry.get(key);
        if (!existing)
          continue;
        toReload.add(existing);
        const visited = new Set;
        const queue = [existing];
        visited.add(existing);
        while (true) {
          const mod = queue.shift();
          if (!mod)
            break;
          let hadSelfAccept = true;
          if (mod.selfAccept) {
            toReload.add(mod);
            visited.add(mod);
            hadSelfAccept = false;
            if (mod.onDispose) {
              toDispose.push(mod);
            }
          } else if (Object.keys(mod.data).length > 0) {
            mod.selfAccept ??= implicitAcceptFunction;
            toReload.add(mod);
            visited.add(mod);
            hadSelfAccept = false;
            if (mod.onDispose) {
              toDispose.push(mod);
            }
          }
          if (hadSelfAccept && mod.importers.size === 0) {
            failures ??= new Set;
            failures.add(key);
            continue outer;
          }
          for (const importer of mod.importers) {
            const cb = importer.depAccepts?.[key];
            if (cb) {
              toAccept.push({ cb, key });
            } else if (hadSelfAccept) {
              if (visited.has(importer))
                continue;
              visited.add(importer);
              queue.push(importer);
            }
          }
        }
      }
    if (failures) {
      let message = "[Bun] Hot update was not accepted because it or its importers do not call `import.meta.hot.accept`. To prevent full page reloads, call `import.meta.hot.accept` in one of the following files to handle the update:\n\n";
      for (const boundary of failures) {
        const path = [];
        let current = registry.get(boundary);
        DEBUG.ASSERT(!boundary.endsWith(".html"));
        DEBUG.ASSERT(current);
        DEBUG.ASSERT(current.selfAccept === null);
        if (current.importers.size === 0) {
          message += `Module "${boundary}" is a root module that does not self-accept.
  `;
          continue;
        }
        outer:
          while (current.importers.size > 0) {
            path.push(current.id);
            inner:
              for (const importer of current.importers) {
                if (importer.selfAccept)
                  continue inner;
                if (importer.depAccepts?.[boundary])
                  continue inner;
                current = importer;
                continue outer;
              }
            DEBUG.ASSERT(false);
            break;
          }
        path.push(current.id);
        DEBUG.ASSERT(path.length > 0);
        message += `Module "${boundary}" is not accepted by ${path[1]}${path.length > 1 ? "," : "."}
  `;
        for (let i = 2, len = path.length;i < len; i++) {
          const isLast = i === len - 1;
          message += `${isLast ? "\u2514" : "\u251C"} imported by "${path[i]}"${isLast ? "." : ","}
  `;
        }
      }
      message = message.trim();
      if (false) {} else {
        console.warn(message);
      }
    }
    if (toDispose.length > 0) {
      const disposePromises = [];
      for (const mod of toDispose) {
        mod.state = 1;
        for (const fn of mod.onDispose) {
          const p = fn(mod.data);
          if (p && p instanceof Promise) {
            disposePromises.push(p);
          }
        }
        mod.onDispose = null;
      }
      if (disposePromises.length > 0) {
        await Promise.all(disposePromises);
      }
    }
    const promises = [];
    for (const mod of toReload) {
      mod.state = 1;
      const selfAccept = mod.selfAccept;
      mod.selfAccept = null;
      mod.depAccepts = null;
      const modOrPromise = loadModuleAsync(mod.id, false, null);
      if (modOrPromise === mod) {
        if (selfAccept) {
          selfAccept(getEsmExports(mod));
        }
      } else {
        DEBUG.ASSERT(modOrPromise instanceof Promise);
        promises.push(modOrPromise.then((mod2) => {
          if (selfAccept) {
            selfAccept(getEsmExports(mod2));
          }
          return mod2;
        }));
      }
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    for (const mod of toReload) {
      const { selfAccept } = mod;
      if (selfAccept && selfAccept !== implicitAcceptFunction)
        continue;
      patchImporters(mod);
    }
    for (const { cb: cbEntry, key } of toAccept) {
      const { cb: cbFn, modules: modules2, single } = cbEntry;
      cbFn(single ? getEsmExports(registry.get(key)) : createAcceptArray(modules2, key));
    }
    if (refreshRuntime) {
      refreshRuntime.performReactRefresh();
    }
    emitEvent("bun:afterUpdate", null);
  }
  function patchImporters(mod) {
    const { importers } = mod;
    const exports = getEsmExports(mod);
    for (const importer of importers) {
      if (!importer.esm || !importer.updateImport)
        continue;
      const index = importer.imports.indexOf(mod);
      if (index === -1)
        continue;
      importer.updateImport[index](exports);
    }
  }
  function createAcceptArray(modules, key) {
    const arr = new Array(modules.length);
    arr.fill(undefined);
    const i = modules.indexOf(key);
    DEBUG.ASSERT(i !== -1);
    arr[i] = getEsmExports(registry.get(key));
    return arr;
  }
  function emitEvent(event, data) {
    const handlers = eventHandlers[event];
    if (!handlers)
      return;
    for (const handler of handlers) {
      handler(data);
    }
  }
  function throwNotFound(id, isUserDynamic) {
    if (isUserDynamic) {
      throw new Error(`Failed to resolve dynamic import '${id}'. With Bun's bundler, all imports must be statically known at build time so that the bundler can trace everything.`);
    }
    if (true) {
      console.warn("Available modules:", Object.keys(unloadedModuleRegistry));
    }
    throw new Error(`Failed to load bundled module '${id}'. This is not a dynamic import, and therefore is a bug in Bun's bundler.`);
  }
  
  class AsyncImportError extends Error {
    asyncId;
    constructor(asyncId) {
      super(`Cannot load async module "${asyncId}" synchronously because it uses top-level await.`);
      this.asyncId = asyncId;
      Object.defineProperty(this, "name", { value: "Error" });
    }
  }
  function toCommonJS(from) {
    var desc, entry = Object.defineProperty({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      Object.getOwnPropertyNames(from).map((key) => !Object.prototype.hasOwnProperty.call(entry, key) && Object.defineProperty(entry, key, {
        get: () => from[key],
        enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable
      }));
    return entry;
  }
  function toESM(mod) {
    const to = Object.defineProperty(Object.create(null), "default", { value: mod, enumerable: true });
    for (let key of Object.getOwnPropertyNames(mod))
      if (!Object.prototype.hasOwnProperty.call(to, key))
        Object.defineProperty(to, key, {
          get: () => mod[key],
          enumerable: true
        });
    return to;
  }
  function registerSynthetic(id, esmExports) {
    const module = new HMRModule(id, false);
    module.exports = esmExports;
    registry.set(id, module);
    unloadedModuleRegistry[id] = true;
  }
  function isReactRefreshBoundary(esmExports) {
    const { isLikelyComponentType } = refreshRuntime;
    if (!isLikelyComponentType)
      return true;
    if (isLikelyComponentType(esmExports)) {
      return true;
    }
    if (esmExports == null || typeof esmExports !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const key in esmExports) {
      hasExports = true;
      const desc = Object.getOwnPropertyDescriptor(esmExports, key);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = esmExports[key];
      if (!isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  }
  function implicitAcceptFunction() {}
  registerSynthetic("bun:wrap", {
    __name,
    __legacyDecorateClassTS,
    __legacyDecorateParamTS,
    __legacyMetadataTS,
    __using,
    __callDispose
  });
  if (true) {
    registerSynthetic("bun:bake/server", {
      serverManifest,
      ssrManifest,
      actionManifest: null
    });
  }
  if (false) {}
  var { AsyncLocalStorage } = __require("async_hooks");
  if (false) {}
  var responseOptionsALS = new AsyncLocalStorage;
  var asyncLocalStorageWasSet = false;
  server_exports = {
    async handleRequest(req, routerTypeMain, routeModules, clientEntryUrl, styles, params, setAsyncLocalStorage, bundleNewRoute, newRouteParams) {
      if (!asyncLocalStorageWasSet) {
        asyncLocalStorageWasSet = true;
        setAsyncLocalStorage(responseOptionsALS);
      }
      while (true) {
        if (process.env.BUN_DEBUG_BAKE_JS) {
          console.log("handleRequest", {
            routeModules,
            clientEntryUrl,
            styles,
            params
          });
        }
        const exports = await loadExports(routerTypeMain);
        const serverRenderer = exports.render;
        if (!serverRenderer) {
          throw new Error('Framework server entrypoint is missing a "render" export.');
        }
        if (typeof serverRenderer !== "function") {
          throw new Error(`Framework server entrypoint's "render" export is not a function.`);
        }
        const [pageModule, ...layouts] = await Promise.all(routeModules.map(loadExports));
        let requestWithCookies = req;
        let storeValue = {
          responseOptions: {},
          streaming: pageModule.streaming ?? false
        };
        try {
          const response = await responseOptionsALS.run(storeValue, async () => {
            return await serverRenderer(requestWithCookies, {
              styles,
              modules: [clientEntryUrl],
              layouts,
              pageModule,
              modulepreload: [],
              params,
              request: pageModule.mode === "ssr" ? requestWithCookies : undefined
            }, responseOptionsALS);
          });
          if (!(response instanceof Response)) {
            throw $ERR_SSR_RESPONSE_EXPECTED(`Server-side request handler was expected to return a Response object.`);
          }
          return response;
        } catch (error) {
          if (error instanceof Response) {
            const resp = error;
            if (resp.status !== 302) {
              const newUrl = resp.headers.get("location");
              if (!newUrl) {
                throw new Error("Response.render(...) was expected to have a Location header");
              }
              const [routeBundleIndex, promise] = bundleNewRoute(req, newUrl);
              if (promise)
                await promise;
              if (req.signal.aborted)
                return new Response("");
              const newArgs = newRouteParams(req, routeBundleIndex, newUrl);
              routerTypeMain = newArgs.routerTypeMain;
              routeModules = newArgs.routeModules;
              clientEntryUrl = newArgs.clientEntryUrl;
              styles = newArgs.styles;
              params = newArgs.params;
              continue;
            }
            return resp;
          }
          throw error;
        }
      }
    },
    async registerUpdate(modules, componentManifestAdd, componentManifestDelete) {
      replaceModules(modules);
      if (componentManifestAdd) {
        for (const uid of componentManifestAdd) {
          try {
            const exports = await loadExports(uid);
            const client = {};
            for (const exportName of Object.keys(exports)) {
              serverManifest[uid + "#" + exportName] = {
                id: uid,
                name: exportName,
                chunks: []
              };
              client[exportName] = {
                specifier: "ssr:" + uid,
                name: exportName
              };
            }
            ssrManifest[uid] = client;
          } catch (err) {
            console.log(err);
          }
        }
      }
      if (componentManifestDelete) {
        for (const fileName of componentManifestDelete) {
          const client = ssrManifest[fileName];
          for (const exportName in client) {
            delete serverManifest[`${fileName}#${exportName}`];
          }
          delete ssrManifest[fileName];
        }
      }
    }
  };
  return server_exports;
})
