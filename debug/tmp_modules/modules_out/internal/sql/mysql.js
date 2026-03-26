// @bun
// build/debug/tmp_modules/internal/sql/mysql.ts
var $;
var { SQLHelper, SSLMode, SQLResultArray, buildDefinedColumnsAndQuery } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 37) || __intrinsic__createInternalModuleById(37);
var {
  Query,
  SQLQueryFlags,
  symbols: { _strings, _values, _flags, _results, _handle }
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 36) || __intrinsic__createInternalModuleById(36);
var { MySQLError } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 33) || __intrinsic__createInternalModuleById(33);
var {
  createConnection: createMySQLConnection,
  createQuery: createMySQLQuery,
  init: initMySQL
} = __intrinsic__lazy(16);
function wrapError(error) {
  if (Error.isError(error)) {
    return error;
  }
  return new MySQLError(error.message, error);
}
initMySQL(function onResolveMySQLQuery(query, result, commandTag, count, queries, is_last, last_insert_rowid, affected_rows) {
  if (query[_flags] & SQLQueryFlags.simple) {
    $assert(result instanceof SQLResultArray, "result instanceof SQLResultArray", "Invalid result array");
    query[_handle].setPendingValue(new SQLResultArray);
    result.count = count || 0;
    result.lastInsertRowid = last_insert_rowid;
    result.affectedRows = affected_rows || 0;
    const last_result = query[_results];
    if (!last_result) {
      query[_results] = result;
    } else {
      if (last_result instanceof SQLResultArray) {
        query[_results] = [last_result, result];
      } else {
        last_result.push(result);
      }
    }
    if (is_last) {
      if (queries) {
        const queriesIndex = queries.indexOf(query);
        if (queriesIndex !== -1) {
          queries.splice(queriesIndex, 1);
        }
      }
      try {
        query.resolve(query[_results]);
      } catch {}
    }
    return;
  }
  $assert(result instanceof SQLResultArray, "result instanceof SQLResultArray", "Invalid result array");
  result.count = count || 0;
  result.lastInsertRowid = last_insert_rowid;
  result.affectedRows = affected_rows || 0;
  if (queries) {
    const queriesIndex = queries.indexOf(query);
    if (queriesIndex !== -1) {
      queries.splice(queriesIndex, 1);
    }
  }
  try {
    query.resolve(result);
  } catch {}
}, function onRejectMySQLQuery(query, reject, queries) {
  reject = wrapError(reject);
  if (queries) {
    const queriesIndex = queries.indexOf(query);
    if (queriesIndex !== -1) {
      queries.splice(queriesIndex, 1);
    }
  }
  try {
    query.reject(reject);
  } catch {}
});
var SQLCommand;
((SQLCommand2) => {
  SQLCommand2[SQLCommand2["insert"] = 0] = "insert";
  SQLCommand2[SQLCommand2["update"] = 1] = "update";
  SQLCommand2[SQLCommand2["updateSet"] = 2] = "updateSet";
  SQLCommand2[SQLCommand2["where"] = 3] = "where";
  SQLCommand2[SQLCommand2["in"] = 4] = "in";
  SQLCommand2[SQLCommand2["none"] = -1] = "none";
})(SQLCommand ||= {});
function commandToString(command) {
  switch (command) {
    case 0 /* insert */:
      return "INSERT";
    case 2 /* updateSet */:
    case 1 /* update */:
      return "UPDATE";
    case 4 /* in */:
    case 3 /* where */:
      return "WHERE";
    default:
      return "";
  }
}
function detectCommand(query) {
  const text = query.toLowerCase().trim();
  const text_len = text.length;
  let token = "";
  let command = -1 /* none */;
  let quoted = false;
  for (let i = text_len - 1;i >= 0; i--) {
    const char = text[i];
    switch (char) {
      case " ":
      case `
`:
      case "\t":
      case "\r":
      case "\f":
      case "\v": {
        switch (token) {
          case "insert": {
            return 0 /* insert */;
          }
          case "update": {
            return 1 /* update */;
          }
          case "where": {
            return 3 /* where */;
          }
          case "set": {
            return 2 /* updateSet */;
          }
          case "in": {
            return 4 /* in */;
          }
          default: {
            token = "";
            continue;
          }
        }
      }
      default: {
        if (char === '"') {
          quoted = !quoted;
          continue;
        }
        if (!quoted) {
          token = char + token;
        }
      }
    }
  }
  if (token) {
    switch (token) {
      case "insert":
        return 0 /* insert */;
      case "update":
        return 1 /* update */;
      case "where":
        return 3 /* where */;
      case "set":
        return 2 /* updateSet */;
      case "in":
      case "any":
      case "all":
        return 4 /* in */;
      default:
        return -1 /* none */;
    }
  }
  return command;
}
function onQueryFinish(onClose) {
  this.queries.delete(onClose);
  this.adapter.release(this);
}
function closeNT(onClose, err) {
  onClose(err);
}

