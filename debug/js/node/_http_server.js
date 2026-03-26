(function (){"use strict";// build/debug/tmp_modules/node/_http_server.ts
var $;
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var { Duplex, Stream } = @getInternalField(@internalModuleRegistry, 117) || @createInternalModuleById(117);
var {
  _checkInvalidHeaderChar: checkInvalidHeaderChar,
  validateHeaderName,
  validateHeaderValue
} = @getInternalField(@internalModuleRegistry, 73) || @createInternalModuleById(73);
var { validateObject, validateLinkHeaderValue, validateBoolean, validateInteger } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var { ConnResetException } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var { isPrimary } = @getInternalField(@internalModuleRegistry, 12) || @createInternalModuleById(12);
var { throwOnInvalidTLSArray } = @getInternalField(@internalModuleRegistry, 61) || @createInternalModuleById(61);
var {
  kInternalSocketData,
  serverSymbol,
  kHandle,
  kRealListen,
  tlsSymbol,
  optionsSymbol,
  kDeferredTimeouts,
  kDeprecatedReplySymbol,
  headerStateSymbol,
  NodeHTTPHeaderState,
  kPendingCallbacks,
  kRequest,
  kCloseCallback,
  NodeHTTPResponseFlags,
  headersSymbol,
  emitErrorNextTickIfErrorListenerNT,
  getIsNextIncomingMessageHTTPS,
  setIsNextIncomingMessageHTTPS,
  callCloseCallback,
  emitCloseNT,
  NodeHTTPResponseAbortEvent,
  STATUS_CODES,
  isTlsSymbol,
  hasServerResponseFinished,
  OutgoingMessagePrototype,
  NodeHTTPBodyReadState,
  controllerSymbol,
  firstWriteSymbol,
  deferredSymbol,
  eofInProgress,
  runSymbol,
  drainMicrotasks,
  setServerIdleTimeout,
  setServerCustomOptions,
  getMaxHTTPHeaderSize
} = @getInternalField(@internalModuleRegistry, 25) || @createInternalModuleById(25);
var NumberIsNaN = Number.isNaN;
var { format } = @getInternalField(@internalModuleRegistry, 66) || @createInternalModuleById(66);
var { IncomingMessage } = @getInternalField(@internalModuleRegistry, 74) || @createInternalModuleById(74);
var { OutgoingMessage } = @getInternalField(@internalModuleRegistry, 75) || @createInternalModuleById(75);
var { kIncomingMessage } = @getInternalField(@internalModuleRegistry, 73) || @createInternalModuleById(73);
var kConnectionsCheckingInterval = Symbol("http.server.connectionsCheckingInterval");
var getBunServerAllClosedPromise = @lazy(40);
var sendHelper = @lazy(4);
var kServerResponse = Symbol("ServerResponse");
var kRejectNonStandardBodyWrites = Symbol("kRejectNonStandardBodyWrites");
var GlobalPromise = globalThis.Promise;
var kEmptyBuffer = @Buffer.alloc(0);
var ObjectKeys = Object.keys;
var MathMin = Math.min;
var cluster;
function emitCloseServer(self) {
  callCloseCallback(self);
  self.emit("close");
}
function emitCloseNTServer() {
  process.nextTick(emitCloseServer, this);
}
function setCloseCallback(self, callback) {
  if (callback === self[kCloseCallback]) {
    return;
  }
  if (self[kCloseCallback]) {
    throw new Error("Close callback already set");
  }
  self[kCloseCallback] = callback;
}
function assignSocketInternal(self, socket) {
  if (socket._httpMessage) {
    throw @makeErrorWithCode(74, "Socket already assigned");
  }
  socket._httpMessage = self;
  setCloseCallback(socket, onServerResponseClose);
  self.socket = socket;
  self.emit("socket", socket);
}
function onServerResponseClose() {
  const httpMessage = this._httpMessage;
  if (httpMessage) {
    emitCloseNT(httpMessage);
  }
}
function strictContentLength(response) {
  if (response.strictContentLength) {
    let contentLength = response._contentLength ?? response.getHeader("content-length");
    if (contentLength && response._hasBody && !response._removedContLen && !response.chunkedEncoding && !response.hasHeader("transfer-encoding")) {
      if (typeof contentLength === "number") {
        return contentLength;
      } else if (typeof contentLength === "string") {
        contentLength = parseInt(contentLength, 10);
        if (NumberIsNaN(contentLength)) {
          return;
        }
        return contentLength;
      }
    }
  }
}
var ServerResponse_writeDeprecated = function _write(chunk, encoding, callback) {
  if (@isCallable(encoding)) {
    callback = encoding;
    encoding = @undefined;
  }
  if (!@isCallable(callback)) {
    callback = @undefined;
  }
  if (encoding && encoding !== "buffer") {
    chunk = @Buffer.from(chunk, encoding);
  }
  if (this.destroyed || this.finished) {
    if (chunk) {
      emitErrorNextTickIfErrorListenerNT(this, @makeErrorWithCode(236), callback);
    }
    return false;
  }
  if (this[firstWriteSymbol] === @undefined && !this.headersSent) {
    this[firstWriteSymbol] = chunk;
    if (callback)
      callback();
    return;
  }
  ensureReadableStreamController.@call(this, (controller) => {
    controller.write(chunk);
    if (callback)
      callback();
  });
};
function onNodeHTTPServerSocketTimeout() {
  const req = this[kRequest];
  const reqTimeout = req && !req.complete && req.emit("timeout", this);
  const res = this._httpMessage;
  const resTimeout = res && res.emit("timeout", this);
  const serverTimeout = this.server.emit("timeout", this);
  if (!reqTimeout && !resTimeout && !serverTimeout)
    this.destroy();
}
function emitRequestCloseNT(self) {
  callCloseCallback(self);
  self.emit("close");
}
function emitListeningNextTick(self, hostname, port) {
  if (self.listening = !!self[serverSymbol]) {
    self.emit("listening", null, hostname, port);
  }
}
function Server(options, callback) {
  if (!(this instanceof Server))
    return new Server(options, callback);
  EventEmitter.@call(this);
  this[kConnectionsCheckingInterval] = { _destroyed: false };
  this.listening = false;
  this._unref = false;
  this.maxRequestsPerSocket = 0;
  this[kInternalSocketData] = @undefined;
  this[tlsSymbol] = null;
  this.noDelay = true;
  if (typeof options === "function") {
    callback = options;
    options = {};
  } else if (options == null) {
    options = {};
  } else {
    validateObject(options, "options");
    options = { ...options };
    let cert = options.cert;
    if (cert) {
      throwOnInvalidTLSArray("options.cert", cert);
      this[isTlsSymbol] = true;
    }
    let key = options.key;
    if (key) {
      throwOnInvalidTLSArray("options.key", key);
      this[isTlsSymbol] = true;
    }
    let ca = options.ca;
    if (ca) {
      throwOnInvalidTLSArray("options.ca", ca);
      this[isTlsSymbol] = true;
    }
    let passphrase = options.passphrase;
    if (passphrase && typeof passphrase !== "string") {
      throw @makeErrorWithCode(118, "options.passphrase", "string", passphrase);
    }
    let serverName = options.servername;
    if (serverName && typeof serverName !== "string") {
      throw @makeErrorWithCode(118, "options.servername", "string", serverName);
    }
    let secureOptions = options.secureOptions || 0;
    if (secureOptions && typeof secureOptions !== "number") {
      throw @makeErrorWithCode(118, "options.secureOptions", "number", secureOptions);
    }
    if (this[isTlsSymbol]) {
      this[tlsSymbol] = {
        serverName,
        key,
        cert,
        ca,
        passphrase,
        secureOptions
      };
    } else {
      this[tlsSymbol] = null;
    }
  }
  this[optionsSymbol] = options;
  storeHTTPOptions.@call(this, options);
  if (callback)
    this.on("request", callback);
  return this;
}
@toClass(Server, "Server", EventEmitter);
Server.prototype[kIncomingMessage] = @undefined;
Server.prototype[kServerResponse] = @undefined;
Server.prototype[kConnectionsCheckingInterval] = @undefined;
Server.prototype.ref = function() {
  this._unref = false;
  this[serverSymbol]?.ref?.();
  return this;
};
Server.prototype.unref = function() {
  this._unref = true;
  this[serverSymbol]?.unref?.();
  return this;
};
Server.prototype.closeAllConnections = function() {
  const server = this[serverSymbol];
  if (!server) {
    return;
  }
  this[serverSymbol] = @undefined;
  const connectionsCheckingInterval = this[kConnectionsCheckingInterval];
  if (connectionsCheckingInterval) {
    connectionsCheckingInterval._destroyed = true;
  }
  this.listening = false;
  server.stop(true);
};
Server.prototype.closeIdleConnections = function() {
  const server = this[serverSymbol];
  server?.closeIdleConnections();
};
Server.prototype.close = function(optionalCallback) {
  const server = this[serverSymbol];
  if (!server) {
    if (typeof optionalCallback === "function")
      process.nextTick(optionalCallback, @makeErrorWithCode(214));
    return;
  }
  this[serverSymbol] = @undefined;
  const connectionsCheckingInterval = this[kConnectionsCheckingInterval];
  if (connectionsCheckingInterval) {
    connectionsCheckingInterval._destroyed = true;
  }
  if (typeof optionalCallback === "function")
    setCloseCallback(this, optionalCallback);
  this.listening = false;
  server.closeIdleConnections();
  server.stop();
};
Server.prototype[EventEmitter.captureRejectionSymbol] = function(err, event, ...args) {
  switch (event) {
    case "request": {
      const { 1: res2 } = args;
      if (!res2.headersSent && !res2.writableEnded) {
        const names = res2.getHeaderNames();
        for (let i = 0;i < names.length; i++) {
          res2.removeHeader(names[i]);
        }
        res2.statusCode = 500;
        res2.end(STATUS_CODES[500]);
      } else {
        res2.destroy();
      }
      break;
    }
    default:
      const { 1: res } = args;
      res?.socket?.destroy();
      break;
  }
};
Server.prototype[Symbol.asyncDispose] = function() {
  const { resolve, reject, promise } = @Promise.withResolvers();
  this.close(function(err, ...args) {
    if (err) {
      reject(err);
    } else
      resolve(...args);
  });
  return promise;
};
Server.prototype.address = function() {
  if (!this[serverSymbol])
    return null;
  return this[serverSymbol].address;
};
Server.prototype.listen = function() {
  const server = this;
  let port, host, onListen;
  let socketPath;
  let tls = this[tlsSymbol];
  if (arguments.length > 0) {
    if ((@isObject(arguments[0]) || @isCallable(arguments[0])) && arguments[0] !== null) {
      port = arguments[0].port;
      host = arguments[0].host;
      socketPath = arguments[0].path;
      const otherTLS = arguments[0].tls;
      if (otherTLS && @isObject(otherTLS)) {
        tls = otherTLS;
      }
    } else if (typeof arguments[0] === "string" && !(Number(arguments[0]) >= 0)) {
      socketPath = arguments[0];
    } else {
      port = arguments[0];
      if (arguments.length > 1 && typeof arguments[1] === "string") {
        host = arguments[1];
      }
    }
  }
  if (port === @undefined && !socketPath) {
    port = 0;
  }
  if (typeof port === "string") {
    const portNumber = parseInt(port);
    if (!Number.isNaN(portNumber)) {
      port = portNumber;
    }
  }
  if (@isCallable(arguments[arguments.length - 1])) {
    onListen = arguments[arguments.length - 1];
  }
  try {
    if (isPrimary) {
      server[kRealListen](tls, port, host, socketPath, false, onListen);
      return this;
    }
    if (cluster === @undefined)
      cluster = @getInternalField(@internalModuleRegistry, 88) || @createInternalModuleById(88);
    server.once("listening", () => {
      cluster.worker.state = "listening";
      const address = server.address();
      const message = {
        act: "listening",
        port: address && address.port || port,
        data: null,
        addressType: 4
      };
      sendHelper(message, null);
    });
    server[kRealListen](tls, port, host, socketPath, true, onListen);
  } catch (err) {
    setTimeout(() => server.emit("error", err), 1);
  }
  return this;
};
Server.prototype[kRealListen] = function(tls, port, host, socketPath, reusePort, onListen) {
  {
    const ResponseClass = this[optionsSymbol].ServerResponse || ServerResponse;
    const RequestClass = this[optionsSymbol].IncomingMessage || IncomingMessage;
    const canUseInternalAssignSocket = ResponseClass?.prototype.assignSocket === ServerResponse.prototype.assignSocket;
    let isHTTPS = false;
    let server = this;
    if (tls) {
      this.serverName = tls.serverName || host || "localhost";
    }
    this[serverSymbol] = Bun.serve({
      idleTimeout: 0,
      tls,
      port,
      hostname: host,
      unix: socketPath,
      reusePort,
      websocket: {
        open(ws) {
          ws.data.open(ws);
        },
        message(ws, message) {
          ws.data.message(ws, message);
        },
        close(ws, code, reason) {
          ws.data.close(ws, code, reason);
        },
        drain(ws) {
          ws.data.drain(ws);
        },
        ping(ws, data) {
          ws.data.ping(ws, data);
        },
        pong(ws, data) {
          ws.data.pong(ws, data);
        }
      },
      maxRequestBodySize: Number.MAX_SAFE_INTEGER,
      onNodeHTTPRequest(bunServer, url, method, headersObject, headersArray, handle, hasBody, socketHandle, isSocketNew, socket, isAncientHTTP, connectHead) {
        const prevIsNextIncomingMessageHTTPS = getIsNextIncomingMessageHTTPS();
        setIsNextIncomingMessageHTTPS(isHTTPS);
        if (!socket) {
          socket = new NodeHTTPServerSocket(server, socketHandle, !!tls);
        }
        const http_req = new RequestClass(kHandle, url, method, headersObject, headersArray, handle, hasBody, socket);
        if (isAncientHTTP) {
          http_req.httpVersion = "1.0";
        }
        if (method === "CONNECT") {
          if (server.listenerCount("connect") > 0) {
            socket[kEnableStreaming](true);
            const { promise: promise2, resolve: resolve2 } = @newPromiseCapability(@Promise);
            socket.once("close", resolve2);
            const head = connectHead ? connectHead : kEmptyBuffer;
            server.emit("connect", http_req, socket, head);
            return promise2;
          } else {
            socketHandle.close();
          }
          return;
        }
        socket[kEnableStreaming](false);
        const http_res = new ResponseClass(http_req, {
          [kHandle]: handle,
          [kRejectNonStandardBodyWrites]: server.rejectNonStandardBodyWrites
        });
        setIsNextIncomingMessageHTTPS(prevIsNextIncomingMessageHTTPS);
        handle.onabort = onServerRequestEvent.bind(socket);
        if (hasBody) {
          handle.pause();
        }
        drainMicrotasks();
        let resolveFunction;
        let didFinish = false;
        const isRequestsLimitSet = typeof server.maxRequestsPerSocket === "number" && server.maxRequestsPerSocket > 0;
        let reachedRequestsLimit = false;
        if (isRequestsLimitSet) {
          const requestCount = (socket._requestCount || 0) + 1;
          socket._requestCount = requestCount;
          if (server.maxRequestsPerSocket < requestCount) {
            reachedRequestsLimit = true;
          }
        }
        if (isSocketNew && !reachedRequestsLimit) {
          server.emit("connection", socket);
        }
        socket[kRequest] = http_req;
        const is_upgrade = http_req.headers.upgrade;
        if (!is_upgrade) {
          if (canUseInternalAssignSocket) {
            assignSocketInternal(http_res, socket);
          } else {
            http_res.assignSocket(socket);
          }
        }
        function onClose() {
          didFinish = true;
          if (resolveFunction)
            resolveFunction();
        }
        setCloseCallback(http_res, onClose);
        if (reachedRequestsLimit) {
          server.emit("dropRequest", http_req, socket);
          http_res.writeHead(503);
          http_res.end();
          socket.destroy();
        } else if (is_upgrade) {
          server.emit("upgrade", http_req, socket, kEmptyBuffer);
          if (!socket._httpMessage) {
            if (canUseInternalAssignSocket) {
              assignSocketInternal(http_res, socket);
            } else {
              http_res.assignSocket(socket);
            }
          }
        } else if (http_req.headers.expect !== @undefined) {
          if (http_req.headers.expect === "100-continue") {
            if (server.listenerCount("checkContinue") > 0) {
              server.emit("checkContinue", http_req, http_res);
            } else {
              http_res.writeContinue();
              server.emit("request", http_req, http_res);
            }
          } else if (server.listenerCount("checkExpectation") > 0) {
            server.emit("checkExpectation", http_req, http_res);
          } else {
            http_res.writeHead(417);
            http_res.end();
          }
        } else {
          server.emit("request", http_req, http_res);
        }
        socket.cork();
        if (handle.finished || didFinish) {
          handle = @undefined;
          http_res[kCloseCallback] = @undefined;
          http_res.detachSocket(socket);
          return;
        }
        if (http_res.socket) {
          http_res.on("finish", http_res.detachSocket.bind(http_res, socket));
        }
        const { resolve, promise } = @newPromiseCapability(@Promise);
        resolveFunction = resolve;
        return promise;
      }
    });
    getBunServerAllClosedPromise(this[serverSymbol]).@then(emitCloseNTServer.bind(this));
    isHTTPS = this[serverSymbol].protocol === "https";
    setServerCustomOptions(this[serverSymbol], this.requireHostHeader, true, typeof this.maxHeaderSize !== "undefined" ? this.maxHeaderSize : getMaxHTTPHeaderSize(), onServerClientError.bind(this));
    if (this?._unref) {
      this[serverSymbol]?.unref?.();
    }
    if (@isCallable(onListen)) {
      this.once("listening", onListen);
    }
    if (this[kDeferredTimeouts]) {
      for (const { msecs, callback } of this[kDeferredTimeouts]) {
        this.setTimeout(msecs, callback);
      }
      delete this[kDeferredTimeouts];
    }
    setTimeout(emitListeningNextTick, 1, this, this[serverSymbol]?.hostname, this[serverSymbol]?.port);
  }
};
Server.prototype.setTimeout = function(msecs, callback) {
  const server = this[serverSymbol];
  if (server) {
    setServerIdleTimeout(server, Math.ceil(msecs / 1000));
    if (typeof callback === "function")
      this.once("timeout", callback);
  } else {
    (this[kDeferredTimeouts] ??= []).push({ msecs, callback });
  }
  return this;
};
function onServerRequestEvent(event) {
  const socket = this;
  switch (event) {
    case NodeHTTPResponseAbortEvent.abort: {
      if (!socket.destroyed) {
        socket.destroy();
      }
      break;
    }
    case NodeHTTPResponseAbortEvent.timeout: {
      socket.emit("timeout");
      break;
    }
  }
}
function onServerClientError(ssl, socket, errorCode, rawPacket) {
  const self = this;
  let err;
  switch (errorCode) {
    case 2 /* HTTP_PARSER_ERROR_INVALID_CONTENT_LENGTH */:
      err = @makeErrorWithCode(287, "Parse Error");
      break;
    case 3 /* HTTP_PARSER_ERROR_INVALID_TRANSFER_ENCODING */:
      err = @makeErrorWithCode(288, "Parse Error");
      break;
    case 8 /* HTTP_PARSER_ERROR_INVALID_EOF */:
      err = @makeErrorWithCode(289, "Parse Error");
      break;
    case 9 /* HTTP_PARSER_ERROR_INVALID_METHOD */:
      err = @makeErrorWithCode(290, "Parse Error: Invalid method encountered");
      err.bytesParsed = 1;
      break;
    case 10 /* HTTP_PARSER_ERROR_INVALID_HEADER_TOKEN */:
      err = @makeErrorWithCode(300, "Parse Error: Invalid header token encountered");
      break;
    case 6 /* HTTP_PARSER_ERROR_REQUEST_HEADER_FIELDS_TOO_LARGE */:
      err = @makeErrorWithCode(301, "Parse Error: Header overflow");
      err.bytesParsed = rawPacket.byteLength;
      break;
    default:
      err = @makeErrorWithCode(291, "Parse Error");
      break;
  }
  err.rawPacket = rawPacket;
  const nodeSocket = new NodeHTTPServerSocket(self, socket, ssl);
  self.emit("connection", nodeSocket);
  self.emit("clientError", err, nodeSocket);
  if (nodeSocket.listenerCount("error") > 0) {
    nodeSocket.emit("error", err);
  }
}
var kBytesWritten = Symbol("kBytesWritten");
var kEnableStreaming = Symbol("kEnableStreaming");
var NodeHTTPServerSocket = class Socket extends Duplex {
  bytesRead = 0;
  connecting = false;
  timeout = 0;
  [kBytesWritten] = 0;
  [kHandle];
  server;
  _httpMessage;
  _secureEstablished = false;
  #pendingCallback = null;
  constructor(server, handle, encrypted) {
    super();
    this.server = server;
    this[kHandle] = handle;
    this._secureEstablished = !!handle?.secureEstablished;
    handle.onclose = this.#onClose.bind(this);
    handle.duplex = this;
    this.encrypted = encrypted;
    this.on("timeout", onNodeHTTPServerSocketTimeout);
  }
  get bytesWritten() {
    const handle = this[kHandle];
    return handle ? handle.response?.getBytesWritten?.() ?? handle.bytesWritten ?? this[kBytesWritten] ?? 0 : this[kBytesWritten] ?? 0;
  }
  set bytesWritten(value) {
    this[kBytesWritten] = value;
  }
  [kEnableStreaming](enable) {
    const handle = this[kHandle];
    if (handle) {
      if (enable) {
        handle.ondata = this.#onData.bind(this);
        handle.ondrain = this.#onDrain.bind(this);
      } else {
        handle.ondata = @undefined;
        handle.ondrain = @undefined;
      }
    }
  }
  #onDrain() {
    const handle = this[kHandle];
    this[kBytesWritten] = handle ? handle.response?.getBytesWritten?.() ?? handle.bytesWritten ?? 0 : 0;
    const callback = this.#pendingCallback;
    if (callback) {
      this.#pendingCallback = null;
      callback();
    }
    this.emit("drain");
  }
  #onData(chunk, last) {
    if (chunk) {
      this.push(chunk);
    }
    if (last) {
      const handle = this[kHandle];
      if (handle) {
        handle.ondata = @undefined;
      }
      this.push(null);
    }
  }
  #closeHandle(handle, callback) {
    this[kHandle] = @undefined;
    handle.onclose = this.#onCloseForDestroy.bind(this, callback);
    handle.close();
    const message = this._httpMessage;
    const req = message?.req;
    if (req && !req.complete) {
      req.destroy();
    }
  }
  #onClose() {
    this[kHandle] = null;
    const message = this._httpMessage;
    const req = message?.req;
    if (req && !req.complete && !req[kHandle]?.upgraded) {
      req[kHandle] = @undefined;
      if (req.listenerCount("error") > 0) {
        req.destroy(new ConnResetException("aborted"));
      } else {
        req.destroy();
      }
    }
  }
  #onCloseForDestroy(closeCallback) {
    this.#onClose();
    if (@isCallable(closeCallback))
      closeCallback();
  }
  _onTimeout() {
    const handle = this[kHandle];
    const response = handle?.response;
    if (response && response.writableLength > 0) {
      return;
    }
    this.emit("timeout");
  }
  _unrefTimer() {}
  address() {
    return this[kHandle]?.remoteAddress || null;
  }
  get bufferSize() {
    return this.writableLength;
  }
  connect(_port, _host, _connectListener) {
    return this;
  }
  _destroy(err, callback) {
    const handle = this[kHandle];
    if (!handle) {
      if (@isCallable(callback))
        callback(err);
      return;
    }
    handle.ondata = @undefined;
    if (handle.closed) {
      const onclose = handle.onclose;
      handle.onclose = @undefined;
      if (@isCallable(onclose)) {
        onclose.@call(handle);
      }
      if (@isCallable(callback))
        callback(err);
      return;
    }
    this.#closeHandle(handle, callback);
  }
  _final(callback) {
    const handle = this[kHandle];
    if (!handle) {
      callback();
      return;
    }
    handle.end();
    callback();
  }
  get localAddress() {
    return this[kHandle]?.localAddress?.address;
  }
  get localFamily() {
    return this[kHandle]?.localAddress?.family;
  }
  get localPort() {
    return this[kHandle]?.localAddress?.port;
  }
  get pending() {
    return this.connecting;
  }
  #resumeSocket() {
    const handle = this[kHandle];
    const response = handle?.response;
    if (response) {
      const resumed = response.resume();
      if (resumed && resumed !== true) {
        const bodyReadState = handle.hasBody;
        const message = this._httpMessage;
        const req = message?.req;
        if ((bodyReadState & NodeHTTPBodyReadState.done) !== 0) {
          emitServerSocketEOFNT(this, req);
        }
        if (req) {
          req.push(resumed);
        }
        this.push(resumed);
      }
    }
  }
  _read(_size) {
    this.#resumeSocket();
  }
  get readyState() {
    if (this.connecting)
      return "opening";
    if (this.readable) {
      return this.writable ? "open" : "readOnly";
    } else {
      return this.writable ? "writeOnly" : "closed";
    }
  }
  ref() {
    return this;
  }
  get remoteAddress() {
    return this.address()?.address;
  }
  set remoteAddress(val) {
    this.address().address = val;
  }
  get remotePort() {
    return this.address()?.port;
  }
  set remotePort(val) {
    this.address().port = val;
  }
  get remoteFamily() {
    return this.address()?.family;
  }
  set remoteFamily(val) {
    this.address().family = val;
  }
  resetAndDestroy() {}
  setKeepAlive(_enable = false, _initialDelay = 0) {}
  setNoDelay(_noDelay = true) {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setEncoding(_encoding) {
    const err = new Error("Changing the socket encoding is not allowed per RFC7230 Section 3.");
    err.code = "ERR_HTTP_SOCKET_ENCODING";
    throw err;
  }
  unref() {
    return this;
  }
  _write(_chunk, _encoding, _callback) {
    const handle = this[kHandle];
    let err;
    try {
      if (handle && handle.ondrain && !handle.write(_chunk, _encoding)) {
        this.#pendingCallback = _callback;
        return false;
      }
    } catch (e) {
      err = e;
    }
    if (err)
      _callback(err);
    else
      _callback();
  }
  pause() {
    const handle = this[kHandle];
    const response = handle?.response;
    if (response) {
      response.pause();
    }
    return super.pause();
  }
  resume() {
    this.#resumeSocket();
    return super.resume();
  }
  get [kInternalSocketData]() {
    return this[kHandle]?.response;
  }
};
function _writeHead(statusCode, reason, obj, response) {
  const originalStatusCode = statusCode;
  let hasContentLength = response.hasHeader("content-length");
  statusCode |= 0;
  if (statusCode < 100 || statusCode > 999) {
    throw @makeErrorWithCode(72, format("%s", originalStatusCode));
  }
  if (typeof reason === "string") {
    response.statusMessage = reason;
  } else {
    if (!response.statusMessage)
      response.statusMessage = STATUS_CODES[statusCode] || "unknown";
    obj ??= reason;
  }
  if (checkInvalidHeaderChar(response.statusMessage))
    throw @makeErrorWithCode(121, "statusMessage");
  response.statusCode = statusCode;
  {
    let k;
    if (@isArray(obj)) {
      const length = obj.length;
      if (length && @isArray(obj[0])) {
        for (let i = 0;i < length; i++) {
          const k2 = obj[i];
          if (k2)
            response.appendHeader(k2[0], k2[1]);
        }
      } else {
        if (length % 2 !== 0) {
          throw @makeErrorWithCode(119, "headers", obj);
        }
        if ((response.chunkedEncoding !== true || response.hasHeader("content-length")) && (response._trailer || response.hasHeader("trailer"))) {
          throw @makeErrorWithCode(73, "Trailers are invalid with this transfer encoding");
        }
        for (let n = 0;n < length; n += 2) {
          k = obj[n + 0];
          response.removeHeader(k);
        }
        for (let n = 0;n < length; n += 2) {
          k = obj[n];
          if (k)
            response.appendHeader(k, obj[n + 1]);
        }
      }
    } else if (obj) {
      const keys = Object.keys(obj);
      const length = keys.length;
      for (let i = 0;i < length; i++) {
        k = keys[i];
        if (k)
          response.setHeader(k, obj[k]);
      }
    }
    if ((response.chunkedEncoding !== true || response.hasHeader("content-length")) && (response._trailer || response.hasHeader("trailer"))) {
      if (hasContentLength) {
        response.removeHeader("trailer");
      } else {
        response.removeHeader("content-length");
      }
      throw @makeErrorWithCode(73, "Trailers are invalid with this transfer encoding");
    }
  }
  updateHasBody(response, statusCode);
}
Object.defineProperty(NodeHTTPServerSocket, "name", { value: "Socket" });
function ServerResponse(req, options) {
  if (!(this instanceof ServerResponse))
    return new ServerResponse(req, options);
  OutgoingMessage.@call(this, options);
  this.useChunkedEncodingByDefault = true;
  if (this[kDeprecatedReplySymbol] = options?.[kDeprecatedReplySymbol]) {
    this[controllerSymbol] = @undefined;
    this[firstWriteSymbol] = @undefined;
    this[deferredSymbol] = @undefined;
    this.write = ServerResponse_writeDeprecated;
    this.end = ServerResponse_finalDeprecated;
  }
  this.req = req;
  this.sendDate = true;
  this._sent100 = false;
  this[headerStateSymbol] = NodeHTTPHeaderState.none;
  this[kPendingCallbacks] = [];
  this.finished = false;
  if (req.method === "HEAD")
    this._hasBody = false;
  if (options) {
    const handle = options[kHandle];
    if (handle) {
      this[kHandle] = handle;
    } else {
      this[kHandle] = req[kHandle];
    }
    this[kRejectNonStandardBodyWrites] = options[kRejectNonStandardBodyWrites] ?? false;
  } else {
    this[kHandle] = req[kHandle];
  }
  this.statusCode = 200;
  this.statusMessage = @undefined;
  this.chunkedEncoding = false;
}
@toClass(ServerResponse, "ServerResponse", OutgoingMessage);
ServerResponse.prototype._removedConnection = false;
ServerResponse.prototype._removedContLen = false;
ServerResponse.prototype._hasBody = true;
ServerResponse.prototype._ended = false;
ServerResponse.prototype[kRejectNonStandardBodyWrites] = @undefined;
Object.defineProperty(ServerResponse.prototype, "headersSent", {
  get() {
    return this[headerStateSymbol] === NodeHTTPHeaderState.sent || this[headerStateSymbol] === NodeHTTPHeaderState.assigned;
  },
  set(value) {
    this[headerStateSymbol] = value ? NodeHTTPHeaderState.sent : NodeHTTPHeaderState.none;
  }
});
ServerResponse.prototype._writeRaw = function(chunk, encoding, callback) {
  return this.socket.write(chunk, encoding, callback);
};
ServerResponse.prototype.writeEarlyHints = function(hints, cb) {
  let head = `HTTP/1.1 103 Early Hints\r
`;
  validateObject(hints, "hints");
  if (hints.link === null || hints.link === @undefined) {
    return;
  }
  const link = validateLinkHeaderValue(hints.link);
  if (link.length === 0) {
    return;
  }
  head += "Link: " + link + `\r
`;
  for (const key of ObjectKeys(hints)) {
    if (key !== "link") {
      const value = hints[key];
      validateHeaderName(key);
      validateHeaderValue(key, value);
      head += key + ": " + value + `\r
`;
    }
  }
  head += `\r
`;
  this._writeRaw(head, "ascii", cb);
};
ServerResponse.prototype.writeProcessing = function(cb) {
  this._writeRaw(`HTTP/1.1 102 Processing\r
\r
`, "ascii", cb);
};
ServerResponse.prototype.writeContinue = function(cb) {
  this.socket[kHandle]?.response?.writeContinue();
  cb?.();
};
ServerResponse.prototype.end = function(chunk, encoding, callback) {
  const handle = this[kHandle];
  if (handle?.aborted) {
    return this;
  }
  if (@isCallable(chunk)) {
    callback = chunk;
    chunk = @undefined;
    encoding = @undefined;
  } else if (@isCallable(encoding)) {
    callback = encoding;
    encoding = @undefined;
  } else if (!@isCallable(callback)) {
    callback = @undefined;
  }
  if (hasServerResponseFinished(this, chunk, callback)) {
    return this;
  }
  if (chunk && !this._hasBody) {
    if (this[kRejectNonStandardBodyWrites]) {
      throw @makeErrorWithCode(68);
    } else {
      chunk = @undefined;
    }
  }
  if (!handle) {
    if (@isCallable(callback)) {
      process.nextTick(callback);
    }
    return this;
  }
  const headerState = this[headerStateSymbol];
  callWriteHeadIfObservable(this, headerState);
  const flags = handle.flags;
  if (!!(flags & NodeHTTPResponseFlags.closed_or_completed)) {
    return true;
  }
  if (headerState !== NodeHTTPHeaderState.sent) {
    handle.cork(() => {
      handle.writeHead(this.statusCode, this.statusMessage, this[headersSymbol]);
      this[headerStateSymbol] = NodeHTTPHeaderState.sent;
      this._contentLength = handle.end(chunk, encoding, @undefined, strictContentLength(this));
    });
  } else {
    if (!(!chunk && handle.ended) && !handle.aborted) {
      handle.end(chunk, encoding, @undefined, strictContentLength(this));
    }
  }
  this._header = " ";
  const req = this.req;
  const socket = req.socket;
  if (!req._consuming && !req?._readableState?.resumeScheduled) {
    req._dump();
  }
  this.detachSocket(socket);
  this.finished = true;
  process.nextTick((self) => {
    self._ended = true;
  }, this);
  this.emit("prefinish");
  this._callPendingCallbacks();
  if (callback) {
    process.nextTick(function(callback2, self) {
      self.emit("finish");
      try {
        callback2();
      } catch (err) {
        self.emit("error", err);
      }
      process.nextTick(emitCloseNT, self);
    }, callback, this);
  } else {
    process.nextTick(function(self) {
      self.emit("finish");
      process.nextTick(emitCloseNT, self);
    }, this);
  }
  return this;
};
Object.defineProperty(ServerResponse.prototype, "writable", {
  get() {
    return !this._ended || !hasServerResponseFinished(this);
  }
});
ServerResponse.prototype.write = function(chunk, encoding, callback) {
  const handle = this[kHandle];
  if (@isCallable(chunk)) {
    callback = chunk;
    chunk = @undefined;
    encoding = @undefined;
  } else if (@isCallable(encoding)) {
    callback = encoding;
    encoding = @undefined;
  } else if (!@isCallable(callback)) {
    callback = @undefined;
  }
  if (hasServerResponseFinished(this, chunk, callback)) {
    return false;
  }
  if (chunk && !this._hasBody) {
    if (this[kRejectNonStandardBodyWrites]) {
      throw @makeErrorWithCode(68);
    } else {
      chunk = @undefined;
    }
  }
  let result = 0;
  const headerState = this[headerStateSymbol];
  callWriteHeadIfObservable(this, headerState);
  if (!handle) {
    if (this.socket) {
      return this.socket.write(chunk, encoding, callback);
    } else {
      return OutgoingMessagePrototype.write.@call(this, chunk, encoding, callback);
    }
  }
  const flags = handle.flags;
  if (!!(flags & NodeHTTPResponseFlags.closed_or_completed)) {
    return true;
  }
  if (this[headerStateSymbol] !== NodeHTTPHeaderState.sent) {
    handle.cork(() => {
      handle.writeHead(this.statusCode, this.statusMessage, this[headersSymbol]);
      this[headerStateSymbol] = NodeHTTPHeaderState.sent;
      result = handle.write(chunk, encoding, allowWritesToContinue.bind(this), strictContentLength(this));
    });
  } else {
    result = handle.write(chunk, encoding, allowWritesToContinue.bind(this), strictContentLength(this));
  }
  if (result < 0) {
    if (callback) {
      this[kPendingCallbacks].push(callback);
    }
    return false;
  }
  this._callPendingCallbacks();
  if (callback) {
    process.nextTick(callback);
  }
  this.emit("drain");
  return true;
};
ServerResponse.prototype._callPendingCallbacks = function() {
  const originalLength = this[kPendingCallbacks].length;
  for (let i = 0;i < originalLength; ++i) {
    process.nextTick(this[kPendingCallbacks][i]);
  }
  if (this[kPendingCallbacks].length == originalLength) {
    this[kPendingCallbacks] = [];
  } else {
    this[kPendingCallbacks].splice(0, originalLength);
  }
};
ServerResponse.prototype._finish = function() {
  this.emit("prefinish");
};
ServerResponse.prototype.detachSocket = function(socket) {
  if (socket._httpMessage === this) {
    if (socket[kCloseCallback])
      socket[kCloseCallback] = @undefined;
    socket.removeListener("close", onServerResponseClose);
    socket._httpMessage = null;
  }
  this.socket = null;
};
ServerResponse.prototype._implicitHeader = function() {
  if (this.headersSent)
    return;
  this.writeHead(this.statusCode);
};
Object.defineProperty(ServerResponse.prototype, "writableNeedDrain", {
  get() {
    return !this.destroyed && !this.finished && (this[kHandle]?.bufferedAmount ?? 0) !== 0;
  }
});
Object.defineProperty(ServerResponse.prototype, "writableFinished", {
  get() {
    return !!(this.finished && (!this[kHandle] || this[kHandle].finished));
  }
});
Object.defineProperty(ServerResponse.prototype, "writableLength", {
  get() {
    return this.writableFinished ? 0 : this[kHandle]?.bufferedAmount ?? 0;
  }
});
Object.defineProperty(ServerResponse.prototype, "writableHighWaterMark", {
  get() {
    return 64 * 1024;
  }
});
Object.defineProperty(ServerResponse.prototype, "closed", {
  get() {
    return this._closed;
  }
});
ServerResponse.prototype._send = function(data, encoding, callback, _byteLength) {
  const handle = this[kHandle];
  if (!handle) {
    return OutgoingMessagePrototype._send.@apply(this, arguments);
  }
  if (this[headerStateSymbol] !== NodeHTTPHeaderState.sent) {
    handle.cork(() => {
      handle.writeHead(this.statusCode, this.statusMessage, this[headersSymbol]);
      this[headerStateSymbol] = NodeHTTPHeaderState.sent;
      handle.write(data, encoding, callback, strictContentLength(this));
    });
  } else {
    handle.write(data, encoding, callback, strictContentLength(this));
  }
};
ServerResponse.prototype.writeHead = function(statusCode, statusMessage, headers) {
  if (this.headersSent) {
    throw @makeErrorWithCode(69, "writeHead");
  }
  _writeHead(statusCode, statusMessage, headers, this);
  this[headerStateSymbol] = NodeHTTPHeaderState.assigned;
  return this;
};
ServerResponse.prototype.assignSocket = function(socket) {
  if (socket._httpMessage) {
    throw @makeErrorWithCode(74, "Socket already assigned");
  }
  socket._httpMessage = this;
  socket.once("close", onServerResponseClose);
  this.socket = socket;
  this.emit("socket", socket);
};
Object.defineProperty(ServerResponse.prototype, "shouldKeepAlive", {
  get() {
    return this[kHandle]?.shouldKeepAlive ?? true;
  },
  set(_value) {}
});
ServerResponse.prototype.destroy = function(_err) {
  if (this.destroyed)
    return this;
  const handle = this[kHandle];
  this.destroyed = true;
  if (handle) {
    handle.abort();
  }
  this?.socket?.destroy();
  this.emit("close");
  return this;
};
ServerResponse.prototype.emit = function(event) {
  if (event === "close") {
    callCloseCallback(this);
  }
  return Stream.prototype.emit.@apply(this, arguments);
};
ServerResponse.prototype.flushHeaders = function() {
  if (this[headerStateSymbol] === NodeHTTPHeaderState.sent)
    return;
  if (this[headerStateSymbol] !== NodeHTTPHeaderState.assigned)
    this._implicitHeader();
  const handle = this[kHandle];
  if (handle) {
    if (this[headerStateSymbol] === NodeHTTPHeaderState.assigned) {
      this[headerStateSymbol] = NodeHTTPHeaderState.sent;
      handle.writeHead(this.statusCode, this.statusMessage, this[headersSymbol]);
    }
    handle.flushHeaders();
  }
};
function updateHasBody(response, statusCode) {
  if (statusCode === 204 || statusCode === 304 || statusCode >= 100 && statusCode <= 199) {
    response._hasBody = false;
  } else {
    response._hasBody = true;
  }
}
function emitServerSocketEOF(self, req) {
  self.push(null);
  if (req) {
    req.push(null);
    req.complete = true;
  }
}
function emitServerSocketEOFNT(self, req) {
  if (req) {
    req[eofInProgress] = true;
  }
  process.nextTick(emitServerSocketEOF, self);
}
var OriginalWriteHeadFn;
var OriginalImplicitHeadFn;
function callWriteHeadIfObservable(self, headerState) {
  if (headerState === NodeHTTPHeaderState.none && !(self.writeHead === OriginalWriteHeadFn && self._implicitHeader === OriginalImplicitHeadFn)) {
    self.writeHead(self.statusCode, self.statusMessage, self[headersSymbol]);
  }
}
function allowWritesToContinue() {
  this._callPendingCallbacks();
  this.emit("drain");
}
function drainHeadersIfObservable() {
  if (this._implicitHeader === OriginalImplicitHeadFn && this.writeHead === OriginalWriteHeadFn) {
    return;
  }
  this._implicitHeader();
}
function ServerResponse_finalDeprecated(chunk, encoding, callback) {
  if (@isCallable(encoding)) {
    callback = encoding;
    encoding = @undefined;
  }
  if (!@isCallable(callback)) {
    callback = @undefined;
  }
  if (this.destroyed || this.finished) {
    if (chunk) {
      emitErrorNextTickIfErrorListenerNT(this, @makeErrorWithCode(236), callback);
    }
    return false;
  }
  if (encoding && encoding !== "buffer") {
    chunk = @Buffer.from(chunk, encoding);
  }
  const req = this.req;
  const shouldEmitClose = req && req.emit && !this.finished;
  if (!this.headersSent) {
    let data = this[firstWriteSymbol];
    if (chunk) {
      if (data) {
        if (encoding) {
          data = @Buffer.from(data, encoding);
        }
        data = new Blob([data, chunk]);
      } else {
        data = chunk;
      }
    } else if (!data) {
      data = @undefined;
    } else {
      data = new Blob([data]);
    }
    this[firstWriteSymbol] = @undefined;
    this.finished = true;
    this.headersSent = true;
    drainHeadersIfObservable.@call(this);
    this[kDeprecatedReplySymbol](new Response(data, {
      headers: this[headersSymbol],
      status: this.statusCode,
      statusText: this.statusMessage ?? STATUS_CODES[this.statusCode]
    }));
    if (shouldEmitClose) {
      req.complete = true;
      process.nextTick(emitRequestCloseNT, req);
    }
    callback?.();
    return;
  }
  this.finished = true;
  ensureReadableStreamController.@call(this, (controller) => {
    if (chunk && encoding) {
      chunk = @Buffer.from(chunk, encoding);
    }
    let prom;
    if (chunk) {
      controller.write(chunk);
      prom = controller.end();
    } else {
      prom = controller.end();
    }
    const handler = () => {
      callback();
      const deferred = this[deferredSymbol];
      if (deferred) {
        this[deferredSymbol] = @undefined;
        deferred();
      }
    };
    if (@isPromise(prom))
      prom.then(handler, handler);
    else
      handler();
  });
}
ServerResponse.prototype.writeHeader = ServerResponse.prototype.writeHead;
OriginalWriteHeadFn = ServerResponse.prototype.writeHead;
OriginalImplicitHeadFn = ServerResponse.prototype._implicitHeader;
function storeHTTPOptions(options) {
  this[kIncomingMessage] = options.IncomingMessage || IncomingMessage;
  this[kServerResponse] = options.ServerResponse || ServerResponse;
  const maxHeaderSize = options.maxHeaderSize;
  if (maxHeaderSize !== @undefined)
    validateInteger(maxHeaderSize, "maxHeaderSize", 0);
  this.maxHeaderSize = maxHeaderSize;
  const insecureHTTPParser = options.insecureHTTPParser;
  if (insecureHTTPParser !== @undefined)
    validateBoolean(insecureHTTPParser, "options.insecureHTTPParser");
  this.insecureHTTPParser = insecureHTTPParser;
  const requestTimeout = options.requestTimeout;
  if (requestTimeout !== @undefined) {
    validateInteger(requestTimeout, "requestTimeout", 0);
    this.requestTimeout = requestTimeout;
  } else {
    this.requestTimeout = 300000;
  }
  const headersTimeout = options.headersTimeout;
  if (headersTimeout !== @undefined) {
    validateInteger(headersTimeout, "headersTimeout", 0);
    this.headersTimeout = headersTimeout;
  } else {
    this.headersTimeout = MathMin(60000, this.requestTimeout);
  }
  if (this.requestTimeout > 0 && this.headersTimeout > 0 && this.headersTimeout > this.requestTimeout) {
    throw @makeErrorWithCode(156, "headersTimeout", "<= requestTimeout", headersTimeout);
  }
  const keepAliveTimeout = options.keepAliveTimeout;
  if (keepAliveTimeout !== @undefined) {
    validateInteger(keepAliveTimeout, "keepAliveTimeout", 0);
    this.keepAliveTimeout = keepAliveTimeout;
  } else {
    this.keepAliveTimeout = 5000;
  }
  const connectionsCheckingInterval = options.connectionsCheckingInterval;
  if (connectionsCheckingInterval !== @undefined) {
    validateInteger(connectionsCheckingInterval, "connectionsCheckingInterval", 0);
    this.connectionsCheckingInterval = connectionsCheckingInterval;
  } else {
    this.connectionsCheckingInterval = 30000;
  }
  const requireHostHeader = options.requireHostHeader;
  if (requireHostHeader !== @undefined) {
    validateBoolean(requireHostHeader, "options.requireHostHeader");
    this.requireHostHeader = requireHostHeader;
  } else {
    this.requireHostHeader = true;
  }
  const joinDuplicateHeaders = options.joinDuplicateHeaders;
  if (joinDuplicateHeaders !== @undefined) {
    validateBoolean(joinDuplicateHeaders, "options.joinDuplicateHeaders");
  }
  this.joinDuplicateHeaders = joinDuplicateHeaders;
  const rejectNonStandardBodyWrites = options.rejectNonStandardBodyWrites;
  if (rejectNonStandardBodyWrites !== @undefined) {
    validateBoolean(rejectNonStandardBodyWrites, "options.rejectNonStandardBodyWrites");
    this.rejectNonStandardBodyWrites = rejectNonStandardBodyWrites;
  } else {
    this.rejectNonStandardBodyWrites = false;
  }
}
function ensureReadableStreamController(run) {
  const thisController = this[controllerSymbol];
  if (thisController)
    return run(thisController);
  this.headersSent = true;
  let firstWrite = this[firstWriteSymbol];
  const old_run = this[runSymbol];
  if (old_run) {
    old_run.push(run);
    return;
  }
  this[runSymbol] = [run];
  this[kDeprecatedReplySymbol](new Response(new @ReadableStream({
    type: "direct",
    pull: (controller) => {
      this[controllerSymbol] = controller;
      if (firstWrite)
        controller.write(firstWrite);
      firstWrite = @undefined;
      for (let run2 of this[runSymbol]) {
        run2(controller);
      }
      if (!this.finished) {
        const { promise, resolve } = @newPromiseCapability(GlobalPromise);
        this[deferredSymbol] = resolve;
        return promise;
      }
    }
  }), {
    headers: this[headersSymbol],
    status: this.statusCode,
    statusText: this.statusMessage ?? STATUS_CODES[this.statusCode]
  }));
}
$ = {
  Server,
  ServerResponse,
  kConnectionsCheckingInterval
};
return $})
