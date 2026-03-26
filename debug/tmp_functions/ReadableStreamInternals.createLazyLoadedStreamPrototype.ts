// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  const closer = [false];

  function callClose(controller: ReadableStreamDefaultController) {
    try {
      var source = controller.__intrinsic__underlyingSource;
      const stream = __intrinsic__getByIdDirectPrivate(controller, "controlledReadableStream");
      if (!stream) {
        return;
      }

      if (__intrinsic__getByIdDirectPrivate(stream, "state") !== __intrinsic__streamReadable) return;
      controller.close();
    } catch (e) {
      globalThis.reportError(e);
    } finally {
      if (source?.__intrinsic__stream) {
        source.__intrinsic__stream = undefined;
      }

      if (source) {
        source.__intrinsic__data = undefined;
      }
    }
  }

  // This was a type: "bytes" until Bun v1.1.44, but pendingPullIntos was not really
  // compatible with how we send data to the stream, and "mode: 'byob'" wasn't
  // supported so changing it isn't an observable change.
  //
  // When we receive chunks of data from native code, we sometimes read more
  // than what the input buffer provided. When that happens, we return a typed
  // array instead of the number of bytes read.
  //
  // When that happens, the ReadableByteStreamController creates (byteLength / autoAllocateChunkSize) pending pull into descriptors.
  // So if that number is something like 16 * 1024, and we actually read 2 MB, you're going to create 128 pending pull into descriptors.
  //
  // And those pendingPullIntos were often never actually drained.
  class NativeReadableStreamSource {
    constructor(handle, autoAllocateChunkSize, drainValue) {
      __intrinsic__putByIdDirectPrivate(this, "stream", handle);
      this.pull = this.#pull.bind(this);
      this.cancel = this.#cancel.bind(this);
      this.autoAllocateChunkSize = autoAllocateChunkSize;

      if (drainValue !== undefined) {
        this.start = controller => {
          this.start = undefined;
          this.#controller = new WeakRef(controller);
          controller.enqueue(drainValue);
        };
      }

      handle.onClose = this.#onClose.bind(this);
      handle.onDrain = this.#onDrain.bind(this);
    }

    #onDrain(chunk) {
      var controller = this.#controller?.deref?.();
      if (controller) {
        controller.enqueue(chunk);
      }
    }

    #hasResized = false;

    #adjustHighWaterMark(result) {
      const autoAllocateChunkSize = this.autoAllocateChunkSize;
      if (result >= autoAllocateChunkSize && !this.#hasResized) {
        this.#hasResized = true;
        this.autoAllocateChunkSize = Math.min(autoAllocateChunkSize * 2, 1024 * 1024 * 2);
      }
    }

    #controller?: WeakRef<ReadableStreamDefaultController>;

    // eslint-disable-next-line no-unused-vars
    pull;
    // eslint-disable-next-line no-unused-vars
    cancel;
    // eslint-disable-next-line no-unused-vars
    start;

    autoAllocateChunkSize = 0;
    #closed = false;

    __intrinsic__data?: Uint8Array;

    // @ts-ignore-next-line
    __intrinsic__stream: ReadableStream;

    #onClose() {
      this.#closed = true;
      this.#controller = undefined;
      this.__intrinsic__data = undefined;

      var controller = this.#controller?.deref?.();

      __intrinsic__putByIdDirectPrivate(this, "stream", undefined);
      if (controller) {
        __intrinsic__enqueueJob(callClose, controller);
      }
    }

    #getInternalBuffer(chunkSize) {
      var chunk = this.__intrinsic__data;
      if (!chunk || chunk.length < chunkSize) {
        this.__intrinsic__data = chunk = new Uint8Array(chunkSize);
      }
      return chunk;
    }

    #handleArrayBufferViewResult(result, view, isClosed, controller) {
      if (result.byteLength > 0) {
        controller.enqueue(result);
      }

      if (isClosed) {
        __intrinsic__enqueueJob(callClose, controller);
        return undefined;
      }

      return view;
    }

    #handleNumberResult(result, view, isClosed, controller) {
      if (result > 0) {
        const remaining = view.length - result;
        let toEnqueue = view;

        if (remaining > 0) {
          toEnqueue = view.subarray(0, result);
          view = view.subarray(result);
        } else {
          view = undefined;
        }

        controller.enqueue(toEnqueue);
      }

      if (isClosed) {
        __intrinsic__enqueueJob(callClose, controller);
        return undefined;
      }

      return view;
    }

    #onNativeReadableStreamResult(result, view, isClosed, controller) {
      if (typeof result === "number") {
        if (!isClosed) this.#adjustHighWaterMark(result);
        return this.#handleNumberResult(result, view, isClosed, controller);
      } else if (typeof result === "boolean") {
        __intrinsic__enqueueJob(callClose, controller);
        return undefined;
      } else if (__intrinsic__isTypedArrayView(result)) {
        if (!isClosed) this.#adjustHighWaterMark(result.byteLength);
        return this.#handleArrayBufferViewResult(result, view, isClosed, controller);
      }

      (IS_BUN_DEVELOPMENT?$debug_log("Unknown result type", result):void 0);
      throw __intrinsic__makeErrorWithCode(135, "Internal error: invalid result from pull. This is a bug in Bun. Please report it.");
    }

    #pull(controller) {
      var handle = __intrinsic__getByIdDirectPrivate(this, "stream");

      if (!handle || this.#closed) {
        this.#controller = undefined;
        this.#closed = true;
        __intrinsic__putByIdDirectPrivate(this, "stream", undefined);
        __intrinsic__enqueueJob(callClose, controller);
        this.__intrinsic__data = undefined;
        return;
      }

      if (!this.#controller) {
        this.#controller = new WeakRef(controller);
      }

      closer[0] = false;

      if (this.__intrinsic__data) {
        let drainResult = handle.drain();
        if (drainResult) {
          this.__intrinsic__data = this.#onNativeReadableStreamResult(drainResult, this.__intrinsic__data, closer[0], controller);
          return;
        }
      }

      const view = this.#getInternalBuffer(this.autoAllocateChunkSize);
      const result = handle.pull(view, closer);
      if (__intrinsic__isPromise(result)) {
        return result.__intrinsic__then(
          result => {
            this.__intrinsic__data = this.#onNativeReadableStreamResult(result, view, closer[0], controller);
            if (this.#closed) {
              this.__intrinsic__data = undefined;
            }
          },
          err => {
            this.__intrinsic__data = undefined;
            this.#closed = true;
            this.#controller = undefined;
            controller.error(err);
            this.#onClose();
          },
        );
      }

      this.__intrinsic__data = this.#onNativeReadableStreamResult(result, view, closer[0], controller);
      if (this.#closed) {
        this.__intrinsic__data = undefined;
      }
    }

    #cancel(reason) {
      var handle = __intrinsic__getByIdDirectPrivate(this, "stream");
      this.__intrinsic__data = undefined;
      if (handle) {
        handle.updateRef(false);
        handle.cancel(reason);
        __intrinsic__putByIdDirectPrivate(this, "stream", undefined);
      }
    }
  }
  // this is reuse of an existing private symbol
  NativeReadableStreamSource.prototype.__intrinsic__resume = function (has_ref) {
    var handle = __intrinsic__getByIdDirectPrivate(this, "stream");
    if (handle) handle.updateRef(has_ref);
  };

  return NativeReadableStreamSource;
}).$$capture_end$$;
