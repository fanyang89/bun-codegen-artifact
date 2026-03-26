// @bun
// build/debug/tmp_modules/internal/debugger.ts
var $;
var socketFramerMessageLengthBuffer;

class SocketFramer {
  onMessage;
  state = 0 /* WaitingForLength */;
  pendingLength = 0;
  sizeBuffer = __intrinsic__Buffer.alloc(4);
  sizeBufferIndex = 0;
  bufferedData = __intrinsic__Buffer.alloc(0);
  constructor(onMessage) {
    this.onMessage = onMessage;
    if (!socketFramerMessageLengthBuffer) {
      socketFramerMessageLengthBuffer = __intrinsic__Buffer.alloc(4);
    }
    this.reset();
  }
  reset() {
    this.state = 0 /* WaitingForLength */;
    this.bufferedData = __intrinsic__Buffer.alloc(0);
    this.sizeBufferIndex = 0;
    this.sizeBuffer = __intrinsic__Buffer.alloc(4);
  }
  send(socket, data) {
    if (!!$debug_log_enabled) {
      $debug_log("local:", data);
    }
    socketFramerMessageLengthBuffer.writeUInt32BE(__intrinsic__Buffer.byteLength(data), 0);
    socket.__intrinsic__write(socketFramerMessageLengthBuffer);
    socket.__intrinsic__write(data);
  }
  onData(socket, data) {
    this.bufferedData = this.bufferedData.length > 0 ? __intrinsic__Buffer.concat([this.bufferedData, data]) : data;
    let messagesToDeliver = [];
    while (this.bufferedData.length > 0) {
      if (this.state === 0 /* WaitingForLength */) {
        if (this.sizeBufferIndex + this.bufferedData.length < 4) {
          const remainingBytes2 = Math.min(4 - this.sizeBufferIndex, this.bufferedData.length);
          this.bufferedData.copy(this.sizeBuffer, this.sizeBufferIndex, 0, remainingBytes2);
          this.sizeBufferIndex += remainingBytes2;
          this.bufferedData = this.bufferedData.slice(remainingBytes2);
          break;
        }
        const remainingBytes = 4 - this.sizeBufferIndex;
        this.bufferedData.copy(this.sizeBuffer, this.sizeBufferIndex, 0, remainingBytes);
        this.pendingLength = this.sizeBuffer.readUInt32BE(0);
        this.state = 1 /* WaitingForMessage */;
        this.sizeBufferIndex = 0;
        this.bufferedData = this.bufferedData.slice(remainingBytes);
      }
      if (this.bufferedData.length < this.pendingLength) {
        break;
      }
      const message = this.bufferedData.toString("utf-8", 0, this.pendingLength);
      this.bufferedData = this.bufferedData.slice(this.pendingLength);
      this.state = 0 /* WaitingForLength */;
      this.pendingLength = 0;
      this.sizeBufferIndex = 0;
      messagesToDeliver.push(message);
    }
    if (!!$debug_log_enabled) {
      $debug_log("remote:", messagesToDeliver);
    }
    if (messagesToDeliver.length === 1) {
      this.onMessage(messagesToDeliver[0]);
    } else if (messagesToDeliver.length > 1) {
      this.onMessage(messagesToDeliver);
    }
  }
}
$ = function(executionContextId, url, createBackend, send, close, isAutomatic, urlIsServer) {
  if (urlIsServer) {
    connectToUnixServer(executionContextId, url, createBackend, send, close);
    return;
  }
  let debug;
  try {
    debug = new Debugger(executionContextId, url, createBackend, send, close);
  } catch (error) {
    exit(`Failed to start inspector:
`, error);
  }
  if (!isAutomatic) {
    if (debug.url) {
      const { protocol, href, host, pathname } = debug.url;
      if (!protocol.includes("unix")) {
        Bun.write(Bun.stderr, dim("--------------------- Bun Inspector ---------------------") + reset() + `
`);
        Bun.write(Bun.stderr, `Listening:
  ${dim(href)}
`);
        if (protocol.includes("ws")) {
          Bun.write(Bun.stderr, `Inspect in browser:
  ${link(`https://debug.bun.sh/#${host}${pathname}`)}
`);
        }
        Bun.write(Bun.stderr, dim("--------------------- Bun Inspector ---------------------") + reset() + `
`);
      }
    } else {
      Bun.write(Bun.stderr, dim("--------------------- Bun Inspector ---------------------") + reset() + `
`);
      Bun.write(Bun.stderr, `Listening on ${dim(url)}
`);
      Bun.write(Bun.stderr, dim("--------------------- Bun Inspector ---------------------") + reset() + `
`);
    }
  }
  const notifyUrl = process.env["BUN_INSPECT_NOTIFY"] || "";
  if (notifyUrl) {
    process.env["BUN_INSPECT_NOTIFY"] = "";
    if (notifyUrl.startsWith("unix://")) {
      const path = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107) || __intrinsic__createInternalModuleById(107);
      notify({
        unix: path.resolve(notifyUrl.substring("unix://".length))
      });
    } else {
      const { hostname, port } = new URL(notifyUrl);
      notify({
        hostname,
        port: port && port !== "0" ? Number(port) : __intrinsic__undefined
      });
    }
  }
};
function unescapeUnixSocketUrl(href) {
  if (href.startsWith("unix://%2F")) {
    return decodeURIComponent(href.substring("unix://".length));
  }
  return href;
}

class Debugger {
  #url;
  #createBackend;
  constructor(executionContextId, url, createBackend, send, close) {
    try {
      this.#createBackend = (refEventLoop, receive) => {
        const backend = createBackend(executionContextId, refEventLoop, receive);
        return {
          write: (message) => {
            send.__intrinsic__call(backend, message);
            return true;
          },
          close: () => close.__intrinsic__call(backend)
        };
      };
      if (url.startsWith("unix://")) {
        this.#connectOverSocket({
          unix: unescapeUnixSocketUrl(url)
        });
        return;
      } else if (url.startsWith("fd://")) {
        this.#connectOverSocket({
          fd: Number(url.substring("fd://".length))
        });
        return;
      } else if (url.startsWith("fd:")) {
        this.#connectOverSocket({
          fd: Number(url.substring("fd:".length))
        });
        return;
      } else if (url.startsWith("unix:")) {
        this.#connectOverSocket({
          unix: url.substring("unix:".length)
        });
        return;
      } else if (url.startsWith("tcp://")) {
        const { hostname, port } = new URL(url);
        this.#connectOverSocket({
          hostname,
          port: port && port !== "0" ? Number(port) : __intrinsic__undefined
        });
        return;
      }
      this.#url = parseUrl(url);
      this.#listen();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  get url() {
    return this.#url;
  }
  #listen() {
    const { protocol, hostname, port, pathname } = this.#url;
    if (protocol === "ws:" || protocol === "wss:" || protocol === "ws+tcp:") {
      const server = Bun.serve({
        hostname,
        port,
        fetch: this.#fetch.bind(this),
        websocket: this.#websocket
      });
      this.#url.hostname = server.hostname;
      this.#url.port = `${server.port}`;
      return;
    }
    if (protocol === "ws+unix:") {
      Bun.serve({
        unix: pathname,
        fetch: this.#fetch.bind(this),
        websocket: this.#websocket
      });
      return;
    }
    __intrinsic__throwTypeError(`Unsupported protocol: '${protocol}' (expected 'ws:' or 'ws+unix:')`);
  }
  #connectOverSocket(networkOptions) {
    let backend;
    return Bun.connect({
      ...networkOptions,
      socket: {
        open: (socket) => {
          let framer;
          const callback = (...messages) => {
            for (const message of messages) {
              framer.send(socket, message);
            }
          };
          framer = new SocketFramer((message) => {
            backend.write(message);
          });
          backend = this.#createBackend(false, callback);
          socket.data = {
            framer,
            backend
          };
          socket.ref();
        },
        data: (socket, bytes) => {
          if (!socket.data) {
            socket.terminate();
            return;
          }
          socket.data.framer.onData(socket, bytes);
        },
        drain: (_socket) => {},
        close: (socket) => {
          if (socket.data) {
            const { backend: backend2, framer } = socket.data;
            backend2.close();
            framer.reset();
          }
        }
      }
    }).catch((err) => {
      if (!backend) {
        backend = this.#createBackend(false, () => {});
        backend.close();
      }
      $debug_log("error:", err);
    });
  }
  get #websocket() {
    return {
      idleTimeout: 0,
      closeOnBackpressureLimit: false,
      open: (ws) => this.#open(ws, webSocketWriter(ws)),
      message: (ws, message) => {
        if (typeof message === "string") {
          this.#message(ws, message);
        } else {
          this.#error(ws, new Error(`Unexpected binary message: ${message.toString()}`));
        }
      },
      drain: (ws) => this.#drain(ws),
      close: (ws) => this.#close(ws)
    };
  }
  #fetch(request, server) {
    const { method, url, headers } = request;
    const { pathname } = new URL(url);
    if (method !== "GET") {
      return new Response(null, {
        status: 405
      });
    }
    switch (pathname) {
      case "/json/version":
        return Response.json(versionInfo());
      case "/json":
      case "/json/list":
    }
    if (!this.#url.protocol.includes("unix") && this.#url.pathname !== pathname) {
      return new Response(null, {
        status: 404
      });
    }
    const data = {
      refEventLoop: headers.get("Ref-Event-Loop") === "0"
    };
    if (!server.upgrade(request, { data })) {
      return new Response(null, {
        status: 426,
        headers: {
          Upgrade: "websocket"
        }
      });
    }
  }
  #open(connection, writer) {
    const { data } = connection;
    const { refEventLoop } = data;
    const client = bufferedWriter(writer);
    const backend = this.#createBackend(refEventLoop, (...messages) => {
      for (const message of messages) {
        client.write(message);
      }
    });
    data.client = client;
    data.backend = backend;
  }
  #message(connection, message) {
    const { data } = connection;
    const { backend } = data;
    $debug_log("remote:", message);
    backend?.write(message);
  }
  #drain(connection) {
    const { data } = connection;
    const { client } = data;
    client?.drain?.();
  }
  #close(connection) {
    const { data } = connection;
    const { backend } = data;
    backend?.close();
  }
  #error(connection, error) {
    const { data } = connection;
    const { backend } = data;
    console.error(error);
    backend?.close();
  }
}
async function connectToUnixServer(executionContextId, unix, createBackend, send, close) {
  let connectionOptions;
  if (unix.startsWith("unix:")) {
    unix = unescapeUnixSocketUrl(unix);
    if (unix.startsWith("unix://")) {
      unix = unix.substring("unix://".length);
    }
    connectionOptions = { unix };
  } else if (unix.startsWith("tcp:")) {
    try {
      const { hostname, port } = new URL(unix);
      connectionOptions = {
        hostname,
        port: Number(port)
      };
    } catch {
      exit("Invalid tcp: URL:" + unix);
      return;
    }
  } else if (unix.startsWith("/")) {
    connectionOptions = { unix };
  } else if (unix.startsWith("fd:")) {
    connectionOptions = { fd: Number(unix.substring("fd:".length)) };
  } else {
    $debug_log("Invalid inspector URL:" + unix);
    return;
  }
  const socket = await Bun.connect({
    ...connectionOptions,
    socket: {
      open: (socket2) => {
        const framer = new SocketFramer((message) => {
          backend.write(message);
        });
        const backendRaw = createBackend(executionContextId, true, (...messages) => {
          for (const message of messages) {
            framer.send(socket2, message);
          }
        });
        const backend = {
          write: (message) => {
            send.__intrinsic__call(backendRaw, message);
            return true;
          },
          close: () => close.__intrinsic__call(backendRaw)
        };
        socket2.data = {
          framer,
          backend
        };
        socket2.ref();
      },
      data: (socket2, bytes) => {
        if (!socket2.data) {
          socket2.terminate();
          return;
        }
        socket2.data.framer.onData(socket2, bytes);
      },
      drain: (_socket) => {},
      close: (socket2) => {
        if (socket2.data) {
          const { backend, framer } = socket2.data;
          backend.close();
          framer.reset();
        }
      }
    }
  }).catch((error) => {
    const backendRaw = createBackend(executionContextId, true, () => {});
    close.__intrinsic__call(backendRaw);
    $debug_log("error:", error);
  });
  return socket;
}
function versionInfo() {
  return {
    "Protocol-Version": "1.3",
    Browser: "Bun",
    "User-Agent": navigator.userAgent,
    "WebKit-Version": process.versions.webkit,
    "Bun-Version": Bun.version,
    "Bun-Revision": Bun.revision
  };
}
function webSocketWriter(ws) {
  return {
    write: (message) => !!ws.sendText(message),
    close: () => ws.close()
  };
}
function bufferedWriter(writer) {
  let draining = false;
  let pendingMessages = [];
  return {
    write: (message) => {
      if (draining || !writer.write(message)) {
        pendingMessages.push(message);
      }
      return true;
    },
    drain: () => {
      draining = true;
      try {
        for (let i = 0;i < pendingMessages.length; i++) {
          if (!writer.write(pendingMessages[i])) {
            pendingMessages = pendingMessages.slice(i);
            return;
          }
        }
      } finally {
        draining = false;
      }
    },
    close: () => {
      writer.close();
      pendingMessages.length = 0;
    }
  };
}
var defaultHostname = "localhost";
var defaultPort = 6499;
function parseUrl(input) {
  if (input.startsWith("ws://") || input.startsWith("ws+unix://")) {
    return new URL(input);
  }
  const url = new URL(`ws://${defaultHostname}:${defaultPort}/${randomId()}`);
  for (const part of input.split(/(\[[a-z0-9:]+\])|:/).filter(Boolean)) {
    if (/^\d+$/.test(part)) {
      url.port = part;
      continue;
    }
    if (part.startsWith("[")) {
      url.hostname = part;
      continue;
    }
    if (part.startsWith("/")) {
      url.pathname = part;
      continue;
    }
    const [hostname, ...pathnames] = part.split("/");
    if (/^\d+$/.test(hostname)) {
      url.port = hostname;
    } else {
      url.hostname = hostname;
    }
    if (pathnames.length) {
      url.pathname = `/${pathnames.join("/")}`;
    }
  }
  return url;
}
function randomId() {
  return Math.random().toString(36).slice(2);
}
var { enableANSIColors } = Bun;
function dim(string) {
  if (enableANSIColors) {
    return `\x1B[2m${string}\x1B[22m`;
  }
  return string;
}
function link(url) {
  if (enableANSIColors) {
    return `\x1B[1m\x1B]8;;${url}\x1B\\${url}\x1B]8;;\x1B\\\x1B[22m`;
  }
  return url;
}
function reset() {
  if (enableANSIColors) {
    return "\x1B[49m";
  }
  return "";
}
function notify(options) {
  Bun.connect({
    ...options,
    socket: {
      open: (socket) => {
        socket.end("1");
      },
      data: () => {}
    }
  }).catch(() => {});
}
function exit(...args) {
  console.error(...args);
  process.exit(1);
}
$$EXPORT$$($).$$EXPORT_END$$;
