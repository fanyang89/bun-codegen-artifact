// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  if (!__intrinsic__isReadableStream(stream)) throw __intrinsic__makeErrorWithCode(118, "stream", "ReadableStream", typeof stream);
  if (__intrinsic__isReadableStreamLocked(stream)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "ReadableStream is locked"));
  let result = __intrinsic__tryUseReadableStreamBufferedFastPath(stream, "json");
  if (result) {
    return result;
  }

  let text = Bun.readableStreamToText(stream);
  const peeked = Bun.peek(text);
  if (peeked !== text) {
    try {
      return __intrinsic__createFulfilledPromise(globalThis.JSON.parse(peeked));
    } catch (e) {
      return Promise.__intrinsic__reject(e);
    }
  }

  return text.then(globalThis.JSON.parse);
}).$$capture_end$$;
