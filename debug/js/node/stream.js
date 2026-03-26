(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_STREAM === '1')
  || (env.DEBUG_NODE_STREAM === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[stream]\x1b[0m' : '[stream]'), ...args);
} : () => {};
// build/debug/tmp_modules/node/stream.ts
var $;
var exports = @getInternalField(@internalModuleRegistry, 40) || @createInternalModuleById(40);
$debug_log("node:stream loaded");
exports.eos = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
$ = exports;
return $})
