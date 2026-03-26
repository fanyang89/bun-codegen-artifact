// @bun
// build/debug/tmp_modules/internal/sql/errors.ts
var $;

class SQLError extends Error {
  constructor(message) {
    super(message);
    this.name = "SQLError";
  }
}

class PostgresError extends SQLError {
  code;
  constructor(message, options) {
    super(message);
    this.name = "PostgresError";
    this.code = options.code;
    if (options.errno !== __intrinsic__undefined)
      this.errno = options.errno;
    if (options.detail !== __intrinsic__undefined)
      this.detail = options.detail;
    if (options.hint !== __intrinsic__undefined)
      this.hint = options.hint;
    if (options.severity !== __intrinsic__undefined)
      this.severity = options.severity;
    if (options.position !== __intrinsic__undefined)
      this.position = options.position;
    if (options.internalPosition !== __intrinsic__undefined)
      this.internalPosition = options.internalPosition;
    if (options.internalQuery !== __intrinsic__undefined)
      this.internalQuery = options.internalQuery;
    if (options.where !== __intrinsic__undefined)
      this.where = options.where;
    if (options.schema !== __intrinsic__undefined)
      this.schema = options.schema;
    if (options.table !== __intrinsic__undefined)
      this.table = options.table;
    if (options.column !== __intrinsic__undefined)
      this.column = options.column;
    if (options.dataType !== __intrinsic__undefined)
      this.dataType = options.dataType;
    if (options.constraint !== __intrinsic__undefined)
      this.constraint = options.constraint;
    if (options.file !== __intrinsic__undefined)
      this.file = options.file;
    if (options.line !== __intrinsic__undefined)
      this.line = options.line;
    if (options.routine !== __intrinsic__undefined)
      this.routine = options.routine;
  }
}

class SQLiteError extends SQLError {
  code;
  errno;
  constructor(message, options) {
    super(message);
    this.name = "SQLiteError";
    this.code = options.code;
    this.errno = options.errno;
    if (options.byteOffset !== __intrinsic__undefined)
      this.byteOffset = options.byteOffset;
  }
}

class MySQLError extends SQLError {
  code;
  constructor(message, options) {
    super(message);
    this.name = "MySQLError";
    this.code = options.code;
    if (options.errno !== __intrinsic__undefined)
      this.errno = options.errno;
    if (options.sqlState !== __intrinsic__undefined)
      this.sqlState = options.sqlState;
  }
}
$ = { PostgresError, SQLError, SQLiteError, MySQLError };
$$EXPORT$$($).$$EXPORT_END$$;
