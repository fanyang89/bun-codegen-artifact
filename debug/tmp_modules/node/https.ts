// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/https.ts


// Hardcoded module "node:https"
const http = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 99/*node:http*/) || __intrinsic__createInternalModuleById(99/*node:http*/));
const { urlToHttpOptions } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 63/*internal/url*/) || __intrinsic__createInternalModuleById(63/*internal/url*/));

const ArrayPrototypeShift = Array.prototype.shift;
const ObjectAssign = Object.assign;
const ArrayPrototypeUnshift = Array.prototype.unshift;

function request(...args) {
  let options = {};

  if (typeof args[0] === "string") {
    const urlStr = ArrayPrototypeShift.__intrinsic__call(args);
    options = urlToHttpOptions(new URL(urlStr));
  } else if (args[0] instanceof URL) {
    options = urlToHttpOptions(ArrayPrototypeShift.__intrinsic__call(args));
  }

  if (args[0] && typeof args[0] !== "function") {
    ObjectAssign.__intrinsic__call(null, options, ArrayPrototypeShift.__intrinsic__call(args));
  }

  options._defaultAgent = https.globalAgent;
  ArrayPrototypeUnshift.__intrinsic__call(args, options);

  return new http.ClientRequest(...args);
}

function get(input, options, cb) {
  const req = request(input, options, cb);
  req.end();
  return req;
}

function Agent(options) {
  if (!(this instanceof Agent)) return new Agent(options);

  http.Agent.__intrinsic__apply(this, [options]);
  this.defaultPort = 443;
  this.protocol = "https:";
  this.maxCachedSessions = this.options.maxCachedSessions;
  if (this.maxCachedSessions === undefined) this.maxCachedSessions = 100;
}
__intrinsic__toClass(Agent, "Agent", http.Agent);
Agent.prototype.createConnection = http.createConnection;

var https = {
  Agent,
  globalAgent: new Agent({ keepAlive: true, scheduling: "lifo", timeout: 5000 }),
  Server: http.Server,
  createServer: http.createServer,
  get,
  request,
};
$ = https;
;$$EXPORT$$($).$$EXPORT_END$$;
