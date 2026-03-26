// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ProcessObjectInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  const EventEmitter = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96/*node:events*/) || __intrinsic__createInternalModuleById(96/*node:events*/));
  const setRef = __intrinsic__lazy(149);
  return new (class Control extends EventEmitter {
    constructor() {
      super();
    }

    ref() {
      setRef(true);
    }

    unref() {
      setRef(false);
    }
  })();
}).$$capture_end$$;
