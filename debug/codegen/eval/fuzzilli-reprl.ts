// @bun
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = import.meta.require;

// src/js/eval/fuzzilli-reprl.ts
var require_fuzzilli_reprl = __commonJS(() => {
  var REPRL_CRFD = 100;
  var REPRL_CWFD = 101;
  var REPRL_DRFD = 102;
  var fs = __require("fs");
  globalThis.require = __require;
  globalThis.__dirname = "/";
  globalThis.__filename = "/fuzzilli.js";
  try {
    fs.fstatSync(REPRL_CRFD);
  } catch {
    console.error("ERROR: REPRL file descriptors not available. Must run under Fuzzilli.");
    process.exit(1);
  }
  fs.writeSync(REPRL_CWFD, Buffer.from("HELO"));
  var response = Buffer.alloc(4);
  var responseBytes = fs.readSync(REPRL_CRFD, response, 0, 4, null);
  if (responseBytes !== 4) {
    throw new Error(`REPRL handshake failed: expected 4 bytes, got ${responseBytes}`);
  }
  while (true) {
    const cmd = Buffer.alloc(4);
    const cmd_n = fs.readSync(REPRL_CRFD, cmd, 0, 4, null);
    if (cmd_n === 0) {
      break;
    }
    if (cmd_n !== 4 || cmd.toString() !== "exec") {
      throw new Error(`Invalid REPRL command: expected 'exec', got ${cmd.toString()}`);
    }
    const size_bytes = Buffer.alloc(8);
    fs.readSync(REPRL_CRFD, size_bytes, 0, 8, null);
    const script_size = Number(size_bytes.readBigUInt64LE(0));
    const script_data = Buffer.alloc(script_size);
    let total_read = 0;
    while (total_read < script_size) {
      const n = fs.readSync(REPRL_DRFD, script_data, total_read, script_size - total_read, null);
      if (n === 0)
        break;
      total_read += n;
    }
    const script = script_data.toString("utf8");
    let exit_code = 0;
    try {
      (0, eval)(script);
    } catch (_e) {
      console.log(`uncaught:${_e}`);
      exit_code = 1;
    }
    const status = exit_code << 8;
    const status_bytes = Buffer.alloc(4);
    status_bytes.writeUInt32LE(status, 0);
    fs.writeSync(REPRL_CWFD, status_bytes);
    resetCoverage();
  }
});
export default require_fuzzilli_reprl();
