// @bun
// build/debug/tmp_modules/internal/sql/postgres.ts
var $;
var {
  SQLHelper,
  SSLMode,
  SQLResultArray,
  SQLArrayParameter,
  buildDefinedColumnsAndQuery
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 37) || __intrinsic__createInternalModuleById(37);
var {
  Query,
  SQLQueryFlags,
  symbols: { _strings, _values, _flags, _results, _handle }
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 36) || __intrinsic__createInternalModuleById(36);
function isTypedArray(value) {
  return __intrinsic__ArrayBuffer.isView(value) && !__intrinsic__Buffer.isBuffer(value);
}
var { PostgresError } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 33) || __intrinsic__createInternalModuleById(33);
var {
  createConnection: createPostgresConnection,
  createQuery: createPostgresQuery,
  init: initPostgres
} = __intrinsic__lazy(17);
var cmds = ["", "INSERT", "DELETE", "UPDATE", "MERGE", "SELECT", "MOVE", "FETCH", "COPY"];
var escapeBackslash = /\\/g;
var escapeQuote = /"/g;
function arrayEscape(value) {
  return value.replace(escapeBackslash, "\\\\").replace(escapeQuote, "\\\"");
}
var POSTGRES_ARRAY_TYPES = {
  1000: "BOOLEAN",
  1001: "BYTEA",
  1002: "CHAR",
  1003: "NAME",
  1009: "TEXT",
  1014: "CHAR",
  1015: "VARCHAR",
  1005: "SMALLINT",
  1006: "INT2VECTOR",
  1007: "INTEGER",
  1016: "BIGINT",
  1021: "REAL",
  1022: "DOUBLE PRECISION",
  1231: "NUMERIC",
  791: "MONEY",
  1028: "OID",
  1010: "TID",
  1011: "XID",
  1012: "CID",
  199: "JSON",
  3802: "JSONB",
  3807: "JSONB",
  4072: "JSONPATH",
  4073: "JSONPATH",
  143: "XML",
  1017: "POINT",
  1018: "LSEG",
  1019: "PATH",
  1020: "BOX",
  1027: "POLYGON",
  629: "LINE",
  719: "CIRCLE",
  651: "CIDR",
  1040: "MACADDR",
  1041: "INET",
  775: "MACADDR8",
  1182: "DATE",
  1183: "TIME",
  1115: "TIMESTAMP",
  1185: "TIMESTAMPTZ",
  1187: "INTERVAL",
  1270: "TIMETZ",
  1561: "BIT",
  1563: "VARBIT",
  1034: "ACLITEM",
  12052: "PG_DATABASE",
  10052: "PG_DATABASE"
};
function isPostgresNumericType(type) {
  switch (type) {
    case "BIT":
    case "VARBIT":
    case "SMALLINT":
    case "INT2VECTOR":
    case "INTEGER":
    case "INT":
    case "BIGINT":
    case "REAL":
    case "DOUBLE PRECISION":
    case "NUMERIC":
    case "MONEY":
      return true;
    default:
      return false;
  }
}
function isPostgresJsonType(type) {
  switch (type) {
    case "JSON":
    case "JSONB":
      return true;
    default:
      return false;
  }
}
function getPostgresArrayType(typeId) {
  return POSTGRES_ARRAY_TYPES[typeId] || null;
}
function arrayValueSerializer(type, is_numeric, is_json, value) {
  if (__intrinsic__isArray(value) || isTypedArray(value)) {
    if (!value.length)
      return "{}";
    const delimiter = type === "BOX" ? ";" : ",";
    return `{${value.map(arrayValueSerializer.bind(this, type, is_numeric, is_json)).join(delimiter)}}`;
  }
  switch (typeof value) {
    case "undefined":
      return "null";
    case "string":
      if (is_json) {
        return `"${arrayEscape(JSON.stringify(value))}"`;
      }
      return `"${arrayEscape(value)}"`;
    case "bigint":
    case "number":
      if (is_numeric || is_json) {
        return "" + value;
      }
      return `"${value}"`;
    case "boolean":
      switch (type) {
        case "BOOLEAN":
          return value === true ? "t" : "f";
        case "JSON":
        case "JSONB":
          return value === true ? "true" : "false";
        default:
          if (is_numeric) {
            return "" + (value ? 1 : 0);
          }
          return value === true ? '"true"' : '"false"';
      }
    default:
      if (value instanceof Date) {
        const isoValue = value.toISOString();
        if (is_json) {
          return `"${arrayEscape(JSON.stringify(isoValue))}"`;
        }
        return `"${arrayEscape(isoValue)}"`;
      }
      if (__intrinsic__Buffer.isBuffer(value)) {
        const hexValue = value.toString("hex");
        if (type === "BYTEA") {
          return `"\\x${arrayEscape(hexValue)}"`;
        }
        if (is_json) {
          return `"${arrayEscape(JSON.stringify(hexValue))}"`;
        }
        return `"${arrayEscape(hexValue)}"`;
      }
      return `"${arrayEscape(JSON.stringify(value))}"`;
  }
}
function getArrayType(typeNameOrID = __intrinsic__undefined) {
  const typeOfType = typeof typeNameOrID;
  if (typeOfType === "number") {
    return getPostgresArrayType(typeNameOrID) ?? "JSON";
  }
  if (typeOfType === "string") {
    return typeNameOrID?.toUpperCase();
  }
  return "JSON";
}
function serializeArray(values, type) {
  if (!__intrinsic__isArray(values) && !isTypedArray(values))
    return values;
  if (!values.length)
    return "{}";
  const delimiter = type === "BOX" ? ";" : ",";
  return `{${values.map(arrayValueSerializer.bind(this, type, isPostgresNumericType(type), isPostgresJsonType(type))).join(delimiter)}}`;
}
function wrapPostgresError(error) {
  if (Error.isError(error)) {
    return error;
  }
  return new PostgresError(error.message, error);
}
initPostgres(function onResolvePostgresQuery(query, result, commandTag, count, queries, is_last) {
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
    return;
  }
  $assert(result instanceof SQLResultArray, "result instanceof SQLResultArray", "Invalid result array");
  query[_handle].setPendingValue(new SQLResultArray);
  if (typeof commandTag === "string") {
    if (commandTag.length > 0) {
      result.command = commandTag;
    }
  } else {
    result.command = cmds[commandTag];
  }
  result.count = count || 0;
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
  return;
  $assert(result instanceof SQLResultArray, "result instanceof SQLResultArray", "Invalid result array");
  if (typeof commandTag === "string") {
    if (commandTag.length > 0) {
      result.command = commandTag;
    }
  } else {
    result.command = cmds[commandTag];
  }
  result.count = count || 0;
  if (queries) {
    const queriesIndex = queries.indexOf(query);
    if (queriesIndex !== -1) {
      queries.splice(queriesIndex, 1);
    }
  }
  try {
    query.resolve(result);
  } catch {}
}, function onRejectPostgresQuery(query, reject, queries) {
  reject = wrapPostgresError(reject);
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

class PooledPostgresConnection {
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
      return createPostgresConnection(hostname, Number(port), username || "", password || "", database || "", sslMode || SSLMode.disable, tls || null, query || "", path || "", onConnected, onClose, idleTimeout, connectionTimeout, maxLifetime, !prepare);
    } catch (e) {
      onClose(e);
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
  #onConnected(err, _) {
    if (err) {
      err = wrapPostgresError(err);
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
      err = wrapPostgresError(err);
    }
    const connectionInfo = this.connectionInfo;
    if (connectionInfo?.onclose) {
      connectionInfo.onclose(err);
    }
    this.state = 2 /* closed */;
    this.connection = null;
    this.storedError = err;
    this.adapter.readyConnections?.delete(this);
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
  async#startConnection() {
    this.connection = await PooledPostgresConnection.createConnection(this.connectionInfo, this.#onConnected.bind(this), this.#onClose.bind(this));
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
        case "ERR_POSTGRES_UNSUPPORTED_AUTHENTICATION_METHOD":
        case "ERR_POSTGRES_UNKNOWN_AUTHENTICATION_METHOD":
        case "ERR_POSTGRES_TLS_NOT_AVAILABLE":
        case "ERR_POSTGRES_TLS_UPGRADE_FAILED":
        case "ERR_POSTGRES_INVALID_SERVER_SIGNATURE":
        case "ERR_POSTGRES_INVALID_SERVER_KEY":
        case "ERR_POSTGRES_AUTHENTICATION_FAILED_PBKDF2":
          return false;
        default:
          this.#doRetry();
      }
    }
    return true;
  }
}

