// @bun
// build/debug/tmp_modules/thirdparty/ws.ts
var $;
var ReadyState_CONNECTING = 0;
var ReadyState_OPEN = 1;
var ReadyState_CLOSING = 2;
var ReadyState_CLOSED = 3;
var EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var http = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 99) || __intrinsic__createInternalModuleById(99);
var onceObject = { once: true };
var kBunInternals = Symbol.for("::bunternal::");
var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
var encoder = new TextEncoder;
function extractAgentOptions(agent) {
  const connectOpts = agent?.connectOpts || agent?.options;
  let tls = null;
  let proxy = null;
  if (__intrinsic__isObject(connectOpts)) {
    const newTlsOptions = {};
    let hasTlsOptions = false;
    if (connectOpts.rejectUnauthorized !== __intrinsic__undefined) {
      newTlsOptions.rejectUnauthorized = connectOpts.rejectUnauthorized;
      hasTlsOptions = true;
    }
    if (connectOpts.ca) {
      newTlsOptions.ca = connectOpts.ca;
      hasTlsOptions = true;
    }
    if (connectOpts.cert) {
      newTlsOptions.cert = connectOpts.cert;
      hasTlsOptions = true;
    }
    if (connectOpts.key) {
      newTlsOptions.key = connectOpts.key;
      hasTlsOptions = true;
    }
    if (connectOpts.passphrase) {
      newTlsOptions.passphrase = connectOpts.passphrase;
      hasTlsOptions = true;
    }
    if (hasTlsOptions) {
      tls = newTlsOptions;
    }
  }
  const agentProxy = connectOpts?.proxy || agent?.proxy;
  if (agentProxy) {
    const proxyUrl = agentProxy?.href || agentProxy;
    if (agent?.proxyHeaders) {
      const proxyHeaders = __intrinsic__isCallable(agent.proxyHeaders) ? agent.proxyHeaders.__intrinsic__call(agent) : agent.proxyHeaders;
      proxy = { url: proxyUrl, headers: proxyHeaders };
    } else {
      proxy = proxyUrl;
    }
  }
  return { tls, proxy };
}
var eventIds = {
  open: 1,
  close: 2,
  message: 3,
  error: 4,
  ping: 5,
  pong: 6
};
var emittedWarnings = new Set;
function emitWarning(type, message) {
  if (emittedWarnings.has(type))
    return;
  emittedWarnings.add(type);
  console.warn("[bun] Warning:", message);
}
function normalizeData(data, opts) {
  const isBinary = opts?.binary;
  if (typeof data === "number") {
    data = data.toString();
  }
  if (isBinary === true && typeof data === "string") {
    data = __intrinsic__Buffer.from(data);
  } else if (isBinary === false && __intrinsic__isTypedArrayView(data)) {
    data = new __intrinsic__Buffer(data.buffer, data.byteOffset, data.byteLength).toString("utf-8");
  }
  return data;
}
var WebSocket;