class PooledMySQLConnection {
  static async createConnection(options, onConnected, onClose) {
    const {
      hostname,
      port,
      username,
      tls,
      query,
      database,
      sslMode,
      idleTimeout = 0,
      connectionTimeout = 30 * 1000,
      maxLifetime = 0,
      prepare = true,
      path
    } = options;
    let password = options.password;
    try {
      if (typeof password === "function") {
        password = password();
      }
      if (password && __intrinsic__isPromise(password)) {
        password = await password;
      }
      return createMySQLConnection(hostname, Number(port), username || "", password || "", database || "", sslMode || SSLMode.disable, tls || null, query || "", path || "", onConnected, onClose, idleTimeout, connectionTimeout, maxLifetime, !prepare);
    } catch (e) {
      process.nextTick(closeNT, onClose, e);
      return null;
    }
  }
  adapter;
  connection = null;
  state = 0 /* pending */;
  storedError = null;
  queries = new Set;
  onFinish = null;
  connectionInfo;
  flags = 0;
  queryCount = 0;
  #onConnected(err, connection) {
    if (err) {
      err = wrapError(err);
    } else {
      this.connection = connection;
    }
    const connectionInfo = this.connectionInfo;
    if (connectionInfo?.onconnect) {
      connectionInfo.onconnect(err);
    }
    this.storedError = err;
    if (!err) {
      this.flags |= 1 /* canBeConnected */;
    }
    this.state = err ? 2 /* closed */ : 1 /* connected */;
    const onFinish = this.onFinish;
    if (onFinish) {
      this.queryCount = 0;
      this.flags &= ~2 /* reserved */;
      this.flags &= ~4 /* preReserved */;
      if (err) {
        onFinish(err);
      } else {
        this.connection?.close();
      }
      return;
    }
    this.adapter.release(this, true);
  }
  #onClose(err) {
    if (err) {
      err = wrapError(err);
    }
    const connectionInfo = this.connectionInfo;
    if (connectionInfo?.onclose) {
      connectionInfo.onclose(err);
    }
    this.state = 2 /* closed */;
    this.connection = null;
    this.storedError = err;
    this.adapter.readyConnections.delete(this);
    const queries = new Set(this.queries);
    this.queries?.clear?.();
    this.queryCount = 0;
    this.flags &= ~2 /* reserved */;
    for (const onClose of queries) {
      onClose(err);
    }
    const onFinish = this.onFinish;
    if (onFinish) {
      onFinish(err);
    }
    this.adapter.release(this, true);
  }
  constructor(connectionInfo, adapter) {
    this.state = 0 /* pending */;
    this.adapter = adapter;
    this.connectionInfo = connectionInfo;
    this.#startConnection();
  }
  #startConnection() {
    PooledMySQLConnection.createConnection(this.connectionInfo, this.#onConnected.bind(this), this.#onClose.bind(this));
  }
  onClose(onClose) {
    this.queries.add(onClose);
  }
  bindQuery(query, onClose) {
    this.queries.add(onClose);
    query.finally(onQueryFinish.bind(this, onClose));
  }
  #doRetry() {
    if (this.adapter.closed) {
      return;
    }
    this.storedError = null;
    this.state = 0 /* pending */;
    this.#startConnection();
  }
  close() {
    try {
      if (this.state === 1 /* connected */) {
        this.connection?.close();
      }
    } catch {}
  }
  flush() {
    this.connection?.flush();
  }
  retry() {
    if (this.adapter.closed) {
      return false;
    }
    if (this.flags & 1 /* canBeConnected */) {
      this.#doRetry();
    } else {
      switch (this.storedError?.code) {
        case "ERR_MYSQL_PASSWORD_REQUIRED":
        case "ERR_MYSQL_MISSING_AUTH_DATA":
        case "ERR_MYSQL_FAILED_TO_ENCRYPT_PASSWORD":
        case "ERR_MYSQL_INVALID_PUBLIC_KEY":
        case "ERR_MYSQL_UNSUPPORTED_PROTOCOL_VERSION":
        case "ERR_MYSQL_UNSUPPORTED_AUTH_PLUGIN":
        case "ERR_MYSQL_AUTHENTICATION_FAILED":
          return false;
        default:
          this.#doRetry();
      }
    }
    return true;
  }
}

