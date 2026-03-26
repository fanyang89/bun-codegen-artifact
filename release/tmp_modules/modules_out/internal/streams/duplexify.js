// @bun
// build/release/tmp_modules/internal/streams/duplexify.ts
var $, {
  isReadable,
  isWritable,
  isIterable,
  isNodeStream,
  isReadableNodeStream,
  isWritableNodeStream,
  isDuplexNodeStream,
  isReadableStream,
  isWritableStream
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58), eos = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47), { destroyer } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43), Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44), Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55), Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59), from = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 48) || __intrinsic__createInternalModuleById(48), PromiseWithResolvers = __intrinsic__Promise.withResolvers.bind(__intrinsic__Promise);

class Duplexify extends Duplex {
  constructor(options) {
    super(options);
    if (options?.readable === !1)
      this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0;
    if (options?.writable === !1)
      this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0;
  }
}
function duplexify(body, name) {
  if (isDuplexNodeStream(body))
    return body;
  if (isReadableNodeStream(body))
    return _duplexify({ readable: body });
  if (isWritableNodeStream(body))
    return _duplexify({ writable: body });
  if (isNodeStream(body))
    return _duplexify({ writable: !1, readable: !1 });
  if (isReadableStream(body))
    return _duplexify({ readable: Readable.fromWeb(body) });
  if (isWritableStream(body))
    return _duplexify({ writable: Writable.fromWeb(body) });
  if (typeof body === "function") {
    let { value, write, final, destroy } = fromAsyncGen(body);
    if (isDuplexNodeStream(value))
      return value;
    if (isIterable(value))
      return from(Duplexify, value, {
        objectMode: !0,
        write,
        final,
        destroy
      });
    let then2 = value?.then;
    if (typeof then2 === "function") {
      let d, promise = then2.__intrinsic__call(value, (val) => {
        if (val != null)
          throw __intrinsic__makeErrorWithCode(134, "nully", "body", val);
      }, (err) => {
        destroyer(d, err);
      });
      return d = new Duplexify({
        objectMode: !0,
        readable: !1,
        write,
        final(cb) {
          final(async () => {
            try {
              await promise, process.nextTick(cb, null);
            } catch (err) {
              process.nextTick(cb, err);
            }
          });
        },
        destroy
      });
    }
    throw __intrinsic__makeErrorWithCode(134, "Iterable, AsyncIterable or AsyncFunction", name, value);
  }
  if (__intrinsic__inherits(0, body))
    return duplexify(body.arrayBuffer());
  if (isIterable(body))
    return from(Duplexify, body, {
      objectMode: !0,
      writable: !1
    });
  if (isReadableStream(body?.readable) && isWritableStream(body?.writable))
    return Duplexify.fromWeb(body);
  if (typeof body?.writable === "object" || typeof body?.readable === "object") {
    let readable = body?.readable ? isReadableNodeStream(body?.readable) ? body?.readable : duplexify(body.readable) : __intrinsic__undefined, writable = body?.writable ? isWritableNodeStream(body?.writable) ? body?.writable : duplexify(body.writable) : __intrinsic__undefined;
    return _duplexify({ readable, writable });
  }
  let then = body?.then;
  if (typeof then === "function") {
    let d;
    return then.__intrinsic__call(body, (val) => {
      if (val != null)
        d.push(val);
      d.push(null);
    }, (err) => {
      destroyer(d, err);
    }), d = new Duplexify({
      objectMode: !0,
      writable: !1,
      read() {}
    });
  }
  throw __intrinsic__makeErrorWithCode(118, name, [
    "Blob",
    "ReadableStream",
    "WritableStream",
    "Stream",
    "Iterable",
    "AsyncIterable",
    "Function",
    "{ readable, writable } pair",
    "Promise"
  ], body);
}
function fromAsyncGen(fn) {
  let { promise, resolve } = PromiseWithResolvers(), ac = new AbortController, signal = ac.signal;
  return {
    value: fn(async function* () {
      while (!0) {
        let _promise = promise;
        promise = null;
        let { chunk, done, cb } = await _promise;
        if (process.nextTick(cb), done)
          return;
        if (signal.aborted)
          throw __intrinsic__makeAbortError(__intrinsic__undefined, { cause: signal.reason });
        ({ promise, resolve } = PromiseWithResolvers()), yield chunk;
      }
    }(), { signal }),
    write(chunk, encoding, cb) {
      let _resolve = resolve;
      resolve = null, _resolve({ chunk, done: !1, cb });
    },
    final(cb) {
      let _resolve = resolve;
      resolve = null, _resolve({ done: !0, cb });
    },
    destroy(err, cb) {
      ac.abort(), cb(err);
    }
  };
}
function _duplexify(pair) {
  let r = pair.readable && typeof pair.readable.read !== "function" ? Readable.wrap(pair.readable) : pair.readable, w = pair.writable, readable = !!isReadable(r), writable = !!isWritable(w), ondrain, onfinish, onreadable, onclose, d;
  function onfinished(err) {
    let cb = onclose;
    if (onclose = null, cb)
      cb(err);
    else if (err)
      d.destroy(err);
  }
  if (d = new Duplexify({
    readableObjectMode: !!r?.readableObjectMode,
    writableObjectMode: !!w?.writableObjectMode,
    readable,
    writable
  }), writable)
    eos(w, (err) => {
      if (writable = !1, err)
        destroyer(r, err);
      onfinished(err);
    }), d._write = function(chunk, encoding, callback) {
      if (w.write(chunk, encoding))
        callback();
      else
        ondrain = callback;
    }, d._final = function(callback) {
      w.end(), onfinish = callback;
    }, w.on("drain", function() {
      if (ondrain) {
        let cb = ondrain;
        ondrain = null, cb();
      }
    }), w.on("finish", function() {
      if (onfinish) {
        let cb = onfinish;
        onfinish = null, cb();
      }
    });
  if (readable)
    eos(r, (err) => {
      if (readable = !1, err)
        destroyer(r, err);
      onfinished(err);
    }), r.on("readable", function() {
      if (onreadable) {
        let cb = onreadable;
        onreadable = null, cb();
      }
    }), r.on("end", function() {
      d.push(null);
    }), d._read = function() {
      while (!0) {
        let buf = r.read();
        if (buf === null) {
          onreadable = d._read;
          return;
        }
        if (!d.push(buf))
          return;
      }
    };
  return d._destroy = function(err, callback) {
    if (!err && onclose !== null)
      err = __intrinsic__makeAbortError();
    if (onreadable = null, ondrain = null, onfinish = null, onclose === null)
      callback(err);
    else
      onclose = callback, destroyer(w, err), destroyer(r, err);
  }, d;
}
$ = duplexify;
$$EXPORT$$($).$$EXPORT_END$$;
