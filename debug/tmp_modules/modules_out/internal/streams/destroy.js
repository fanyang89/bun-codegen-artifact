// @bun
// build/debug/tmp_modules/internal/streams/destroy.ts
var $;
var { aggregateTwoErrors } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 16) || __intrinsic__createInternalModuleById(16);
var {
  kIsDestroyed,
  isDestroyed,
  isFinished,
  isServerRequest,
  kState,
  kErrorEmitted,
  kEmitClose,
  kClosed,
  kCloseEmitted,
  kConstructed,
  kDestroyed,
  kAutoDestroy,
  kErrored
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var ProcessNextTick = process.nextTick;
var kDestroy = Symbol("kDestroy");
var kConstruct = Symbol("kConstruct");
function checkError(err, w, r) {
  if (err) {
    err.stack;
    if (w && !w.errored) {
      w.errored = err;
    }
    if (r && !r.errored) {
      r.errored = err;
    }
  }
}
function destroy(err, cb) {
  const r = this._readableState;
  const w = this._writableState;
  const s = w || r;
  if (w && (w[kState] & kDestroyed) !== 0 || r && (r[kState] & kDestroyed) !== 0) {
    if (typeof cb === "function") {
      cb();
    }
    return this;
  }
  checkError(err, w, r);
  if (w) {
    w[kState] |= kDestroyed;
  }
  if (r) {
    r[kState] |= kDestroyed;
  }
  if ((s[kState] & kConstructed) === 0) {
    this.once(kDestroy, function(er) {
      _destroy(this, aggregateTwoErrors(er, err), cb);
    });
  } else {
    _destroy(this, err, cb);
  }
  return this;
}
function _destroy(self, err, cb) {
  let called = false;
  function onDestroy(err2) {
    if (called) {
      return;
    }
    called = true;
    const r = self._readableState;
    const w = self._writableState;
    checkError(err2, w, r);
    if (w) {
      w[kState] |= kClosed;
    }
    if (r) {
      r[kState] |= kClosed;
    }
    if (typeof cb === "function") {
      cb(err2);
    }
    if (err2) {
      ProcessNextTick(emitErrorCloseNT, self, err2);
    } else {
      ProcessNextTick(emitCloseNT, self);
    }
  }
  try {
    self._destroy(err || null, onDestroy);
  } catch (err2) {
    onDestroy(err2);
  }
}
function emitErrorCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  const r = self._readableState;
  const w = self._writableState;
  if (w) {
    w[kState] |= kCloseEmitted;
  }
  if (r) {
    r[kState] |= kCloseEmitted;
  }
  if (w && (w[kState] & kEmitClose) !== 0 || r && (r[kState] & kEmitClose) !== 0) {
    self.emit("close");
  }
}
function emitErrorNT(self, err) {
  const r = self._readableState;
  const w = self._writableState;
  if (w && (w[kState] & kErrorEmitted) !== 0 || r && (r[kState] & kErrorEmitted) !== 0) {
    return;
  }
  if (w) {
    w[kState] |= kErrorEmitted;
  }
  if (r) {
    r[kState] |= kErrorEmitted;
  }
  self.emit("error", err);
}
function undestroy() {
  const r = this._readableState;
  const w = this._writableState;
  if (r) {
    r.constructed = true;
    r.closed = false;
    r.closeEmitted = false;
    r.destroyed = false;
    r.errored = null;
    r.errorEmitted = false;
    r.reading = false;
    r.ended = r.readable === false;
    r.endEmitted = r.readable === false;
  }
  if (w) {
    w.constructed = true;
    w.destroyed = false;
    w.closed = false;
    w.closeEmitted = false;
    w.errored = null;
    w.errorEmitted = false;
    w.finalCalled = false;
    w.prefinished = false;
    w.ended = w.writable === false;
    w.ending = w.writable === false;
    w.finished = w.writable === false;
  }
}
function errorOrDestroy(stream, err, sync) {
  const r = stream._readableState;
  const w = stream._writableState;
  if (w && (w[kState] ? (w[kState] & kDestroyed) !== 0 : w.destroyed) || r && (r[kState] ? (r[kState] & kDestroyed) !== 0 : r.destroyed)) {
    return this;
  }
  if (r && (r[kState] & kAutoDestroy) !== 0 || w && (w[kState] & kAutoDestroy) !== 0) {
    stream.destroy(err);
  } else if (err) {
    err.stack;
    if (w && (w[kState] & kErrored) === 0) {
      w.errored = err;
    }
    if (r && (r[kState] & kErrored) === 0) {
      r.errored = err;
    }
    if (sync) {
      ProcessNextTick(emitErrorNT, stream, err);
    } else {
      emitErrorNT(stream, err);
    }
  }
}
function construct(stream, cb) {
  if (typeof stream._construct !== "function") {
    return;
  }
  const r = stream._readableState;
  const w = stream._writableState;
  if (r) {
    r[kState] &= ~kConstructed;
  }
  if (w) {
    w[kState] &= ~kConstructed;
  }
  stream.once(kConstruct, cb);
  if (stream.listenerCount(kConstruct) > 1) {
    return;
  }
  ProcessNextTick(constructNT, stream);
}
function constructNT(stream) {
  let called = false;
  function onConstruct(err) {
    if (called) {
      errorOrDestroy(stream, err ?? __intrinsic__makeErrorWithCode(154));
      return;
    }
    called = true;
    const r = stream._readableState;
    const w = stream._writableState;
    const s = w || r;
    if (r) {
      r[kState] |= kConstructed;
    }
    if (w) {
      w[kState] |= kConstructed;
    }
    if (s.destroyed) {
      stream.emit(kDestroy, err);
    } else if (err) {
      errorOrDestroy(stream, err, true);
    } else {
      stream.emit(kConstruct);
    }
  }
  try {
    stream._construct((err) => {
      ProcessNextTick(onConstruct, err);
    });
  } catch (err) {
    ProcessNextTick(onConstruct, err);
  }
}
function isRequest(stream) {
  return stream?.setHeader && typeof stream.abort === "function";
}
function emitCloseLegacy(stream) {
  stream.emit("close");
}
function emitErrorCloseLegacy(stream, err) {
  stream.emit("error", err);
  ProcessNextTick(emitCloseLegacy, stream);
}
function destroyer(stream, err) {
  if (!stream || isDestroyed(stream)) {
    return;
  }
  if (!err && !isFinished(stream)) {
    err = __intrinsic__makeAbortError();
  }
  if (isServerRequest(stream)) {
    stream.socket = null;
    stream.destroy(err);
  } else if (isRequest(stream)) {
    stream.abort();
  } else if (isRequest(stream.req)) {
    stream.req.abort();
  } else if (typeof stream.destroy === "function") {
    stream.destroy(err);
  } else if (typeof stream.close === "function") {
    stream.close();
  } else if (err) {
    ProcessNextTick(emitErrorCloseLegacy, stream, err);
  } else {
    ProcessNextTick(emitCloseLegacy, stream);
  }
  if (!stream.destroyed) {
    stream[kIsDestroyed] = true;
  }
}
$ = {
  construct,
  destroyer,
  destroy,
  undestroy,
  errorOrDestroy
};
$$EXPORT$$($).$$EXPORT_END$$;
