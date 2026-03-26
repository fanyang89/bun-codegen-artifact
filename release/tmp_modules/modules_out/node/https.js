// @bun
// build/release/tmp_modules/node/https.ts
var $, http = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 99) || __intrinsic__createInternalModuleById(99), { urlToHttpOptions } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 63) || __intrinsic__createInternalModuleById(63), ArrayPrototypeShift = __intrinsic__Array.prototype.shift, ObjectAssign = Object.assign, ArrayPrototypeUnshift = __intrinsic__Array.prototype.unshift;
function request(...args) {
  let options = {};
  if (typeof args[0] === "string") {
    let urlStr = ArrayPrototypeShift.__intrinsic__call(args);
    options = urlToHttpOptions(new URL(urlStr));
  } else if (args[0] instanceof URL)
    options = urlToHttpOptions(ArrayPrototypeShift.__intrinsic__call(args));
  if (args[0] && typeof args[0] !== "function")
    ObjectAssign.__intrinsic__call(null, options, ArrayPrototypeShift.__intrinsic__call(args));
  return options._defaultAgent = https.globalAgent, ArrayPrototypeUnshift.__intrinsic__call(args, options), new http.ClientRequest(...args);
}
function get(input, options, cb) {
  let req = request(input, options, cb);
  return req.end(), req;
}
function Agent(options) {
  if (!(this instanceof Agent))
    return new Agent(options);
  if (http.Agent.__intrinsic__apply(this, [options]), this.defaultPort = 443, this.protocol = "https:", this.maxCachedSessions = this.options.maxCachedSessions, this.maxCachedSessions === __intrinsic__undefined)
    this.maxCachedSessions = 100;
}
__intrinsic__toClass(Agent, "Agent", http.Agent);
Agent.prototype.createConnection = http.createConnection;
var https = {
  Agent,
  globalAgent: new Agent({ keepAlive: !0, scheduling: "lifo", timeout: 5000 }),
  Server: http.Server,
  createServer: http.createServer,
  get,
  request
};
$ = https;
$$EXPORT$$($).$$EXPORT_END$$;
