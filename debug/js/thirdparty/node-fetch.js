(function (){"use strict";// build/debug/tmp_modules/thirdparty/node-fetch.ts
var $;
var bindings = @lazy(95);
var WebResponse = bindings[0];
var WebRequest = bindings[1];
var Blob = bindings[2];
var WebHeaders = bindings[3];
var FormData = bindings[4];
var File = bindings[5];
var nativeFetch = Bun.fetch;

class Headers extends WebHeaders {
  raw() {
    const obj = this.toJSON();
    for (const key in obj) {
      const val = obj[key];
      if (!@isJSArray(val)) {
        obj[key] = [val];
      }
    }
    return obj;
  }
  sort() {
    @throwTypeError("Expected this to be instanceof URLSearchParams");
  }
}
var kHeaders = Symbol("kHeaders");
var kBody = Symbol("kBody");
var HeadersPrototype = Headers.prototype;

class Response extends WebResponse {
  [kBody];
  [kHeaders];
  constructor(body, init) {
    const { Readable, Stream } = @getInternalField(@internalModuleRegistry, 117) || @createInternalModuleById(117);
    if (body && typeof body === "object" && (body instanceof Stream || body instanceof Readable)) {
      body = Readable.toWeb(body);
    }
    super(body, init);
  }
  get body() {
    let body = this[kBody];
    if (!body) {
      var web = super.body;
      if (!web)
        return null;
      body = this[kBody] = new (@getInternalField(@internalModuleRegistry, 69) || @createInternalModuleById(69))._ReadableFromWeb({}, web);
    }
    return body;
  }
  get headers() {
    return this[kHeaders] ??= Object.setPrototypeOf(super.headers, HeadersPrototype);
  }
  clone() {
    return Object.setPrototypeOf(super.clone(this), ResponsePrototype);
  }
  async arrayBuffer() {
    this.body;
    return await super.arrayBuffer();
  }
  async blob() {
    this.body;
    return await super.blob();
  }
  async formData() {
    this.body;
    return await super.formData();
  }
  async json() {
    this.body;
    return await super.json();
  }
  async buffer() {
    this.body;
    return new @Buffer(await super.arrayBuffer());
  }
  async text() {
    this.body;
    return await super.text();
  }
  get type() {
    if (!super.ok) {
      return "error";
    }
    return "default";
  }
}
var ResponsePrototype = Response.prototype;
var kUrl = Symbol("kUrl");

class Request extends WebRequest {
  [kUrl];
  constructor(input, init) {
    if (typeof input === "string" && !URL.canParse(input)) {
      super(new URL(input, "http://localhost/"), init);
      this[kUrl] = input;
    } else {
      super(input, init);
    }
  }
  get url() {
    return this[kUrl] ?? super.url;
  }
}
async function fetch(url, init) {
  if (init?.body && typeof init.body === "object" && !init.body[Symbol.asyncIterator]) {
    const { Readable, Stream, PassThrough } = @getInternalField(@internalModuleRegistry, 117) || @createInternalModuleById(117);
    if (init.body instanceof Stream || init.body instanceof Readable) {
      let readable = init.body;
      if (!(readable instanceof Readable)) {
        const passthrough = new PassThrough;
        readable.pipe(passthrough);
        readable = passthrough;
      }
      init = { ...init, body: Readable.toWeb(readable) };
    }
  }
  const response = await nativeFetch.@call(@undefined, url, init);
  Object.setPrototypeOf(response, ResponsePrototype);
  return response;
}

class AbortError extends DOMException {
  constructor(message) {
    super(message, "AbortError");
  }
}

class FetchBaseError extends Error {
  type;
  constructor(message, type) {
    super(message);
    this.type = type;
  }
}

class FetchError extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    this.code = systemError?.code;
  }
}
function blobFrom(path, options) {
  return @Promise.@resolve(Bun.file(path, options));
}
function blobFromSync(path, options) {
  return Bun.file(path, options);
}
var fileFrom = blobFrom;
var fileFromSync = blobFromSync;
function isRedirect(code) {
  return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
}
$ = Object.assign(fetch, {
  AbortError,
  Blob,
  FetchBaseError,
  FetchError,
  File,
  FormData,
  Headers,
  Request,
  Response,
  blobFrom,
  blobFromSync,
  fileFrom,
  fileFromSync,
  isRedirect,
  fetch,
  default: fetch
});
return $})
