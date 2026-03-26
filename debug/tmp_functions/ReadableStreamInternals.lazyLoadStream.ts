// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,autoAllocateChunkSize) {  (IS_BUN_DEVELOPMENT?$debug_log("lazyLoadStream", stream, autoAllocateChunkSize):void 0);
  var handle = stream.__intrinsic__bunNativePtr;
  if (handle === -1) return;
  var Prototype = __intrinsic__lazyStreamPrototypeMap.__intrinsic__get(__intrinsic__getPrototypeOf(handle));
  if (Prototype === undefined) {
    __intrinsic__lazyStreamPrototypeMap.__intrinsic__set(__intrinsic__getPrototypeOf(handle), (Prototype = __intrinsic__createLazyLoadedStreamPrototype()));
  }

  stream.__intrinsic__disturbed = true;

  if (autoAllocateChunkSize === undefined) {
    // This default is what Node.js uses as well.
    autoAllocateChunkSize = 256 * 1024;
  }

  const chunkSizeOrCompleteBuffer = handle.start(autoAllocateChunkSize);
  let chunkSize, drainValue;
  if (__intrinsic__isTypedArrayView(chunkSizeOrCompleteBuffer)) {
    chunkSize = 0;
    drainValue = chunkSizeOrCompleteBuffer;
  } else {
    chunkSize = chunkSizeOrCompleteBuffer;
    drainValue = handle.drain();
  }

  // empty file, no need for native back-and-forth on this
  if (chunkSize === 0) {
    if ((drainValue?.byteLength ?? 0) > 0) {
      return {
        start(controller) {
          controller.enqueue(drainValue);
          controller.close();
        },
        pull(controller) {
          controller.close();
        },
      };
    }

    return {
      start(controller) {
        controller.close();
      },
      pull(controller) {
        controller.close();
      },
    };
  }

  return new Prototype(handle, Math.max(chunkSize, autoAllocateChunkSize), drainValue);
}).$$capture_end$$;
