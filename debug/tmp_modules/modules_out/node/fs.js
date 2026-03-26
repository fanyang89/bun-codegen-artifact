// @bun
// build/debug/tmp_modules/node/fs.ts
var $;
var EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var promises = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 97) || __intrinsic__createInternalModuleById(97);
var types = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144);
var { validateFunction, validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var kEmptyObject = Object.freeze(Object.create(null));
var isDate = types.isDate;
var { fs } = promises.__intrinsic__data;
var constants = __intrinsic__processBindingConstants.fs;
var _lazyGlob;
function lazyGlob() {
  return _lazyGlob ??= __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 22) || __intrinsic__createInternalModuleById(22);
}
function ensureCallback(callback) {
  if (!__intrinsic__isCallable(callback)) {
    throw __intrinsic__makeErrorWithCode(118, "cb", "function", callback);
  }
  return callback;
}
function nullcallback(callback) {
  return FunctionPrototypeBind.__intrinsic__call(callback, __intrinsic__undefined, null);
}
var FunctionPrototypeBind = nullcallback.bind;

class FSWatcher extends EventEmitter {
  #watcher;
  #listener;
  constructor(path, options, listener) {
    super();
    if (path instanceof URL) {
      path = Bun.fileURLToPath(path);
    } else if (typeof path === "string" && path.startsWith("file:")) {
      path = Bun.fileURLToPath(path);
    }
    if (typeof options === "function") {
      listener = options;
      options = {};
    } else if (typeof options === "string") {
      options = { encoding: options };
    }
    if (typeof listener !== "function") {
      listener = () => {};
    }
    this.#listener = listener;
    try {
      this.#watcher = fs.watch(path, options || {}, this.#onEvent.bind(this));
    } catch (e) {
      e.path = path;
      e.filename = path;
      throw e;
    }
  }
  #onEvent(eventType, filenameOrError) {
    if (eventType === "close") {
      queueMicrotask(() => {
        this.emit("close", filenameOrError);
      });
      return;
    } else if (eventType === "error") {
      if (filenameOrError.code === "EACCES")
        filenameOrError.code = "EPERM";
      this.emit(eventType, filenameOrError);
    } else {
      this.emit("change", eventType, filenameOrError);
      this.#listener(eventType, filenameOrError);
    }
  }
  close() {
    this.#watcher?.close();
    this.#watcher = null;
  }
  ref() {
    this.#watcher?.ref();
  }
  unref() {
    this.#watcher?.unref();
  }
  start() {}
}
function openAsBlob(path, options) {
  return __intrinsic__Promise.__intrinsic__resolve(Bun.file(path, options));
}
function emitStop(self) {
  self.emit("stop");
}

