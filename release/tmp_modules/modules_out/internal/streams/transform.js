// @bun
// build/release/tmp_modules/internal/streams/transform.ts
var $, Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44), { getHighWaterMark } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 56) || __intrinsic__createInternalModuleById(56), kCallback = Symbol("kCallback");
function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);
  let readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", !0) : null;
  if (readableHighWaterMark === 0)
    options = {
      ...options,
      highWaterMark: null,
      readableHighWaterMark,
      writableHighWaterMark: options.writableHighWaterMark || 0
    };
  if (Duplex.__intrinsic__call(this, options), this._readableState.sync = !1, this[kCallback] = null, options) {
    if (typeof options.transform === "function")
      this._transform = options.transform;
    if (typeof options.flush === "function")
      this._flush = options.flush;
  }
  this.on("prefinish", prefinish);
}
__intrinsic__toClass(Transform, "Transform", Duplex);
function final(cb) {
  if (typeof this._flush === "function" && !this.destroyed)
    this._flush((er, data) => {
      if (er) {
        if (cb)
          cb(er);
        else
          this.destroy(er);
        return;
      }
      if (data != null)
        this.push(data);
      if (this.push(null), cb)
        cb();
    });
  else if (this.push(null), cb)
    cb();
}
function prefinish() {
  if (this._final !== final)
    final.__intrinsic__call(this);
}
Transform.prototype._final = final;
Transform.prototype._transform = function(_chunk, _encoding, _callback) {
  throw __intrinsic__makeErrorWithCode(149, "_transform()");
};
Transform.prototype._write = function(chunk, encoding, callback) {
  let rState = this._readableState, wState = this._writableState, length = rState.length;
  this._transform(chunk, encoding, (err, val) => {
    if (err) {
      callback(err);
      return;
    }
    if (val != null)
      this.push(val);
    if (rState.ended)
      process.nextTick(callback);
    else if (wState.ended || length === rState.length || rState.length < rState.highWaterMark)
      callback();
    else
      this[kCallback] = callback;
  });
};
Transform.prototype._read = function() {
  if (this[kCallback]) {
    let callback = this[kCallback];
    this[kCallback] = null, callback();
  }
};
$ = Transform;
$$EXPORT$$($).$$EXPORT_END$$;
