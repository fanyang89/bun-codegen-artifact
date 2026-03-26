// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/assert/myers_diff.ts


/// <reference path="../../builtins.d.ts" />
"use strict";

const colors = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 64/*internal/util/colors*/) || __intrinsic__createInternalModuleById(64/*internal/util/colors*/));

const enum Operation {
  Insert = 0,
  Delete = 1,
  Equal = 2,
}
interface Diff {
  kind: Operation;
  /**
   * When diffing chars (that is, `line == false`, this is a char code.)
   */
  value: string | number;
}

declare namespace Internal {
  export function myersDiff(
    actual: string[],
    expected: string[],
    checkCommaDisparity?: boolean,
    lines?: boolean,
  ): Diff[];
}

const kNopLinesToCollapse = 5;

const { myersDiff } = __intrinsic__lazy(2) as typeof Internal;

function printSimpleMyersDiff(diff: Diff[]) {
  let message = "";

  for (let diffIdx = diff.length - 1; diffIdx >= 0; diffIdx--) {
    let { kind, value } = diff[diffIdx];
    if (typeof value === "number") {
      value = String.fromCharCode(value);
    }
    switch (kind) {
      case Operation.Insert:
        message += `${colors.green}${value}${colors.white}`;
        break;
      case Operation.Delete:
        message += `${colors.red}${value}${colors.white}`;
        break;
      case Operation.Equal:
        message += `${colors.white}${value}${colors.white}`;
        break;
      default:
        __intrinsic__throwTypeError(`Invalid diff operation kind: ${kind}`); // should be unreachable
    }
  }

  return `\n${message}`;
}

function printMyersDiff(diff: Diff[], _simple = false) {
  let message = "";
  let skipped = false;
  let nopCount = 0;

  for (let diffIdx = diff.length - 1; diffIdx >= 0; diffIdx--) {
    const { kind, value } = diff[diffIdx];
    !(IS_BUN_DEVELOPMENT?$assert(
      typeof value !== "number","typeof value !== \"number\"",       "printMyersDiff is only called for line diffs, which never return numeric char code values.",
    ):void 0);
    const previousType = diffIdx < diff.length - 1 ? diff[diffIdx + 1].kind : null;
    const typeChanged = previousType && kind !== previousType;

    if (typeChanged && previousType === Operation.Equal) {
      // Avoid grouping if only one line would have been grouped otherwise
      if (nopCount === kNopLinesToCollapse + 1) {
        message += `${colors.white}  ${diff[diffIdx + 1].value}\n`;
      } else if (nopCount === kNopLinesToCollapse + 2) {
        message += `${colors.white}  ${diff[diffIdx + 2].value}\n`;
        message += `${colors.white}  ${diff[diffIdx + 1].value}\n`;
      }
      if (nopCount >= kNopLinesToCollapse + 3) {
        message += `${colors.blue}...${colors.white}\n`;
        message += `${colors.white}  ${diff[diffIdx + 1].value}\n`;
        skipped = true;
      }
      nopCount = 0;
    }

    switch (kind) {
      case Operation.Insert:
        message += `${colors.green}+${colors.white} ${value}\n`;
        break;
      case Operation.Delete:
        message += `${colors.red}-${colors.white} ${value}\n`;
        break;
      case Operation.Equal:
        if (nopCount < kNopLinesToCollapse) {
          message += `${colors.white}  ${value}\n`;
        }
        nopCount++;
        break;
      default:
        __intrinsic__throwTypeError(`Invalid diff operation kind: ${kind}`); // should be unreachable
    }
  }

  message = message.trimEnd();

  return { message: `\n${message}`, skipped };
}

$ = { myersDiff, printMyersDiff, printSimpleMyersDiff };
;$$EXPORT$$($).$$EXPORT_END$$;
