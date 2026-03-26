// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/http.ts


const { validateInteger } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));
const { Agent, globalAgent } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 71/*node:_http_agent*/) || __intrinsic__createInternalModuleById(71/*node:_http_agent*/));
const { ClientRequest } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 72/*node:_http_client*/) || __intrinsic__createInternalModuleById(72/*node:_http_client*/));
const { validateHeaderName, validateHeaderValue, parsers } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 73/*node:_http_common*/) || __intrinsic__createInternalModuleById(73/*node:_http_common*/));
const { IncomingMessage } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 74/*node:_http_incoming*/) || __intrinsic__createInternalModuleById(74/*node:_http_incoming*/));
const { OutgoingMessage } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 75/*node:_http_outgoing*/) || __intrinsic__createInternalModuleById(75/*node:_http_outgoing*/));
const { Server, ServerResponse } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 76/*node:_http_server*/) || __intrinsic__createInternalModuleById(76/*node:_http_server*/));

const { METHODS, STATUS_CODES, setMaxHTTPHeaderSize, getMaxHTTPHeaderSize } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 25/*internal/http*/) || __intrinsic__createInternalModuleById(25/*internal/http*/));

const { WebSocket, CloseEvent, MessageEvent } = globalThis;

function createServer(options, callback) {
  return new Server(options, callback);
}

/**
 * Makes an HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function request(url, options, cb) {
  return new ClientRequest(url, options, cb);
}

/**
 * Makes a `GET` HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function get(url, options, cb) {
  const req = request(url, options, cb);
  req.end();
  return req;
}

const http_exports = {
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
    validateInteger(max, "max", 1);
    parsers.max = max;
  },
  globalAgent,
  ClientRequest,
  OutgoingMessage,
  WebSocket,
  CloseEvent,
  MessageEvent,
};

$ = http_exports;
;$$EXPORT$$($).$$EXPORT_END$$;
