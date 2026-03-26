// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/BakeSSRResponse.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(component,responseObject,responseOptions,kind,) {  const bakeGetAsyncLocalStorage = __intrinsic__lazy(147);

  return function () {
    // For Response.redirect() / Response.render(), throw the response object so
    // we can stop React from rendering
    if (kind === 1 /* JSBakeResponseKind.Redirect */) {
      throw responseObject;
    }

    if (kind === 2 /* JSBakeResponseKind.Render */) {
      throw responseObject;
    }

    // For new Response(<jsx />, {}), update AsyncLocalStorage
    const async_local_storage = bakeGetAsyncLocalStorage();
    if (async_local_storage) {
      const store = async_local_storage.getStore();
      if (store) {
        store.responseOptions = responseOptions;
      }
    }
    return component;
  };
}).$$capture_end$$;
