(function (){"use strict";
let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[internal:fs/streams] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/internal/fs/streams.ts
var $;
var { Readable, Writable, finished } = @getInternalField(@internalModuleRegistry, 117) || @createInternalModuleById(117);
var fs = @getInternalField(@internalModuleRegistry, 98) || @createInternalModuleById(98);
var { read, write, fsync, writev } = fs;
var { FileHandle, kRef, kUnref, kFd } = fs.promises.@data;
var { validateInteger, validateInt32, validateFunction } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var kReadStreamFastPath = Symbol("kReadStreamFastPath");
var kWriteStreamFastPath = Symbol("kWriteStreamFastPath");
var kFs = Symbol("kFs");
var {
  read: fileHandlePrototypeRead,
  write: fileHandlePrototypeWrite,
  fsync: fileHandlePrototypeFsync,
  writev: fileHandlePrototypeWritev
} = FileHandle.prototype;
var fileHandleStreamFs = (fh) => ({
  read: fh.read === fileHandlePrototypeRead ? read : function(fd, buf, offset, length, pos, cb) {
    return fh.read(buf, offset, length, pos).then(({ bytesRead, buffer }) => cb(null, bytesRead, buffer), (err) => cb(err, 0, buf));
  },
  write: fh.write === fileHandlePrototypeWrite ? write : function(fd, buffer, offset, length, position, cb) {
    return fh.write(buffer, offset, length, position).then(({ bytesWritten, buffer: buffer2 }) => cb(null, bytesWritten, buffer2), (err) => cb(err, 0, buffer));
  },
  writev: fh.writev === fileHandlePrototypeWritev ? writev : @undefined,
  fsync: fh.sync === fileHandlePrototypeFsync ? fsync : function(fd, cb) {
    return fh.sync().then(() => cb(), cb);
  },
  close: streamFileHandleClose.bind(fh)
});
function streamFileHandleClose(fd, cb) {
  $assert(this[kFd] == fd, "this[kFd] == fd", "fd mismatch");
  this[kUnref]();
  this.close().then(() => cb(), cb);
}
function getValidatedPath(p) {
  if (p instanceof URL)
    return Bun.fileURLToPath(p);
  if (typeof p !== "string")
    throw @makeErrorWithCode(118, "path", "string or URL", p);
  return (@getInternalField(@internalModuleRegistry, 107) || @createInternalModuleById(107)).resolve(p);
}
function copyObject(source) {
  const target = {};
  for (const key in source)
    target[key] = source[key];
  return target;
}
function getStreamOptions(options, defaultOptions = {}) {
  if (options == null || typeof options === "function") {
    return defaultOptions;
  }
  if (typeof options === "string") {
    if (options !== "buffer" && !@Buffer.isEncoding(options)) {
      throw @makeErrorWithCode(119, "encoding", options, "is invalid encoding");
    }
    return { encoding: options };
  } else if (typeof options !== "object") {
    throw @makeErrorWithCode(118, "options", ["string", "Object"], options);
  }
  let { encoding, signal = true } = options;
  if (encoding && encoding !== "buffer" && !@Buffer.isEncoding(encoding)) {
    throw @makeErrorWithCode(119, "encoding", encoding, "is invalid encoding");
  }
  if (signal !== true && !signal) {
    throw @makeErrorWithCode(118, "signal", "AbortSignal", signal);
  }
  return options;
}
function ReadStream(path, options) {
  if (!(this instanceof ReadStream)) {
    return new ReadStream(path, options);
  }
  options = copyObject(getStreamOptions(options));
  options.decodeStrings = true;
  let { fd, autoClose, fs: customFs, start, end = @Infinity, encoding } = options;
  if (fd == null) {
    this[kFs] = customFs || fs;
    this.fd = null;
    this.path = getValidatedPath(path);
    const { flags, mode } = options;
    this.flags = flags === @undefined ? "r" : flags;
    this.mode = mode === @undefined ? 438 : mode;
    if (customFs) {
      validateFunction(customFs.open, "options.fs.open");
    }
  } else if (typeof options.fd === "number") {
    if (Object.is(fd, -0)) {
      fd = 0;
    } else {
      validateInt32(fd, "fd", 0, 2147483647);
    }
    this.fd = fd;
    this[kFs] = customFs || fs;
  } else if (typeof fd === "object" && fd instanceof FileHandle) {
    if (options.fs) {
      throw @makeErrorWithCode(149, "fs.FileHandle with custom fs operations");
    }
    this[kFs] = fileHandleStreamFs(fd);
    this.fd = fd[kFd];
    fd[kRef]();
    fd.on("close", this.close.bind(this));
  } else {
    throw @makeErrorWithCode(118, "options.fd", "number or FileHandle", fd);
  }
  if (customFs) {
    validateFunction(customFs.read, "options.fs.read");
  }
  $assert(this[kFs], "this[kFs]", "fs implementation was not assigned");
  if ((options.autoDestroy = autoClose === @undefined ? true : autoClose) && customFs) {
    validateFunction(customFs.close, "options.fs.close");
  }
  this.start = start;
  this.end = end;
  this.pos = @undefined;
  this.bytesRead = 0;
  if (start !== @undefined) {
    validateInteger(start, "start", 0);
    this.pos = start;
  }
  if (end === @undefined) {
    end = @Infinity;
  } else if (end !== @Infinity) {
    validateInteger(end, "end", 0);
    if (start !== @undefined && start > end) {
      throw @makeErrorWithCode(156, "start", `<= "end" (here: ${end})`, start);
    }
  }
  this[kReadStreamFastPath] = start === 0 && end === @Infinity && autoClose && !customFs && (encoding === "buffer" || encoding === "binary" || encoding == null || encoding === "utf-8" || encoding === "utf8");
  Readable.@call(this, options);
  return this;
}
@toClass(ReadStream, "ReadStream", Readable);
var readStreamPrototype = ReadStream.prototype;
Object.defineProperty(readStreamPrototype, "autoClose", {
  get() {
    return this._readableState.autoDestroy;
  },
  set(val) {
    this._readableState.autoDestroy = val;
  }
});
var streamNoop = function open() {};
function streamConstruct(callback) {
  const { fd } = this;
  if (typeof fd === "number") {
    callback();
    return;
  }
  const fastPath = this[kWriteStreamFastPath];
  if (this.open !== streamNoop) {
    const orgEmit = this.emit;
    this.emit = function(...args) {
      if (args[0] === "open") {
        this.emit = orgEmit;
        callback();
        orgEmit.@apply(this, args);
      } else if (args[0] === "error") {
        this.emit = orgEmit;
        callback(args[1]);
      } else {
        orgEmit.@apply(this, args);
      }
    };
    this.open();
  } else {
    if (fastPath) {
      callback();
      this.emit("open", this.fd);
      this.emit("ready");
      return;
    }
    this[kFs].open(this.path, this.flags, this.mode, (err, fd2) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd2;
        callback();
        this.emit("open", this.fd);
        this.emit("ready");
      }
    });
  }
}
readStreamPrototype.open = streamNoop;
readStreamPrototype._construct = streamConstruct;
readStreamPrototype._read = function(n) {
  n = this.pos !== @undefined ? @min(this.end - this.pos + 1, n) : @min(this.end - this.bytesRead + 1, n);
  if (n <= 0) {
    this.push(null);
    return;
  }
  const buf = @Buffer.allocUnsafeSlow(n);
  this[kFs].read(this.fd, buf, 0, n, this.pos, (er, bytesRead, buf2) => {
    if (er) {
      (@getInternalField(@internalModuleRegistry, 43) || @createInternalModuleById(43)).errorOrDestroy(this, er);
    } else if (bytesRead > 0) {
      if (this.pos !== @undefined) {
        this.pos += bytesRead;
      }
      this.bytesRead += bytesRead;
      if (bytesRead !== buf2.length) {
        const dst = @Buffer.allocUnsafeSlow(bytesRead);
        buf2.copy(dst, 0, 0, bytesRead);
        buf2 = dst;
      }
      this.push(buf2);
    } else {
      this.push(null);
    }
  });
};
readStreamPrototype._destroy = function(err, cb) {
  if (this[kReadStreamFastPath]) {
    this.once(kReadStreamFastPath, (er) => close(this, err || er, cb));
  } else {
    close(this, err, cb);
  }
};
readStreamPrototype.close = function(cb) {
  if (typeof cb === "function")
    finished(this, cb);
  this.destroy();
};
Object.defineProperty(readStreamPrototype, "pending", {
  get() {
    return this.fd == null;
  },
  configurable: true
});
function close(stream, err, cb) {
  const fastPath = stream[kWriteStreamFastPath];
  if (fastPath && fastPath !== true) {
    stream.fd = null;
    const maybePromise = fastPath.end(err);
    thenIfPromise(maybePromise, () => {
      cb(err);
    });
    return;
  }
  if (!stream.fd) {
    cb(err);
  } else if (stream.flush) {
    stream[kFs].fsync(stream.fd, (flushErr) => {
      closeAfterSync(stream, err || flushErr, cb);
    });
  } else {
    closeAfterSync(stream, err, cb);
  }
}
function closeAfterSync(stream, err, cb) {
  stream[kFs].close(stream.fd, (er) => {
    cb(er || err);
  });
  stream.fd = null;
}
ReadStream.prototype.pipe = function(dest, pipeOpts) {
  return Readable.prototype.pipe.@call(this, dest, pipeOpts);
};
function WriteStream(path, options) {
  if (!(this instanceof WriteStream)) {
    return new WriteStream(path, options);
  }
  let fastPath = options?.@fastPath;
  options = copyObject(getStreamOptions(options));
  options.decodeStrings = true;
  let { fd, autoClose, fs: customFs, start, flush } = options;
  if (fd == null) {
    this[kFs] = customFs || fs;
    this.fd = null;
    this.path = getValidatedPath(path);
    const { flags, mode } = options;
    this.flags = flags === @undefined ? "w" : flags;
    this.mode = mode === @undefined ? 438 : mode;
    if (customFs) {
      validateFunction(customFs.open, "options.fs.open");
    }
  } else if (typeof options.fd === "number") {
    if (Object.is(fd, -0)) {
      fd = 0;
    } else {
      validateInt32(fd, "fd", 0, 2147483647);
    }
    this.fd = fd;
    this[kFs] = customFs || fs;
  } else if (typeof fd === "object" && fd instanceof FileHandle) {
    if (options.fs) {
      throw @makeErrorWithCode(149, "fs.FileHandle with custom fs operations");
    }
    this[kFs] = customFs = fileHandleStreamFs(fd);
    fd[kRef]();
    fd.on("close", this.close.bind(this));
    this.fd = fd = fd[kFd];
  } else {
    throw @makeErrorWithCode(118, "options.fd", "number or FileHandle", fd);
  }
  const autoDestroy = autoClose = options.autoDestroy = autoClose === @undefined ? true : autoClose;
  if (customFs) {
    const { write: write2, writev: writev2, close: close2, fsync: fsync2 } = customFs;
    if (write2)
      validateFunction(write2, "options.fs.write");
    if (writev2)
      validateFunction(writev2, "options.fs.writev");
    if (autoDestroy)
      validateFunction(close2, "options.fs.close");
    if (flush)
      validateFunction(fsync2, "options.fs.fsync");
    if (!write2 && !writev2) {
      throw @makeErrorWithCode(118, "options.fs.write", "function", write2);
    }
  } else {
    this._writev = @undefined;
    $assert(this[kFs].write, "this[kFs].write", "assuming user does not delete fs.write!");
  }
  if (flush == null) {
    this.flush = false;
  } else {
    if (typeof flush !== "boolean")
      throw @makeErrorWithCode(118, "options.flush", "boolean", flush);
    this.flush = flush;
  }
  this.start = start;
  this.pos = @undefined;
  this.bytesWritten = 0;
  if (start !== @undefined) {
    validateInteger(start, "start", 0);
    this.pos = start;
  }
  if (fastPath) {
    this[kWriteStreamFastPath] = fd ? Bun.file(fd).writer() : true;
    this._write = underscoreWriteFast;
    this._writev = @undefined;
    this.write = writeFast;
  }
  Writable.@call(this, options);
  if (options.encoding) {
    this.setDefaultEncoding(options.encoding);
  }
  return this;
}
@toClass(WriteStream, "WriteStream", Writable);
var writeStreamPrototype = WriteStream.prototype;
writeStreamPrototype.open = streamNoop;
writeStreamPrototype._construct = streamConstruct;
function writeAll(data, size, pos, cb, retries = 0) {
  this[kFs].write(this.fd, data, 0, size, pos, (er, bytesWritten, buffer) => {
    if (er?.code === "EAGAIN") {
      er = null;
      bytesWritten = 0;
    }
    if (this.destroyed || er) {
      return cb(er || @makeErrorWithCode(228, "write"));
    }
    this.bytesWritten += bytesWritten;
    retries = bytesWritten ? 0 : retries + 1;
    size -= bytesWritten;
    pos += bytesWritten;
    if (retries > 5) {
      cb(new Error("write failed"));
    } else if (size) {
      writeAll.@call(this, buffer.slice(bytesWritten), size, pos, cb, retries);
    } else {
      cb();
    }
  });
}
function writevAll(chunks, size, pos, cb, retries = 0) {
  this[kFs].writev(this.fd, chunks, this.pos, (er, bytesWritten, buffers) => {
    if (er?.code === "EAGAIN") {
      er = null;
      bytesWritten = 0;
    }
    if (this.destroyed || er) {
      return cb(er || @makeErrorWithCode(228, "writev"));
    }
    this.bytesWritten += bytesWritten;
    retries = bytesWritten ? 0 : retries + 1;
    size -= bytesWritten;
    pos += bytesWritten;
    if (retries > 5) {
      cb(new Error("writev failed"));
    } else if (size) {
      writevAll.@call(this, [@Buffer.concat(buffers).slice(bytesWritten)], size, pos, cb, retries);
    } else {
      cb();
    }
  });
}
function _write(data, encoding, cb) {
  const fileSink = this[kWriteStreamFastPath];
  if (fileSink && fileSink !== true) {
    const maybePromise = fileSink.write(data);
    if (@isPromise(maybePromise)) {
      maybePromise.then(() => {
        this.emit("drain");
        cb(null);
      }).catch(cb);
      return false;
    } else {
      cb(null);
      return true;
    }
  } else {
    writeAll.@call(this, data, data.length, this.pos, (er) => {
      if (this.destroyed) {
        cb(er);
        return;
      }
      cb(er);
    });
    if (this.pos !== @undefined)
      this.pos += data.length;
  }
}
writeStreamPrototype._write = _write;
function underscoreWriteFast(data, encoding, cb) {
  let fileSink = this[kWriteStreamFastPath];
  if (!fileSink) {
    this._write = _write;
    return this._write(data, encoding, cb);
  }
  const hasCallback = typeof cb === "function";
  try {
    if (fileSink === true) {
      fileSink = this[kWriteStreamFastPath] = Bun.file(this.path).writer();
      this.fd = fileSink._getFd();
    }
    const maybePromise = fileSink.write(data);
    if (@isPromise(maybePromise)) {
      maybePromise.then(() => {
        if (cb)
          cb(null);
        this.emit("drain");
      }, (err) => {
        if (cb)
          cb(err);
        if (!hasCallback) {
          this.destroy(err);
        }
      });
      return false;
    } else {
      if (cb)
        process.nextTick(cb, null);
      return true;
    }
  } catch (e) {
    if (cb)
      process.nextTick(cb, e);
    if (!hasCallback) {
      this.destroy(e);
    }
    return false;
  }
}
var writablePrototypeWrite = Writable.prototype.write;
var kWriteMonkeyPatchDefense = Symbol("!");
function writeFast(data, encoding, cb) {
  if (this[kWriteMonkeyPatchDefense])
    return writablePrototypeWrite.@call(this, data, encoding, cb);
  if (typeof encoding === "function") {
    cb = encoding;
    encoding = @undefined;
  }
  const hasCallback = typeof cb === "function";
  if (!hasCallback) {
    cb = streamNoop;
  }
  const fileSink = this[kWriteStreamFastPath];
  if (fileSink && fileSink !== true) {
    const maybePromise = fileSink.write(data);
    if (@isPromise(maybePromise)) {
      maybePromise.then(() => {
        this.emit("drain");
        cb(null);
      }).catch((err) => {
        cb(err);
        if (!hasCallback) {
          this.destroy(err);
        }
      });
      return false;
    } else {
      cb(null);
      return true;
    }
  } else {
    const result = this._write(data, encoding, cb);
    if (this.write === writeFast) {
      this.write = writablePrototypeWrite;
    } else {
      this[kWriteMonkeyPatchDefense] = true;
    }
    return result;
  }
}
writeStreamPrototype._writev = function(data, cb) {
  const len = data.length;
  const chunks = new @Array(len);
  let size = 0;
  for (let i = 0;i < len; i++) {
    const chunk = data[i].chunk;
    chunks[i] = chunk;
    size += chunk.length;
  }
  const fileSink = this[kWriteStreamFastPath];
  if (fileSink && fileSink !== true) {
    const maybePromise = fileSink.write(@Buffer.concat(chunks));
    if (@isPromise(maybePromise)) {
      maybePromise.then(() => {
        this.emit("drain");
        cb(null);
      }).catch(cb);
      return false;
    } else {
      cb(null);
      return true;
    }
  } else {
    writevAll.@call(this, chunks, size, this.pos, (er) => {
      if (this.destroyed) {
        cb(er);
        return;
      }
      cb(er);
    });
    if (this.pos !== @undefined)
      this.pos += size;
  }
};
writeStreamPrototype._destroy = function(err, cb) {
  const sink = this[kWriteStreamFastPath];
  if (sink && sink !== true) {
    const end = sink.end(err);
    if (@isPromise(end)) {
      end.then(() => cb(err), cb);
      return;
    }
  }
  close(this, err, cb);
};
writeStreamPrototype.close = function(cb) {
  if (cb) {
    if (this.closed) {
      process.nextTick(cb);
      return;
    }
    this.on("close", cb);
  }
  if (!this.autoClose) {
    this.on("finish", this.destroy);
  }
  this.end();
};
writeStreamPrototype.destroySoon = writeStreamPrototype.end;
Object.defineProperty(writeStreamPrototype, "autoClose", {
  get() {
    return this._writableState.autoDestroy;
  },
  set(val) {
    this._writableState.autoDestroy = val;
  }
});
Object.defineProperty(writeStreamPrototype, "pending", {
  get() {
    return this.fd === null;
  },
  configurable: true
});
function thenIfPromise(maybePromise, cb) {
  $assert(typeof cb === "function", 'typeof cb === "function"', "cb is not a function");
  if (@isPromise(maybePromise)) {
    maybePromise.then(() => cb(null), cb);
  } else {
    process.nextTick(cb, null);
  }
}
function writableFromFileSink(fileSink) {
  $assert(typeof fileSink === "object", 'typeof fileSink === "object"', "fileSink is not an object");
  $assert(typeof fileSink.write === "function", 'typeof fileSink.write === "function"', "fileSink.write is not a function");
  $assert(typeof fileSink.end === "function", 'typeof fileSink.end === "function"', "fileSink.end is not a function");
  const w = new WriteStream("", { @fastPath: true });
  $assert(w[kWriteStreamFastPath] === true, "w[kWriteStreamFastPath] === true", "fast path not enabled");
  w[kWriteStreamFastPath] = fileSink;
  w.path = @undefined;
  return w;
}
$ = {
  ReadStream,
  WriteStream,
  kWriteStreamFastPath,
  writableFromFileSink
};
return $})
