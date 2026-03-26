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

$$capture_start$$(function(process,fd,isTTY,fdType,) {  !(IS_BUN_DEVELOPMENT?$assert(fd === 1 || fd === 2,"fd === 1 || fd === 2", `Expected fd to be 1 or 2, got ${fd}`):void 0);

  let stream;
  if (isTTY) {
    const tty = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 124/*node:tty*/) || __intrinsic__createInternalModuleById(124/*node:tty*/));
    stream = new tty.WriteStream(fd);
    // TODO: this is the wrong place for this property.
    // but the TTY is technically duplex
    // see test-fs-syncwritestream.js
    stream.readable = true;
    process.on("SIGWINCH", () => {
      stream._refreshSize();
    });
    stream._type = "tty";
  } else {
    const fs = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 98/*node:fs*/) || __intrinsic__createInternalModuleById(98/*node:fs*/));
    stream = new fs.WriteStream(null, { autoClose: false, fd, __intrinsic__fastPath: true });
    stream.readable = false;
    stream._type = "fs";

    // When stdout/stderr are piped or connected to a socket, they should have Symbol.asyncIterator
    // to match Node.js behavior where they become Duplex streams (Socket)
    // But when redirected to a file, they shouldn't have it
    if (fdType === BunProcessStdinFdType.pipe || fdType === BunProcessStdinFdType.socket) {
      stream[Symbol.asyncIterator] = function () {
        return (async function* () {
          // stdout/stderr don't produce readable data, so yield nothing
        })();
      };
    }
  }

  if (fd === 1 || fd === 2) {
    stream.destroySoon = stream.destroy;
    stream._destroy = function (err, cb) {
      cb(err);
      this._undestroy();

      if (!this._writableState.emitClose) {
        process.nextTick(() => {
          this.emit("close");
        });
      }
    };
  }

  stream._isStdio = true;
  stream.fd = fd;

  const underlyingSink = stream[(__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23/*internal/fs/streams*/) || __intrinsic__createInternalModuleById(23/*internal/fs/streams*/)).kWriteStreamFastPath];
  !(IS_BUN_DEVELOPMENT?$assert(underlyingSink,"underlyingSink"):void 0);
  return [stream, underlyingSink];
}).$$capture_end$$;
