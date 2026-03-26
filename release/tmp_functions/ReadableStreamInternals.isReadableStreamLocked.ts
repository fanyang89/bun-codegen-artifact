// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__isReadableStream(stream),"$isReadableStream(stream)"):void 0);
  return (
    // Case 1. Is there a reader actively using it?
    !!__intrinsic__getByIdDirectPrivate(stream, "reader") ||
    // Case 2. Has the native reader been released?
    // Case 3. Has it been converted into a Node.js NativeReadable?
    stream.__intrinsic__bunNativePtr === -1
  );
}).$$capture_end$$;
