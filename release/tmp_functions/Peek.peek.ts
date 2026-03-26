// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Peek.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(promise) {  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__promiseStatePending == 0,"$promiseStatePending == 0"):void 0);

  return __intrinsic__isPromise(promise) && __intrinsic__getPromiseInternalField(promise, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask
    ? __intrinsic__getPromiseInternalField(promise, __intrinsic__promiseFieldReactionsOrResult)
    : promise;
}).$$capture_end$$;
