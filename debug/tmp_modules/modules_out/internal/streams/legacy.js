// @bun
// build/debug/tmp_modules/internal/streams/legacy.ts
var $;
var EE = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var { isArrayBufferView, isUint8Array } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144);
var ReflectOwnKeys = Reflect.ownKeys;
var ArrayIsArray = __intrinsic__Array.isArray;
function Stream(opts) {
  EE.__intrinsic__call(this, opts);
}
__intrinsic__toClass(Stream, "Stream", EE);
Stream.prototype.pipe = function(dest, options) {
  const source = this;
  function ondata(chunk) {
    if (dest.writable && dest.write(chunk) === false && source.pause) {
      source.pause();
    }
  }
  source.on("data", ondata);
  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }
  dest.on("drain", ondrain);
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on("end", onend);
    source.on("close", onclose);
  }
  let didOnEnd = false;
  function onend() {
    if (didOnEnd)
      return;
    didOnEnd = true;
    dest.end();
  }
  function onclose() {
    if (didOnEnd)
      return;
    didOnEnd = true;
    if (typeof dest.destroy === "function")
      dest.destroy();
  }
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, "error") === 0) {
      this.emit("error", er);
    }
  }
  prependListener(source, "error", onerror);
  prependListener(dest, "error", onerror);
  function cleanup() {
    source.removeListener("data", ondata);
    dest.removeListener("drain", ondrain);
    source.removeListener("end", onend);
    source.removeListener("close", onclose);
    source.removeListener("error", onerror);
    dest.removeListener("error", onerror);
    source.removeListener("end", cleanup);
    source.removeListener("close", cleanup);
    dest.removeListener("close", cleanup);
  }
  source.on("end", cleanup);
  source.on("close", cleanup);
  dest.on("close", cleanup);
  dest.emit("pipe", source);
  return dest;
};
Stream.prototype.eventNames = function eventNames() {
  const names = [];
  for (const key of ReflectOwnKeys(this._events)) {
    if (typeof this._events[key] === "function" || ArrayIsArray(this._events[key]) && this._events[key].length > 0) {
      names.push(key);
    }
  }
  return names;
};
function prependListener(emitter, event, fn) {
  if (typeof emitter.prependListener === "function")
    return emitter.prependListener(event, fn);
  if (!emitter._events || !emitter._events[event])
    emitter.on(event, fn);
  else if (ArrayIsArray(emitter._events[event]))
    emitter._events[event].unshift(fn);
  else
    emitter._events[event] = [fn, emitter._events[event]];
}
Stream._isArrayBufferView = isArrayBufferView;
Stream._isUint8Array = isUint8Array;
Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
  return new __intrinsic__Buffer(chunk.buffer, chunk.byteOffset, chunk.byteLength);
};
$ = { Stream, prependListener };
$$EXPORT$$($).$$EXPORT_END$$;