class StatWatcher extends EventEmitter {
  _handle;
  constructor(path, options) {
    super();
    this._handle = fs.watchFile(path, options, this.#onChange.bind(this));
  }
  #onChange(curr, prev) {
    this.emit("change", curr, prev);
  }
  start() {}
  stop() {
    if (!this._handle)
      return;
    process.nextTick(emitStop, this);
    this._handle.close();
    this._handle = null;
  }
  ref() {
    this._handle?.ref();
  }
  unref() {
    this._handle?.unref();
  }
}
var access = function access2(path, mode, callback) {
  if (__intrinsic__isCallable(mode)) {
    callback = mode;
    mode = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.access(path, mode).then(callback, callback);
};
var appendFile = function appendFile2(path, data, options, callback) {
  if (!__intrinsic__isCallable(callback)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.appendFile(path, data, options).then(nullcallback(callback), callback);
};
var close = function close2(fd, callback) {
  if (__intrinsic__isCallable(callback)) {
    fs.close(fd).then(() => callback(null), callback);
  } else if (callback === __intrinsic__undefined) {
    fs.close(fd).then(() => {});
  } else {
    callback = ensureCallback(callback);
  }
};
var rm = function rm2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.rm(path, options).then(nullcallback(callback), callback);
};
var rmdir = function rmdir2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  fs.rmdir(path, options).then(nullcallback(callback), callback);
};
var copyFile = function copyFile2(src, dest, mode, callback) {
  if (__intrinsic__isCallable(mode)) {
    callback = mode;
    mode = 0;
  }
  ensureCallback(callback);
  fs.copyFile(src, dest, mode).then(nullcallback(callback), callback);
};
var exists = function exists2(path, callback) {
  ensureCallback(callback);
  try {
    fs.exists.__intrinsic__apply(fs, [path]).then((existed) => callback(existed), (_) => callback(false));
  } catch {
    callback(false);
  }
};
var chown = function chown2(path, uid, gid, callback) {
  ensureCallback(callback);
  fs.chown(path, uid, gid).then(nullcallback(callback), callback);
};
var chmod = function chmod2(path, mode, callback) {
  ensureCallback(callback);
  fs.chmod(path, mode).then(nullcallback(callback), callback);
};
var fchmod = function fchmod2(fd, mode, callback) {
  ensureCallback(callback);
  fs.fchmod(fd, mode).then(nullcallback(callback), callback);
};
var fchown = function fchown2(fd, uid, gid, callback) {
  ensureCallback(callback);
  fs.fchown(fd, uid, gid).then(nullcallback(callback), callback);
};
var fstat = function fstat2(fd, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  fs.fstat(fd, options).then(function(stats) {
    callback(null, stats);
  }, callback);
};
var fsync = function fsync2(fd, callback) {
  ensureCallback(callback);
  fs.fsync(fd).then(nullcallback(callback), callback);
};
var ftruncate = function ftruncate2(fd, len = 0, callback) {
  if (__intrinsic__isCallable(len)) {
    callback = len;
    len = 0;
  }
  ensureCallback(callback);
  fs.ftruncate(fd, len).then(nullcallback(callback), callback);
};
var futimes = function futimes2(fd, atime, mtime, callback) {
  ensureCallback(callback);
  fs.futimes(fd, atime, mtime).then(nullcallback(callback), callback);
};
var lchmod = constants.O_SYMLINK !== __intrinsic__undefined ? function lchmod2(path, mode, callback) {
  ensureCallback(callback);
  fs.lchmod(path, mode).then(nullcallback(callback), callback);
} : __intrinsic__undefined;
var lchown = function lchown2(path, uid, gid, callback) {
  ensureCallback(callback);
  fs.lchown(path, uid, gid).then(nullcallback(callback), callback);
};
var link = function link2(existingPath, newPath, callback) {
  ensureCallback(callback);
  fs.link(existingPath, newPath).then(nullcallback(callback), callback);
};
var mkdir = function mkdir2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.mkdir(path, options).then(nullcallback(callback), callback);
};
var mkdtemp = function mkdtemp2(prefix, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.mkdtemp(prefix, options).then(function(folder) {
    callback(null, folder);
  }, callback);
};
var open = function open2(path, flags, mode, callback) {
  if (arguments.length < 3) {
    callback = flags;
  } else if (__intrinsic__isCallable(mode)) {
    callback = mode;
    mode = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.open(path, flags, mode).then(function(fd) {
    callback(null, fd);
  }, callback);
};
var fdatasync = function fdatasync2(fd, callback) {
  ensureCallback(callback);
  fs.fdatasync(fd).then(nullcallback(callback), callback);
};
var read = function read2(fd, buffer, offsetOrOptions, length, position, callback) {
  let offset = offsetOrOptions;
  let params = null;
  if (arguments.length <= 4) {
    if (arguments.length === 4) {
      if (typeof params !== "object" || __intrinsic__isArray(params)) {
        throw __intrinsic__makeErrorWithCode(118, "options", "object", params);
      }
      callback = length;
      params = offsetOrOptions;
    } else if (arguments.length === 3) {
      if (!types.isArrayBufferView(buffer)) {
        params = buffer;
        ({ buffer = __intrinsic__Buffer.alloc(16384) } = params ?? {});
      }
      callback = offsetOrOptions;
    } else {
      callback = buffer;
      buffer = __intrinsic__Buffer.alloc(16384);
    }
    if (params !== __intrinsic__undefined) {
      if (typeof params !== "object" || __intrinsic__isArray(params)) {
        throw __intrinsic__makeErrorWithCode(118, "options", "object", params);
      }
    }
    ({ offset = 0, length = buffer?.byteLength - offset, position = null } = params ?? {});
  }
  if (!callback) {
    throw __intrinsic__makeErrorWithCode(118, "callback", "function", callback);
  }
  fs.read(fd, buffer, offset, length, position).then((bytesRead) => void callback(null, bytesRead, buffer), (err) => callback(err));
};
var write = function write2(fd, buffer, offsetOrOptions, length, position, callback) {
  function wrapper(bytesWritten) {
    callback(null, bytesWritten, buffer);
  }
  if (__intrinsic__isTypedArrayView(buffer)) {
    callback ||= position || length || offsetOrOptions;
    ensureCallback(callback);
    if (typeof offsetOrOptions === "object") {
      ({
        offset: offsetOrOptions = 0,
        length = buffer.byteLength - offsetOrOptions,
        position = null
      } = offsetOrOptions ?? {});
    }
    fs.write(fd, buffer, offsetOrOptions, length, position).then(wrapper, callback);
    return;
  }
  if (!__intrinsic__isCallable(position)) {
    if (__intrinsic__isCallable(offsetOrOptions)) {
      position = offsetOrOptions;
      offsetOrOptions = __intrinsic__undefined;
    } else {
      position = length;
    }
    length = "utf8";
  }
  callback = position;
  ensureCallback(callback);
  fs.write(fd, buffer, offsetOrOptions, length).then(wrapper, callback);
};
var readdir = function readdir2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.readdir(path, options).then(function(files) {
    callback(null, files);
  }, callback);
};
var readFile = function readFile2(path, options, callback) {
  callback ||= options;
  ensureCallback(callback);
  fs.readFile(path, options).then(function(data) {
    callback(null, data);
  }, callback);
};
var writeFile = function writeFile2(path, data, options, callback) {
  callback ||= options;
  ensureCallback(callback);
  fs.writeFile(path, data, options).then(nullcallback(callback), callback);
};
var readlink = function readlink2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.readlink(path, options).then(function(linkString) {
    callback(null, linkString);
  }, callback);
};
var rename = function rename2(oldPath, newPath, callback) {
  ensureCallback(callback);
  fs.rename(oldPath, newPath).then(nullcallback(callback), callback);
};
var lstat = function lstat2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.lstat(path, options).then(function(stats) {
    callback(null, stats);
  }, callback);
};
var stat = function stat2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.stat(path, options).then(function(stats) {
    callback(null, stats);
  }, callback);
};
var statfs = function statfs2(path, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.statfs(path, options).then(function(stats) {
    callback(null, stats);
  }, callback);
};
var symlink = function symlink2(target, path, type, callback) {
  if (callback === __intrinsic__undefined) {
    callback = type;
    ensureCallback(callback);
    type = __intrinsic__undefined;
  }
  fs.symlink(target, path, type).then(callback, callback);
};
var truncate = function truncate2(path, len, callback) {
  if (typeof path === "number") {
    ftruncate(path, len, callback);
    return;
  }
  if (__intrinsic__isCallable(len)) {
    callback = len;
    len = 0;
  } else if (len === __intrinsic__undefined) {
    len = 0;
  }
  ensureCallback(callback);
  fs.truncate(path, len).then(nullcallback(callback), callback);
};
var unlink = function unlink2(path, callback) {
  ensureCallback(callback);
  fs.unlink(path).then(nullcallback(callback), callback);
};
var utimes = function utimes2(path, atime, mtime, callback) {
  ensureCallback(callback);
  fs.utimes(path, atime, mtime).then(nullcallback(callback), callback);
};
var lutimes = function lutimes2(path, atime, mtime, callback) {
  ensureCallback(callback);
  fs.lutimes(path, atime, mtime).then(nullcallback(callback), callback);
};
var accessSync = fs.accessSync.bind(fs);
var appendFileSync = fs.appendFileSync.bind(fs);
var closeSync = fs.closeSync.bind(fs);
var copyFileSync = fs.copyFileSync.bind(fs);
var existsSync = function existsSync2(_path) {
  try {
    return fs.existsSync.__intrinsic__apply(fs, arguments);
  } catch {
    return false;
  }
};
var chownSync = fs.chownSync.bind(fs);
var chmodSync = fs.chmodSync.bind(fs);
var fchmodSync = fs.fchmodSync.bind(fs);
var fchownSync = fs.fchownSync.bind(fs);
var fstatSync = fs.fstatSync.bind(fs);
var fsyncSync = fs.fsyncSync.bind(fs);
var ftruncateSync = fs.ftruncateSync.bind(fs);
var futimesSync = fs.futimesSync.bind(fs);
var lchmodSync = constants.O_SYMLINK !== __intrinsic__undefined ? fs.lchmodSync.bind(fs) : __intrinsic__undefined;
var lchownSync = fs.lchownSync.bind(fs);
var linkSync = fs.linkSync.bind(fs);
var lstatSync = fs.lstatSync.bind(fs);
var mkdirSync = fs.mkdirSync.bind(fs);
var mkdtempSync = fs.mkdtempSync.bind(fs);
var openSync = fs.openSync.bind(fs);
var readSync = function readSync2(fd, buffer, offsetOrOptions, length, position) {
  let offset = offsetOrOptions;
  if (arguments.length <= 3 || typeof offsetOrOptions === "object") {
    if (offsetOrOptions !== __intrinsic__undefined) {
      if (typeof offsetOrOptions !== "object" || __intrinsic__isArray(offsetOrOptions)) {
        throw __intrinsic__makeErrorWithCode(118, "options", "object", offsetOrOptions);
      }
    }
    ({ offset = 0, length = buffer.byteLength - offset, position = null } = offsetOrOptions ?? {});
  }
  return fs.readSync(fd, buffer, offset, length, position);
};
var writeSync = fs.writeSync.bind(fs);
var readdirSync = fs.readdirSync.bind(fs);
var readFileSync = fs.readFileSync.bind(fs);
var fdatasyncSync = fs.fdatasyncSync.bind(fs);
var writeFileSync = fs.writeFileSync.bind(fs);
var readlinkSync = fs.readlinkSync.bind(fs);
var renameSync = fs.renameSync.bind(fs);
var statSync = fs.statSync.bind(fs);
var statfsSync = fs.statfsSync.bind(fs);
var symlinkSync = fs.symlinkSync.bind(fs);
var truncateSync = fs.truncateSync.bind(fs);
var unlinkSync = fs.unlinkSync.bind(fs);
var utimesSync = fs.utimesSync.bind(fs);
var lutimesSync = fs.lutimesSync.bind(fs);
var rmSync = fs.rmSync.bind(fs);
var rmdirSync = fs.rmdirSync.bind(fs);
var writev = function writev2(fd, buffers, position, callback) {
  if (typeof position === "function") {
    callback = position;
    position = null;
  }
  callback = ensureCallback(callback);
  fs.writev(fd, buffers, position).__intrinsic__then((bytesWritten) => callback(null, bytesWritten, buffers), callback);
};
var writevSync = fs.writevSync.bind(fs);
var readv = function readv2(fd, buffers, position, callback) {
  if (typeof position === "function") {
    callback = position;
    position = null;
  }
  callback = ensureCallback(callback);
  fs.readv(fd, buffers, position).__intrinsic__then((bytesRead) => callback(null, bytesRead, buffers), callback);
};
var readvSync = fs.readvSync.bind(fs);
var Dirent = fs.Dirent;
var Stats = fs.Stats;
var watch = function watch2(path, options, listener) {
  return new FSWatcher(path, options, listener);
};
var opendir = function opendir2(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = __intrinsic__undefined;
  }
  validateFunction(callback, "callback");
  const result = new Dir(1, path, options);
  callback(null, result);
};
var { defineCustomPromisifyArgs } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 31) || __intrinsic__createInternalModuleById(31);
var kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
var existsCb = exists;
exists[kCustomPromisifiedSymbol] = {
  exists(path) {
    return new __intrinsic__Promise((resolve) => existsCb(path, resolve));
  }
}.exists;
defineCustomPromisifyArgs(read, ["bytesRead", "buffer"]);
defineCustomPromisifyArgs(readv, ["bytesRead", "buffers"]);
defineCustomPromisifyArgs(write, ["bytesWritten", "buffer"]);
defineCustomPromisifyArgs(writev, ["bytesWritten", "buffers"]);
var statWatchers = new Map;
function getValidatedPath(p) {
  if (p instanceof URL)
    return Bun.fileURLToPath(p);
  if (typeof p !== "string")
    throw __intrinsic__makeErrorWithCode(118, "path", "string or URL", p);
  if (p.startsWith("file:"))
    return Bun.fileURLToPath(p);
  return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107) || __intrinsic__createInternalModuleById(107)).resolve(p);
}
function watchFile(filename, options, listener) {
  filename = getValidatedPath(filename);
  if (typeof options === "function") {
    listener = options;
    options = {};
  }
  if (typeof listener !== "function") {
    throw __intrinsic__makeErrorWithCode(118, "listener", "function", listener);
  }
  var stat3 = statWatchers.get(filename);
  if (!stat3) {
    stat3 = new StatWatcher(filename, options);
    statWatchers.set(filename, stat3);
  }
  stat3.addListener("change", listener);
  return stat3;
}
function unwatchFile(filename, listener) {
  filename = getValidatedPath(filename);
  var stat3 = statWatchers.get(filename);
  if (!stat3)
    return throwIfNullBytesInFileName(filename);
  if (listener) {
    stat3.removeListener("change", listener);
    if (stat3.listenerCount("change") !== 0) {
      return;
    }
  } else {
    stat3.removeAllListeners("change");
  }
  stat3.stop();
  statWatchers.delete(filename);
}
function throwIfNullBytesInFileName(filename) {
  if (filename.indexOf("\x00") !== -1) {
    throw __intrinsic__makeErrorWithCode(119, "path", "string without null bytes", filename);
  }
}
function createReadStream(path, options) {
  return new exports.ReadStream(path, options);
}
function createWriteStream(path, options) {
  return new exports.WriteStream(path, options);
}
var realpathSync = fs.realpathSync.bind(fs);
var realpath = function realpath2(p, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.realpath(p, options, false).then(function(resolvedPath) {
    callback(null, resolvedPath);
  }, callback);
};
realpath.native = function realpath4(p, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  fs.realpathNative(p, options).then(function(resolvedPath) {
    callback(null, resolvedPath);
  }, callback);
};
realpathSync.native = fs.realpathNativeSync.bind(fs);
function cpSync(src, dest, options) {
  if (!options)
    return fs.cpSync(src, dest);
  if (typeof options !== "object") {
    __intrinsic__throwTypeError("options must be an object");
  }
  if (options.dereference || options.filter || options.preserveTimestamps || options.verbatimSymlinks) {
    return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 20) || __intrinsic__createInternalModuleById(20))(src, dest, options);
  }
  return fs.cpSync(src, dest, options.recursive, options.errorOnExist, options.force ?? true, options.mode);
}
function cp(src, dest, options, callback) {
  if (__intrinsic__isCallable(options)) {
    callback = options;
    options = __intrinsic__undefined;
  }
  ensureCallback(callback);
  promises.cp(src, dest, options).then(() => callback(), callback);
}
function _toUnixTimestamp(time, name = "time") {
  if (typeof time === "string" && +time == time) {
    return +time;
  }
  if (__intrinsic__isFinite(time)) {
    if (time < 0) {
      return Date.now() / 1000;
    }
    return time;
  }
  if (isDate(time)) {
    return time.getTime() / 1000;
  }
  throw __intrinsic__makeErrorWithCode(118, name, "number or Date", time);
}
function opendirSync(path, options) {
  return new Dir(1, path, options);
}

