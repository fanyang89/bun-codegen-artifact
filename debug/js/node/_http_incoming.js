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
    console.error('[_http_incoming] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/node/_http_incoming.ts
var $;
var Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
var {
  abortedSymbol,
  eofInProgress,
  kHandle,
  noBodySymbol,
  typeSymbol,
  NodeHTTPIncomingRequestType,
  fakeSocketSymbol,
  isAbortError,
  emitErrorNextTickIfErrorListenerNT,
  kEmptyObject,
  getIsNextIncomingMessageHTTPS,
  setIsNextIncomingMessageHTTPS,
  NodeHTTPBodyReadState,
  emitEOFIncomingMessage,
  bodyStreamSymbol,
  statusMessageSymbol,
  statusCodeSymbol,
  webRequestOrResponse,
  NodeHTTPResponseAbortEvent,
  STATUS_CODES,
  assignHeadersFast,
  setRequestTimeout,
  headersTuple,
  webRequestOrResponseHasBodyValue,
  getCompleteWebRequestOrResponseBodyValueAsArrayBuffer,
  kAbortController
} = @getInternalField(@internalModuleRegistry, 25) || @createInternalModuleById(25);
var { FakeSocket } = @getInternalField(@internalModuleRegistry, 26) || @createInternalModuleById(26);
var defaultIncomingOpts = { type: "request" };
var nop = () => {};
function assignHeadersSlow(object, req) {
  const headers = req.headers;
  var outHeaders = Object.create(null);
  const rawHeaders = [];
  var i = 0;
  for (let key in headers) {
    var originalKey = key;
    var value = headers[originalKey];
    key = key.toLowerCase();
    if (key !== "set-cookie") {
      value = @String(value);
      @putByValDirect(rawHeaders, i++, originalKey);
      @putByValDirect(rawHeaders, i++, value);
      outHeaders[key] = value;
    } else {
      if (@isJSArray(value)) {
        outHeaders[key] = value.slice();
        for (let entry of value) {
          @putByValDirect(rawHeaders, i++, originalKey);
          @putByValDirect(rawHeaders, i++, entry);
        }
      } else {
        value = @String(value);
        outHeaders[key] = [value];
        @putByValDirect(rawHeaders, i++, originalKey);
        @putByValDirect(rawHeaders, i++, value);
      }
    }
  }
  object.headers = outHeaders;
  object.rawHeaders = rawHeaders;
}
function assignHeaders(object, req) {
  if (assignHeadersFast(req, object, headersTuple)) {
    const headers = @getInternalField(headersTuple, 0);
    const rawHeaders = @getInternalField(headersTuple, 1);
    @putInternalField(headersTuple, 0, @undefined);
    @putInternalField(headersTuple, 1, @undefined);
    object.headers = headers;
    object.rawHeaders = rawHeaders;
    return true;
  } else {
    assignHeadersSlow(object, req);
    return false;
  }
}
function onIncomingMessagePauseNodeHTTPResponse() {
  const handle = this[kHandle];
  if (handle && !this.destroyed) {
    handle.pause();
  }
}
function onIncomingMessageResumeNodeHTTPResponse() {
  const handle = this[kHandle];
  if (handle && !this.destroyed) {
    const resumed = handle.resume();
    if (resumed && resumed !== true) {
      const bodyReadState = handle.hasBody;
      if ((bodyReadState & NodeHTTPBodyReadState.done) !== 0) {
        emitEOFIncomingMessage(this);
      }
      this.push(resumed);
    }
  }
}
function IncomingMessage(req, options = defaultIncomingOpts) {
  this[abortedSymbol] = false;
  this[eofInProgress] = false;
  this._consuming = false;
  this._dumped = false;
  this.complete = false;
  this._closed = false;
  if (req === kHandle) {
    this[typeSymbol] = NodeHTTPIncomingRequestType.NodeHTTPResponse;
    this.url = arguments[1];
    this.method = arguments[2];
    this.headers = arguments[3];
    this.rawHeaders = arguments[4];
    this[kHandle] = arguments[5];
    this[noBodySymbol] = !arguments[6];
    this[fakeSocketSymbol] = arguments[7];
    Readable.@call(this);
    if (arguments[6]) {
      this.on("pause", onIncomingMessagePauseNodeHTTPResponse);
      this.on("resume", onIncomingMessageResumeNodeHTTPResponse);
    }
  } else {
    this[noBodySymbol] = false;
    Readable.@call(this);
    var { [typeSymbol]: type } = options || {};
    this[webRequestOrResponse] = req;
    this[typeSymbol] = type;
    this[bodyStreamSymbol] = @undefined;
    const statusText = req?.statusText;
    this[statusMessageSymbol] = statusText !== "" ? statusText || null : "";
    this[statusCodeSymbol] = req?.status || 200;
    if (type === NodeHTTPIncomingRequestType.FetchRequest || type === NodeHTTPIncomingRequestType.FetchResponse) {
      if (!assignHeaders(this, req)) {
        this[fakeSocketSymbol] = req;
      }
    } else {
      this.url = "";
      this.method = null;
      this.rawHeaders = [];
    }
    this[noBodySymbol] = type === NodeHTTPIncomingRequestType.FetchRequest ? requestHasNoBody(this.method, this) : false;
    if (getIsNextIncomingMessageHTTPS()) {
      this.socket.encrypted = true;
      setIsNextIncomingMessageHTTPS(false);
    }
  }
  this._readableState.readingMore = true;
}
function onDataIncomingMessage(chunk, isLast, aborted) {
  if (aborted === NodeHTTPResponseAbortEvent.abort) {
    this.destroy();
    return;
  }
  if (chunk && !this._dumped)
    this.push(chunk);
  if (isLast) {
    emitEOFIncomingMessage(this);
  }
}
var IncomingMessagePrototype = {
  constructor: IncomingMessage,
  __proto__: Readable.prototype,
  httpVersion: "1.1",
  _construct(callback) {
    const type = this[typeSymbol];
    if (type === NodeHTTPIncomingRequestType.FetchResponse) {
      if (!webRequestOrResponseHasBodyValue(this[webRequestOrResponse])) {
        this.complete = true;
        this.push(null);
      }
    }
    callback();
  },
  _dump() {
    if (!this._dumped) {
      this._dumped = true;
      this.removeAllListeners("data");
      const handle = this[kHandle];
      if (handle) {
        handle.ondata = @undefined;
      }
      this.resume();
    }
  },
  _read(_size) {
    if (!this._consuming) {
      this._readableState.readingMore = false;
      this._consuming = true;
    }
    const socket = this.socket;
    if (socket && socket.readable) {
      socket.resume();
    }
    if (this[eofInProgress]) {
      return;
    }
    let internalRequest;
    if (this[noBodySymbol]) {
      emitEOFIncomingMessage(this);
      return;
    } else if (internalRequest = this[kHandle]) {
      const bodyReadState = internalRequest.hasBody;
      if ((bodyReadState & NodeHTTPBodyReadState.done) !== 0 || bodyReadState === NodeHTTPBodyReadState.none || this._dumped) {
        emitEOFIncomingMessage(this);
      }
      if ((bodyReadState & NodeHTTPBodyReadState.hasBufferedDataDuringPause) !== 0) {
        const drained = internalRequest.drainRequestBody();
        if (drained && !this._dumped) {
          this.push(drained);
        }
      }
      if (!internalRequest.ondata) {
        internalRequest.ondata = onDataIncomingMessage.bind(this);
        internalRequest.hasCustomOnData = false;
      }
      return true;
    } else if (this[bodyStreamSymbol] == null) {
      let completeBody = getCompleteWebRequestOrResponseBodyValueAsArrayBuffer(this[webRequestOrResponse]);
      if (completeBody) {
        $assert(completeBody instanceof @ArrayBuffer, "completeBody instanceof ArrayBuffer", "completeBody is not an ArrayBuffer");
        $assert(completeBody.byteLength > 0, "completeBody.byteLength > 0", "completeBody should not be empty");
        if (!this._dumped) {
          this.push(new @Buffer(completeBody));
        }
        emitEOFIncomingMessage(this);
        return;
      }
      const reader = this[webRequestOrResponse].body?.getReader?.();
      if (!reader) {
        emitEOFIncomingMessage(this);
        return;
      }
      this[bodyStreamSymbol] = reader;
      consumeStream(this, reader);
    }
    return;
  },
  _finish() {
    this.emit("prefinish");
  },
  _destroy: function IncomingMessage_destroy(err, cb) {
    const shouldEmitAborted = !this.readableEnded || !this.complete;
    if (shouldEmitAborted) {
      this[abortedSymbol] = true;
      this.emit("aborted");
    }
    if (isAbortError(err)) {
      err = @undefined;
    }
    var nodeHTTPResponse = this[kHandle];
    if (nodeHTTPResponse) {
      this[kHandle] = @undefined;
      nodeHTTPResponse.onabort = nodeHTTPResponse.ondata = @undefined;
      if (!nodeHTTPResponse.finished && shouldEmitAborted) {
        nodeHTTPResponse.abort();
      }
      const socket = this.socket;
      if (socket && !socket.destroyed && shouldEmitAborted) {
        socket.destroy(err);
      }
    } else {
      const stream = this[bodyStreamSymbol];
      this[bodyStreamSymbol] = @undefined;
      const streamState = stream?.@state;
      if (streamState === 4 || streamState === 5 || streamState === 6) {
        stream?.cancel?.().catch(nop);
      }
      const socket = this.socket;
      if (socket && !socket.destroyed && shouldEmitAborted) {
        socket.destroy(err);
      }
    }
    const req = this.req;
    if (req && !this.complete) {
      req[kAbortController]?.abort?.();
    }
    if (@isCallable(cb)) {
      emitErrorNextTickIfErrorListenerNT(this, err, cb);
    }
  },
  get aborted() {
    return this[abortedSymbol];
  },
  set aborted(value) {
    this[abortedSymbol] = value;
  },
  get connection() {
    return this[fakeSocketSymbol] ??= new FakeSocket(this);
  },
  get statusCode() {
    return this[statusCodeSymbol];
  },
  set statusCode(value) {
    if (!(value in STATUS_CODES))
      return;
    this[statusCodeSymbol] = value;
  },
  get statusMessage() {
    return this[statusMessageSymbol];
  },
  set statusMessage(value) {
    this[statusMessageSymbol] = value;
  },
  get httpVersionMajor() {
    const version = this.httpVersion;
    if (version.startsWith("1.")) {
      return 1;
    }
    return 0;
  },
  set httpVersionMajor(value) {},
  get httpVersionMinor() {
    const version = this.httpVersion;
    if (version.endsWith(".1")) {
      return 1;
    }
    return 0;
  },
  set httpVersionMinor(value) {},
  get rawTrailers() {
    return [];
  },
  set rawTrailers(value) {},
  get trailers() {
    return kEmptyObject;
  },
  set trailers(value) {},
  setTimeout(msecs, callback) {
    this.take;
    const req = this[kHandle] || this[webRequestOrResponse];
    if (req) {
      setRequestTimeout(req, Math.ceil(msecs / 1000));
      if (typeof callback === "function")
        this.once("timeout", callback);
    }
    return this;
  },
  get socket() {
    return this[fakeSocketSymbol] ??= new FakeSocket(this);
  },
  set socket(value) {
    this[fakeSocketSymbol] = value;
  }
};
IncomingMessage.prototype = IncomingMessagePrototype;
@setPrototypeDirect.@call(IncomingMessage, Readable);
function requestHasNoBody(method, req) {
  if (method === "GET" || method === "HEAD" || method === "TRACE" || method === "CONNECT" || method === "OPTIONS")
    return true;
  const headers = req?.headers;
  const contentLength = headers?.["content-length"];
  if (!parseInt(contentLength, 10))
    return true;
  return false;
}
async function consumeStream(self, reader) {
  var done = false, value, aborted = false;
  try {
    while (true) {
      const result = reader.readMany();
      if (@isPromise(result)) {
        ({ done, value } = await result);
      } else {
        ({ done, value } = result);
      }
      if (self.destroyed || (aborted = self[abortedSymbol])) {
        break;
      }
      if (!self._dumped) {
        for (var v of value) {
          self.push(v);
        }
      }
      if (self.destroyed || (aborted = self[abortedSymbol]) || done) {
        break;
      }
    }
  } catch (err) {
    if (aborted || self.destroyed)
      return;
    self.destroy(err);
  } finally {
    reader?.cancel?.().catch?.(nop);
  }
  if (!self.complete) {
    emitEOFIncomingMessage(self);
  }
}
function readStart(socket) {
  if (socket && !socket._paused && socket.readable) {
    socket.resume();
  }
}
function readStop(socket) {
  if (socket) {
    socket.pause();
  }
}
return{
  readStop,
  readStart,
  IncomingMessage
};})
