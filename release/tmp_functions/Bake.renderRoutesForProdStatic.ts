// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Bake.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(async function(outBase,allServerFiles,// Indexed by router type index
  renderStatic,getParams,clientEntryUrl,// Indexed by route index
  patterns,files,typeAndFlags,sourceRouteFiles,paramInformation,styles,) {  (IS_BUN_DEVELOPMENT?$debug_log({
    outBase,
    allServerFiles,
    renderStatic,
    clientEntryUrl,
    patterns,
    files,
    typeAndFlags,
    sourceRouteFiles,
    paramInformation,
    styles,
  }):void 0);
  const { join: pathJoin } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107/*node:path*/) || __intrinsic__createInternalModuleById(107/*node:path*/));

  let loadedModules = new Array(allServerFiles.length);

  async function doGenerateRoute(
    type: number,
    noClient: boolean,
    i: number,
    layouts: any[],
    pageModule: any,
    params: Record<string, string | string[]> | null,
  ) {
    // Call the framework's rendering function
    const callback = renderStatic[type];
    !(IS_BUN_DEVELOPMENT?$assert(callback != null && __intrinsic__isCallable(callback),"callback != null && $isCallable(callback)"):void 0);
    let client = clientEntryUrl[type];
    const results = await callback({
      modules: client && !noClient ? [client] : [],
      modulepreload: [],
      styles: styles[i],
      layouts,
      pageModule,
      params,
    } satisfies Bake.RouteMetadata);
    if (results == null) {
      throw new Error(`Route ${JSON.stringify(sourceRouteFiles[i])} cannot be pre-rendered to a static page.`);
    }
    if (typeof results !== "object") {
      throw new Error(
        `Rendering route ${JSON.stringify(sourceRouteFiles[i])} did not return an object, got ${Bun.inspect(results)}. This is a bug in the framework.`,
      );
    }
    const { files } = results;
    if (files == null) {
      throw new Error(`Route ${JSON.stringify(sourceRouteFiles[i])} cannot be pre-rendered to a static page.`);
    }

    await Promise.all(
      Object.entries(files).map(([key, value]) => {
        if (params != null) {
          !(IS_BUN_DEVELOPMENT?$assert(patterns[i].includes(`:`),"patterns[i].includes(`:`)"):void 0);
          const newKey = patterns[i].replace(/:(\w+)/g, (_, p1) =>
            typeof params[p1] === "string" ? params[p1] : params[p1].join("/"),
          );
          return Bun.write(pathJoin(outBase, newKey + key), value);
        }
        return Bun.write(pathJoin(outBase, patterns[i] + key), value);
      }),
    );
  }

  function callRouteGenerator(
    type: number,
    noClient: boolean,
    i: number,
    layouts: any[],
    pageModule: any,
    params: Record<string, string | string[]>,
  ) {
    for (const param of paramInformation[i]!) {
      if (params[param] === undefined) {
        throw new Error(`Missing param ${param} for route ${JSON.stringify(sourceRouteFiles[i])}`);
      }
    }
    return doGenerateRoute(type, noClient, i, layouts, pageModule, params);
  }

  let modulesForFiles = [];
  for (const fileList of files) {
    !(IS_BUN_DEVELOPMENT?$assert(fileList.length > 0,"fileList.length > 0"):void 0);
    if (fileList.length > 1) {
      let anyPromise = false;
      let loaded = fileList.map(
        x => loadedModules[x] ?? ((anyPromise = true), import(allServerFiles[x]).then(x => (loadedModules[x] = x))),
      );
      modulesForFiles.push(anyPromise ? await Promise.all(loaded) : loaded);
    } else {
      const id = fileList[0];
      modulesForFiles.push([loadedModules[id] ?? (loadedModules[id] = await import(allServerFiles[id]))]);
    }
  }

  return Promise.all(
    modulesForFiles.map(async (modules, i) => {
      const typeAndFlag = typeAndFlags[i];
      const type = typeAndFlag & 0xff;
      const noClient = (typeAndFlag & 0b100000000) !== 0;

      let [pageModule, ...layouts] = modules;

      if (paramInformation[i] != null) {
        const getParam = getParams[type];
        !(IS_BUN_DEVELOPMENT?$assert(getParam != null && __intrinsic__isCallable(getParam),"getParam != null && $isCallable(getParam)"):void 0);
        const paramGetter: Bake.GetParamIterator = await getParam({
          pageModule,
          layouts,
        });
        let result;
        if (paramGetter[Symbol.asyncIterator] != undefined) {
          for await (const params of paramGetter) {
            result = callRouteGenerator(type, noClient, i, layouts, pageModule, params);
            if (__intrinsic__isPromise(result) && ((__intrinsic__getPromiseInternalField((result), __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) === __intrinsic__promiseStatePending)) {
              await result;
            }
          }
        } else if (paramGetter[Symbol.iterator] != undefined) {
          for (const params of paramGetter) {
            result = callRouteGenerator(type, noClient, i, layouts, pageModule, params);
            if (__intrinsic__isPromise(result) && ((__intrinsic__getPromiseInternalField((result), __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) === __intrinsic__promiseStatePending)) {
              await result;
            }
          }
        } else {
          await Promise.all(
            paramGetter.pages.map(params => {
              callRouteGenerator(type, noClient, i, layouts, pageModule, params);
            }),
          );
        }
      } else {
        await doGenerateRoute(type, noClient, i, layouts, pageModule, null);
      }
    }),
  );
}).$$capture_end$$;
