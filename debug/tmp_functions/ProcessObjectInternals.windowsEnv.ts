// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ProcessObjectInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(internalEnv,envMapList,editWindowsEnvVar,) {  // The use of String(key) here is intentional because Node.js as of v21.5.0 will throw
  // on symbol keys as it seems they assume the user uses string keys:
  //
  // it throws "Cannot convert a Symbol value to a string"

  (internalEnv as any)[Bun.inspect.custom] = () => {
    let o = {};
    for (let k of envMapList) {
      o[k] = internalEnv[k.toUpperCase()];
    }
    return o;
  };

  (internalEnv as any).toJSON = () => {
    return { ...internalEnv };
  };

  return new Proxy(internalEnv, {
    get(_, p) {
      return typeof p === "string" ? internalEnv[p.toUpperCase()] : undefined;
    },
    set(_, p, value) {
      const k = String(p).toUpperCase();
      !(IS_BUN_DEVELOPMENT?$assert(typeof p === "string","typeof p === \"string\""):void 0); // proxy is only string and symbol. the symbol would have thrown by now
      value = String(value); // If toString() throws, we want to avoid it existing in the envMapList
      if (!(k in internalEnv) && !envMapList.includes(p)) {
        envMapList.push(p);
      }
      if (internalEnv[k] !== value) {
        editWindowsEnvVar(k, value);
        internalEnv[k] = value;
      }
      return true;
    },
    has(_, p) {
      return typeof p !== "symbol" ? String(p).toUpperCase() in internalEnv : false;
    },
    deleteProperty(_, p) {
      const k = String(p).toUpperCase();
      const i = envMapList.findIndex(x => x.toUpperCase() === k);
      if (i !== -1) {
        envMapList.splice(i, 1);
      }
      editWindowsEnvVar(k, null);
      return typeof p !== "symbol" ? delete internalEnv[k] : false;
    },
    defineProperty(_, p, attributes) {
      const k = String(p).toUpperCase();
      !(IS_BUN_DEVELOPMENT?$assert(typeof p === "string","typeof p === \"string\""):void 0); // proxy is only string and symbol. the symbol would have thrown by now
      if (!(k in internalEnv) && !envMapList.includes(p)) {
        envMapList.push(p);
      }
      editWindowsEnvVar(k, internalEnv[k]);
      return __intrinsic__Object.__intrinsic__defineProperty(internalEnv, k, attributes);
    },
    getOwnPropertyDescriptor(target, p) {
      return typeof p === "string" ? Reflect.getOwnPropertyDescriptor(target, p.toUpperCase()) : undefined;
    },
    ownKeys() {
      // .slice() because paranoia that there is a way to call this without the engine cloning it for us
      return envMapList.slice();
    },
  });
}).$$capture_end$$;