class Dir {
  #handle;
  #path;
  #options;
  #entries = null;
  constructor(handle, path, options) {
    if (__intrinsic__isUndefinedOrNull(handle))
      throw __intrinsic__makeErrorWithCode(150, "handle");
    validateInteger(handle, "handle", 0);
    this.#handle = __intrinsic__toLength(handle);
    this.#path = path;
    this.#options = options;
  }
  readSync() {
    if (this.#handle < 0)
      throw __intrinsic__makeErrorWithCode(52);
    let entries = this.#entries ??= fs.readdirSync(this.#path, {
      withFileTypes: true,
      encoding: this.#options?.encoding,
      recursive: this.#options?.recursive
    });
    return entries.shift() ?? null;
  }
  read(cb) {
    if (this.#handle < 0)
      throw __intrinsic__makeErrorWithCode(52);
    if (!__intrinsic__isUndefinedOrNull(cb)) {
      validateFunction(cb, "callback");
      return this.read().then((entry) => cb(null, entry));
    }
    if (this.#entries)
      return __intrinsic__Promise.__intrinsic__resolve(this.#entries.shift() ?? null);
    return fs.readdir(this.#path, {
      withFileTypes: true,
      encoding: this.#options?.encoding,
      recursive: this.#options?.recursive
    }).then((entries) => {
      this.#entries = entries;
      return entries.shift() ?? null;
    });
  }
  close(cb) {
    const handle = this.#handle;
    if (handle < 0)
      throw __intrinsic__makeErrorWithCode(52);
    if (!__intrinsic__isUndefinedOrNull(cb)) {
      validateFunction(cb, "callback");
      process.nextTick(cb);
    }
    if (handle > 2)
      fs.closeSync(handle);
    this.#handle = -1;
  }
  closeSync() {
    const handle = this.#handle;
    if (handle < 0)
      throw __intrinsic__makeErrorWithCode(52);
    if (handle > 2)
      fs.closeSync(handle);
    this.#handle = -1;
  }
  get path() {
    return this.#path;
  }
  async* [Symbol.asyncIterator]() {
    let entries = this.#entries ??= await fs.readdir(this.#path, {
      withFileTypes: true,
      encoding: this.#options?.encoding,
      recursive: this.#options?.recursive
    });
    yield* entries;
  }
}
function glob(pattern, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = __intrinsic__undefined;
  }
  validateFunction(callback, "callback");
  __intrinsic__Array.fromAsync(lazyGlob().glob(pattern, options ?? kEmptyObject)).then((result) => callback(null, result)).catch(callback);
}
function globSync(pattern, options) {
  return __intrinsic__Array.from(lazyGlob().globSync(pattern, options ?? kEmptyObject));
}
var exports = {
  appendFile,
  appendFileSync,
  access,
  accessSync,
  chown,
  chownSync,
  chmod,
  chmodSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  cp,
  cpSync,
  createReadStream,
  createWriteStream,
  exists,
  existsSync,
  fchown,
  fchownSync,
  fchmod,
  fchmodSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  glob,
  globSync,
  lchown,
  lchownSync,
  lchmod,
  lchmodSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  lutimes,
  lutimesSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  read,
  readFile,
  readFileSync,
  readSync,
  readdir,
  readdirSync,
  readlink,
  readlinkSync,
  readv,
  readvSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statfs,
  statSync,
  statfsSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  unwatchFile,
  utimes,
  utimesSync,
  watch,
  watchFile,
  write,
  writeFile,
  writeFileSync,
  writeSync,
  writev,
  writevSync,
  _toUnixTimestamp,
  openAsBlob,
  Dirent,
  opendir,
  opendirSync,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  constants,
  Dir,
  Stats,
  get ReadStream() {
    return exports.ReadStream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).ReadStream;
  },
  set ReadStream(value) {
    Object.defineProperty(exports, "ReadStream", {
      value,
      writable: true,
      configurable: true
    });
  },
  get WriteStream() {
    return exports.WriteStream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).WriteStream;
  },
  set WriteStream(value) {
    Object.defineProperty(exports, "WriteStream", {
      value,
      writable: true,
      configurable: true
    });
  },
  get FileReadStream() {
    return exports.FileReadStream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).ReadStream;
  },
  set FileReadStream(value) {
    Object.defineProperty(exports, "FileReadStream", {
      value,
      writable: true,
      configurable: true
    });
  },
  get FileWriteStream() {
    return exports.FileWriteStream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).WriteStream;
  },
  set FileWriteStream(value) {
    Object.defineProperty(exports, "FileWriteStream", {
      value,
      writable: true,
      configurable: true
    });
  },
  promises
};
$ = exports;
function setName(fn, value) {
  Object.__intrinsic__defineProperty(fn, "name", { value, enumerable: false, configurable: true });
}
setName(Dirent, "Dirent");
setName(FSWatcher, "FSWatcher");
setName(Stats, "Stats");
setName(_toUnixTimestamp, "_toUnixTimestamp");
setName(access, "access");
setName(accessSync, "accessSync");
setName(appendFile, "appendFile");
setName(appendFileSync, "appendFileSync");
setName(chmod, "chmod");
setName(chmodSync, "chmodSync");
setName(chown, "chown");
setName(chownSync, "chownSync");
setName(close, "close");
setName(closeSync, "closeSync");
setName(copyFile, "copyFile");
setName(copyFileSync, "copyFileSync");
setName(cp, "cp");
setName(cpSync, "cpSync");
setName(createReadStream, "createReadStream");
setName(createWriteStream, "createWriteStream");
setName(exists, "exists");
setName(existsSync, "existsSync");
setName(fchmod, "fchmod");
setName(fchmodSync, "fchmodSync");
setName(fchown, "fchown");
setName(fchownSync, "fchownSync");
setName(fstat, "fstat");
setName(fstatSync, "fstatSync");
setName(fsync, "fsync");
setName(fsyncSync, "fsyncSync");
setName(ftruncate, "ftruncate");
setName(ftruncateSync, "ftruncateSync");
setName(futimes, "futimes");
setName(futimesSync, "futimesSync");
if (lchmod)
  setName(lchmod, "lchmod");
