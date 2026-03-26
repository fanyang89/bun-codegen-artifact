// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Ipc.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(_message,_handle,_options) {  // sending file descriptors is not supported yet
  return null; // send the message without the file descriptor

  /*
  const net = require("node:net");
  const dgram = require("node:dgram");
  if (handle instanceof net.Server) {
    // this one doesn't need a close function, but the fd needs to be kept alive until it is sent
    const server = handle as unknown as (typeof net)["Server"] & { _handle: Bun.TCPSocketListener<unknown> };
    return [server._handle, { cmd: "NODE_HANDLE", message, type: "net.Server" }];
  } else if (handle instanceof net.Socket) {
    const new_message: { cmd: "NODE_HANDLE"; message: unknown; type: "net.Socket"; key?: string } = {
      cmd: "NODE_HANDLE",
      message,
      type: "net.Socket",
    };
    const socket = handle as unknown as (typeof net)["Socket"] & {
      _handle: Bun.Socket;
      server: (typeof net)["Server"] | null;
      setTimeout(timeout: number): void;
    };
    if (!socket._handle) return null; // failed

    // If the socket was created by net.Server
    if (socket.server) {
      // The worker should keep track of the socket
      new_message.key = socket.server._connectionKey;

      const firstTime = !this[kChannelHandle].sockets.send[message.key];
      const socketList = getSocketList("send", this, message.key);

      // The server should no longer expose a .connection property
      // and when asked to close it should query the socket status from
      // the workers
      if (firstTime) socket.server._setupWorker(socketList);

      // Act like socket is detached
      if (!options?.keepOpen) socket.server._connections--;
    }

    const internal_handle = socket._handle;

    // Remove handle from socket object, it will be closed when the socket
    // will be sent
    if (!options?.keepOpen) {
      // we can use a $newZigFunction to have it unset the callback
      internal_handle.onread = nop;
      socket._handle = null;
      socket.setTimeout(0);
    }
    return [internal_handle, new_message];
  } else if (handle instanceof dgram.Socket) {
    // this one doesn't need a close function, but the fd needs to be kept alive until it is sent
    throw new Error("todo serialize dgram.Socket");
  } else {
    throw $ERR_INVALID_HANDLE_TYPE();
  }
  */
}).$$capture_end$$;
