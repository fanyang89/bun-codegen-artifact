(function (){"use strict";
let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[internal:assert/myers_diff] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/internal/assert/myers_diff.ts
var $;
var colors = @getInternalField(@internalModuleRegistry, 64) || @createInternalModuleById(64);
var kNopLinesToCollapse = 5;
var { myersDiff } = @lazy(2);
function printSimpleMyersDiff(diff) {
  let message = "";
  for (let diffIdx = diff.length - 1;diffIdx >= 0; diffIdx--) {
    let { kind, value } = diff[diffIdx];
    if (typeof value === "number") {
      value = @String.fromCharCode(value);
    }
    switch (kind) {
      case 0 /* Insert */:
        message += `${colors.green}${value}${colors.white}`;
        break;
      case 1 /* Delete */:
        message += `${colors.red}${value}${colors.white}`;
        break;
      case 2 /* Equal */:
        message += `${colors.white}${value}${colors.white}`;
        break;
      default:
        @throwTypeError(`Invalid diff operation kind: ${kind}`);
    }
  }
  return `
${message}`;
}
function printMyersDiff(diff, _simple = false) {
  let message = "";
  let skipped = false;
  let nopCount = 0;
  for (let diffIdx = diff.length - 1;diffIdx >= 0; diffIdx--) {
    const { kind, value } = diff[diffIdx];
    $assert(typeof value !== "number", 'typeof value !== "number"', "printMyersDiff is only called for line diffs, which never return numeric char code values.");
    const previousType = diffIdx < diff.length - 1 ? diff[diffIdx + 1].kind : null;
    const typeChanged = previousType && kind !== previousType;
    if (typeChanged && previousType === 2 /* Equal */) {
      if (nopCount === kNopLinesToCollapse + 1) {
        message += `${colors.white}  ${diff[diffIdx + 1].value}
`;
      } else if (nopCount === kNopLinesToCollapse + 2) {
        message += `${colors.white}  ${diff[diffIdx + 2].value}
`;
        message += `${colors.white}  ${diff[diffIdx + 1].value}
`;
      }
      if (nopCount >= kNopLinesToCollapse + 3) {
        message += `${colors.blue}...${colors.white}
`;
        message += `${colors.white}  ${diff[diffIdx + 1].value}
`;
        skipped = true;
      }
      nopCount = 0;
    }
    switch (kind) {
      case 0 /* Insert */:
        message += `${colors.green}+${colors.white} ${value}
`;
        break;
      case 1 /* Delete */:
        message += `${colors.red}-${colors.white} ${value}
`;
        break;
      case 2 /* Equal */:
        if (nopCount < kNopLinesToCollapse) {
          message += `${colors.white}  ${value}
`;
        }
        nopCount++;
        break;
      default:
        @throwTypeError(`Invalid diff operation kind: ${kind}`);
    }
  }
  message = message.trimEnd();
  return { message: `
${message}`, skipped };
}
$ = { myersDiff, printMyersDiff, printSimpleMyersDiff };
return $})
