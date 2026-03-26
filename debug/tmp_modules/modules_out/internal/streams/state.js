// @bun
// build/debug/tmp_modules/internal/streams/state.ts
var $;
var { validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var NumberIsInteger = Number.isInteger;
var MathFloor = Math.floor;
var defaultHighWaterMarkBytes = 64 * 1024;
var defaultHighWaterMarkObjectMode = 16;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getDefaultHighWaterMark(objectMode = false) {
  return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
}
function setDefaultHighWaterMark(objectMode, value) {
  validateInteger(value, "value", 0);
  if (objectMode) {
    defaultHighWaterMarkObjectMode = value;
  } else {
    defaultHighWaterMarkBytes = value;
  }
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!NumberIsInteger(hwm) || hwm < 0) {
      const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
      throw __intrinsic__makeErrorWithCode(119, name, hwm);
    }
    return MathFloor(hwm);
  }
  return getDefaultHighWaterMark(state.objectMode);
}
$ = {
  getHighWaterMark,
  getDefaultHighWaterMark,
  setDefaultHighWaterMark
};
$$EXPORT$$($).$$EXPORT_END$$;