class BunWebSocket extends EventEmitter {
  static [Symbol.toStringTag] = "WebSocket";
  static CONNECTING = ReadyState_CONNECTING;
  static OPEN = ReadyState_OPEN;
  static CLOSING = ReadyState_CLOSING;
  static CLOSED = ReadyState_CLOSED;
  #ws;
  #paused = false;
  #fragments = false;
  #binaryType = "nodebuffer";
  #eventId = 0;
  constructor(url, protocols, options) {
    super();
    if (!WebSocket) {
      WebSocket = __intrinsic__lazy(97);
    }
    if (protocols === __intrinsic__undefined) {
      protocols = [];
    } else if (!__intrinsic__Array.isArray(protocols)) {
      if (typeof protocols === "object" && protocols !== null) {
        options = protocols;
        protocols = [];
      } else {
        protocols = [protocols];
      }
    }
    let headers;
    let method = "GET";
    let proxy;
    let tlsOptions;
    let agent;
    if (__intrinsic__isObject(options)) {
      headers = options?.headers;
      proxy = options?.proxy;
      tlsOptions = options?.tls;
      agent = options?.agent;
      if (__intrinsic__isObject(agent)) {
        const agentOpts = extractAgentOptions(agent);
        if (!proxy && agentOpts.proxy) {
          proxy = agentOpts.proxy;
        }
        if (!tlsOptions && agentOpts.tls) {
          tlsOptions = agentOpts.tls;
        }
      }
    }
    const finishRequest = options?.finishRequest;
    if (__intrinsic__isCallable(finishRequest)) {
      if (headers) {
        headers = {
          __proto__: null,
          ...headers
        };
      }
      let lazyRawHeaders;
      let didCallEnd = false;
      const nodeHttpClientRequestSimulated = {
        __proto__: Object.create(EventEmitter.prototype),
        setHeader: function(name, value) {
          if (!headers)
            headers = Object.create(null);
          headers[name.toLowerCase()] = value;
        },
        getHeader: function(name) {
          return headers ? headers[name.toLowerCase()] : __intrinsic__undefined;
        },
        removeHeader: function(name) {
          if (headers)
            delete headers[name.toLowerCase()];
        },
        getHeaders: function() {
          return { ...headers };
        },
        hasHeader: function(name) {
          return headers ? name.toLowerCase() in headers : false;
        },
        headersSent: false,
        method,
        path: url,
        abort: function() {},
        end: () => {
          if (!didCallEnd) {
            didCallEnd = true;
            this.#createWebSocket(url, protocols, headers, method, proxy, tlsOptions);
          }
        },
        write() {},
        writeHead() {},
        [Symbol.toStringTag]: "ClientRequest",
        get rawHeaders() {
          if (lazyRawHeaders === __intrinsic__undefined) {
            lazyRawHeaders = [];
            for (const key in headers) {
              lazyRawHeaders.push(key, headers[key]);
            }
          }
          return lazyRawHeaders;
        },
        set rawHeaders(value) {
          lazyRawHeaders = value;
        },
        rawTrailers: [],
        trailers: null,
        finished: false,
        socket: __intrinsic__undefined,
        _header: null,
        _headerSent: false,
        _last: null
      };
      EventEmitter.__intrinsic__call(nodeHttpClientRequestSimulated);
      finishRequest(nodeHttpClientRequestSimulated);
      if (!didCallEnd) {
        this.#createWebSocket(url, protocols, headers, method, proxy, tlsOptions);
      }
      return;
    }
    this.#createWebSocket(url, protocols, headers, method, proxy, tlsOptions);
  }
  #createWebSocket(url, protocols, headers, method, proxy, tls) {
    let wsOptions;
    if (headers || proxy || tls) {
      wsOptions = { protocols };
      if (headers)
        wsOptions.headers = headers;
      if (method)
        wsOptions.method = method;
      if (proxy)
        wsOptions.proxy = proxy;
      if (tls)
        wsOptions.tls = tls;
    } else {
      wsOptions = protocols;
    }
    let ws = this.#ws = new WebSocket(url, wsOptions);
    ws.binaryType = "nodebuffer";
    return ws;
  }
  #onOrOnce(event, listener, once) {
    if (event === "unexpected-response" || event === "upgrade" || event === "redirect") {
      emitWarning(event, "ws.WebSocket '" + event + "' event is not implemented in bun");
    }
    const mask = 1 << eventIds[event];
    const hasPersistentListener = mask && (this.#eventId & mask) === mask;
    if (mask && !hasPersistentListener) {
      if (!once) {
        this.#eventId |= mask;
      }
      if (event === "open") {
        this.#ws.addEventListener("open", () => {
          this.emit("open");
        }, once);
      } else if (event === "close") {
        this.#ws.addEventListener("close", ({ code, reason, wasClean }) => {
          this.emit("close", code, reason, wasClean);
        }, once);
      } else if (event === "message") {
        this.#ws.addEventListener("message", ({ data }) => {
          const isBinary = typeof data !== "string";
          if (isBinary) {
            this.emit("message", this.#fragments ? [data] : data, isBinary);
          } else {
            let encoded = encoder.encode(data);
            if (this.#binaryType !== "arraybuffer") {
              encoded = __intrinsic__Buffer.from(encoded.buffer, encoded.byteOffset, encoded.byteLength);
            }
            this.emit("message", this.#fragments ? [encoded] : encoded, isBinary);
          }
        }, once);
      } else if (event === "error") {
        this.#ws.addEventListener("error", (err) => {
          this.emit("error", err);
        }, once);
      } else if (event === "ping") {
        this.#ws.addEventListener("ping", ({ data }) => {
          this.emit("ping", data);
        }, once);
      } else if (event === "pong") {
        this.#ws.addEventListener("pong", ({ data }) => {
          this.emit("pong", data);
        }, once);
      }
    }
    return once ? super.once(event, listener) : super.on(event, listener);
  }
  on(event, listener) {
    return this.#onOrOnce(event, listener, __intrinsic__undefined);
  }
  once(event, listener) {
    return this.#onOrOnce(event, listener, onceObject);
  }
  send(data, opts, cb) {
    if (__intrinsic__isCallable(opts)) {
      cb = opts;
      opts = __intrinsic__undefined;
    }
    try {
      this.#ws.send(normalizeData(data, opts), opts?.compress);
    } catch (error) {
      if (typeof cb === "function")
        process.nextTick(cb, error);
      return;
    }
    if (typeof cb === "function")
      process.nextTick(cb, null);
  }
  close(code, reason) {
    const ws = this.#ws;
    if (ws) {
      ws.close(code, reason);
    }
  }
  terminate() {
    const ws = this.#ws;
    if (ws) {
      ws.terminate();
    }
  }
  get url() {
    return this.#ws.url;
  }
  get readyState() {
    return this.#ws.readyState;
  }
  get binaryType() {
    return this.#binaryType;
  }
  set binaryType(value) {
    if (value === "nodebuffer" || value === "arraybuffer") {
      this.#ws.binaryType = this.#binaryType = value;
      this.#fragments = false;
    } else if (value === "fragments") {
      this.#ws.binaryType = "nodebuffer";
      this.#binaryType = "fragments";
      this.#fragments = true;
    } else {
      throw new Error(`Invalid binaryType: ${value}`);
    }
  }
  get protocol() {
    return this.#ws.protocol;
  }
  get extensions() {
    return this.#ws.extensions;
  }
  addEventListener(type, listener, options) {
    this.#ws.addEventListener(type, listener, options);
  }
  removeEventListener(type, listener) {
    this.#ws.removeEventListener(type, listener);
  }
  get onopen() {
    return this.#ws.onopen;
  }
  set onopen(value) {
    this.#ws.onopen = value;
  }
  get onerror() {
    return this.#ws.onerror;
  }
  set onerror(value) {
    this.#ws.onerror = value;
  }
  get onclose() {
    return this.#ws.onclose;
  }
  set onclose(value) {
    this.#ws.onclose = value;
  }
  get onmessage() {
    return this.#ws.onmessage;
  }
  set onmessage(value) {
    this.#ws.onmessage = value;
  }
  get bufferedAmount() {
    return this.#ws.bufferedAmount;
  }
  get isPaused() {
    return this.#paused;
  }
  ping(data, mask, cb) {
    if (this.#ws.readyState === 0) {
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    }
    if (typeof data === "function") {
      cb = data;
      data = mask = __intrinsic__undefined;
    } else if (typeof mask === "function") {
      cb = mask;
      mask = __intrinsic__undefined;
    }
    if (typeof data === "number")
      data = data.toString();
    try {
      if (data === __intrinsic__undefined)
        this.#ws.ping();
      else
        this.#ws.ping(data);
    } catch (error) {
      if (typeof cb === "function") {
        cb(error);
        return;
      }
      this.emit("error", error);
      return;
    }
    if (typeof cb === "function")
      cb();
  }
  pong(data, mask, cb) {
    if (this.#ws.readyState === 0) {
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    }
    if (typeof data === "function") {
      cb = data;
      data = mask = __intrinsic__undefined;
    } else if (typeof mask === "function") {
      cb = mask;
      mask = __intrinsic__undefined;
    }
    if (typeof data === "number")
      data = data.toString();
    try {
      if (data === __intrinsic__undefined)
        this.#ws.pong();
      else
        this.#ws.pong(data);
    } catch (error) {
      if (typeof cb === "function") {
        cb(error);
        return;
      }
      this.emit("error", error);
      return;
    }
    if (typeof cb === "function")
      cb();
  }
  pause() {
    switch (this.readyState) {
      case ReadyState_CONNECTING:
      case ReadyState_CLOSED:
        return;
    }
    this.#paused = true;
    emitWarning("pause()", "ws.WebSocket.pause() is not implemented in bun");
  }
  resume() {
    switch (this.readyState) {
      case ReadyState_CONNECTING:
      case ReadyState_CLOSED:
        return;
    }
    this.#paused = false;
    emitWarning("resume()", "ws.WebSocket.resume() is not implemented in bun");
  }
}
Object.defineProperty(BunWebSocket, "name", { value: "WebSocket" });
var wsKeyRegex = /^[+/0-9A-Za-z]{22}==$/;
var wsTokenChars = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  0,
  1,
  0
];
function subprotocolParse(header) {
  const protocols = new Set;
  let start = -1;
  let end = -1;
  let i = 0;
  for (i;i < header.length; i++) {
    const code = header.charCodeAt(i);
    if (end === -1 && wsTokenChars[code] === 1) {
      if (start === -1)
        start = i;
    } else if (i !== 0 && (code === 32 || code === 9)) {
      if (end === -1 && start !== -1)
        end = i;
    } else if (code === 44) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
      if (end === -1)
        end = i;
      const protocol2 = header.slice(start, end);
      if (protocols.has(protocol2)) {
        throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
      }
      protocols.add(protocol2);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }
  if (start === -1 || end !== -1) {
    throw new SyntaxError("Unexpected end of input");
  }
  const protocol = header.slice(start, i);
  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }
  protocols.add(protocol);
  return protocols;
}
function wsEmitClose(server) {
  server._state = CLOSED;
  server.emit("close");
}
function abortHandshake(response, code, message, headers = {}) {
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: "close",
    "Content-Type": "text/html",
    "Content-Length": __intrinsic__Buffer.byteLength(message),
    ...headers
  };
  response.writeHead(code, headers);
  response.write(message);
  response.end();
}
function abortHandshakeOrEmitwsClientError(server, req, response, socket, code, message) {
  if (server.listenerCount("wsClientError")) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
    server.emit("wsClientError", err, socket, req);
  } else {
    abortHandshake(response, code, message);
  }
}
var RUNNING = 0;
var CLOSING = 1;
var CLOSED = 2;

