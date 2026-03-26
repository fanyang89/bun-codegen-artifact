// @bun
// build/release/tmp_modules/node/http.ts
var $, { validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), { Agent, globalAgent } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 71) || __intrinsic__createInternalModuleById(71), { ClientRequest } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 72) || __intrinsic__createInternalModuleById(72), { validateHeaderName, validateHeaderValue, parsers } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 73) || __intrinsic__createInternalModuleById(73), { IncomingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 74) || __intrinsic__createInternalModuleById(74), { OutgoingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 75) || __intrinsic__createInternalModuleById(75), { Server, ServerResponse } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 76) || __intrinsic__createInternalModuleById(76), { METHODS, STATUS_CODES, setMaxHTTPHeaderSize, getMaxHTTPHeaderSize } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 25) || __intrinsic__createInternalModuleById(25), { WebSocket, CloseEvent, MessageEvent } = globalThis;
function createServer(options, callback) {
  return new Server(options, callback);
}
function request(url, options, cb) {
  return new ClientRequest(url, options, cb);
}
function get(url, options, cb) {
  let req = request(url, options, cb);
  return req.end(), req;
}
var http_exports = {
  Agent,
  Server,
  METHODS,
  STATUS_CODES,
  createServer,
  ServerResponse,
  IncomingMessage,
  request,
  get,
  get maxHeaderSize() {
    return getMaxHTTPHeaderSize();
  },
  set maxHeaderSize(value) {
    setMaxHTTPHeaderSize(value);
  },
  validateHeaderName,
  validateHeaderValue,
  setMaxIdleHTTPParsers(max) {
    validateInteger(max, "max", 1), parsers.max = max;
  },
  globalAgent,
  ClientRequest,
  OutgoingMessage,
  WebSocket,
  CloseEvent,
  MessageEvent
};
$ = http_exports;
$$EXPORT$$($).$$EXPORT_END$$;
