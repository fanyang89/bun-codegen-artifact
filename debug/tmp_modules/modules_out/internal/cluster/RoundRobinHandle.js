// @bun
// build/debug/tmp_modules/internal/cluster/RoundRobinHandle.ts
var $;
var { append, init, isEmpty, peek, remove } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 27) || __intrinsic__createInternalModuleById(27);
var { kHandle } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var net;
var sendHelper = __intrinsic__lazy(3);
var ArrayIsArray = __intrinsic__Array.isArray;
var UV_TCP_IPV6ONLY = 1;
var assert_fail = () => {
  throw new Error("ERR_INTERNAL_ASSERTION");
};
$ = class RoundRobinHandle {
  key;
  all;
  free;
  handles;
  handle;
  server;
  constructor(key, address, { port, fd, flags, backlog, readableAll, writableAll }) {
    net ??= __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 104) || __intrinsic__createInternalModuleById(104);
    this.key = key;
    this.all = new Map;
    this.free = new Map;
    this.handles = init(Object.create(null));
    this.handle = null;
    this.server = net.createServer(assert_fail);
    if (fd >= 0)
      this.server.listen({ fd, backlog });
    else if (port >= 0) {
      this.server.listen({
        port,
        host: address,
        ipv6Only: !!(flags & UV_TCP_IPV6ONLY),
        backlog
      });
    } else
      this.server.listen({
        path: address,
        backlog,
        readableAll,
        writableAll
      });
    this.server.once("listening", () => {
      this.handle = this.server._handle;
      this.handle.onconnection = (err, handle) => this.distribute(err, handle);
      this.server._handle = null;
      this.server = null;
    });
  }
  add(worker, send) {
    this.all.set(worker.id, worker);
    const done = () => {
      if (this.handle.getsockname) {
        const out = {};
        this.handle.getsockname(out);
        send(null, { sockname: out }, null);
      } else {
        send(null, null, null);
      }
      this.handoff(worker);
    };
    if (this.server === null)
      return done();
    this.server.once("listening", done);
    this.server.once("error", (err) => {
      send(err.errno, null);
    });
  }
  remove(worker) {
    const existed = this.all.delete(worker.id);
    if (!existed)
      return false;
    this.free.delete(worker.id);
    if (this.all.size !== 0)
      return false;
    while (!isEmpty(this.handles)) {
      const handle = peek(this.handles);
      handle.close();
      remove(handle);
    }
    this.handle?.stop(false);
    this.handle = null;
    return true;
  }
  distribute(err, handle) {
    if (err) {
      return;
    }
    append(this.handles, handle);
    const [workerEntry] = this.free;
    if (ArrayIsArray(workerEntry)) {
      const { 0: workerId, 1: worker } = workerEntry;
      this.free.delete(workerId);
      this.handoff(worker);
    }
  }
  handoff(worker) {
    if (!this.all.has(worker.id)) {
      return;
    }
    const handle = peek(this.handles);
    if (handle === null) {
      this.free.set(worker.id, worker);
      return;
    }
    remove(handle);
    const message = { act: "newconn", key: this.key };
    sendHelper(worker.process[kHandle], message, handle, (reply) => {
      if (reply.accepted)
        handle.close();
      else
        this.distribute(0, handle);
      this.handoff(worker);
    });
  }
};
$$EXPORT$$($).$$EXPORT_END$$;
