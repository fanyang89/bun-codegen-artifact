// @bun
// build/debug/tmp_modules/bun/sql.ts
var $;
var { Query, SQLQueryFlags } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 36) || __intrinsic__createInternalModuleById(36);
var { PostgresAdapter } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 35) || __intrinsic__createInternalModuleById(35);
var { MySQLAdapter } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 34) || __intrinsic__createInternalModuleById(34);
var { SQLiteAdapter } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 38) || __intrinsic__createInternalModuleById(38);
var { SQLHelper, parseOptions } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 37) || __intrinsic__createInternalModuleById(37);
var { SQLError, PostgresError, SQLiteError, MySQLError } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 33) || __intrinsic__createInternalModuleById(33);
var defineProperties = Object.defineProperties;
function adapterFromOptions(options) {
  switch (options.adapter) {
    case "postgres":
      return new PostgresAdapter(options);
    case "mysql":
    case "mariadb":
      return new MySQLAdapter(options);
    case "sqlite":
      return new SQLiteAdapter(options);
    default:
      throw new Error(`Unsupported adapter: ${options.adapter}.`);
  }
}
var SQL = function SQL2(stringOrUrlOrOptions = __intrinsic__undefined, definitelyOptionsButMaybeEmpty = {}) {
  const connectionInfo = parseOptions(stringOrUrlOrOptions, definitelyOptionsButMaybeEmpty);
  const pool = adapterFromOptions(connectionInfo);
  function onQueryDisconnected(err) {
    const query = this;
    if (err) {
      return query.reject(err);
    }
    if (query.cancelled) {
      return query.reject(pool.queryCancelledError());
    }
  }
  function onQueryConnected(handle, err, connectionHandle) {
    const query = this;
    if (err) {
      return query.reject(err);
    }
    if (query.cancelled) {
      pool.release(connectionHandle);
      return query.reject(pool.queryCancelledError());
    }
    if (connectionHandle.bindQuery) {
      connectionHandle.bindQuery(query, onQueryDisconnected.bind(query));
    }
    try {
      const connection = pool.getConnectionForQuery ? pool.getConnectionForQuery(connectionHandle) : connectionHandle;
      const result = handle.run(connection, query);
      if (result && __intrinsic__isPromise(result)) {
        result.catch((err2) => query.reject(err2));
      }
    } catch (err2) {
      query.reject(err2);
    }
  }
  function queryFromPoolHandler(query, handle, err) {
    if (err) {
      return query.reject(err);
    }
    if (!handle || query.cancelled) {
      return query.reject(pool.queryCancelledError());
    }
    pool.connect(onQueryConnected.bind(query, handle));
  }
  function queryFromPool(strings, values) {
    try {
      return new Query(strings, values, connectionInfo.bigint ? SQLQueryFlags.bigint : SQLQueryFlags.none, queryFromPoolHandler, pool);
    } catch (err) {
      return __intrinsic__Promise.__intrinsic__reject(err);
    }
  }
  function unsafeQuery(strings, values) {
    try {
      let flags = connectionInfo.bigint ? SQLQueryFlags.bigint | SQLQueryFlags.unsafe : SQLQueryFlags.unsafe;
      if ((values?.length ?? 0) === 0) {
        flags |= SQLQueryFlags.simple;
      }
      return new Query(strings, values, flags, queryFromPoolHandler, pool);
    } catch (err) {
      return __intrinsic__Promise.__intrinsic__reject(err);
    }
  }
  function onTransactionQueryDisconnected(query) {
    const transactionQueries = this;
    transactionQueries.delete(query);
  }
  function queryFromTransactionHandler(transactionQueries, query, handle, err) {
    const pooledConnection = this;
    if (err) {
      transactionQueries.delete(query);
      return query.reject(err);
    }
    if (query.cancelled) {
      transactionQueries.delete(query);
      return query.reject(pool.queryCancelledError());
    }
    query.finally(onTransactionQueryDisconnected.bind(transactionQueries, query));
    try {
      const connection = pool.getConnectionForQuery ? pool.getConnectionForQuery(pooledConnection) : pooledConnection;
      const result = handle.run(connection, query);
      if (result && __intrinsic__isPromise(result)) {
        result.catch((err2) => query.reject(err2));
      }
    } catch (err2) {
      query.reject(err2);
    }
  }
  function queryFromTransaction(strings, values, pooledConnection, transactionQueries) {
    try {
      const query = new Query(strings, values, connectionInfo.bigint ? SQLQueryFlags.allowUnsafeTransaction | SQLQueryFlags.bigint : SQLQueryFlags.allowUnsafeTransaction, queryFromTransactionHandler.bind(pooledConnection, transactionQueries), pool);
      transactionQueries.add(query);
      return query;
    } catch (err) {
      return __intrinsic__Promise.__intrinsic__reject(err);
    }
  }
  function unsafeQueryFromTransaction(strings, values, pooledConnection, transactionQueries) {
    try {
      let flags = connectionInfo.bigint ? SQLQueryFlags.allowUnsafeTransaction | SQLQueryFlags.unsafe | SQLQueryFlags.bigint : SQLQueryFlags.allowUnsafeTransaction | SQLQueryFlags.unsafe;
      if ((values?.length ?? 0) === 0) {
        flags |= SQLQueryFlags.simple;
      }
      const query = new Query(strings, values, flags, queryFromTransactionHandler.bind(pooledConnection, transactionQueries), pool);
      transactionQueries.add(query);
      return query;
    } catch (err) {
      return __intrinsic__Promise.__intrinsic__reject(err);
    }
  }
  function onTransactionDisconnected(err) {
    const reject = this.reject;
    this.connectionState |= 2 /* closed */;
    for (const query of this.queries) {
      query.reject(err);
    }
    if (err) {
      return reject(err);
    }
  }
  function onReserveConnected(err, pooledConnection) {
    const { resolve, reject } = this;
    if (err) {
      return reject(err);
    }
    let reservedTransaction = new Set;
    const state = {
      connectionState: 1 /* acceptQueries */,
      reject,
      storedError: null,
      queries: new Set
    };
    const onClose = onTransactionDisconnected.bind(state);
    if (pooledConnection.onClose) {
      pooledConnection.onClose(onClose);
    }
    function reserved_sql(strings, ...values) {
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      if (__intrinsic__isArray(strings)) {
        if (!__intrinsic__isArray(strings.raw)) {
          return new SQLHelper(strings, values);
        }
      } else if (typeof strings === "object" && !(strings instanceof Query) && !(strings instanceof SQLHelper)) {
        return new SQLHelper([strings], values);
      }
      return queryFromTransaction(strings, values, pooledConnection, state.queries);
    }
    reserved_sql.unsafe = (string, args = []) => {
      return unsafeQueryFromTransaction(string, args, pooledConnection, state.queries);
    };
    reserved_sql.file = async (path, args = []) => {
      return await Bun.file(path).text().then((text) => {
        return unsafeQueryFromTransaction(text, args, pooledConnection, state.queries);
      });
    };
    reserved_sql.connect = () => {
      if (state.connectionState & 2 /* closed */) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      return __intrinsic__Promise.__intrinsic__resolve(reserved_sql);
    };
    reserved_sql.commitDistributed = async function(name) {
      if (!pool.getCommitDistributedSQL) {
        throw Error(`This adapter doesn't support distributed transactions.`);
      }
      const sql2 = pool.getCommitDistributedSQL(name);
      return await reserved_sql.unsafe(sql2);
    };
    reserved_sql.rollbackDistributed = async function(name) {
      if (!pool.getRollbackDistributedSQL) {
        throw Error(`This adapter doesn't support distributed transactions.`);
      }
      const sql2 = pool.getRollbackDistributedSQL(name);
      return await reserved_sql.unsafe(sql2);
    };
    reserved_sql.reserve = () => sql.reserve();
    reserved_sql.array = sql.array;
    function onTransactionFinished(transaction_promise) {
      reservedTransaction.delete(transaction_promise);
    }
    reserved_sql.beginDistributed = (name, fn) => {
      if (state.connectionState & 2 /* closed */) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      let callback = fn;
      if (typeof name !== "string") {
        return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "name", name, "must be a string"));
      }
      if (!__intrinsic__isCallable(callback)) {
        return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "fn", callback, "must be a function"));
      }
      const { promise, resolve: resolve2, reject: reject2 } = __intrinsic__Promise.withResolvers();
      onTransactionConnected(callback, name, resolve2, reject2, true, true, null, pooledConnection);
      reservedTransaction.add(promise);
      promise.finally(onTransactionFinished.bind(null, promise));
      return promise;
    };
    reserved_sql.begin = (options_or_fn, fn) => {
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      let callback = fn;
      let options = options_or_fn;
      if (__intrinsic__isCallable(options_or_fn)) {
        callback = options_or_fn;
        options = __intrinsic__undefined;
      } else if (typeof options_or_fn !== "string") {
        return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "options", options_or_fn, "must be a string"));
      }
      if (!__intrinsic__isCallable(callback)) {
        return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "fn", callback, "must be a function"));
      }
      const { promise, resolve: resolve2, reject: reject2 } = __intrinsic__Promise.withResolvers();
      onTransactionConnected(callback, options, resolve2, reject2, true, false, null, pooledConnection);
      reservedTransaction.add(promise);
      promise.finally(onTransactionFinished.bind(null, promise));
      return promise;
    };
    reserved_sql.flush = () => {
      if (state.connectionState & 2 /* closed */) {
        throw pool.connectionClosedError();
      }
      if (pooledConnection.flush) {
        return pooledConnection.flush();
      }
      return pool.flush();
    };
    reserved_sql.close = async (options) => {
      const reserveQueries = state.queries;
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__resolve(__intrinsic__undefined);
      }
      state.connectionState &= ~1 /* acceptQueries */;
      let timeout = options?.timeout;
      if (timeout) {
        timeout = Number(timeout);
        if (timeout > 2 ** 31 || timeout < 0 || timeout !== timeout) {
          throw __intrinsic__makeErrorWithCode(119, "options.timeout", timeout, "must be a non-negative integer less than 2^31");
        }
        if (timeout > 0 && (reserveQueries.size > 0 || reservedTransaction.size > 0)) {
          const { promise, resolve: resolve2 } = __intrinsic__Promise.withResolvers();
          const pending_queries = __intrinsic__Array.from(reserveQueries);
          const pending_transactions = __intrinsic__Array.from(reservedTransaction);
          const timer = setTimeout(() => {
            state.connectionState |= 2 /* closed */;
            for (const query of reserveQueries) {
              query.cancel();
            }
            state.connectionState |= 2 /* closed */;
            pooledConnection.close();
            resolve2();
          }, timeout * 1000);
          timer.unref();
          __intrinsic__Promise.all([__intrinsic__Promise.all(pending_queries), __intrinsic__Promise.all(pending_transactions)]).finally(() => {
            clearTimeout(timer);
            resolve2();
          });
          return promise;
        }
      }
      state.connectionState |= 2 /* closed */;
      for (const query of reserveQueries) {
        query.cancel();
      }
      pooledConnection.close();
      return __intrinsic__Promise.__intrinsic__resolve(__intrinsic__undefined);
    };
    reserved_sql.release = () => {
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      state.connectionState |= 2 /* closed */;
      state.connectionState &= ~1 /* acceptQueries */;
      if (pool.detachConnectionCloseHandler) {
        pool.detachConnectionCloseHandler(pooledConnection, onClose);
      }
      pool.release(pooledConnection);
      return __intrinsic__Promise.__intrinsic__resolve(__intrinsic__undefined);
    };
    reserved_sql[Symbol.asyncDispose] = () => reserved_sql.release();
    reserved_sql[Symbol.dispose] = () => reserved_sql.release();
    reserved_sql.options = sql.options;
    reserved_sql.transaction = reserved_sql.begin;
    reserved_sql.distributed = reserved_sql.beginDistributed;
    reserved_sql.end = reserved_sql.close;
    resolve(reserved_sql);
  }
  async function onTransactionConnected(callback, options, resolve, reject, dontRelease, distributed, err, pooledConnection) {
    if (err) {
      return reject(err);
    }
    const state = {
      connectionState: 1 /* acceptQueries */,
      reject,
      queries: new Set
    };
    let savepoints = 0;
    let transactionSavepoints = new Set;
    let BEGIN_COMMAND;
    let ROLLBACK_COMMAND;
    let COMMIT_COMMAND;
    let SAVEPOINT_COMMAND;
    let RELEASE_SAVEPOINT_COMMAND;
    let ROLLBACK_TO_SAVEPOINT_COMMAND;
    let BEFORE_COMMIT_OR_ROLLBACK_COMMAND = null;
    if (distributed) {
      const commands = pool.getDistributedTransactionCommands?.(options);
      if (!commands) {
        pool.release(pooledConnection);
        return reject(new Error(`This adapter doesn't support distributed transactions.`));
      }
      BEGIN_COMMAND = commands.BEGIN;
      COMMIT_COMMAND = commands.COMMIT;
      ROLLBACK_COMMAND = commands.ROLLBACK;
      SAVEPOINT_COMMAND = commands.SAVEPOINT;
      RELEASE_SAVEPOINT_COMMAND = commands.RELEASE_SAVEPOINT;
      ROLLBACK_TO_SAVEPOINT_COMMAND = commands.ROLLBACK_TO_SAVEPOINT;
      BEFORE_COMMIT_OR_ROLLBACK_COMMAND = commands.BEFORE_COMMIT_OR_ROLLBACK || null;
    } else {
      if (options && pool.validateTransactionOptions) {
        const validation = pool.validateTransactionOptions(options);
        if (!validation.valid) {
          pool.release(pooledConnection);
          return reject(new Error(validation.error));
        }
      }
      try {
        const commands = pool.getTransactionCommands(options);
        BEGIN_COMMAND = commands.BEGIN;
        COMMIT_COMMAND = commands.COMMIT;
        ROLLBACK_COMMAND = commands.ROLLBACK;
        SAVEPOINT_COMMAND = commands.SAVEPOINT;
        RELEASE_SAVEPOINT_COMMAND = commands.RELEASE_SAVEPOINT;
        ROLLBACK_TO_SAVEPOINT_COMMAND = commands.ROLLBACK_TO_SAVEPOINT;
        BEFORE_COMMIT_OR_ROLLBACK_COMMAND = commands.BEFORE_COMMIT_OR_ROLLBACK || null;
      } catch (err2) {
        pool.release(pooledConnection);
        return reject(err2);
      }
    }
    const onClose = onTransactionDisconnected.bind(state);
    if (pool.attachConnectionCloseHandler) {
      pool.attachConnectionCloseHandler(pooledConnection, onClose);
    }
    function run_internal_transaction_sql(string) {
      if (state.connectionState & 2 /* closed */) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      return unsafeQueryFromTransaction(string, [], pooledConnection, state.queries);
    }
    function transaction_sql(strings, ...values) {
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      if (__intrinsic__isArray(strings)) {
        if (!__intrinsic__isArray(strings.raw)) {
          return new SQLHelper(strings, values);
        }
      } else if (typeof strings === "object" && !(strings instanceof Query) && !(strings instanceof SQLHelper)) {
        return new SQLHelper([strings], values);
      }
      return queryFromTransaction(strings, values, pooledConnection, state.queries);
    }
    transaction_sql.unsafe = (string, args = []) => {
      return unsafeQueryFromTransaction(string, args, pooledConnection, state.queries);
    };
    transaction_sql.file = async (path, args = []) => {
      return await Bun.file(path).text().then((text) => {
        return unsafeQueryFromTransaction(text, args, pooledConnection, state.queries);
      });
    };
    transaction_sql.reserve = () => sql.reserve();
    transaction_sql.array = sql.array;
    transaction_sql.connect = () => {
      if (state.connectionState & 2 /* closed */) {
        return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
      }
      return __intrinsic__Promise.__intrinsic__resolve(transaction_sql);
    };
    transaction_sql.commitDistributed = async function(name) {
      if (!pool.getCommitDistributedSQL) {
        throw Error(`This adapter doesn't support distributed transactions.`);
      }
      const sql2 = pool.getCommitDistributedSQL(name);
      return await run_internal_transaction_sql(sql2);
    };
    transaction_sql.rollbackDistributed = async function(name) {
      if (!pool.getRollbackDistributedSQL) {
        throw Error(`This adapter doesn't support distributed transactions.`);
      }
      const sql2 = pool.getRollbackDistributedSQL(name);
      return await run_internal_transaction_sql(sql2);
    };
    transaction_sql.begin = function() {
      if (distributed) {
        throw pool.invalidTransactionStateError("cannot call begin inside a distributed transaction");
      }
      throw pool.invalidTransactionStateError("cannot call begin inside a transaction use savepoint() instead");
    };
    transaction_sql.beginDistributed = function() {
      if (distributed) {
        throw pool.invalidTransactionStateError("cannot call beginDistributed inside a distributed transaction");
      }
      throw pool.invalidTransactionStateError("cannot call beginDistributed inside a transaction use savepoint() instead");
    };
    transaction_sql.flush = function() {
      if (state.connectionState & 2 /* closed */) {
        throw pool.connectionClosedError();
      }
      if (pooledConnection.flush) {
        return pooledConnection.flush();
      }
      return pool.flush();
    };
    transaction_sql.close = async function(options2) {
      if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
        return __intrinsic__Promise.__intrinsic__resolve(__intrinsic__undefined);
      }
      state.connectionState &= ~1 /* acceptQueries */;
      const transactionQueries = state.queries;
      let timeout = options2?.timeout;
      if (timeout) {
        timeout = Number(timeout);
        if (timeout > 2 ** 31 || timeout < 0 || timeout !== timeout) {
          throw __intrinsic__makeErrorWithCode(119, "options.timeout", timeout, "must be a non-negative integer less than 2^31");
        }
        if (timeout > 0 && (transactionQueries.size > 0 || transactionSavepoints.size > 0)) {
          const { promise, resolve: resolve2 } = __intrinsic__Promise.withResolvers();
          const pending_queries = __intrinsic__Array.from(transactionQueries);
          const pending_savepoints = __intrinsic__Array.from(transactionSavepoints);
          const timer = setTimeout(async () => {
            for (const query of transactionQueries) {
              query.cancel();
            }
            if (BEFORE_COMMIT_OR_ROLLBACK_COMMAND) {
              await run_internal_transaction_sql(BEFORE_COMMIT_OR_ROLLBACK_COMMAND);
            }
            await run_internal_transaction_sql(ROLLBACK_COMMAND);
            state.connectionState |= 2 /* closed */;
            resolve2();
          }, timeout * 1000);
          timer.unref();
          __intrinsic__Promise.all([__intrinsic__Promise.all(pending_queries), __intrinsic__Promise.all(pending_savepoints)]).finally(() => {
            clearTimeout(timer);
            resolve2();
          });
          return promise;
        }
      }
      for (const query of transactionQueries) {
        query.cancel();
      }
      if (BEFORE_COMMIT_OR_ROLLBACK_COMMAND) {
        await run_internal_transaction_sql(BEFORE_COMMIT_OR_ROLLBACK_COMMAND);
      }
      await run_internal_transaction_sql(ROLLBACK_COMMAND);
      state.connectionState |= 2 /* closed */;
    };
    transaction_sql[Symbol.asyncDispose] = () => transaction_sql.close();
    transaction_sql.options = sql.options;
    transaction_sql.transaction = transaction_sql.begin;
    transaction_sql.distributed = transaction_sql.beginDistributed;
    transaction_sql.end = transaction_sql.close;
    function onSavepointFinished(savepoint_promise) {
      transactionSavepoints.delete(savepoint_promise);
    }
    async function run_internal_savepoint(save_point_name, savepoint_callback) {
      await run_internal_transaction_sql(`${SAVEPOINT_COMMAND} ${save_point_name}`);
      try {
        let result = await savepoint_callback(transaction_sql);
        if (RELEASE_SAVEPOINT_COMMAND) {
          await run_internal_transaction_sql(`${RELEASE_SAVEPOINT_COMMAND} ${save_point_name}`);
        }
        if (__intrinsic__isArray(result)) {
          result = await __intrinsic__Promise.all(result);
        }
        return result;
      } catch (err2) {
        if (!(state.connectionState & 2 /* closed */)) {
          await run_internal_transaction_sql(`${ROLLBACK_TO_SAVEPOINT_COMMAND} ${save_point_name}`);
        }
        throw err2;
      }
    }
    if (distributed) {
      transaction_sql.savepoint = async (_fn, _name) => {
        throw pool.invalidTransactionStateError("cannot call savepoint inside a distributed transaction");
      };
    } else {
      transaction_sql.savepoint = async (fn, name) => {
        let savepoint_callback = fn;
        if (state.connectionState & 2 /* closed */ || !(state.connectionState & 1 /* acceptQueries */)) {
          throw pool.connectionClosedError();
        }
        if (__intrinsic__isCallable(name)) {
          savepoint_callback = name;
          name = "";
        }
        if (!__intrinsic__isCallable(savepoint_callback)) {
          throw __intrinsic__makeErrorWithCode(119, "fn", callback, "must be a function");
        }
        const save_point_name = `s${savepoints++}${name ? `_${name}` : ""}`;
        const promise = run_internal_savepoint(save_point_name, savepoint_callback);
        transactionSavepoints.add(promise);
        return await promise.finally(onSavepointFinished.bind(null, promise));
      };
    }
    let needs_rollback = false;
    try {
      await run_internal_transaction_sql(BEGIN_COMMAND);
      needs_rollback = true;
      let transaction_result = await callback(transaction_sql);
      if (__intrinsic__isArray(transaction_result)) {
        transaction_result = await __intrinsic__Promise.all(transaction_result);
      }
      needs_rollback = false;
      if (BEFORE_COMMIT_OR_ROLLBACK_COMMAND) {
        await run_internal_transaction_sql(BEFORE_COMMIT_OR_ROLLBACK_COMMAND);
      }
      await run_internal_transaction_sql(COMMIT_COMMAND);
      return resolve(transaction_result);
    } catch (err2) {
      try {
        if (!(state.connectionState & 2 /* closed */) && needs_rollback) {
          if (BEFORE_COMMIT_OR_ROLLBACK_COMMAND) {
            await run_internal_transaction_sql(BEFORE_COMMIT_OR_ROLLBACK_COMMAND);
          }
          await run_internal_transaction_sql(ROLLBACK_COMMAND);
        }
      } catch (err3) {
        return reject(err3);
      }
      return reject(err2);
    } finally {
      state.connectionState |= 2 /* closed */;
      if (pool.detachConnectionCloseHandler) {
        pool.detachConnectionCloseHandler(pooledConnection, onClose);
      }
      if (!dontRelease) {
        pool.release(pooledConnection);
      }
    }
  }
  function sql(strings, ...values) {
    if (__intrinsic__isArray(strings)) {
      if (!__intrinsic__isArray(strings.raw)) {
        return new SQLHelper(strings, values);
      }
    } else if (typeof strings === "object" && !(strings instanceof Query) && !(strings instanceof SQLHelper)) {
      return new SQLHelper([strings], values);
    }
    return queryFromPool(strings, values);
  }
  sql.unsafe = (string, args = []) => {
    return unsafeQuery(string, args);
  };
  sql.file = async (path, args = []) => {
    return await Bun.file(path).text().then((text) => {
      return unsafeQuery(text, args);
    });
  };
  sql.reserve = () => {
    if (pool.closed) {
      return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
    }
    if (pool.supportsReservedConnections && !pool.supportsReservedConnections()) {
      return __intrinsic__Promise.__intrinsic__reject(new Error("This adapter doesn't support connection reservation"));
    }
    const promiseWithResolvers = __intrinsic__Promise.withResolvers();
    pool.connect(onReserveConnected.bind(promiseWithResolvers), true);
    return promiseWithResolvers.promise;
  };
  sql.array = (values, typeNameOrID = __intrinsic__undefined) => {
    return pool.array(values, typeNameOrID);
  };
  sql.rollbackDistributed = async function(name) {
    if (pool.closed) {
      throw pool.connectionClosedError();
    }
    if (!pool.getRollbackDistributedSQL) {
      throw Error(`This adapter doesn't support distributed transactions.`);
    }
    const sqlQuery = pool.getRollbackDistributedSQL(name);
    return await sql.unsafe(sqlQuery);
  };
  sql.commitDistributed = async function(name) {
    if (pool.closed) {
      throw pool.connectionClosedError();
    }
    if (!pool.getCommitDistributedSQL) {
      throw Error(`This adapter doesn't support distributed transactions.`);
    }
    const sqlQuery = pool.getCommitDistributedSQL(name);
    return await sql.unsafe(sqlQuery);
  };
  sql.beginDistributed = (name, fn) => {
    if (pool.closed) {
      return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
    }
    let callback = fn;
    if (typeof name !== "string") {
      return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "name", name, "must be a string"));
    }
    if (!__intrinsic__isCallable(callback)) {
      return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "fn", callback, "must be a function"));
    }
    const { promise, resolve, reject } = __intrinsic__Promise.withResolvers();
    const useReserved = pool.supportsReservedConnections?.() ?? true;
    pool.connect(onTransactionConnected.bind(null, callback, name, resolve, reject, false, true), useReserved);
    return promise;
  };
  sql.begin = (options_or_fn, fn) => {
    if (pool.closed) {
      return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
    }
    let callback = fn;
    let options = options_or_fn;
    if (__intrinsic__isCallable(options_or_fn)) {
      callback = options_or_fn;
      options = __intrinsic__undefined;
    } else if (typeof options_or_fn !== "string") {
      return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "options", options_or_fn, "must be a string"));
    }
    if (!__intrinsic__isCallable(callback)) {
      return __intrinsic__Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(119, "fn", callback, "must be a function"));
    }
    const { promise, resolve, reject } = __intrinsic__Promise.withResolvers();
    const useReserved = pool.supportsReservedConnections?.() ?? true;
    pool.connect(onTransactionConnected.bind(null, callback, options, resolve, reject, false, false), useReserved);
    return promise;
  };
  sql.connect = () => {
    if (pool.closed) {
      return __intrinsic__Promise.__intrinsic__reject(pool.connectionClosedError());
    }
    if (pool.isConnected()) {
      return __intrinsic__Promise.__intrinsic__resolve(sql);
    }
    let { resolve, reject, promise } = __intrinsic__Promise.withResolvers();
    const onConnected = (err, connection) => {
      if (err) {
        return reject(err);
      }
      pool.release(connection);
      resolve(sql);
    };
    pool.connect(onConnected);
    return promise;
  };
  sql.close = async (options) => {
    await pool.close(options);
  };
  sql[Symbol.asyncDispose] = () => sql.close();
  sql.flush = () => pool.flush();
  sql.options = connectionInfo;
  sql.transaction = sql.begin;
  sql.distributed = sql.beginDistributed;
  sql.end = sql.close;
  return sql;
};
var lazyDefaultSQL;
function resetDefaultSQL(sql) {
  lazyDefaultSQL = sql;
}
function ensureDefaultSQL() {
  if (!lazyDefaultSQL) {
    resetDefaultSQL(SQL(__intrinsic__undefined));
  }
}
var defaultSQLObject = function sql(strings, ...values) {
  if (new.target) {
    return SQL(strings);
  }
  if (!lazyDefaultSQL) {
    resetDefaultSQL(SQL(__intrinsic__undefined));
  }
  return lazyDefaultSQL(strings, ...values);
};
defaultSQLObject.reserve = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.reserve(...args);
};
defaultSQLObject.array = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.array(...args);
};
defaultSQLObject.commitDistributed = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.commitDistributed(...args);
};
defaultSQLObject.rollbackDistributed = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.rollbackDistributed(...args);
};
defaultSQLObject.distributed = defaultSQLObject.beginDistributed = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.beginDistributed(...args);
};
defaultSQLObject.connect = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.connect(...args);
};
defaultSQLObject.unsafe = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.unsafe(...args);
};
defaultSQLObject.file = (filename, ...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.file(filename, ...args);
};
defaultSQLObject.transaction = defaultSQLObject.begin = function(...args) {
  ensureDefaultSQL();
  return lazyDefaultSQL.begin(...args);
};
defaultSQLObject.end = defaultSQLObject.close = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.close(...args);
};
defaultSQLObject.flush = (...args) => {
  ensureDefaultSQL();
  return lazyDefaultSQL.flush(...args);
};
defineProperties(defaultSQLObject, {
  options: {
    get: () => {
      ensureDefaultSQL();
      return lazyDefaultSQL.options;
    }
  },
  [Symbol.asyncDispose]: {
    get: () => {
      ensureDefaultSQL();
      return lazyDefaultSQL[Symbol.asyncDispose];
    }
  }
});
SQL.SQLError = SQLError;
SQL.PostgresError = PostgresError;
SQL.SQLiteError = SQLiteError;
SQL.MySQLError = MySQLError;
$ = {
  sql: defaultSQLObject,
  default: defaultSQLObject,
  SQL,
  Query,
  postgres: SQL,
  SQLError,
  PostgresError,
  MySQLError,
  SQLiteError
};
$$EXPORT$$($).$$EXPORT_END$$;