class BunWebSocketMocked extends EventEmitter {
  #ws;
  #state;
  #enquedMessages = [];
  #url;
  #protocol;
  #extensions;
  #bufferedAmount = 0;
  #binaryType = "arraybuffer";
  #onclose;
  #onerror;
  #onmessage;
  #onopen;
  constructor(url, protocol, extensions, binaryType) {
    super();
    this.#ws = null;
    this.#state = ReadyState_CONNECTING;
    this.#url = url;
    this.#bufferedAmount = 0;
    binaryType = binaryType || "arraybuffer";
    if (binaryType !== "nodebuffer" && binaryType !== "blob" && binaryType !== "arraybuffer") {
      __intrinsic__throwTypeError("binaryType must be either 'blob', 'arraybuffer' or 'nodebuffer'");
    }
    this.#binaryType = binaryType;
    this.#protocol = protocol;
    this.#extensions = extensions;
    const message = this.#message.bind(this);
    const open = this.#open.bind(this);
    const close = this.#close.bind(this);
    const drain = this.#drain.bind(this);
    const ping = this.#ping.bind(this);
    const pong = this.#pong.bind(this);
    this[kBunInternals] = {
      message,
      open,
      close,
      drain,
      ping,
      pong
    };
  }
  #ping(ws, data) {
    this.#ws = ws;
    this.emit("ping", data);
  }
  #pong(ws, data) {
    this.#ws = ws;
    this.emit("pong", data);
  }
  #message(ws, message) {
    this.#ws = ws;
    let isBinary = false;
    if (typeof message === "string") {
      if (this.#binaryType === "arraybuffer") {
        message = encoder.encode(message).buffer;
      } else if (this.#binaryType === "blob") {
        message = new Blob([message], { type: "text/plain" });
      } else {
        message = __intrinsic__Buffer.from(message);
      }
    } else {
      isBinary = true;
      if (this.#binaryType !== "nodebuffer") {
        if (this.#binaryType === "arraybuffer") {
          message = new __intrinsic__Uint8Array(message);
        } else if (this.#binaryType === "blob") {
          message = new Blob([message]);
        }
      }
    }
    this.emit("message", message, isBinary);
  }
  #open(ws) {
    this.#ws = ws;
    this.#state = ReadyState_OPEN;
    this.emit("open", this);
    this.#drain(ws);
  }
  #close(ws, code, reason) {
    this.#state = ReadyState_CLOSED;
    this.#ws = null;
    this.emit("close", code, reason);
  }
  #drain(ws) {
    let chunk;
    while ((chunk = this.#enquedMessages[0]) && this.#state === 1) {
      const [data, compress, cb] = chunk;
      const written = ws.send(data, compress);
      if (written < 1) {
        return;
      }
      this.#bufferedAmount -= chunk.length;
      this.#enquedMessages.shift();
      if (typeof cb === "function")
        queueMicrotask(cb);
    }
  }
  ping(data, mask, cb) {
    if (this.#state === ReadyState_CONNECTING) {
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    }
    if (typeof data === "function") {
      cb = data;
      data = mask = __intrinsic__undefined;
    } else if (typeof mask === "function") {
      cb = mask;
      mask = __intrinsic__undefined;
    }
    if (typeof data === "number")
      data = data.toString();
    try {
      if (data === __intrinsic__undefined)
        this.#ws.ping();
      else
        this.#ws.ping(data);
    } catch (error) {
      if (typeof cb === "function")
        cb(error);
      return;
    }
    if (typeof cb === "function")
      cb();
  }
  pong(data, mask, cb) {
    if (this.#state === ReadyState_CONNECTING) {
      throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
    }
    if (typeof data === "function") {
      cb = data;
      data = mask = __intrinsic__undefined;
    } else if (typeof mask === "function") {
      cb = mask;
      mask = __intrinsic__undefined;
    }
    if (typeof data === "number")
      data = data.toString();
    try {
      if (data === __intrinsic__undefined)
        this.#ws.pong();
      else
        this.#ws.pong(data);
    } catch (error) {
      if (typeof cb === "function")
        cb(error);
      return;
    }
    if (typeof cb === "function")
      cb();
  }
  send(data, opts, cb) {
    if (__intrinsic__isCallable(opts)) {
      cb = opts;
      opts = __intrinsic__undefined;
    }
    if (this.#state === ReadyState_OPEN) {
      const compress = opts?.compress;
      data = normalizeData(data, opts);
      const written = this.#ws.send(data, compress);
      if (written === 0) {
        this.#enquedMessages.push([data, compress, cb]);
        this.#bufferedAmount += data.length;
        return;
      }
      if (typeof cb === "function")
        process.nextTick(cb);
    } else if (this.#state === ReadyState_CONNECTING) {
      this.#enquedMessages.push([data, opts?.compress, cb]);
      this.#bufferedAmount += data.length;
    }
  }
  close(code, reason) {
    if (this.#state === ReadyState_OPEN) {
      this.#state = ReadyState_CLOSING;
      this.#ws.close(code, reason);
    }
  }
  terminate() {
    if (!this)
      return;
    let state = this.#state;
    if (state === ReadyState_CLOSED)
      return;
    if (state === ReadyState_CONNECTING) {
      const msg = "WebSocket was closed before the connection was established";
      abortHandshake(this, this._req, msg);
      return;
    }
    let ws = this.#ws;
    if (ws) {
      this.#state = ReadyState_CLOSING;
      ws.terminate();
    }
  }
  get binaryType() {
    return this.#binaryType;
  }
  set binaryType(type) {
    if (type !== "nodebuffer" && type !== "blob" && type !== "arraybuffer") {
      __intrinsic__throwTypeError("binaryType must be either 'blob', 'arraybuffer' or 'nodebuffer'");
    }
    this.#binaryType = type;
  }
  get readyState() {
    return this.#state;
  }
  get url() {
    return this.#url;
  }
  get protocol() {
    return this.#protocol;
  }
  get extensions() {
    return this.#extensions;
  }
  get bufferedAmount() {
    return this.#bufferedAmount ?? 0;
  }
  setSocket(_socket, _head, _options) {
    throw new Error("Not implemented");
  }
  set onclose(cb) {
    if (this.#onclose) {
      this.removeListener("close", this.#onclose);
    }
    this.on("close", cb);
    this.#onclose = cb;
  }
  set onerror(cb) {
    if (this.#onerror) {
      this.removeListener("error", this.#onerror);
    }
    this.on("error", cb);
    this.#onerror = cb;
  }
  set onmessage(cb) {
    if (this.#onmessage) {
      this.removeListener("message", this.#onmessage);
    }
    const l = (data) => cb({ data });
    this.on("message", l);
    this.#onmessage = l;
  }
  set onopen(cb) {
    if (this.#onopen) {
      this.removeListener("open", this.#onopen);
    }
    this.on("open", cb);
    this.#onopen = cb;
  }
  get onclose() {
    return this.#onclose;
  }
  get onerror() {
    return this.#onerror;
  }
  get onmessage() {
    return this.#onmessage;
  }
  get onopen() {
    return this.#onopen;
  }
  addEventListener(type, listener, _options) {
    if (type === "message") {
      const l = (data) => listener({ data });
      l.listener = listener;
      this.on(type, l);
      return;
    }
    this.on(type, listener);
  }
  removeEventListener(type, listener) {
    this.off(type, listener);
  }
}

class WebSocketServer extends EventEmitter {
  _server;
  options;
  clients;
  _shouldEmitClose;
  _state;
  _removeListeners;
  constructor(options, callback) {
    super();
    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null,
      server: null,
      host: null,
      path: null,
      port: null,
      ...options
    };
    if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
      __intrinsic__throwTypeError('One and only one of the "port", "server", or "noServer" options must be specified');
    }
    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];
        res.writeHead(426, {
          "Content-Length": body.length,
          "Content-Type": "text/plain"
        });
        res.end(body);
      });
      this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      this._server = options.server;
    }
    if (this._server) {
      const emitConnection = this.emit.bind(this, "connection");
      const emitListening = this.emit.bind(this, "listening");
      const emitError = this.emit.bind(this, "error");
      const doUpgrade = (req, socket, head) => {
        this.handleUpgrade(req, socket, head, emitConnection);
      };
      this._server.on("listening", emitListening);
      this._server.on("error", emitError);
      this._server.on("upgrade", doUpgrade);
      this._removeListeners = () => {
        this._server.removeListener("upgrade", doUpgrade);
        this._server.removeListener("listening", emitListening);
        this._server.removeListener("error", emitError);
      };
    }
    if (options.perMessageDeflate === true)
      options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set;
      this._shouldEmitClose = false;
    }
    this.options = options;
    this._state = RUNNING;
  }
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }
    if (!this._server)
      return null;
    return this._server.address();
  }
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once("close", () => {
          cb(new Error("The server is not running"));
        });
      }
      process.nextTick((server) => {
        server._state = CLOSED;
        server.emit("close");
      }, this);
      return;
    }
    if (cb)
      this.once("close", cb);
    if (this._state === CLOSING)
      return;
    this._state = CLOSING;
    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }
      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick((server) => {
            server._state = CLOSED;
            server.emit("close");
          }, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick((server) => {
          server._state = CLOSED;
          server.emit("close");
        }, this);
      }
    } else {
      const server = this._server;
      this._removeListeners();
      this._removeListeners = this._server = null;
      server.close(() => {
        this._state = CLOSED;
        this.emit("close");
      });
    }
  }
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf("?");
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
      if (pathname !== this.options.path)
        return false;
    }
    return true;
  }
  completeUpgrade(extensions, key, protocols, request, socket, head, cb) {
    const response = socket._httpMessage;
    const server = socket.server[kBunInternals];
    const req = socket[kBunInternals];
    if (this._state > RUNNING)
      return abortHandshake(response, 503);
    let protocol = "";
    if (protocols.size) {
      protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, request) : protocols.values().next().value;
    }
    const ws = new BunWebSocketMocked(request.url, protocol, extensions, "nodebuffer");
    const headers = ["HTTP/1.1 101 Switching Protocols", "Upgrade: websocket", "Connection: Upgrade"];
    this.emit("headers", headers, request);
    if (server.upgrade(req, {
      data: ws[kBunInternals],
      headers: protocol ? { "sec-websocket-protocol": protocol } : __intrinsic__undefined
    })) {
      if (this.clients) {
        this.clients.add(ws);
        ws.on("close", () => {
          this.clients.delete(ws);
          if (this._shouldEmitClose && !this.clients.size) {
            process.nextTick(wsEmitClose, this);
          }
        });
      }
      cb(ws, request);
    } else {
      abortHandshake(response, 500);
    }
  }
  handleUpgrade(req, socket, head, cb) {
    const response = socket._httpMessage || socket[kBunInternals];
    const key = req.headers["sec-websocket-key"];
    const version = +req.headers["sec-websocket-version"];
    if (req.method !== "GET") {
      const message = "Invalid HTTP method";
      abortHandshakeOrEmitwsClientError(this, req, response, socket, 405, message);
      return;
    }
    if (req.headers.upgrade.toLowerCase() !== "websocket") {
      const message = "Invalid Upgrade header";
      abortHandshakeOrEmitwsClientError(this, req, response, socket, 400, message);
      return;
    }
    if (!key || !wsKeyRegex.test(key)) {
      const message = "Missing or invalid Sec-WebSocket-Key header";
      abortHandshakeOrEmitwsClientError(this, req, response, socket, 400, message);
      return;
    }
    if (version !== 8 && version !== 13) {
      const message = "Missing or invalid Sec-WebSocket-Version header";
      abortHandshakeOrEmitwsClientError(this, req, response, socket, 400, message);
      return;
    }
    if (!this.shouldHandle(req)) {
      abortHandshake(response, 400);
      return;
    }
    const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
    let protocols = new Set;
    if (secWebSocketProtocol !== __intrinsic__undefined) {
      try {
        protocols = subprotocolParse(secWebSocketProtocol);
      } catch {
        const message = "Invalid Sec-WebSocket-Protocol header";
        abortHandshakeOrEmitwsClientError(this, req, response, socket, 400, message);
        return;
      }
    }
    const extensions = {};
    if (this.options.verifyClient) {
      const info = {
        origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };
      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(response, code || 401, message, headers);
          }
          this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
        });
        return;
      }
      if (!this.options.verifyClient(info))
        return abortHandshake(response, 401);
    }
    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }
}
Object.defineProperty(BunWebSocket, "CONNECTING", {
  enumerable: true,
  value: readyStates.indexOf("CONNECTING")
});
Object.defineProperty(BunWebSocket.prototype, "CONNECTING", {
  enumerable: true,
  value: readyStates.indexOf("CONNECTING")
});
Object.defineProperty(BunWebSocket, "OPEN", {
  enumerable: true,
  value: readyStates.indexOf("OPEN")
});
Object.defineProperty(BunWebSocket.prototype, "OPEN", {
  enumerable: true,
  value: readyStates.indexOf("OPEN")
});
Object.defineProperty(BunWebSocket, "CLOSING", {
  enumerable: true,
  value: readyStates.indexOf("CLOSING")
});
Object.defineProperty(BunWebSocket.prototype, "CLOSING", {
  enumerable: true,
  value: readyStates.indexOf("CLOSING")
});
Object.defineProperty(BunWebSocket, "CLOSED", {
  enumerable: true,
  value: readyStates.indexOf("CLOSED")
});
Object.defineProperty(BunWebSocket.prototype, "CLOSED", {
  enumerable: true,
  value: readyStates.indexOf("CLOSED")
});
Object.defineProperty(BunWebSocketMocked.prototype, "CONNECTING", {
  enumerable: true,
  value: readyStates.indexOf("CONNECTING")
});
Object.defineProperty(BunWebSocketMocked.prototype, "OPEN", {
  enumerable: true,
  value: readyStates.indexOf("OPEN")
});
Object.defineProperty(BunWebSocketMocked.prototype, "CLOSING", {
  enumerable: true,
  value: readyStates.indexOf("CLOSING")
});
Object.defineProperty(BunWebSocketMocked.prototype, "CLOSED", {
  enumerable: true,
  value: readyStates.indexOf("CLOSED")
});

class Sender {
  constructor() {
    throw new Error("Not supported yet in Bun");
  }
}

class Receiver {
  constructor() {
    throw new Error("Not supported yet in Bun");
  }
}
var createWebSocketStream = (_ws) => {
  throw new Error("Not supported yet in Bun");
};
$ = Object.assign(BunWebSocket, {
  createWebSocketStream,
  Receiver,
  Sender,
  WebSocket: BunWebSocket,
  Server: WebSocketServer,
  WebSocketServer
});
$$EXPORT$$($).$$EXPORT_END$$;
