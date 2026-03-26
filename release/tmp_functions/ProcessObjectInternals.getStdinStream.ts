// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ProcessObjectInternals.ts

const enum BunProcessStdinFdType {
  file = 0,
  pipe = 1,
  socket = 2,
}
// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(process,fd,isTTY,fdType,) {  !(IS_BUN_DEVELOPMENT?$assert(fd === 0,"fd === 0"):void 0);
  const native = Bun.stdin.stream();
  const source = native.__intrinsic__bunNativePtr;

  var reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

  var shouldDisown = false;
  let needsInternalReadRefresh = false;
  // if true, while the stream is own()ed it will not
  let forceUnref = false;

  function own() {
    (IS_BUN_DEVELOPMENT?$debug_log("ref();", reader ? "already has reader" : "getting reader"):void 0);
    reader ??= native.getReader();
    source.updateRef(forceUnref ? false : true);
    source?.setFlowing?.(true);

    shouldDisown = false;
    if (needsInternalReadRefresh) {
      needsInternalReadRefresh = false;
      internalRead(stream);
    }
  }

  function disown() {
    (IS_BUN_DEVELOPMENT?$debug_log("unref();"):void 0);
    source?.setFlowing?.(false);

    if (reader) {
      try {
        reader.releaseLock();
        reader = undefined;
        (IS_BUN_DEVELOPMENT?$debug_log("released reader"):void 0);
      } catch (e: any) {
        (IS_BUN_DEVELOPMENT?$debug_log("reader lock cannot be released, waiting"):void 0);
        !(IS_BUN_DEVELOPMENT?$assert(e.message === "There are still pending read requests, cannot release the lock","e.message === \"There are still pending read requests, cannot release the lock\""):void 0);

        // Releasing the lock is not possible as there are active reads
        // we will instead pretend we are unref'd, and release the lock once the reads are finished.
        shouldDisown = true;
        source?.updateRef?.(false);
      }
    } else if (source) {
      source.updateRef(false);
    }
  }

  const ReadStream = isTTY ? (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 124/*node:tty*/) || __intrinsic__createInternalModuleById(124/*node:tty*/)).ReadStream : (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 98/*node:fs*/) || __intrinsic__createInternalModuleById(98/*node:fs*/)).ReadStream;
  const stream = new ReadStream(null, { fd, autoClose: false });

  const originalOn = stream.on;

  let stream_destroyed = false;
  let stream_endEmitted = false;
  stream.addListener = stream.on = function (event, listener) {
    // Streams don't generally required to present any data when only
    // `readable` events are present, i.e. `readableFlowing === false`
    //
    // However, Node.js has a this quirk whereby `process.stdin.read()`
    // blocks under TTY mode, thus looping `.read()` in this particular
    // case would not result in truncation.
    //
    // Therefore the following hack is only specific to `process.stdin`
    // and does not apply to the underlying Stream implementation.
    if (event === "readable") {
      own();
    }
    return originalOn.__intrinsic__call(this, event, listener);
  };

  stream.fd = fd;

  // tty.ReadStream is supposed to extend from net.Socket.
  // but we haven't made that work yet. Until then, we need to manually add some of net.Socket's methods
  if (isTTY || fdType !== BunProcessStdinFdType.file) {
    stream.ref = function () {
      forceUnref = false;
      own();
      return this;
    };

    stream.unref = function () {
      forceUnref = true;
      source?.updateRef?.(false);
      return this;
    };
  }

  const originalPause = stream.pause;
  stream.pause = function () {
    return originalPause.__intrinsic__call(this);
  };

  const originalResume = stream.resume;
  stream.resume = function () {
    own();
    return originalResume.__intrinsic__call(this);
  };

  async function internalRead(stream) {
    (IS_BUN_DEVELOPMENT?$debug_log("internalRead();"):void 0);
    try {
      !(IS_BUN_DEVELOPMENT?$assert(reader,"reader"):void 0);
      const { value } = await reader.read();

      if (value) {
        stream.push(value);

        if (shouldDisown) disown();
      } else {
        if (!stream_endEmitted) {
          stream_endEmitted = true;
          stream.emit("end");
        }
        if (!stream_destroyed) {
          stream_destroyed = true;
          stream.destroy();
          disown();
        }
      }
    } catch (err) {
      if (err?.code === "ERR_STREAM_RELEASE_LOCK") {
        // The stream was unref()ed. It may be ref()ed again in the future,
        // or maybe it has already been ref()ed again and we just need to
        // restart the internalRead() function. triggerRead() will figure that out.
        triggerRead.__intrinsic__call(stream, undefined);
        return;
      }
      stream.destroy(err);
    }
  }

  function triggerRead(_size) {
    (IS_BUN_DEVELOPMENT?$debug_log("_read();", reader):void 0);

    if (reader && !shouldDisown) {
      internalRead(this);
    } else {
      // The stream has not been ref()ed yet. If it is ever ref()ed,
      // run internalRead()
      needsInternalReadRefresh = true;
    }
  }
  stream._read = triggerRead;

  stream.on("resume", () => {
    if (stream.isPaused()) return; // fake resume
    (IS_BUN_DEVELOPMENT?$debug_log('on("resume");'):void 0);
    own();
    stream._undestroy();
    stream_destroyed = false;
  });

  stream._readableState.reading = false;

  stream.on("pause", () => {
    process.nextTick(() => {
      // Only disown if the stream is still paused (not resumed in the meantime)
      if (!stream.readableFlowing) {
        stream._readableState.reading = false;
        disown();
      }
    });
  });

  stream.on("close", () => {
    if (!stream_destroyed) {
      stream_destroyed = true;
      process.nextTick(() => {
        stream.destroy();
        disown();
      });
    }
  });

  return stream;
}).$$capture_end$$;
