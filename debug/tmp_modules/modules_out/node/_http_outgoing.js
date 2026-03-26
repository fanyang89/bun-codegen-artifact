// @bun
// build/debug/tmp_modules/node/_http_outgoing.ts
var $;
var { Stream } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 40) || __intrinsic__createInternalModuleById(40);
var { isUint8Array, validateString } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { deprecate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65) || __intrinsic__createInternalModuleById(65);
var ObjectDefineProperty = Object.defineProperty;
var ObjectKeys = Object.keys;
var {
  headerStateSymbol,
  NodeHTTPHeaderState,
  kAbortController,
  fakeSocketSymbol,
  headersSymbol,
  kBodyChunks,
  kEmitState,
  ClientRequestEmitState,
  kEmptyObject,
  kHandle,
  getHeader,
  setHeader,
  Headers,
  getRawKeys,
  kOutHeaders
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 25) || __intrinsic__createInternalModuleById(25);
var {
  validateHeaderName,
  validateHeaderValue,
  _checkInvalidHeaderChar: checkInvalidHeaderChar
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 73) || __intrinsic__createInternalModuleById(73);
var kUniqueHeaders = Symbol("kUniqueHeaders");
var kBytesWritten = Symbol("kBytesWritten");
var kRejectNonStandardBodyWrites = Symbol("kRejectNonStandardBodyWrites");
var kCorked = Symbol("corked");
var kChunkedBuffer = Symbol("kChunkedBuffer");
var kHighWaterMark = Symbol("kHighWaterMark");
var kChunkedLength = Symbol("kChunkedLength");
var { FakeSocket } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 26) || __intrinsic__createInternalModuleById(26);
var nop = () => {};
function emitErrorNt(msg, err, callback) {
  callback(err);
  if (typeof msg.emit === "function" && !msg.destroyed) {
    msg.emit("error", err);
  }
}
function onError(msg, err, callback) {
  if (msg.destroyed) {
    return;
  }
  process.nextTick(emitErrorNt, msg, err, callback);
}
function isHTTPHeaderStateSentOrAssigned(state) {
  return state === NodeHTTPHeaderState.sent || state === NodeHTTPHeaderState.assigned;
}
function throwHeadersSentIfNecessary(self, action) {
  if (self._header != null || isHTTPHeaderStateSentOrAssigned(self[headerStateSymbol])) {
    throw __intrinsic__makeErrorWithCode(69, action);
  }
}
function write_(msg, chunk, encoding, callback, fromEnd) {
  if (typeof callback !== "function")
    callback = nop;
  if (chunk === null) {
    throw __intrinsic__makeErrorWithCode(229);
  } else if (typeof chunk !== "string" && !isUint8Array(chunk)) {
    throw __intrinsic__makeErrorWithCode(118, "chunk", ["string", "Buffer", "Uint8Array"], chunk);
  }
  let err;
  if (msg.finished) {
    err = __intrinsic__makeErrorWithCode(236);
  } else if (msg.destroyed) {
    err = __intrinsic__makeErrorWithCode(228, "write");
  }
  if (err) {
    if (!msg.destroyed) {
      onError(msg, err, callback);
    } else {
      process.nextTick(callback, err);
    }
    return false;
  }
  let len;
  if (msg.strictContentLength) {
    len ??= typeof chunk === "string" ? __intrinsic__Buffer.byteLength(chunk, encoding) : chunk.byteLength;
    if (strictContentLength(msg) && (fromEnd ? msg[kBytesWritten] + len !== msg._contentLength : msg[kBytesWritten] + len > msg._contentLength)) {
      const err2 = new Error(`Response body's content-length of ${len + msg[kBytesWritten]} byte(s) does not match the content-length of ${msg._contentLength} byte(s) set in header`);
      throw err2;
    }
    msg[kBytesWritten] += len;
  } else {
    len ??= typeof chunk === "string" ? __intrinsic__Buffer.byteLength(chunk, encoding) : chunk.byteLength;
    msg[kBytesWritten] += len;
  }
  function connectionUnCorkNT(conn) {
    conn.uncork();
  }
  let lazyCrlfBuf;
  function getCrlfBuf() {
    if (!lazyCrlfBuf) {
      lazyCrlfBuf = __intrinsic__Buffer.from(`\r
`);
    }
    return lazyCrlfBuf;
  }
  function strictContentLength(msg2) {
    return msg2.strictContentLength && msg2._contentLength != null && msg2._hasBody && !msg2._removedContLen && !msg2.chunkedEncoding && !msg2.hasHeader("transfer-encoding");
  }
  if (!msg._header) {
    if (fromEnd) {
      len ??= typeof chunk === "string" ? __intrinsic__Buffer.byteLength(chunk, encoding) : chunk.byteLength;
      msg._contentLength = len;
    }
    msg._implicitHeader();
  }
  if (!msg._hasBody) {
    if (msg[kRejectNonStandardBodyWrites]) {
      throw __intrinsic__makeErrorWithCode(68);
    } else {
      process.nextTick(callback);
      return true;
    }
  }
  if (!fromEnd && msg.socket && !msg.socket.writableCorked) {
    msg.socket.cork();
    process.nextTick(connectionUnCorkNT, msg.socket);
  }
  let ret;
  if (msg.chunkedEncoding && chunk.length !== 0) {
    len ??= typeof chunk === "string" ? __intrinsic__Buffer.byteLength(chunk, encoding) : chunk.byteLength;
    if (msg[kCorked] && msg._headerSent) {
      msg[kChunkedBuffer].push(chunk, encoding, callback);
      msg[kChunkedLength] += len;
      ret = msg[kChunkedLength] < msg[kHighWaterMark];
    } else {
      const crlf_buf = getCrlfBuf();
      msg._send(len.toString(16), "latin1", null);
      msg._send(crlf_buf, null, null);
      msg._send(chunk, encoding, null, len);
      ret = msg._send(crlf_buf, null, callback);
    }
  } else {
    ret = msg._send(chunk, encoding, callback, len);
  }
  return ret;
}
function OutgoingMessage(options) {
  if (!new.target) {
    return new OutgoingMessage(options);
  }
  Stream.__intrinsic__call(this, options);
  this.sendDate = true;
  this.finished = false;
  this[headerStateSymbol] = NodeHTTPHeaderState.none;
  this[kAbortController] = null;
  this[kBytesWritten] = 0;
  this.writable = true;
  this.destroyed = false;
  this._hasBody = true;
  this._trailer = "";
  this._contentLength = null;
  this._closed = false;
  this._header = null;
  this._headerSent = false;
  this[kHighWaterMark] = options?.highWaterMark ?? 64 * 1024;
}
var OutgoingMessagePrototype = {
  constructor: OutgoingMessage,
  __proto__: Stream.prototype,
  _keepAliveTimeout: 0,
  _defaultKeepAlive: true,
  shouldKeepAlive: true,
  _onPendingData: function nop2() {},
  outputSize: 0,
  outputData: [],
  strictContentLength: false,
  _removedTE: false,
  _removedContLen: false,
  _removedConnection: false,
  usesChunkedEncodingByDefault: true,
  _closed: false,
  _headerNames: __intrinsic__undefined,
  appendHeader(name, value) {
    validateString(name, "name");
    var headers = this[headersSymbol] ??= new Headers;
    headers.append(name, value);
    return this;
  },
  _implicitHeader() {
    throw __intrinsic__makeErrorWithCode(149, "_implicitHeader()");
  },
  flushHeaders() {},
  getHeader(name) {
    validateString(name, "name");
    return getHeader(this[headersSymbol], name);
  },
  write(chunk, encoding, callback) {
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    return write_(this, chunk, encoding, callback, false);
  },
  pipe() {
    this.emit("error", __intrinsic__makeErrorWithCode(227));
  },
  getHeaderNames() {
    var headers = this[headersSymbol];
    if (!headers)
      return [];
    return __intrinsic__Array.from(headers.keys());
  },
  getRawHeaderNames() {
    var headers = this[headersSymbol];
    if (!headers)
      return [];
    return getRawKeys.__intrinsic__call(headers);
  },
  getHeaders() {
    const headers = this[headersSymbol];
    if (!headers)
      return kEmptyObject;
    return headers.toJSON();
  },
  removeHeader(name) {
    validateString(name, "name");
    throwHeadersSentIfNecessary(this, "remove");
    const headers = this[headersSymbol];
    if (!headers)
      return;
    headers.delete(name);
  },
  setHeader(name, value) {
    throwHeadersSentIfNecessary(this, "set");
    validateHeaderName(name);
    validateHeaderValue(name, value);
    const headers = this[headersSymbol] ??= new Headers;
    setHeader(headers, name, value);
    return this;
  },
  setHeaders(headers) {
    throwHeadersSentIfNecessary(this, "set");
    if (!headers || __intrinsic__isArray(headers) || typeof headers.keys !== "function" || typeof headers.get !== "function") {
      throw __intrinsic__makeErrorWithCode(118, "headers", ["Headers", "Map"], headers);
    }
    const cookies = [];
    for (const { 0: key, 1: value } of headers) {
      if (key === "set-cookie") {
        if (__intrinsic__isArray(value)) {
          cookies.push(...value);
        } else {
          cookies.push(value);
        }
        continue;
      }
      this.setHeader(key, value);
    }
    if (cookies.length) {
      this.setHeader("set-cookie", cookies);
    }
    return this;
  },
  hasHeader(name) {
    validateString(name, "name");
    const headers = this[headersSymbol];
    if (!headers)
      return false;
    return headers.has(name);
  },
  get headers() {
    const headers = this[headersSymbol];
    if (!headers)
      return kEmptyObject;
    return headers.toJSON();
  },
  set headers(value) {
    this[headersSymbol] = new Headers(value);
  },
  addTrailers(headers) {
    this._trailer = "";
    const keys = Object.keys(headers);
    const isArray = __intrinsic__isArray(headers);
    for (let i = 0, l = keys.length;i < l; i++) {
      let field, value;
      const key = keys[i];
      if (isArray) {
        field = headers[key][0];
        value = headers[key][1];
      } else {
        field = key;
        value = headers[key];
      }
      validateHeaderName(field, "Trailer name");
      const isArrayValue = __intrinsic__isArray(value);
      if (isArrayValue && value.length > 1 && (!this[kUniqueHeaders] || !this[kUniqueHeaders].has(field.toLowerCase()))) {
        for (let j = 0, l2 = value.length;j < l2; j++) {
          if (checkInvalidHeaderChar(value[j])) {
            throw __intrinsic__makeErrorWithCode(121, "trailer content", field);
          }
          this._trailer += field + ": " + value[j] + `\r
`;
        }
      } else {
        if (isArrayValue) {
          value = value.join("; ");
        }
        if (checkInvalidHeaderChar(value)) {
          throw __intrinsic__makeErrorWithCode(121, "trailer content", field);
        }
        this._trailer += field + ": " + value + `\r
`;
      }
    }
  },
  setTimeout(msecs, callback) {
    if (this.callback) {
      this.emit("timeout", callback);
    }
    if (!this[fakeSocketSymbol]) {
      this.once("socket", function socketSetTimeoutOnConnect(socket) {
        socket.setTimeout(msecs, callback);
      });
    } else {
      this.socket.setTimeout(msecs);
    }
    return this;
  },
  get connection() {
    return this.socket;
  },
  set connection(value) {
    this.socket = value;
  },
  get socket() {
    this[fakeSocketSymbol] = this[fakeSocketSymbol] ?? new FakeSocket(this);
    return this[fakeSocketSymbol];
  },
  set socket(value) {
    this[fakeSocketSymbol] = value;
  },
  get chunkedEncoding() {
    return false;
  },
  set chunkedEncoding(value) {},
  get writableObjectMode() {
    return false;
  },
  get writableLength() {
    return this.finished ? 0 : this[kBytesWritten] || 0;
  },
  get writableHighWaterMark() {
    return 16 * 1024;
  },
  get writableNeedDrain() {
    return !this.destroyed && !this.finished && this[kBodyChunks] && this[kBodyChunks].length > 0;
  },
  get writableEnded() {
    return this.finished;
  },
  get writableFinished() {
    return this.finished && !!(this[kEmitState] & 1 << ClientRequestEmitState.finish);
  },
  _send(data, encoding, callback, byteLength) {
    if (!this._headerSent && this._header !== null) {
      if (typeof data === "string" && (encoding === "utf8" || encoding === "latin1" || !encoding)) {
        data = this._header + data;
      } else {
        const header = this._header;
        this.outputData.unshift({
          data: header,
          encoding: "latin1",
          callback: null
        });
        this.outputSize += header.length;
        this._onPendingData(header.length);
      }
      this._headerSent = true;
    }
    return this._writeRaw(data, encoding, callback, byteLength);
  },
  _writeRaw(data, encoding, callback, _size) {
    const conn = this[kHandle];
    if (conn?.destroyed) {
      return false;
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (conn && conn._httpMessage === this && conn.writable) {
      if (this.outputData.length) {
        this._flushOutput(conn);
      }
      return conn.write(data, encoding, callback);
    }
    this.outputData.push({ data, encoding, callback });
    this.outputSize += data.length;
    this._onPendingData(data.length);
    return this.outputSize < this[kHighWaterMark];
  },
  end(_chunk, _encoding, _callback) {
    return this;
  },
  get writableCorked() {
    return this.socket.writableCorked;
  },
  set writableCorked(value) {},
  cork() {
    this.socket.cork();
  },
  uncork() {
    this.socket.uncork();
  },
  destroy(_err) {
    if (this.destroyed)
      return this;
    const handle = this[kHandle];
    this.destroyed = true;
    if (handle) {
      handle.abort();
    }
    return this;
  }
};
OutgoingMessage.prototype = OutgoingMessagePrototype;
ObjectDefineProperty(OutgoingMessage.prototype, "_headerNames", {
  __proto__: null,
  get: deprecate(function() {
    const headers = this.getHeaders();
    if (headers !== null) {
      const out = Object.create(null);
      const keys = ObjectKeys(headers);
      for (let i = 0;i < keys.length; ++i) {
        const key = keys[i];
        out[key] = key;
      }
      return out;
    }
    return null;
  }, "OutgoingMessage.prototype._headerNames is deprecated", "DEP0066"),
  set: deprecate(function(val) {
    if (typeof val === "object" && val !== null) {
      const headers = this.getHeaders();
      if (!headers)
        return;
      const keys = ObjectKeys(val);
      for (let i = 0;i < keys.length; ++i) {
        const header = headers[keys[i]];
        if (header)
          header[keys[i]] = val[keys[i]];
      }
    }
  }, "OutgoingMessage.prototype._headerNames is deprecated", "DEP0066")
});
ObjectDefineProperty(OutgoingMessage.prototype, "_headers", {
  __proto__: null,
  get: deprecate(function() {
    return this.getHeaders();
  }, "OutgoingMessage.prototype._headers is deprecated", "DEP0066"),
  set: deprecate(function(val) {
    if (val == null) {
      this[kOutHeaders] = null;
    } else if (typeof val === "object") {
      const headers = this[kOutHeaders] = Object.create(null);
      const keys = ObjectKeys(val);
      for (let i = 0;i < keys.length; ++i) {
        const name = keys[i];
        headers[name.toLowerCase()] = [name, val[name]];
      }
    }
  }, "OutgoingMessage.prototype._headers is deprecated", "DEP0066")
});
__intrinsic__setPrototypeDirect.__intrinsic__call(OutgoingMessage, Stream);
$ = {
  OutgoingMessage,
  FakeSocket,
  OutgoingMessagePrototype
};
$$EXPORT$$($).$$EXPORT_END$$;
