(function (){"use strict";// build/debug/tmp_modules/node/tty.ts
var $;
var {
  setRawMode: ttySetMode,
  isatty,
  getWindowSize: _getWindowSize
} = @lazy(82);
var { validateInteger } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var fs = @getInternalField(@internalModuleRegistry, 23) || @createInternalModuleById(23);
function ReadStream(fd) {
  if (!(this instanceof ReadStream)) {
    return new ReadStream(fd);
  }
  fs.ReadStream.@apply(this, ["", { fd }]);
  this.isRaw = false;
  this.isTTY = isatty(fd);
}
@toClass(ReadStream, "ReadStream", fs.ReadStream);
Object.defineProperty(ReadStream, "prototype", {
  get() {
    const Prototype = Object.create(fs.ReadStream.prototype);
    Prototype.ref = function() {
      const source = this.@bunNativePtr;
      if (source?.updateRef) {
        source.updateRef(true);
      }
      return this;
    };
    Prototype.unref = function() {
      const source = this.@bunNativePtr;
      if (source?.updateRef) {
        source.updateRef(false);
      }
      return this;
    };
    Prototype.setRawMode = function(flag) {
      flag = !!flag;
      if (false) {} else {
        const err = ttySetMode(this.fd, flag);
        if (err) {
          this.emit("error", new Error("setRawMode failed with errno: " + err));
          return this;
        }
      }
      this.isRaw = flag;
      return this;
    };
    Object.defineProperty(ReadStream, "prototype", { value: Prototype });
    return Prototype;
  },
  enumerable: true,
  configurable: true
});
function WriteStream(fd) {
  if (!(this instanceof WriteStream))
    return new WriteStream(fd);
  const stream = fs.WriteStream.@call(this, null, { fd, @fastPath: true, autoClose: false });
  stream.columns = @undefined;
  stream.rows = @undefined;
  stream.isTTY = isatty(stream.fd);
  if (stream.isTTY) {
    const windowSizeArray = [0, 0];
    if (_getWindowSize(fd, windowSizeArray) === true) {
      stream.columns = windowSizeArray[0];
      stream.rows = windowSizeArray[1];
    }
  }
  return stream;
}
Object.defineProperty(WriteStream, "prototype", {
  get() {
    const Real = fs.WriteStream.prototype;
    Object.defineProperty(WriteStream, "prototype", { value: Real });
    WriteStream.prototype._refreshSize = function() {
      const oldCols = this.columns;
      const oldRows = this.rows;
      const windowSizeArray = [0, 0];
      if (_getWindowSize(this.fd, windowSizeArray) === true) {
        if (oldCols !== windowSizeArray[0] || oldRows !== windowSizeArray[1]) {
          this.columns = windowSizeArray[0];
          this.rows = windowSizeArray[1];
          this.emit("resize");
        }
      }
    };
    WriteStream.prototype.clearLine = function(dir, cb) {
      return (@getInternalField(@internalModuleRegistry, 113) || @createInternalModuleById(113)).clearLine(this, dir, cb);
    };
    WriteStream.prototype.clearScreenDown = function(cb) {
      return (@getInternalField(@internalModuleRegistry, 113) || @createInternalModuleById(113)).clearScreenDown(this, cb);
    };
    WriteStream.prototype.cursorTo = function(x, y, cb) {
      return (@getInternalField(@internalModuleRegistry, 113) || @createInternalModuleById(113)).cursorTo(this, x, y, cb);
    };
    WriteStream.prototype.getColorDepth = function(env = process.env) {
      return (@getInternalField(@internalModuleRegistry, 62) || @createInternalModuleById(62)).getColorDepth(env);
    };
    WriteStream.prototype.getWindowSize = function() {
      return [this.columns, this.rows];
    };
    WriteStream.prototype.hasColors = function(count, env) {
      if (env === @undefined && (count === @undefined || typeof count === "object" && count !== null)) {
        env = count;
        count = 16;
      } else {
        validateInteger(count, "count", 2);
      }
      return count <= 2 ** this.getColorDepth(env);
    };
    WriteStream.prototype.moveCursor = function(dx, dy, cb) {
      return (@getInternalField(@internalModuleRegistry, 113) || @createInternalModuleById(113)).moveCursor(this, dx, dy, cb);
    };
    WriteStream.prototype[Symbol.asyncIterator] = function() {
      return async function* () {}();
    };
    return Real;
  },
  enumerable: true,
  configurable: true
});
$ = { ReadStream, WriteStream, isatty };
return $})
