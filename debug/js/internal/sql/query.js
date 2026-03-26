(function (){"use strict";// build/debug/tmp_modules/internal/sql/query.ts
var $;
var _resolve = Symbol("resolve");
var _reject = Symbol("reject");
var _handle = Symbol("handle");
var _queryStatus = Symbol("status");
var _handler = Symbol("handler");
var _strings = Symbol("strings");
var _values = Symbol("values");
var _flags = Symbol("flags");
var _results = Symbol("results");
var _adapter = Symbol("adapter");
var PublicPromise = @Promise;

class Query extends PublicPromise {
  [_resolve];
  [_reject];
  [_handle];
  [_handler];
  [_queryStatus];
  [_strings];
  [_values];
  [_flags];
  [_adapter];
  [Symbol.for("nodejs.util.inspect.custom")]() {
    const status = this[_queryStatus];
    let query = "";
    if ((status & 2 /* active */) != 0)
      query += "active ";
    if ((status & 4 /* cancelled */) != 0)
      query += "cancelled ";
    if ((status & 16 /* executed */) != 0)
      query += "executed ";
    if ((status & 8 /* error */) != 0)
      query += "error ";
    return `Query { ${query.trimEnd()} }`;
  }
  #getQueryHandle() {
    let handle = this[_handle];
    if (!handle) {
      try {
        const [sql, values] = this[_adapter].normalizeQuery(this[_strings], this[_values]);
        this[_handle] = handle = this[_adapter].createQueryHandle(sql, values, this[_flags]);
      } catch (err) {
        this[_queryStatus] |= 8 /* error */ | 32 /* invalidHandle */;
        this.reject(err);
      }
    }
    return handle;
  }
  constructor(strings, values, flags, handler, adapter) {
    let resolve_, reject_;
    super((resolve, reject) => {
      resolve_ = resolve;
      reject_ = reject;
    });
    this[_adapter] = adapter;
    if (typeof strings === "string") {
      if (!(flags & 2 /* unsafe */)) {
        flags |= 16 /* notTagged */;
        strings = adapter.escapeIdentifier(strings);
      }
    }
    this[_resolve] = resolve_;
    this[_reject] = reject_;
    this[_handle] = null;
    this[_handler] = handler;
    this[_queryStatus] = 0 /* none */;
    this[_strings] = strings;
    this[_values] = values;
    this[_flags] = flags;
    this[_results] = null;
  }
  #run() {
    const { [_handler]: handler, [_queryStatus]: status } = this;
    if (status & (16 /* executed */ | 8 /* error */ | 4 /* cancelled */ | 32 /* invalidHandle */)) {
      return;
    }
    if (this[_flags] & 16 /* notTagged */) {
      this.reject(this[_adapter].notTaggedCallError());
      return;
    }
    this[_queryStatus] |= 16 /* executed */;
    const handle = this.#getQueryHandle();
    if (!handle) {
      return this;
    }
    try {
      return handler(this, handle);
    } catch (err) {
      this[_queryStatus] |= 8 /* error */;
      this.reject(err);
    }
  }
  async#runAsync() {
    const { [_handler]: handler, [_queryStatus]: status } = this;
    if (status & (16 /* executed */ | 8 /* error */ | 4 /* cancelled */ | 32 /* invalidHandle */)) {
      return;
    }
    if (this[_flags] & 16 /* notTagged */) {
      this.reject(this[_adapter].notTaggedCallError());
      return;
    }
    this[_queryStatus] |= 16 /* executed */;
    const handle = this.#getQueryHandle();
    if (!handle) {
      return this;
    }
    await @Promise.@resolve();
    try {
      return handler(this, handle);
    } catch (err) {
      this[_queryStatus] |= 8 /* error */;
      this.reject(err);
    }
  }
  get active() {
    return (this[_queryStatus] & 2 /* active */) != 0;
  }
  set active(value) {
    const status = this[_queryStatus];
    if (status & (4 /* cancelled */ | 8 /* error */)) {
      return;
    }
    if (value) {
      this[_queryStatus] |= 2 /* active */;
    } else {
      this[_queryStatus] &= ~2 /* active */;
    }
  }
  get cancelled() {
    return (this[_queryStatus] & 4 /* cancelled */) !== 0;
  }
  resolve(x) {
    this[_queryStatus] &= ~2 /* active */;
    const handle = this.#getQueryHandle();
    if (!handle) {
      return this;
    }
    handle.done?.();
    return this[_resolve](x);
  }
  reject(x) {
    this[_queryStatus] &= ~2 /* active */;
    this[_queryStatus] |= 8 /* error */;
    if (!(this[_queryStatus] & 32 /* invalidHandle */)) {
      const handle = this.#getQueryHandle();
      if (!handle) {
        return this[_reject](x);
      }
      handle.done?.();
    }
    return this[_reject](x);
  }
  cancel() {
    const status = this[_queryStatus];
    if (status & 4 /* cancelled */) {
      return this;
    }
    this[_queryStatus] |= 4 /* cancelled */;
    if (status & 16 /* executed */) {
      const handle = this.#getQueryHandle();
      if (handle) {
        handle.cancel?.();
      }
    }
    return this;
  }
  execute() {
    this.#run();
    return this;
  }
  async run() {
    if (this[_flags] & 16 /* notTagged */) {
      throw this[_adapter].notTaggedCallError();
    }
    await this.#runAsync();
    return this;
  }
  raw() {
    const handle = this.#getQueryHandle();
    if (!handle) {
      return this;
    }
    handle.setMode(2 /* raw */);
    return this;
  }
  simple() {
    this[_flags] |= 8 /* simple */;
    return this;
  }
  values() {
    const handle = this.#getQueryHandle();
    if (!handle) {
      return this;
    }
    handle.setMode(1 /* values */);
    return this;
  }
  #runAsyncAndCatch() {
    const runPromise = this.#runAsync();
    if (@isPromise(runPromise) && runPromise !== this) {
      runPromise.catch(() => {});
    }
  }
  then() {
    this.#runAsyncAndCatch();
    const result = super.@then.@apply(this, arguments);
    const hasRejectionHandler = arguments.length >= 2 && arguments[1] != null;
    if (hasRejectionHandler) {
      @markPromiseAsHandled(result);
    }
    return result;
  }
  catch() {
    if (this[_flags] & 16 /* notTagged */) {
      throw this[_adapter].notTaggedCallError();
    }
    this.#runAsyncAndCatch();
    const result = super.catch.@apply(this, arguments);
    @markPromiseAsHandled(result);
    return result;
  }
  finally(_onfinally) {
    if (this[_flags] & 16 /* notTagged */) {
      throw this[_adapter].notTaggedCallError();
    }
    this.#runAsyncAndCatch();
    return super.finally.@apply(this, arguments);
  }
}
Object.defineProperty(Query, Symbol.species, { value: PublicPromise });
Object.defineProperty(Query, Symbol.toStringTag, { value: "Query" });
var SQLQueryResultMode;
((SQLQueryResultMode2) => {
  SQLQueryResultMode2[SQLQueryResultMode2["objects"] = 0] = "objects";
  SQLQueryResultMode2[SQLQueryResultMode2["values"] = 1] = "values";
  SQLQueryResultMode2[SQLQueryResultMode2["raw"] = 2] = "raw";
})(SQLQueryResultMode ||= {});
var SQLQueryFlags;
((SQLQueryFlags2) => {
  SQLQueryFlags2[SQLQueryFlags2["none"] = 0] = "none";
  SQLQueryFlags2[SQLQueryFlags2["allowUnsafeTransaction"] = 1] = "allowUnsafeTransaction";
  SQLQueryFlags2[SQLQueryFlags2["unsafe"] = 2] = "unsafe";
  SQLQueryFlags2[SQLQueryFlags2["bigint"] = 4] = "bigint";
  SQLQueryFlags2[SQLQueryFlags2["simple"] = 8] = "simple";
  SQLQueryFlags2[SQLQueryFlags2["notTagged"] = 16] = "notTagged";
})(SQLQueryFlags ||= {});
var SQLQueryStatus;
((SQLQueryStatus2) => {
  SQLQueryStatus2[SQLQueryStatus2["none"] = 0] = "none";
  SQLQueryStatus2[SQLQueryStatus2["active"] = 2] = "active";
  SQLQueryStatus2[SQLQueryStatus2["cancelled"] = 4] = "cancelled";
  SQLQueryStatus2[SQLQueryStatus2["error"] = 8] = "error";
  SQLQueryStatus2[SQLQueryStatus2["executed"] = 16] = "executed";
  SQLQueryStatus2[SQLQueryStatus2["invalidHandle"] = 32] = "invalidHandle";
})(SQLQueryStatus ||= {});
$ = {
  Query,
  SQLQueryFlags,
  SQLQueryResultMode,
  SQLQueryStatus,
  symbols: {
    _resolve,
    _reject,
    _handle,
    _queryStatus,
    _handler,
    _strings,
    _values,
    _flags,
    _results
  }
};
return $})
