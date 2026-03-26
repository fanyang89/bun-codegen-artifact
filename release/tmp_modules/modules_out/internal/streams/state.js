// @bun
// build/release/tmp_modules/internal/streams/state.ts
var $, { validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), NumberIsInteger = Number.isInteger, MathFloor = Math.floor, defaultHighWaterMarkBytes = 65536, defaultHighWaterMarkObjectMode = 16;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getDefaultHighWaterMark(objectMode = !1) {
  return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
}
function setDefaultHighWaterMark(objectMode, value) {
  if (validateInteger(value, "value", 0), objectMode)
    defaultHighWaterMarkObjectMode = value;
  else
    defaultHighWaterMarkBytes = value;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  let hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!NumberIsInteger(hwm) || hwm < 0) {
      let name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
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
