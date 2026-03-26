// @bun
// build/debug/tmp_modules/internal/streams/compose.ts
var $;
var { pipeline } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 54) || __intrinsic__createInternalModuleById(54);
var Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44);
var { destroyer } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var {
  isNodeStream,
  isReadable,
  isWritable,
  isWebStream,
  isTransformStream,
  isWritableStream,
  isReadableStream
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var eos = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47);
var ArrayPrototypeSlice = __intrinsic__Array.prototype.slice;
$ = function compose(...streams) {
  if (streams.length === 0) {
    throw __intrinsic__makeErrorWithCode(150, "streams");
  }
  if (streams.length === 1) {
    return Duplex.from(streams[0]);
  }
  const orgStreams = ArrayPrototypeSlice.__intrinsic__call(streams);
  if (typeof streams[0] === "function") {
    streams[0] = Duplex.from(streams[0]);
  }
  if (typeof streams[streams.length - 1] === "function") {
    const idx = streams.length - 1;
    streams[idx] = Duplex.from(streams[idx]);
  }
  for (let n = 0;n < streams.length; ++n) {
    if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
      continue;
    }
    if (n < streams.length - 1 && !(isReadable(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
      throw __intrinsic__makeErrorWithCode(119, `streams[${n}]`, orgStreams[n], "must be readable");
    }
    if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
      throw __intrinsic__makeErrorWithCode(119, `streams[${n}]`, orgStreams[n], "must be writable");
    }
  }
  let ondrain;
  let onfinish;
  let onreadable;
  let onclose;
  let d;
  function onfinished(err) {
    const cb = onclose;
    onclose = null;
    if (cb) {
      cb(err);
    } else if (err) {
      d.destroy(err);
    } else if (!readable && !writable) {
      d.destroy();
    }
  }
  const head = streams[0];
  const tail = pipeline(streams, onfinished);
  const writable = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
  const readable = !!(isReadable(tail) || isReadableStream(tail) || isTransformStream(tail));
  d = new Duplex({
    writableObjectMode: !!head?.writableObjectMode,
    readableObjectMode: !!tail?.readableObjectMode,
    writable,
    readable
  });
  if (writable) {
    if (isNodeStream(head)) {
      d._write = function(chunk, encoding, callback) {
        if (head.write(chunk, encoding)) {
          callback();
        } else {
          ondrain = callback;
        }
      };
      d._final = function(callback) {
        head.end();
        onfinish = callback;
      };
      head.on("drain", function() {
        if (ondrain) {
          const cb = ondrain;
          ondrain = null;
          cb();
        }
      });
    } else if (isWebStream(head)) {
      const writable2 = isTransformStream(head) ? head.writable : head;
      const writer = writable2.getWriter();
      d._write = async function(chunk, encoding, callback) {
        try {
          await writer.ready;
          writer.write(chunk).catch(() => {});
          callback();
        } catch (err) {
          callback(err);
        }
      };
      d._final = async function(callback) {
        try {
          await writer.ready;
          writer.close().catch(() => {});
          onfinish = callback;
        } catch (err) {
          callback(err);
        }
      };
    }
    const toRead = isTransformStream(tail) ? tail.readable : tail;
    eos(toRead, () => {
      if (onfinish) {
        const cb = onfinish;
        onfinish = null;
        cb();
      }
    });
  }
  if (readable) {
    if (isNodeStream(tail)) {
      tail.on("readable", function() {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      tail.on("end", function() {
        d.push(null);
      });
      d._read = function() {
        while (true) {
          const buf = tail.read();
          if (buf === null) {
            onreadable = d._read;
            return;
          }
          if (!d.push(buf)) {
            return;
          }
        }
      };
    } else if (isWebStream(tail)) {
      const readable2 = isTransformStream(tail) ? tail.readable : tail;
      const reader = readable2.getReader();
      d._read = async function() {
        while (true) {
          try {
            const { value, done } = await reader.read();
            if (!d.push(value)) {
              return;
            }
            if (done) {
              d.push(null);
              return;
            }
          } catch {
            return;
          }
        }
      };
    }
  }
  d._destroy = function(err, callback) {
    if (!err && onclose !== null) {
      err = __intrinsic__makeAbortError();
    }
    onreadable = null;
    ondrain = null;
    onfinish = null;
    if (isNodeStream(tail)) {
      destroyer(tail, err);
    }
    if (onclose === null) {
      callback(err);
    } else {
      onclose = callback;
    }
  };
  return d;
};
$$EXPORT$$($).$$EXPORT_END$$;
