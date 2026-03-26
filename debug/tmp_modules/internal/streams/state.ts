// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/state.ts


"use strict";

const { validateInteger } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));

const NumberIsInteger = Number.isInteger;
const MathFloor = Math.floor;
type Key = string; // do we need to allow symbols?

// TODO (fix): For some reason Windows CI fails with bigger hwm.
let defaultHighWaterMarkBytes = process.platform === "win32" ? 16 * 1024 : 64 * 1024;
let defaultHighWaterMarkObjectMode = 16;

function highWaterMarkFrom(
  options: { highWaterMark?: number | null | undefined },
  isDuplex: boolean,
  duplexKey: Key,
): number | null {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getDefaultHighWaterMark(objectMode: boolean = false): number {
  return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
}

function setDefaultHighWaterMark(objectMode: boolean, value: number): void {
  validateInteger(value, "value", 0);
  if (objectMode) {
    defaultHighWaterMarkObjectMode = value;
  } else {
    defaultHighWaterMarkBytes = value;
  }
}

function getHighWaterMark(state, options, duplexKey: Key, isDuplex: boolean): number {
  const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!NumberIsInteger(hwm) || hwm < 0) {
      const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
      throw __intrinsic__makeErrorWithCode(119, name, hwm);
    }
    return MathFloor(hwm);
  }

  // Default value
  return getDefaultHighWaterMark(state.objectMode);
}

$ = {
  getHighWaterMark,
  getDefaultHighWaterMark,
  setDefaultHighWaterMark,
};
;$$EXPORT$$($).$$EXPORT_END$$;
