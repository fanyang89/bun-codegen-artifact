// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  if (!__intrinsic__isReadableStream(stream)) throw __intrinsic__makeErrorWithCode(118, "stream", "ReadableStream", typeof stream);
  // this is a direct stream
  var underlyingSource = __intrinsic__getByIdDirectPrivate(stream, "underlyingSource");
  if (underlyingSource != null) {
    return __intrinsic__readableStreamToArrayBufferDirect(stream, underlyingSource, false);
  }
  if (__intrinsic__isReadableStreamLocked(stream)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "ReadableStream is locked"));

  let result = __intrinsic__tryUseReadableStreamBufferedFastPath(stream, "arrayBuffer");

  if (result) {
    return result;
  }

  result = Bun.readableStreamToArray(stream);

  function toArrayBuffer(result: unknown[]) {
    switch (result.length) {
      case 0: {
        return new ArrayBuffer(0);
      }
      case 1: {
        const view = result[0];
        if (view instanceof ArrayBuffer || view instanceof SharedArrayBuffer) {
          return view;
        }

        if (ArrayBuffer.isView(view)) {
          const buffer = view.buffer;
          const byteOffset = view.byteOffset;
          const byteLength = view.byteLength;
          if (byteOffset === 0 && byteLength === buffer.byteLength) {
            return buffer;
          }

          return buffer.slice(byteOffset, byteOffset + byteLength);
        }

        if (typeof view === "string") {
          return new TextEncoder().encode(view);
        }
      }
      default: {
        let anyStrings = false;
        for (const chunk of result) {
          if (typeof chunk === "string") {
            anyStrings = true;
            break;
          }
        }

        if (!anyStrings) {
          return Bun.concatArrayBuffers(result, false);
        }

        const sink = new Bun.ArrayBufferSink();
        sink.start();

        for (const chunk of result) {
          sink.write(chunk);
        }

        return sink.end() as Uint8Array;
      }
    }
  }

  if (__intrinsic__isPromise(result)) {
    const completedResult = Bun.peek(result);
    if (completedResult !== result) {
      result = completedResult;
    } else {
      return result.then(toArrayBuffer);
    }
  }
  return __intrinsic__createFulfilledPromise(toArrayBuffer(result));
}).$$capture_end$$;