class PostgresAdapter {
  connectionInfo;
  connections;
  readyConnections;
  waitingQueue = [];
  reservedQueue = [];
  poolStarted = false;
  closed = false;
  totalQueries = 0;
  onAllQueriesFinished = null;
  constructor(connectionInfo) {
    this.connectionInfo = connectionInfo;
    this.connections = new __intrinsic__Array(connectionInfo.max);
    this.readyConnections = new Set;
  }
  escapeIdentifier(str) {
    return '"' + str.replaceAll('"', '""').replaceAll(".", '"."') + '"';
  }
  connectionClosedError() {
    return new PostgresError("Connection closed", {
      code: "ERR_POSTGRES_CONNECTION_CLOSED"
    });
  }
  notTaggedCallError() {
    return new PostgresError("Query not called as a tagged template literal", {
      code: "ERR_POSTGRES_NOT_TAGGED_CALL"
    });
  }
  queryCancelledError() {
    return new PostgresError("Query cancelled", {
      code: "ERR_POSTGRES_QUERY_CANCELLED"
    });
  }
  invalidTransactionStateError(message) {
    return new PostgresError(message, {
      code: "ERR_POSTGRES_INVALID_TRANSACTION_STATE"
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
  array(values, typeNameOrID) {
    const arrayType = getArrayType(typeNameOrID);
    return new SQLArrayParameter(serializeArray(values, arrayType), arrayType);
  }
  getTransactionCommands(options) {
    let BEGIN = "BEGIN";
    if (options) {
      BEGIN = `BEGIN ${options}`;
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
      BEGIN: "BEGIN",
      COMMIT: `PREPARE TRANSACTION '${name}'`,
      ROLLBACK: "ROLLBACK",
      SAVEPOINT: "SAVEPOINT",
      RELEASE_SAVEPOINT: "RELEASE SAVEPOINT",
      ROLLBACK_TO_SAVEPOINT: "ROLLBACK TO SAVEPOINT",
      BEFORE_COMMIT_OR_ROLLBACK: null
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
    return `COMMIT PREPARED '${name}'`;
  }
  getRollbackDistributedSQL(name) {
    const validation = this.validateDistributedTransactionName(name);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return `ROLLBACK PREPARED '${name}'`;
  }
  createQueryHandle(sql, values, flags) {
    if (!(flags & SQLQueryFlags.allowUnsafeTransaction)) {
      if (this.connectionInfo.max !== 1) {
        const upperCaseSqlString = sql.toUpperCase().trim();
        if (upperCaseSqlString.startsWith("BEGIN") || upperCaseSqlString.startsWith("START TRANSACTION")) {
          throw new PostgresError("Only use sql.begin, sql.reserved or max: 1", {
            code: "ERR_POSTGRES_UNSAFE_TRANSACTION"
          });
        }
      }
    }
    return createPostgresQuery(sql, values, new SQLResultArray, __intrinsic__undefined, !!(flags & SQLQueryFlags.bigint), !!(flags & SQLQueryFlags.simple));
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
      const nonReservedConnections = __intrinsic__Array.from(this.readyConnections || []).filter((c) => !(c.flags & 4 /* preReserved */) && c.queryCount < maxDistribution);
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
    if (this.readyConnections?.size > 0)
      return true;
    if (this.poolStarted) {
      const pollSize = this.connections.length;
      for (let i = 0;i < pollSize; i++) {
        const connection = this.connections[i];
        if (connection && connection.state !== 2 /* closed */) {
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
    if (this.readyConnections?.size > 0) {
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
    if (!this.readyConnections || this.readyConnections.size === 0) {
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
      const firstConnection = new PooledPostgresConnection(this.connectionInfo, this);
      this.connections[0] = firstConnection;
      if (reserved) {
        firstConnection.flags |= 4 /* preReserved */;
      }
      for (let i = 1;i < pollSize; i++) {
        this.connections[i] = new PooledPostgresConnection(this.connectionInfo, this);
      }
      return;
    }
    if (reserved) {
      let connectionWithLeastQueries = null;
      let leastQueries = __intrinsic__Infinity;
      for (const connection of this.readyConnections || []) {
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
        this.readyConnections?.delete(connection);
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
                    query += `$${binding_idx++}${k < lastDefinedColumnIndex ? ", " : ""}`;
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
                  query += `$${binding_idx++}${j < lastDefinedColumnIndex ? ", " : ""}`;
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
                query += `$${binding_idx++}${j < lastItemIndex ? ", " : ""}`;
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
              if (command === 1 /* update */) {
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
                query += `${this.escapeIdentifier(column)} = $${binding_idx++}${i2 < lastColumnIndex ? ", " : ""}`;
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
          } else if (value instanceof SQLArrayParameter) {
            query += `$${binding_idx++}::${value.arrayType}[] `;
            binding_values.push(value.serializedValues);
          } else {
            query += `$${binding_idx++} `;
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
  PostgresAdapter,
  SQLCommand,
  commandToString,
  detectCommand
};
$$EXPORT$$($).$$EXPORT_END$$;