class MySQLAdapter {
  connectionInfo;
  connections;
  readyConnections = new Set;
  waitingQueue = [];
  reservedQueue = [];
  poolStarted = false;
  closed = false;
  totalQueries = 0;
  onAllQueriesFinished = null;
  constructor(connectionInfo) {
    this.connectionInfo = connectionInfo;
    this.connections = new __intrinsic__Array(connectionInfo.max);
  }
  escapeIdentifier(str) {
    return "`" + str.replaceAll("`", "``") + "`";
  }
  connectionClosedError() {
    return new MySQLError("Connection closed", {
      code: "ERR_MYSQL_CONNECTION_CLOSED"
    });
  }
  notTaggedCallError() {
    return new MySQLError("Query not called as a tagged template literal", {
      code: "ERR_MYSQL_NOT_TAGGED_CALL"
    });
  }
  queryCancelledError() {
    return new MySQLError("Query cancelled", {
      code: "ERR_MYSQL_QUERY_CANCELLED"
    });
  }
  invalidTransactionStateError(message) {
    return new MySQLError(message, {
      code: "ERR_MYSQL_INVALID_TRANSACTION_STATE"
    });
  }
  supportsReservedConnections() {
    return true;
  }
  getConnectionForQuery(pooledConnection) {
    return pooledConnection.connection;
  }
  attachConnectionCloseHandler(connection, handler) {
    if (connection.onClose) {
      connection.onClose(handler);
    }
  }
  detachConnectionCloseHandler(connection, handler) {
    if (connection.queries) {
      connection.queries.delete(handler);
    }
  }
  array(_values2, _typeNameOrID) {
    throw new Error("MySQL doesn't support arrays");
  }
  getTransactionCommands(options) {
    let BEGIN = "START TRANSACTION";
    if (options) {
      BEGIN = `START TRANSACTION ${options}`;
    }
    return {
      BEGIN,
      COMMIT: "COMMIT",
      ROLLBACK: "ROLLBACK",
      SAVEPOINT: "SAVEPOINT",
      RELEASE_SAVEPOINT: "RELEASE SAVEPOINT",
      ROLLBACK_TO_SAVEPOINT: "ROLLBACK TO SAVEPOINT"
    };
  }
  getDistributedTransactionCommands(name) {
    if (!this.validateDistributedTransactionName(name).valid) {
      return null;
    }
    return {
      BEGIN: `XA START '${name}'`,
      COMMIT: `XA PREPARE '${name}'`,
      ROLLBACK: `XA ROLLBACK '${name}'`,
      SAVEPOINT: "SAVEPOINT",
      RELEASE_SAVEPOINT: "RELEASE SAVEPOINT",
      ROLLBACK_TO_SAVEPOINT: "ROLLBACK TO SAVEPOINT",
      BEFORE_COMMIT_OR_ROLLBACK: `XA END '${name}'`
    };
  }
  validateTransactionOptions(_options) {
    return { valid: true };
  }
  validateDistributedTransactionName(name) {
    if (name.indexOf("'") !== -1) {
      return {
        valid: false,
        error: "Distributed transaction name cannot contain single quotes."
      };
    }
    return { valid: true };
  }
  getCommitDistributedSQL(name) {
    const validation = this.validateDistributedTransactionName(name);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return `XA COMMIT '${name}'`;
  }
  getRollbackDistributedSQL(name) {
    const validation = this.validateDistributedTransactionName(name);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return `XA ROLLBACK '${name}'`;
  }
  createQueryHandle(sql, values, flags) {
    if (!(flags & SQLQueryFlags.allowUnsafeTransaction)) {
      if (this.connectionInfo.max !== 1) {
        const upperCaseSqlString = sql.toUpperCase().trim();
        if (upperCaseSqlString.startsWith("BEGIN") || upperCaseSqlString.startsWith("START TRANSACTION")) {
          throw new MySQLError("Only use sql.begin, sql.reserved or max: 1", {
            code: "ERR_MYSQL_UNSAFE_TRANSACTION"
          });
        }
      }
    }
    return createMySQLQuery(sql, values, new SQLResultArray, __intrinsic__undefined, !!(flags & SQLQueryFlags.bigint), !!(flags & SQLQueryFlags.simple));
  }
  maxDistribution() {
    if (!this.waitingQueue.length)
      return 0;
    const result = Math.ceil((this.waitingQueue.length + this.totalQueries) / this.connections.length);
    return result ? result : 1;
  }
  flushConcurrentQueries() {
    const maxDistribution = this.maxDistribution();
    if (maxDistribution === 0) {
      return;
    }
    while (true) {
      const nonReservedConnections = __intrinsic__Array.from(this.readyConnections).filter((c) => !(c.flags & 4 /* preReserved */) && c.queryCount < maxDistribution);
      if (nonReservedConnections.length === 0) {
        return;
      }
      const orderedConnections = nonReservedConnections.sort((a, b) => a.queryCount - b.queryCount);
      for (const connection of orderedConnections) {
        const pending = this.waitingQueue.shift();
        if (!pending) {
          return;
        }
        connection.queryCount++;
        this.totalQueries++;
        pending(null, connection);
      }
    }
  }
  release(connection, connectingEvent = false) {
    if (!connectingEvent) {
      connection.queryCount--;
      this.totalQueries--;
    }
    const currentQueryCount = connection.queryCount;
    if (currentQueryCount == 0) {
      connection.flags &= ~2 /* reserved */;
      connection.flags &= ~4 /* preReserved */;
    }
    if (this.onAllQueriesFinished) {
      if (!this.hasPendingQueries()) {
        this.onAllQueriesFinished();
      }
    }
    if (connection.state !== 1 /* connected */) {
      if (connection.storedError) {
        if (this.hasConnectionsAvailable()) {
          return;
        }
        const waitingQueue = this.waitingQueue;
        const reservedQueue = this.reservedQueue;
        this.waitingQueue = [];
        this.reservedQueue = [];
        for (const pending of waitingQueue) {
          pending(connection.storedError, connection);
        }
        for (const pending of reservedQueue) {
          pending(connection.storedError, connection);
        }
      }
      return;
    }
    if (currentQueryCount == 0) {
      const pendingReserved = this.reservedQueue.shift();
      if (pendingReserved) {
        connection.flags |= 2 /* reserved */;
        connection.queryCount++;
        this.totalQueries++;
        pendingReserved(connection.storedError, connection);
        return;
      }
    }
    this.readyConnections.add(connection);
    this.flushConcurrentQueries();
  }
  hasConnectionsAvailable() {
    if (this.readyConnections.size > 0)
      return true;
    if (this.poolStarted) {
      const pollSize = this.connections.length;
      for (let i = 0;i < pollSize; i++) {
        const connection = this.connections[i];
        if (connection.state !== 2 /* closed */) {
          return true;
        }
      }
    }
    return false;
  }
  hasPendingQueries() {
    if (this.waitingQueue.length > 0 || this.reservedQueue.length > 0)
      return true;
    if (this.poolStarted) {
      return this.totalQueries > 0;
    }
    return false;
  }
  isConnected() {
    if (this.readyConnections.size > 0) {
      return true;
    }
    if (this.poolStarted) {
      const pollSize = this.connections.length;
      for (let i = 0;i < pollSize; i++) {
        const connection = this.connections[i];
        if (connection.state === 1 /* connected */) {
          return true;
        }
      }
    }
    return false;
  }
  flush() {
    if (this.closed) {
      return;
    }
    if (this.poolStarted) {
      const pollSize = this.connections.length;
      for (let i = 0;i < pollSize; i++) {
        const connection = this.connections[i];
        if (connection.state === 1 /* connected */) {
          connection.connection?.flush();
        }
      }
    }
  }
  async#close() {
    let pending;
    while (pending = this.waitingQueue.shift()) {
      pending(this.connectionClosedError(), null);
    }
    while (this.reservedQueue.length > 0) {
      const pendingReserved = this.reservedQueue.shift();
      if (pendingReserved) {
        pendingReserved(this.connectionClosedError(), null);
      }
    }
    const promises = [];
    if (this.poolStarted) {
      this.poolStarted = false;
      const pollSize = this.connections.length;
      for (let i = 0;i < pollSize; i++) {
        const connection = this.connections[i];
        switch (connection.state) {
          case 0 /* pending */:
            {
              const { promise, resolve } = __intrinsic__Promise.withResolvers();
              connection.onFinish = resolve;
              promises.push(promise);
              connection.connection?.close();
            }
            break;
          case 1 /* connected */:
            {
              const { promise, resolve } = __intrinsic__Promise.withResolvers();
              connection.onFinish = resolve;
              promises.push(promise);
              connection.connection?.close();
            }
            break;
        }
        this.connections[i] = null;
      }
    }
    this.readyConnections.clear();
    this.waitingQueue.length = 0;
    return __intrinsic__Promise.all(promises);
  }
  async close(options) {
    if (this.closed) {
      return;
    }
    let timeout = options?.timeout;
    if (timeout) {
      timeout = Number(timeout);
      if (timeout > 2 ** 31 || timeout < 0 || timeout !== timeout) {
        throw __intrinsic__makeErrorWithCode(119, "options.timeout", timeout, "must be a non-negative integer less than 2^31");
      }
      this.closed = true;
      if (timeout === 0 || !this.hasPendingQueries()) {
        await this.#close();
        return;
      }
      const { promise, resolve } = __intrinsic__Promise.withResolvers();
      const timer = setTimeout(() => {
        this.#close().finally(resolve);
      }, timeout * 1000);
      timer.unref();
      this.onAllQueriesFinished = () => {
        clearTimeout(timer);
        this.#close().finally(resolve);
      };
      return promise;
    } else {
      this.closed = true;
      if (!this.hasPendingQueries()) {
        await this.#close();
        return;
      }
      const { promise, resolve } = __intrinsic__Promise.withResolvers();
      this.onAllQueriesFinished = () => {
        this.#close().finally(resolve);
      };
      return promise;
    }
  }
  connect(onConnected, reserved = false) {
    if (this.closed) {
      return onConnected(this.connectionClosedError(), null);
    }
    if (this.readyConnections.size === 0) {
      let retry_in_progress = false;
      let all_closed = true;
      let storedError = null;
      if (this.poolStarted) {
        const pollSize2 = this.connections.length;
        for (let i = 0;i < pollSize2; i++) {
          const connection = this.connections[i];
          if (connection.state === 2 /* closed */) {
            if (connection.retry()) {
              if (!retry_in_progress) {
                retry_in_progress = true;
                if (reserved) {
                  this.reservedQueue.push(onConnected);
                } else {
                  this.waitingQueue.push(onConnected);
                }
              }
            } else {
              storedError = connection.storedError;
            }
          } else {
            all_closed = false;
          }
        }
        if (!all_closed && !retry_in_progress) {
          if (reserved) {
            this.reservedQueue.push(onConnected);
          } else {
            this.waitingQueue.push(onConnected);
          }
        } else if (!retry_in_progress) {
          onConnected(storedError ?? this.connectionClosedError(), null);
        }
        return;
      }
      if (reserved) {
        this.reservedQueue.push(onConnected);
      } else {
        this.waitingQueue.push(onConnected);
      }
      this.poolStarted = true;
      const pollSize = this.connections.length;
      const firstConnection = new PooledMySQLConnection(this.connectionInfo, this);
      this.connections[0] = firstConnection;
      if (reserved) {
        firstConnection.flags |= 4 /* preReserved */;
      }
      for (let i = 1;i < pollSize; i++) {
        this.connections[i] = new PooledMySQLConnection(this.connectionInfo, this);
      }
      return;
    }
    if (reserved) {
      let connectionWithLeastQueries = null;
      let leastQueries = __intrinsic__Infinity;
      for (const connection of this.readyConnections) {
        if (connection.flags & 4 /* preReserved */ || connection.flags & 2 /* reserved */)
          continue;
        const queryCount = connection.queryCount;
        if (queryCount > 0) {
          if (queryCount < leastQueries) {
            leastQueries = queryCount;
            connectionWithLeastQueries = connection;
          }
          continue;
        }
        connection.flags |= 2 /* reserved */;
        connection.queryCount++;
        this.totalQueries++;
        this.readyConnections.delete(connection);
        onConnected(null, connection);
        return;
      }
      if (connectionWithLeastQueries) {
        connectionWithLeastQueries.flags |= 4 /* preReserved */;
      }
      this.reservedQueue.push(onConnected);
    } else {
      this.waitingQueue.push(onConnected);
      this.flushConcurrentQueries();
    }
  }
  normalizeQuery(strings, values, binding_idx = 1) {
    if (typeof strings === "string") {
      return [strings, values || []];
    }
    if (!__intrinsic__isArray(strings)) {
      throw new SyntaxError("Invalid query: SQL Fragment cannot be executed or was misused");
    }
    const str_len = strings.length;
    if (str_len === 0) {
      return ["", []];
    }
    let binding_values = [];
    let query = "";
    for (let i = 0;i < str_len; i++) {
      const string = strings[i];
      if (typeof string === "string") {
        query += string;
        if (values.length > i) {
          const value = values[i];
          if (value instanceof Query) {
            const q = value;
            const [sub_query, sub_values] = this.normalizeQuery(q[_strings], q[_values], binding_idx);
            query += sub_query;
            for (let j = 0;j < sub_values.length; j++) {
              binding_values.push(sub_values[j]);
            }
            binding_idx += sub_values.length;
          } else if (value instanceof SQLHelper) {
            const command = detectCommand(query);
            if (command === -1 /* none */ || command === 3 /* where */) {
              throw new SyntaxError("Helpers are only allowed for INSERT, UPDATE and IN commands");
            }
            const { columns, value: items } = value;
            const columnCount = columns.length;
            if (columnCount === 0 && command !== 4 /* in */) {
              throw new SyntaxError(`Cannot ${commandToString(command)} with no columns`);
            }
            const lastColumnIndex = columns.length - 1;
            if (command === 0 /* insert */) {
              const { definedColumns, columnsSql } = buildDefinedColumnsAndQuery(columns, items, this.escapeIdentifier.bind(this));
              const definedColumnCount = definedColumns.length;
              if (definedColumnCount === 0) {
                throw new SyntaxError("Insert needs to have at least one column with a defined value");
              }
              const lastDefinedColumnIndex = definedColumnCount - 1;
              query += columnsSql;
              if (__intrinsic__isArray(items)) {
                const itemsCount = items.length;
                const lastItemIndex = itemsCount - 1;
                for (let j = 0;j < itemsCount; j++) {
                  query += "(";
                  const item = items[j];
                  for (let k = 0;k < definedColumnCount; k++) {
                    const column = definedColumns[k];
                    const columnValue = item[column];
                    query += `?${k < lastDefinedColumnIndex ? ", " : ""}`;
                    binding_values.push(typeof columnValue === "undefined" ? null : columnValue);
                  }
                  if (j < lastItemIndex) {
                    query += "),";
                  } else {
                    query += ") ";
                  }
                }
              } else {
                query += "(";
                const item = items;
                for (let j = 0;j < definedColumnCount; j++) {
                  const column = definedColumns[j];
                  const columnValue = item[column];
                  query += `?${j < lastDefinedColumnIndex ? ", " : ""}`;
                  binding_values.push(columnValue);
                }
                query += ") ";
              }
            } else if (command === 4 /* in */) {
              if (!__intrinsic__isArray(items)) {
                throw new SyntaxError("An array of values is required for WHERE IN helper");
              }
              const itemsCount = items.length;
              const lastItemIndex = itemsCount - 1;
              query += "(";
              for (let j = 0;j < itemsCount; j++) {
                query += `?${j < lastItemIndex ? ", " : ""}`;
                if (columnCount > 0) {
                  if (columnCount > 1) {
                    throw new SyntaxError("Cannot use WHERE IN helper with multiple columns");
                  }
                  const value2 = items[j];
                  if (typeof value2 === "undefined") {
                    binding_values.push(null);
                  } else {
                    const value_from_key = value2[columns[0]];
                    if (typeof value_from_key === "undefined") {
                      binding_values.push(null);
                    } else {
                      binding_values.push(value_from_key);
                    }
                  }
                } else {
                  const value2 = items[j];
                  if (typeof value2 === "undefined") {
                    binding_values.push(null);
                  } else {
                    binding_values.push(value2);
                  }
                }
              }
              query += ") ";
            } else {
              let item;
              if (__intrinsic__isArray(items)) {
                if (items.length > 1) {
                  throw new SyntaxError("Cannot use array of objects for UPDATE");
                }
                item = items[0];
              } else {
                item = items;
              }
              const isUpsert = query.trimEnd().endsWith("ON DUPLICATE KEY UPDATE");
              if (command === 1 /* update */ && !isUpsert) {
                query += " SET ";
              }
              let hasValues = false;
              for (let i2 = 0;i2 < columnCount; i2++) {
                const column = columns[i2];
                const columnValue = item[column];
                if (typeof columnValue === "undefined") {
                  continue;
                }
                hasValues = true;
                query += `${this.escapeIdentifier(column)} = ?${i2 < lastColumnIndex ? ", " : ""}`;
                binding_values.push(columnValue);
              }
              if (query.endsWith(", ")) {
                query = query.substring(0, query.length - 2);
              }
              if (!hasValues) {
                throw new SyntaxError("Update needs to have at least one column");
              }
              query += " ";
            }
          } else {
            query += `? `;
            if (typeof value === "undefined") {
              binding_values.push(null);
            } else {
              binding_values.push(value);
            }
          }
        }
      } else {
        throw new SyntaxError("Invalid query: SQL Fragment cannot be executed or was misused");
      }
    }
    return [query, binding_values];
  }
}
$ = {
  MySQLAdapter,
  commandToString,
  detectCommand,
  SQLCommand
};
$$EXPORT$$($).$$EXPORT_END$$;
