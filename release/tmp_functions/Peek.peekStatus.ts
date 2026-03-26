// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Peek.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(promise) {  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__promiseStatePending == 0,"$promiseStatePending == 0"):void 0);
  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__promiseStateFulfilled == 1,"$promiseStateFulfilled == 1"):void 0);
  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__promiseStateRejected == 2,"$promiseStateRejected == 2"):void 0);

  return ["pending", "fulfilled", "rejected"][
    __intrinsic__isPromise(promise) //
      ? __intrinsic__getPromiseInternalField(promise, __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask
      : 1
  ];
}).$$capture_end$$;