if (lchmodSync)
  setName(lchmodSync, "lchmodSync");
setName(lchown, "lchown");
setName(lchownSync, "lchownSync");
setName(link, "link");
setName(linkSync, "linkSync");
setName(lstat, "lstat");
setName(lstatSync, "lstatSync");
setName(lutimes, "lutimes");
setName(lutimesSync, "lutimesSync");
setName(mkdir, "mkdir");
setName(mkdirSync, "mkdirSync");
setName(mkdtemp, "mkdtemp");
setName(mkdtempSync, "mkdtempSync");
setName(open, "open");
setName(openSync, "openSync");
setName(read, "read");
setName(readFile, "readFile");
setName(readFileSync, "readFileSync");
setName(readSync, "readSync");
setName(readdir, "readdir");
setName(readdirSync, "readdirSync");
setName(readlink, "readlink");
setName(readlinkSync, "readlinkSync");
setName(readv, "readv");
setName(readvSync, "readvSync");
setName(realpath, "realpath");
setName(realpathSync, "realpathSync");
setName(rename, "rename");
setName(renameSync, "renameSync");
setName(rm, "rm");
setName(rmSync, "rmSync");
setName(rmdir, "rmdir");
setName(rmdirSync, "rmdirSync");
setName(stat, "stat");
setName(statfs, "statfs");
setName(statSync, "statSync");
setName(statfsSync, "statfsSync");
setName(symlink, "symlink");
setName(symlinkSync, "symlinkSync");
setName(truncate, "truncate");
setName(truncateSync, "truncateSync");
setName(unlink, "unlink");
setName(unlinkSync, "unlinkSync");
setName(unwatchFile, "unwatchFile");
setName(utimes, "utimes");
setName(utimesSync, "utimesSync");
setName(watch, "watch");
setName(watchFile, "watchFile");
setName(write, "write");
setName(writeFile, "writeFile");
setName(writeFileSync, "writeFileSync");
setName(writeSync, "writeSync");
setName(writev, "writev");
setName(writevSync, "writevSync");
setName(fdatasync, "fdatasync");
setName(fdatasyncSync, "fdatasyncSync");
setName(openAsBlob, "openAsBlob");
setName(opendir, "opendir");
$$EXPORT$$($).$$EXPORT_END$$;
