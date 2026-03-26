(function (){"use strict";// build/debug/tmp_modules/node/readline.ts
var $;
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var { StringDecoder } = @getInternalField(@internalModuleRegistry, 143) || @createInternalModuleById(143);
var { promisify } = @getInternalField(@internalModuleRegistry, 31) || @createInternalModuleById(31);
var { SafeStringIterator } = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var {
  validateFunction,
  validateAbortSignal,
  validateArray,
  validateString,
  validateBoolean,
  validateInteger,
  validateUint32,
  validateNumber
} = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var internalGetStringWidth = @lazy(20);
var PromiseReject = @Promise.@reject;
var isWritable;
var { inspect } = Bun;
var debug = process.env.BUN_JS_DEBUG ? console.log : () => {};
var SymbolAsyncIterator = Symbol.asyncIterator;
var SymbolFor = Symbol.for;
var ArrayFrom = @Array.from;
var ArrayPrototypeFilter = @Array.prototype.filter;
var ArrayPrototypeSort = @Array.prototype.sort;
var ArrayPrototypeIndexOf = @Array.prototype.indexOf;
var ArrayPrototypeJoin = @Array.prototype.join;
var ArrayPrototypeMap = @Array.prototype.map;
var ArrayPrototypePop = @Array.prototype.pop;
var ArrayPrototypePush = @Array.prototype.push;
var ArrayPrototypeSlice = @Array.prototype.slice;
var ArrayPrototypeSplice = @Array.prototype.splice;
var ArrayPrototypeReverse = @Array.prototype.reverse;
var ArrayPrototypeShift = @Array.prototype.shift;
var ArrayPrototypeUnshift = @Array.prototype.unshift;
var RegExpPrototypeExec = @RegExp.prototype.exec;
var StringFromCharCode = @String.fromCharCode;
var StringPrototypeCharCodeAt = @String.prototype.charCodeAt;
var StringPrototypeCodePointAt = @String.prototype.codePointAt;
var StringPrototypeSlice = @String.prototype.slice;
var StringPrototypeToLowerCase = @String.prototype.toLowerCase;
var StringPrototypeEndsWith = @String.prototype.endsWith;
var StringPrototypeRepeat = @String.prototype.repeat;
var StringPrototypeStartsWith = @String.prototype.startsWith;
var StringPrototypeTrim = @String.prototype.trim;
var NumberIsNaN = Number.isNaN;
var NumberIsFinite = Number.isFinite;
var MathCeil = Math.ceil;
var MathFloor = Math.floor;
var MathMax = Math.max;
var DateNow = Date.now;
var ObjectDefineProperties = Object.defineProperties;
var ObjectFreeze = Object.freeze;
var ObjectCreate = Object.create;
var getStringWidth = function getStringWidth2(str, removeControlChars = true) {
  return internalGetStringWidth(str, removeControlChars);
};
var stripANSI = Bun.stripANSI;
function stripVTControlCharacters(str) {
  validateString(str, "str");
  return stripANSI(str);
}
var kUTF16SurrogateThreshold = 65536;
var kEscape = "\x1B";
var kSubstringSearch = Symbol("kSubstringSearch");
function CSI(strings, ...args) {
  var ret = `${kEscape}[`;
  for (var n = 0;n < strings.length; n++) {
    ret += strings[n];
    if (n < args.length)
      ret += args[n];
  }
  return ret;
}
var kClearLine;
var kClearScreenDown;
var kClearToLineBeginning;
var kClearToLineEnd;
CSI.kEscape = kEscape;
CSI.kClearLine = kClearLine = CSI`2K`;
CSI.kClearScreenDown = kClearScreenDown = CSI`0J`;
CSI.kClearToLineBeginning = kClearToLineBeginning = CSI`1K`;
CSI.kClearToLineEnd = kClearToLineEnd = CSI`0K`;
function charLengthLeft(str, i) {
  if (i <= 0)
    return 0;
  if (i > 1 && StringPrototypeCodePointAt.@call(str, i - 2) >= kUTF16SurrogateThreshold || StringPrototypeCodePointAt.@call(str, i - 1) >= kUTF16SurrogateThreshold) {
    return 2;
  }
  return 1;
}
function charLengthAt(str, i) {
  if (str.length <= i) {
    return 1;
  }
  return StringPrototypeCodePointAt.@call(str, i) >= kUTF16SurrogateThreshold ? 2 : 1;
}
function* emitKeys(stream) {
  while (true) {
    let ch = yield;
    let s = ch;
    let escaped = false;
    const key = {
      sequence: null,
      name: @undefined,
      ctrl: false,
      meta: false,
      shift: false
    };
    if (ch === kEscape) {
      escaped = true;
      s += ch = yield;
      if (ch === kEscape) {
        s += ch = yield;
      }
    }
    if (escaped && (ch === "O" || ch === "[")) {
      let code = ch;
      let modifier = 0;
      if (ch === "O") {
        s += ch = yield;
        if (ch >= "0" && ch <= "9") {
          modifier = (ch >> 0) - 1;
          s += ch = yield;
        }
        code += ch;
      } else if (ch === "[") {
        s += ch = yield;
        if (ch === "[") {
          code += ch;
          s += ch = yield;
        }
        const cmdStart = s.length - 1;
        if (ch >= "0" && ch <= "9") {
          s += ch = yield;
          if (ch >= "0" && ch <= "9") {
            s += ch = yield;
            if (ch >= "0" && ch <= "9") {
              s += ch = yield;
            }
          }
        }
        if (ch === ";") {
          s += ch = yield;
          if (ch >= "0" && ch <= "9") {
            s += yield;
          }
        }
        const cmd = StringPrototypeSlice.@call(s, cmdStart);
        let match;
        if (match = RegExpPrototypeExec.@call(/^(?:(\d\d?)(?:;(\d))?([~^$])|(\d{3}~))$/, cmd)) {
          if (match[4]) {
            code += match[4];
          } else {
            code += match[1] + match[3];
            modifier = (match[2] || 1) - 1;
          }
        } else if (match = RegExpPrototypeExec.@call(/^((\d;)?(\d))?([A-Za-z])$/, cmd)) {
          code += match[4];
          modifier = (match[3] || 1) - 1;
        } else {
          code += cmd;
        }
      }
      key.ctrl = !!(modifier & 4);
      key.meta = !!(modifier & 10);
      key.shift = !!(modifier & 1);
      key.code = code;
      switch (code) {
        case "[P":
          key.name = "f1";
          break;
        case "[Q":
          key.name = "f2";
          break;
        case "[R":
          key.name = "f3";
          break;
        case "[S":
          key.name = "f4";
          break;
        case "OP":
          key.name = "f1";
          break;
        case "OQ":
          key.name = "f2";
          break;
        case "OR":
          key.name = "f3";
          break;
        case "OS":
          key.name = "f4";
          break;
        case "[11~":
          key.name = "f1";
          break;
        case "[12~":
          key.name = "f2";
          break;
        case "[13~":
          key.name = "f3";
          break;
        case "[14~":
          key.name = "f4";
          break;
        case "[200~":
          key.name = "paste-start";
          break;
        case "[201~":
          key.name = "paste-end";
          break;
        case "[[A":
          key.name = "f1";
          break;
        case "[[B":
          key.name = "f2";
          break;
        case "[[C":
          key.name = "f3";
          break;
        case "[[D":
          key.name = "f4";
          break;
        case "[[E":
          key.name = "f5";
          break;
        case "[15~":
          key.name = "f5";
          break;
        case "[17~":
          key.name = "f6";
          break;
        case "[18~":
          key.name = "f7";
          break;
        case "[19~":
          key.name = "f8";
          break;
        case "[20~":
          key.name = "f9";
          break;
        case "[21~":
          key.name = "f10";
          break;
        case "[23~":
          key.name = "f11";
          break;
        case "[24~":
          key.name = "f12";
          break;
        case "[A":
          key.name = "up";
          break;
        case "[B":
          key.name = "down";
          break;
        case "[C":
          key.name = "right";
          break;
        case "[D":
          key.name = "left";
          break;
        case "[E":
          key.name = "clear";
          break;
        case "[F":
          key.name = "end";
          break;
        case "[H":
          key.name = "home";
          break;
        case "OA":
          key.name = "up";
          break;
        case "OB":
          key.name = "down";
          break;
        case "OC":
          key.name = "right";
          break;
        case "OD":
          key.name = "left";
          break;
        case "OE":
          key.name = "clear";
          break;
        case "OF":
          key.name = "end";
          break;
        case "OH":
          key.name = "home";
          break;
        case "[1~":
          key.name = "home";
          break;
        case "[2~":
          key.name = "insert";
          break;
        case "[3~":
          key.name = "delete";
          break;
        case "[4~":
          key.name = "end";
          break;
        case "[5~":
          key.name = "pageup";
          break;
        case "[6~":
          key.name = "pagedown";
          break;
        case "[[5~":
          key.name = "pageup";
          break;
        case "[[6~":
          key.name = "pagedown";
          break;
        case "[7~":
          key.name = "home";
          break;
        case "[8~":
          key.name = "end";
          break;
        case "[a":
          key.name = "up";
          key.shift = true;
          break;
        case "[b":
          key.name = "down";
          key.shift = true;
          break;
        case "[c":
          key.name = "right";
          key.shift = true;
          break;
        case "[d":
          key.name = "left";
          key.shift = true;
          break;
        case "[e":
          key.name = "clear";
          key.shift = true;
          break;
        case "[2$":
          key.name = "insert";
          key.shift = true;
          break;
        case "[3$":
          key.name = "delete";
          key.shift = true;
          break;
        case "[5$":
          key.name = "pageup";
          key.shift = true;
          break;
        case "[6$":
          key.name = "pagedown";
          key.shift = true;
          break;
        case "[7$":
          key.name = "home";
          key.shift = true;
          break;
        case "[8$":
          key.name = "end";
          key.shift = true;
          break;
        case "Oa":
          key.name = "up";
          key.ctrl = true;
          break;
        case "Ob":
          key.name = "down";
          key.ctrl = true;
          break;
        case "Oc":
          key.name = "right";
          key.ctrl = true;
          break;
        case "Od":
          key.name = "left";
          key.ctrl = true;
          break;
        case "Oe":
          key.name = "clear";
          key.ctrl = true;
          break;
        case "[2^":
          key.name = "insert";
          key.ctrl = true;
          break;
        case "[3^":
          key.name = "delete";
          key.ctrl = true;
          break;
        case "[5^":
          key.name = "pageup";
          key.ctrl = true;
          break;
        case "[6^":
          key.name = "pagedown";
          key.ctrl = true;
          break;
        case "[7^":
          key.name = "home";
          key.ctrl = true;
          break;
        case "[8^":
          key.name = "end";
          key.ctrl = true;
          break;
        case "[Z":
          key.name = "tab";
          key.shift = true;
          break;
        default:
          key.name = "undefined";
          break;
      }
    } else if (ch === "\r") {
      key.name = "return";
      key.meta = escaped;
    } else if (ch === `
`) {
      key.name = "enter";
      key.meta = escaped;
    } else if (ch === "\t") {
      key.name = "tab";
      key.meta = escaped;
    } else if (ch === "\b" || ch === "\x7F") {
      key.name = "backspace";
      key.meta = escaped;
    } else if (ch === kEscape) {
      key.name = "escape";
      key.meta = escaped;
    } else if (ch === " ") {
      key.name = "space";
      key.meta = escaped;
    } else if (!escaped && ch <= "\x1A") {
      key.name = StringFromCharCode(StringPrototypeCharCodeAt.@call(ch, 0) + StringPrototypeCharCodeAt.@call("a", 0) - 1);
      key.ctrl = true;
    } else if (RegExpPrototypeExec.@call(/^[0-9A-Za-z]$/, ch) !== null) {
      key.name = StringPrototypeToLowerCase.@call(ch);
      key.shift = RegExpPrototypeExec.@call(/^[A-Z]$/, ch) !== null;
      key.meta = escaped;
    } else if (escaped) {
      key.name = ch.length ? @undefined : "escape";
      key.meta = true;
    }
    key.sequence = s;
    if (s.length !== 0 && (key.name !== @undefined || escaped)) {
      stream.emit("keypress", escaped ? @undefined : s, key);
    } else if (charLengthAt(s, 0) === s.length) {
      stream.emit("keypress", s, key);
    }
  }
}
function commonPrefix(strings) {
  if (strings.length === 0) {
    return "";
  }
  if (strings.length === 1) {
    return strings[0];
  }
  var sorted = ArrayPrototypeSort.@call(ArrayPrototypeSlice.@call(strings));
  var min = sorted[0];
  var max = sorted[sorted.length - 1];
  for (var i = 0;i < min.length; i++) {
    if (min[i] !== max[i]) {
      return StringPrototypeSlice.@call(min, 0, i);
    }
  }
  return min;
}
function cursorTo(stream, x, y, callback) {
  if (callback !== @undefined) {
    validateFunction(callback, "callback");
  }
  if (typeof y === "function") {
    callback = y;
    y = @undefined;
  }
  if (NumberIsNaN(x))
    throw @makeErrorWithCode(119, "x", x);
  if (NumberIsNaN(y))
    throw @makeErrorWithCode(119, "y", y);
  if (stream == null || typeof x !== "number" && typeof y !== "number") {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  if (typeof x !== "number")
    throw @makeErrorWithCode(122);
  var data = typeof y !== "number" ? CSI`${x + 1}G` : CSI`${y + 1};${x + 1}H`;
  return stream.write(data, callback);
}
function moveCursor(stream, dx, dy, callback) {
  if (callback !== @undefined) {
    validateFunction(callback, "callback");
  }
  if (stream == null || !(dx || dy)) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  var data = "";
  if (dx < 0) {
    data += CSI`${-dx}D`;
  } else if (dx > 0) {
    data += CSI`${dx}C`;
  }
  if (dy < 0) {
    data += CSI`${-dy}A`;
  } else if (dy > 0) {
    data += CSI`${dy}B`;
  }
  return stream.write(data, callback);
}
function clearLine(stream, dir, callback) {
  if (callback !== @undefined) {
    validateFunction(callback, "callback");
  }
  if (stream === null || stream === @undefined) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  var type = dir < 0 ? kClearToLineBeginning : dir > 0 ? kClearToLineEnd : kClearLine;
  return stream.write(type, callback);
}
function clearScreenDown(stream, callback) {
  if (callback !== @undefined) {
    validateFunction(callback, "callback");
  }
  if (stream === null || stream === @undefined) {
    if (typeof callback === "function")
      process.nextTick(callback, null);
    return true;
  }
  return stream.write(kClearScreenDown, callback);
}
var KEYPRESS_DECODER = Symbol("keypress-decoder");
var ESCAPE_DECODER = Symbol("escape-decoder");
var ESCAPE_CODE_TIMEOUT = 500;
function emitKeypressEvents(stream, iface = {}) {
  if (stream[KEYPRESS_DECODER])
    return;
  stream[KEYPRESS_DECODER] = new StringDecoder("utf8");
  stream[ESCAPE_DECODER] = emitKeys(stream);
  stream[ESCAPE_DECODER].next();
  var triggerEscape = () => stream[ESCAPE_DECODER].next("");
  var { escapeCodeTimeout = ESCAPE_CODE_TIMEOUT } = iface;
  var timeoutId;
  function onData(input) {
    if (stream.listenerCount("keypress") > 0) {
      var string = stream[KEYPRESS_DECODER].write(input);
      if (string) {
        clearTimeout(timeoutId);
        iface[kSawKeyPress] = charLengthAt(string, 0) === string.length;
        iface.isCompletionEnabled = false;
        var length = 0;
        for (var character of new SafeStringIterator(string)) {
          length += character.length;
          if (length === string.length) {
            iface.isCompletionEnabled = true;
          }
          try {
            stream[ESCAPE_DECODER].next(character);
            if (length === string.length && character === kEscape) {
              timeoutId = setTimeout(triggerEscape, escapeCodeTimeout);
            }
          } catch (err) {
            stream[ESCAPE_DECODER] = emitKeys(stream);
            stream[ESCAPE_DECODER].next();
            throw err;
          }
        }
      }
    } else {
      stream.removeListener("data", onData);
      stream.on("newListener", onNewListener);
    }
  }
  function onNewListener(event) {
    if (event === "keypress") {
      stream.on("data", onData);
      stream.removeListener("newListener", onNewListener);
    }
  }
  if (stream.listenerCount("keypress") > 0) {
    stream.on("data", onData);
  } else {
    stream.on("newListener", onNewListener);
  }
}
var kEmptyObject = ObjectFreeze(ObjectCreate(null));
var kHistorySize = 30;
var kMaxUndoRedoStackSize = 2048;
var kMincrlfDelay = 100;
var lineEnding = /\r?\n|\r(?!\n)/g;
var kMaxLengthOfKillRing = 32;
var kLineObjectStream = Symbol("line object stream");
var kQuestionCancel = Symbol("kQuestionCancel");
var kQuestion = Symbol("kQuestion");
var kAddHistory = Symbol("_addHistory");
var kBeforeEdit = Symbol("_beforeEdit");
var kDecoder = Symbol("_decoder");
var kDeleteLeft = Symbol("_deleteLeft");
var kDeleteLineLeft = Symbol("_deleteLineLeft");
var kDeleteLineRight = Symbol("_deleteLineRight");
var kDeleteRight = Symbol("_deleteRight");
var kDeleteWordLeft = Symbol("_deleteWordLeft");
var kDeleteWordRight = Symbol("_deleteWordRight");
var kGetDisplayPos = Symbol("_getDisplayPos");
var kHistoryNext = Symbol("_historyNext");
var kHistoryPrev = Symbol("_historyPrev");
var kInsertString = Symbol("_insertString");
var kLine = Symbol("_line");
var kLine_buffer = Symbol("_line_buffer");
var kKillRing = Symbol("_killRing");
var kKillRingCursor = Symbol("_killRingCursor");
var kMoveCursor = Symbol("_moveCursor");
var kNormalWrite = Symbol("_normalWrite");
var kOldPrompt = Symbol("_oldPrompt");
var kOnLine = Symbol("_onLine");
var kPreviousKey = Symbol("_previousKey");
var kPrompt = Symbol("_prompt");
var kPushToKillRing = Symbol("_pushToKillRing");
var kPushToUndoStack = Symbol("_pushToUndoStack");
var kQuestionCallback = Symbol("_questionCallback");
var kRedo = Symbol("_redo");
var kRedoStack = Symbol("_redoStack");
var kRefreshLine = Symbol("_refreshLine");
var kSawKeyPress = Symbol("_sawKeyPress");
var kSawReturnAt = Symbol("_sawReturnAt");
var kSetRawMode = Symbol("_setRawMode");
var kTabComplete = Symbol("_tabComplete");
var kTabCompleter = Symbol("_tabCompleter");
var kTtyWrite = Symbol("_ttyWrite");
var kUndo = Symbol("_undo");
var kUndoStack = Symbol("_undoStack");
var kWordLeft = Symbol("_wordLeft");
var kWordRight = Symbol("_wordRight");
var kWriteToOutput = Symbol("_writeToOutput");
var kYank = Symbol("_yank");
var kYanking = Symbol("_yanking");
var kYankPop = Symbol("_yankPop");
var kFirstEventParam = SymbolFor("nodejs.kFirstEventParam");
var kOnSelfCloseWithTerminal = Symbol("_onSelfCloseWithTerminal");
var kOnSelfCloseWithoutTerminal = Symbol("_onSelfCloseWithoutTerminal");
var kOnKeyPress = Symbol("_onKeyPress");
var kOnError = Symbol("_onError");
var kOnData = Symbol("_onData");
var kOnEnd = Symbol("_onEnd");
var kOnTermEnd = Symbol("_onTermEnd");
var kOnResize = Symbol("_onResize");
function onSelfCloseWithTerminal() {
  var input = this.input;
  var output = this.output;
  if (!input)
    throw new Error("Input not set, invalid state for readline!");
  input.removeListener("keypress", this[kOnKeyPress]);
  input.removeListener("error", this[kOnError]);
  input.removeListener("end", this[kOnTermEnd]);
  if (output !== null && output !== @undefined) {
    output.removeListener("resize", this[kOnResize]);
  }
}
function onSelfCloseWithoutTerminal() {
  var input = this.input;
  if (!input)
    throw new Error("Input not set, invalid state for readline!");
  input.removeListener("data", this[kOnData]);
  input.removeListener("error", this[kOnError]);
  input.removeListener("end", this[kOnEnd]);
}
function onError(err) {
  this.emit("error", err);
}
function onData(data) {
  debug("onData");
  this[kNormalWrite](data);
}
function onEnd() {
  debug("onEnd");
  if (typeof this[kLine_buffer] === "string" && this[kLine_buffer].length > 0) {
    this.emit("line", this[kLine_buffer]);
  }
  this.close();
}
function onTermEnd() {
  debug("onTermEnd");
  if (typeof this.line === "string" && this.line.length > 0) {
    this.emit("line", this.line);
  }
  this.close();
}
function onKeyPress(s, key) {
  this[kTtyWrite](s, key);
  if (key && key.sequence) {
    var ch = StringPrototypeCodePointAt.@call(key.sequence, 0);
    if (ch >= 55296 && ch <= 57343)
      this[kRefreshLine]();
  }
}
function onResize() {
  this[kRefreshLine]();
}
function InterfaceConstructor(input, output, completer, terminal) {
  if (!(this instanceof InterfaceConstructor)) {
    return new InterfaceConstructor(input, output, completer, terminal);
  }
  EventEmitter.@call(this);
  this[kOnSelfCloseWithoutTerminal] = onSelfCloseWithoutTerminal.bind(this);
  this[kOnSelfCloseWithTerminal] = onSelfCloseWithTerminal.bind(this);
  this[kOnError] = onError.bind(this);
  this[kOnData] = onData.bind(this);
  this[kOnEnd] = onEnd.bind(this);
  this[kOnTermEnd] = onTermEnd.bind(this);
  this[kOnKeyPress] = onKeyPress.bind(this);
  this[kOnResize] = onResize.bind(this);
  this[kSawReturnAt] = 0;
  this.isCompletionEnabled = true;
  this[kSawKeyPress] = false;
  this[kPreviousKey] = null;
  this.escapeCodeTimeout = ESCAPE_CODE_TIMEOUT;
  this.tabSize = 8;
  var history;
  var historySize;
  var removeHistoryDuplicates = false;
  var crlfDelay;
  var prompt = "> ";
  var signal;
  if (input?.input) {
    output = input.output;
    completer = input.completer;
    terminal = input.terminal;
    history = input.history;
    historySize = input.historySize;
    signal = input.signal;
    var tabSize = input.tabSize;
    if (tabSize !== @undefined) {
      validateUint32(tabSize, "tabSize", true);
      this.tabSize = tabSize;
    }
    removeHistoryDuplicates = input.removeHistoryDuplicates;
    var inputPrompt = input.prompt;
    if (inputPrompt !== @undefined) {
      prompt = inputPrompt;
    }
    var inputEscapeCodeTimeout = input.escapeCodeTimeout;
    if (inputEscapeCodeTimeout !== @undefined) {
      if (NumberIsFinite(inputEscapeCodeTimeout)) {
        this.escapeCodeTimeout = inputEscapeCodeTimeout;
      } else {
        throw @makeErrorWithCode(119, "input.escapeCodeTimeout", this.escapeCodeTimeout);
      }
    }
    if (signal) {
      validateAbortSignal(signal, "options.signal");
    }
    crlfDelay = input.crlfDelay;
    input = input.input;
  }
  if (completer !== @undefined && typeof completer !== "function") {
    throw @makeErrorWithCode(119, "completer", completer);
  }
  if (history === @undefined) {
    history = [];
  } else {
    validateArray(history, "history");
  }
  if (historySize === @undefined) {
    historySize = kHistorySize;
  }
  validateNumber(historySize, "historySize", 0);
  if (terminal === @undefined && !(output == null)) {
    terminal = !!output.isTTY;
  }
  this.line = "";
  this[kSubstringSearch] = null;
  this.output = output;
  this.input = input;
  this[kUndoStack] = [];
  this[kRedoStack] = [];
  this.history = history;
  this.historySize = historySize;
  this[kKillRing] = [];
  this[kKillRingCursor] = 0;
  this.removeHistoryDuplicates = !!removeHistoryDuplicates;
  this.crlfDelay = crlfDelay ? MathMax(kMincrlfDelay, crlfDelay) : kMincrlfDelay;
  this.completer = completer;
  this.setPrompt(prompt);
  this.terminal = !!terminal;
  this[kLineObjectStream] = @undefined;
  input.on("error", this[kOnError]);
  if (!this.terminal) {
    this[kDecoder] = new StringDecoder("utf8");
    input.on("data", this[kOnData]);
    input.on("end", this[kOnEnd]);
    this.once("close", this[kOnSelfCloseWithoutTerminal]);
  } else {
    emitKeypressEvents(input, this);
    input.on("keypress", this[kOnKeyPress]);
    input.on("end", this[kOnTermEnd]);
    this[kSetRawMode](true);
    this.terminal = true;
    this.cursor = 0;
    this.historyIndex = -1;
    if (output !== null && output !== @undefined)
      output.on("resize", this[kOnResize]);
    this.once("close", this[kOnSelfCloseWithTerminal]);
  }
  if (signal) {
    var onAborted = (() => this.close()).bind(this);
    if (signal.aborted) {
      process.nextTick(onAborted);
    } else {
      signal.addEventListener("abort", onAborted, { once: true });
      this.once("close", () => signal.removeEventListener("abort", onAborted));
    }
  }
  this.line = "";
  input.resume();
}
@toClass(InterfaceConstructor, "InterfaceConstructor", EventEmitter);
var _Interface = class Interface extends InterfaceConstructor {
  constructor(input, output, completer, terminal) {
    super(input, output, completer, terminal);
  }
  [Symbol.dispose]() {
    this.close();
  }
  get columns() {
    var output = this.output;
    if (output && output.columns)
      return output.columns;
    return @Infinity;
  }
  setPrompt(prompt) {
    this[kPrompt] = prompt;
  }
  getPrompt() {
    return this[kPrompt];
  }
  [kSetRawMode](mode) {
    const wasInRawMode = this.input.isRaw;
    var setRawMode = this.input.setRawMode;
    if (typeof setRawMode === "function") {
      setRawMode.@call(this.input, mode);
    }
    return wasInRawMode;
  }
  prompt(preserveCursor) {
    if (this.paused)
      this.resume();
    if (this.terminal && process.env.TERM !== "dumb") {
      if (!preserveCursor)
        this.cursor = 0;
      this[kRefreshLine]();
    } else {
      this[kWriteToOutput](this[kPrompt]);
    }
  }
  [kQuestion](query, cb) {
    if (this.closed) {
      throw @makeErrorWithCode(257, "readline");
    }
    if (this[kQuestionCallback]) {
      this.prompt();
    } else {
      this[kOldPrompt] = this[kPrompt];
      this.setPrompt(query);
      this[kQuestionCallback] = cb;
      this.prompt();
    }
  }
  [kOnLine](line) {
    if (this[kQuestionCallback]) {
      var cb = this[kQuestionCallback];
      this[kQuestionCallback] = null;
      this.setPrompt(this[kOldPrompt]);
      cb(line);
    } else {
      this.emit("line", line);
    }
  }
  [kBeforeEdit](oldText, oldCursor) {
    this[kPushToUndoStack](oldText, oldCursor);
  }
  [kQuestionCancel]() {
    if (this[kQuestionCallback]) {
      this[kQuestionCallback] = null;
      this.setPrompt(this[kOldPrompt]);
      this.clearLine();
    }
  }
  [kWriteToOutput](stringToWrite) {
    validateString(stringToWrite, "stringToWrite");
    if (this.output !== null && this.output !== @undefined) {
      this.output.write(stringToWrite);
    }
  }
  [kAddHistory]() {
    if (this.line.length === 0)
      return "";
    if (this.historySize === 0)
      return this.line;
    if (StringPrototypeTrim.@call(this.line).length === 0)
      return this.line;
    if (this.history.length === 0 || this.history[0] !== this.line) {
      if (this.removeHistoryDuplicates) {
        var dupIndex = ArrayPrototypeIndexOf.@call(this.history, this.line);
        if (dupIndex !== -1)
          ArrayPrototypeSplice.@call(this.history, dupIndex, 1);
      }
      ArrayPrototypeUnshift.@call(this.history, this.line);
      if (this.history.length > this.historySize)
        ArrayPrototypePop.@call(this.history);
    }
    this.historyIndex = -1;
    var line = this.history[0];
    this.emit("history", this.history);
    return line;
  }
  [kRefreshLine]() {
    var line = this[kPrompt] + this.line;
    var dispPos = this[kGetDisplayPos](line);
    var lineCols = dispPos.cols;
    var lineRows = dispPos.rows;
    var cursorPos = this.getCursorPos();
    var prevRows = this.prevRows || 0;
    if (prevRows > 0) {
      moveCursor(this.output, 0, -prevRows);
    }
    cursorTo(this.output, 0);
    clearScreenDown(this.output);
    this[kWriteToOutput](line);
    if (lineCols === 0) {
      this[kWriteToOutput](" ");
    }
    cursorTo(this.output, cursorPos.cols);
    var diff = lineRows - cursorPos.rows;
    if (diff > 0) {
      moveCursor(this.output, 0, -diff);
    }
    this.prevRows = cursorPos.rows;
  }
  close() {
    if (this.closed)
      return;
    this.pause();
    if (this.terminal) {
      this[kSetRawMode](false);
    }
    this.closed = true;
    this.emit("close");
  }
  pause() {
    if (this.paused)
      return;
    this.input.pause();
    this.paused = true;
    this.emit("pause");
    return this;
  }
  resume() {
    if (!this.paused)
      return;
    this.input.resume();
    this.paused = false;
    this.emit("resume");
    return this;
  }
  write(d, key) {
    if (this.paused)
      this.resume();
    if (this.terminal) {
      this[kTtyWrite](d, key);
    } else {
      this[kNormalWrite](d);
    }
  }
  [kNormalWrite](b) {
    if (b === @undefined) {
      return;
    }
    var string = this[kDecoder].write(b);
    if (this[kSawReturnAt] && DateNow() - this[kSawReturnAt] <= this.crlfDelay) {
      if (StringPrototypeCodePointAt.@call(string) === 10)
        string = StringPrototypeSlice.@call(string, 1);
      this[kSawReturnAt] = 0;
    }
    var newPartContainsEnding = RegExpPrototypeExec.@call(lineEnding, string);
    if (newPartContainsEnding !== null) {
      if (this[kLine_buffer]) {
        string = this[kLine_buffer] + string;
        this[kLine_buffer] = null;
        lineEnding.lastIndex = 0;
        newPartContainsEnding = RegExpPrototypeExec.@call(lineEnding, string);
      }
      this[kSawReturnAt] = StringPrototypeEndsWith.@call(string, "\r") ? DateNow() : 0;
      var indexes = [0, newPartContainsEnding.index, lineEnding.lastIndex];
      var nextMatch;
      while ((nextMatch = RegExpPrototypeExec.@call(lineEnding, string)) !== null) {
        ArrayPrototypePush.@call(indexes, nextMatch.index, lineEnding.lastIndex);
      }
      var lastIndex = indexes.length - 1;
      this[kLine_buffer] = StringPrototypeSlice.@call(string, indexes[lastIndex]);
      for (var i = 1;i < lastIndex; i += 2) {
        this[kOnLine](StringPrototypeSlice.@call(string, indexes[i - 1], indexes[i]));
      }
    } else if (string) {
      if (this[kLine_buffer]) {
        this[kLine_buffer] += string;
      } else {
        this[kLine_buffer] = string;
      }
    }
  }
  [kInsertString](c) {
    this[kBeforeEdit](this.line, this.cursor);
    if (this.cursor < this.line.length) {
      var beg = StringPrototypeSlice.@call(this.line, 0, this.cursor);
      var end = StringPrototypeSlice.@call(this.line, this.cursor, this.line.length);
      this.line = beg + c + end;
      this.cursor += c.length;
      this[kRefreshLine]();
    } else {
      var oldPos = this.getCursorPos();
      this.line += c;
      this.cursor += c.length;
      var newPos = this.getCursorPos();
      if (oldPos.rows < newPos.rows) {
        this[kRefreshLine]();
      } else {
        this[kWriteToOutput](c);
      }
    }
  }
  async[kTabComplete](lastKeypressWasTab) {
    this.pause();
    var string = StringPrototypeSlice.@call(this.line, 0, this.cursor);
    var value;
    try {
      value = await this.completer(string);
    } catch (err) {
      this[kWriteToOutput](`Tab completion error: ${inspect(err)}`);
      return;
    } finally {
      this.resume();
    }
    this[kTabCompleter](lastKeypressWasTab, value);
  }
  [kTabCompleter](lastKeypressWasTab, { 0: completions, 1: completeOn }) {
    if (!completions || completions.length === 0) {
      return;
    }
    var prefix = commonPrefix(ArrayPrototypeFilter.@call(completions, (e) => e !== ""));
    if (StringPrototypeStartsWith.@call(prefix, completeOn) && prefix.length > completeOn.length) {
      this[kInsertString](StringPrototypeSlice.@call(prefix, completeOn.length));
      return;
    } else if (!StringPrototypeStartsWith.@call(completeOn, prefix)) {
      this.line = StringPrototypeSlice.@call(this.line, 0, this.cursor - completeOn.length) + prefix + StringPrototypeSlice.@call(this.line, this.cursor, this.line.length);
      this.cursor = this.cursor - completeOn.length + prefix.length;
      this[kRefreshLine]();
      return;
    }
    if (!lastKeypressWasTab) {
      return;
    }
    this[kBeforeEdit](this.line, this.cursor);
    var completionsWidth = ArrayPrototypeMap.@call(completions, (e) => getStringWidth(e));
    var width = MathMax.@apply(null, completionsWidth) + 2;
    var maxColumns = MathFloor(this.columns / width) || 1;
    if (maxColumns === @Infinity) {
      maxColumns = 1;
    }
    var output = `\r
`;
    var lineIndex = 0;
    var whitespace = 0;
    for (var i = 0;i < completions.length; i++) {
      var completion = completions[i];
      if (completion === "" || lineIndex === maxColumns) {
        output += `\r
`;
        lineIndex = 0;
        whitespace = 0;
      } else {
        output += StringPrototypeRepeat.@call(" ", whitespace);
      }
      if (completion !== "") {
        output += completion;
        whitespace = width - completionsWidth[i];
        lineIndex++;
      } else {
        output += `\r
`;
      }
    }
    if (lineIndex !== 0) {
      output += `\r
\r
`;
    }
    this[kWriteToOutput](output);
    this[kRefreshLine]();
  }
  [kWordLeft]() {
    if (this.cursor > 0) {
      var leading = StringPrototypeSlice.@call(this.line, 0, this.cursor);
      var reversed = ArrayPrototypeJoin.@call(ArrayPrototypeReverse.@call(ArrayFrom(leading)), "");
      var match = RegExpPrototypeExec.@call(/^\s*(?:[^\w\s]+|\w+)?/, reversed);
      this[kMoveCursor](-match[0].length);
    }
  }
  [kWordRight]() {
    if (this.cursor < this.line.length) {
      var trailing = StringPrototypeSlice.@call(this.line, this.cursor);
      var match = RegExpPrototypeExec.@call(/^(?:\s+|[^\w\s]+|\w+)\s*/, trailing);
      this[kMoveCursor](match[0].length);
    }
  }
  [kDeleteLeft]() {
    if (this.cursor > 0 && this.line.length > 0) {
      this[kBeforeEdit](this.line, this.cursor);
      var charSize = charLengthLeft(this.line, this.cursor);
      this.line = StringPrototypeSlice.@call(this.line, 0, this.cursor - charSize) + StringPrototypeSlice.@call(this.line, this.cursor, this.line.length);
      this.cursor -= charSize;
      this[kRefreshLine]();
    }
  }
  [kDeleteRight]() {
    if (this.cursor < this.line.length) {
      this[kBeforeEdit](this.line, this.cursor);
      var charSize = charLengthAt(this.line, this.cursor);
      this.line = StringPrototypeSlice.@call(this.line, 0, this.cursor) + StringPrototypeSlice.@call(this.line, this.cursor + charSize, this.line.length);
      this[kRefreshLine]();
    }
  }
  [kDeleteWordLeft]() {
    if (this.cursor > 0) {
      this[kBeforeEdit](this.line, this.cursor);
      var leading = StringPrototypeSlice.@call(this.line, 0, this.cursor);
      var reversed = ArrayPrototypeJoin.@call(ArrayPrototypeReverse.@call(ArrayFrom(leading)), "");
      var match = RegExpPrototypeExec.@call(/^\s*(?:[^\w\s]+|\w+)?/, reversed);
      leading = StringPrototypeSlice.@call(leading, 0, leading.length - match[0].length);
      this.line = leading + StringPrototypeSlice.@call(this.line, this.cursor, this.line.length);
      this.cursor = leading.length;
      this[kRefreshLine]();
    }
  }
  [kDeleteWordRight]() {
    if (this.cursor < this.line.length) {
      this[kBeforeEdit](this.line, this.cursor);
      var trailing = StringPrototypeSlice.@call(this.line, this.cursor);
      var match = RegExpPrototypeExec.@call(/^(?:\s+|\W+|\w+)\s*/, trailing);
      this.line = StringPrototypeSlice.@call(this.line, 0, this.cursor) + StringPrototypeSlice.@call(trailing, match[0].length);
      this[kRefreshLine]();
    }
  }
  [kDeleteLineLeft]() {
    this[kBeforeEdit](this.line, this.cursor);
    var del = StringPrototypeSlice.@call(this.line, 0, this.cursor);
    this.line = StringPrototypeSlice.@call(this.line, this.cursor);
    this.cursor = 0;
    this[kPushToKillRing](del);
    this[kRefreshLine]();
  }
  [kDeleteLineRight]() {
    this[kBeforeEdit](this.line, this.cursor);
    var del = StringPrototypeSlice.@call(this.line, this.cursor);
    this.line = StringPrototypeSlice.@call(this.line, 0, this.cursor);
    this[kPushToKillRing](del);
    this[kRefreshLine]();
  }
  [kPushToKillRing](del) {
    if (!del || del === this[kKillRing][0])
      return;
    ArrayPrototypeUnshift.@call(this[kKillRing], del);
    this[kKillRingCursor] = 0;
    while (this[kKillRing].length > kMaxLengthOfKillRing)
      ArrayPrototypePop.@call(this[kKillRing]);
  }
  [kYank]() {
    if (this[kKillRing].length > 0) {
      this[kYanking] = true;
      this[kInsertString](this[kKillRing][this[kKillRingCursor]]);
    }
  }
  [kYankPop]() {
    if (!this[kYanking]) {
      return;
    }
    if (this[kKillRing].length > 1) {
      var lastYank = this[kKillRing][this[kKillRingCursor]];
      this[kKillRingCursor]++;
      if (this[kKillRingCursor] >= this[kKillRing].length) {
        this[kKillRingCursor] = 0;
      }
      var currentYank = this[kKillRing][this[kKillRingCursor]];
      var head = StringPrototypeSlice.@call(this.line, 0, this.cursor - lastYank.length);
      var tail = StringPrototypeSlice.@call(this.line, this.cursor);
      this.line = head + currentYank + tail;
      this.cursor = head.length + currentYank.length;
      this[kRefreshLine]();
    }
  }
  clearLine() {
    this[kMoveCursor](+@Infinity);
    this[kWriteToOutput](`\r
`);
    this.line = "";
    this.cursor = 0;
    this.prevRows = 0;
  }
  [kLine]() {
    var line = this[kAddHistory]();
    this[kUndoStack] = [];
    this[kRedoStack] = [];
    this.clearLine();
    this[kOnLine](line);
  }
  [kPushToUndoStack](text, cursor) {
    if (ArrayPrototypePush.@call(this[kUndoStack], { text, cursor }) > kMaxUndoRedoStackSize) {
      ArrayPrototypeShift.@call(this[kUndoStack]);
    }
  }
  [kUndo]() {
    if (this[kUndoStack].length <= 0)
      return;
    ArrayPrototypePush.@call(this[kRedoStack], {
      text: this.line,
      cursor: this.cursor
    });
    var entry = ArrayPrototypePop.@call(this[kUndoStack]);
    this.line = entry.text;
    this.cursor = entry.cursor;
    this[kRefreshLine]();
  }
  [kRedo]() {
    if (this[kRedoStack].length <= 0)
      return;
    ArrayPrototypePush.@call(this[kUndoStack], {
      text: this.line,
      cursor: this.cursor
    });
    var entry = ArrayPrototypePop.@call(this[kRedoStack]);
    this.line = entry.text;
    this.cursor = entry.cursor;
    this[kRefreshLine]();
  }
  [kHistoryNext]() {
    if (this.historyIndex >= 0) {
      this[kBeforeEdit](this.line, this.cursor);
      var search = this[kSubstringSearch] || "";
      var index = this.historyIndex - 1;
      while (index >= 0 && (!StringPrototypeStartsWith.@call(this.history[index], search) || this.line === this.history[index])) {
        index--;
      }
      if (index === -1) {
        this.line = search;
      } else {
        this.line = this.history[index];
      }
      this.historyIndex = index;
      this.cursor = this.line.length;
      this[kRefreshLine]();
    }
  }
  [kHistoryPrev]() {
    if (this.historyIndex < this.history.length && this.history.length) {
      this[kBeforeEdit](this.line, this.cursor);
      var search = this[kSubstringSearch] || "";
      var index = this.historyIndex + 1;
      while (index < this.history.length && (!StringPrototypeStartsWith.@call(this.history[index], search) || this.line === this.history[index])) {
        index++;
      }
      if (index === this.history.length) {
        this.line = search;
      } else {
        this.line = this.history[index];
      }
      this.historyIndex = index;
      this.cursor = this.line.length;
      this[kRefreshLine]();
    }
  }
  [kGetDisplayPos](str) {
    var offset = 0;
    var col = this.columns;
    var rows = 0;
    str = stripVTControlCharacters(str);
    for (var char of new SafeStringIterator(str)) {
      if (char === `
`) {
        rows += MathCeil(offset / col) || 1;
        offset = 0;
        continue;
      }
      if (char === "\t") {
        offset += this.tabSize - offset % this.tabSize;
        continue;
      }
      var width = getStringWidth(char, false);
      if (width === 0 || width === 1) {
        offset += width;
      } else {
        if ((offset + 1) % col === 0) {
          offset++;
        }
        offset += 2;
      }
    }
    var cols = offset % col;
    rows += (offset - cols) / col;
    return { cols, rows };
  }
  getCursorPos() {
    var strBeforeCursor = this[kPrompt] + StringPrototypeSlice.@call(this.line, 0, this.cursor);
    return this[kGetDisplayPos](strBeforeCursor);
  }
  [kMoveCursor](dx) {
    if (dx === 0) {
      return;
    }
    var oldPos = this.getCursorPos();
    this.cursor += dx;
    if (this.cursor < 0) {
      this.cursor = 0;
    } else if (this.cursor > this.line.length) {
      this.cursor = this.line.length;
    }
    var newPos = this.getCursorPos();
    if (oldPos.rows === newPos.rows) {
      var diffWidth = newPos.cols - oldPos.cols;
      moveCursor(this.output, diffWidth, 0);
    } else {
      this[kRefreshLine]();
    }
  }
  [kTtyWrite](s, key) {
    var previousKey = this[kPreviousKey];
    key = key || kEmptyObject;
    this[kPreviousKey] = key;
    var { name: keyName, meta: keyMeta, ctrl: keyCtrl, shift: keyShift, sequence: keySeq } = key;
    if (!keyMeta || keyName !== "y") {
      this[kYanking] = false;
    }
    if ((keyName === "up" || keyName === "down") && !keyCtrl && !keyMeta && !keyShift) {
      if (this[kSubstringSearch] === null) {
        this[kSubstringSearch] = StringPrototypeSlice.@call(this.line, 0, this.cursor);
      }
    } else if (this[kSubstringSearch] !== null) {
      this[kSubstringSearch] = null;
      if (this.history.length === this.historyIndex) {
        this.historyIndex = -1;
      }
    }
    if (typeof keySeq === "string") {
      switch (StringPrototypeCodePointAt.@call(keySeq, 0)) {
        case 31:
          this[kUndo]();
          return;
        case 30:
          this[kRedo]();
          return;
        default:
          break;
      }
    }
    if (keyName === "escape")
      return;
    if (keyCtrl && keyShift) {
      switch (keyName) {
        case "backspace":
          this[kDeleteLineLeft]();
          break;
        case "delete":
          this[kDeleteLineRight]();
          break;
      }
    } else if (keyCtrl) {
      switch (keyName) {
        case "c":
          if (this.listenerCount("SIGINT") > 0) {
            this.emit("SIGINT");
          } else {
            this.close();
          }
          break;
        case "h":
          this[kDeleteLeft]();
          break;
        case "d":
          if (this.cursor === 0 && this.line.length === 0) {
            this.close();
          } else if (this.cursor < this.line.length) {
            this[kDeleteRight]();
          }
          break;
        case "u":
          this[kDeleteLineLeft]();
          break;
        case "k":
          this[kDeleteLineRight]();
          break;
        case "a":
          this[kMoveCursor](-@Infinity);
          break;
        case "e":
          this[kMoveCursor](+@Infinity);
          break;
        case "b":
          this[kMoveCursor](-charLengthLeft(this.line, this.cursor));
          break;
        case "f":
          this[kMoveCursor](+charLengthAt(this.line, this.cursor));
          break;
        case "l":
          cursorTo(this.output, 0, 0);
          clearScreenDown(this.output);
          this[kRefreshLine]();
          break;
        case "n":
          this[kHistoryNext]();
          break;
        case "p":
          this[kHistoryPrev]();
          break;
        case "y":
          this[kYank]();
          break;
        case "z":
          if (false)
            ;
          if (this.listenerCount("SIGTSTP") > 0) {
            this.emit("SIGTSTP");
          } else {
            process.once("SIGCONT", () => {
              if (!this.paused) {
                this.pause();
                this.emit("SIGCONT");
              }
              this[kSetRawMode](true);
              this[kRefreshLine]();
            });
            this[kSetRawMode](false);
            process.kill(process.pid, "SIGTSTP");
          }
          break;
        case "w":
        case "backspace":
          this[kDeleteWordLeft]();
          break;
        case "delete":
          this[kDeleteWordRight]();
          break;
        case "left":
          this[kWordLeft]();
          break;
        case "right":
          this[kWordRight]();
          break;
      }
    } else if (keyMeta) {
      switch (keyName) {
        case "b":
          this[kWordLeft]();
          break;
        case "f":
          this[kWordRight]();
          break;
        case "d":
        case "delete":
          this[kDeleteWordRight]();
          break;
        case "backspace":
          this[kDeleteWordLeft]();
          break;
        case "y":
          this[kYankPop]();
          break;
      }
    } else {
      if (this[kSawReturnAt] && keyName !== "enter")
        this[kSawReturnAt] = 0;
      switch (keyName) {
        case "return":
          this[kSawReturnAt] = DateNow();
          this[kLine]();
          break;
        case "enter":
          if (this[kSawReturnAt] === 0 || DateNow() - this[kSawReturnAt] > this.crlfDelay) {
            this[kLine]();
          }
          this[kSawReturnAt] = 0;
          break;
        case "backspace":
          this[kDeleteLeft]();
          break;
        case "delete":
          this[kDeleteRight]();
          break;
        case "left":
          this[kMoveCursor](-charLengthLeft(this.line, this.cursor));
          break;
        case "right":
          this[kMoveCursor](+charLengthAt(this.line, this.cursor));
          break;
        case "home":
          this[kMoveCursor](-@Infinity);
          break;
        case "end":
          this[kMoveCursor](+@Infinity);
          break;
        case "up":
          this[kHistoryPrev]();
          break;
        case "down":
          this[kHistoryNext]();
          break;
        case "tab":
          if (typeof this.completer === "function" && this.isCompletionEnabled) {
            var lastKeypressWasTab = previousKey && previousKey.name === "tab";
            this[kTabComplete](lastKeypressWasTab);
            break;
          }
        default:
          if (typeof s === "string" && s) {
            lineEnding.lastIndex = 0;
            let nextMatch;
            let lastIndex = 0;
            while ((nextMatch = RegExpPrototypeExec.@call(lineEnding, s)) !== null) {
              this[kInsertString](StringPrototypeSlice.@call(s, lastIndex, nextMatch.index));
              ({ lastIndex } = lineEnding);
              this[kLine]();
              lineEnding.lastIndex = lastIndex;
            }
            this[kInsertString](StringPrototypeSlice.@call(s, lastIndex));
          }
      }
    }
  }
  [SymbolAsyncIterator]() {
    if (this[kLineObjectStream] === @undefined) {
      this[kLineObjectStream] = EventEmitter.on(this, "line", {
        close: ["close"],
        highWatermark: 1024,
        [kFirstEventParam]: true
      });
    }
    return this[kLineObjectStream];
  }
};
function Interface2(input, output, completer, terminal) {
  if (!(this instanceof Interface2)) {
    return new Interface2(input, output, completer, terminal);
  }
  if (input?.input && typeof input.completer === "function" && input.completer.length !== 2) {
    var { completer } = input;
    input.completer = (v, cb) => cb(null, completer(v));
  } else if (typeof completer === "function" && completer.length !== 2) {
    var realCompleter = completer;
    completer = (v, cb) => cb(null, realCompleter(v));
  }
  InterfaceConstructor.@call(this, input, output, completer, terminal);
  if (process.env.TERM === "dumb") {
    this._ttyWrite = _ttyWriteDumb.bind(this);
  }
}
@toClass(Interface2, "Interface", _Interface);
Interface2.prototype.question = function question(query, options, cb) {
  cb = typeof options === "function" ? options : cb;
  if (options === null || typeof options !== "object") {
    options = kEmptyObject;
  }
  var signal = options?.signal;
  if (signal) {
    validateAbortSignal(signal, "options.signal");
    if (signal.aborted) {
      return;
    }
    var onAbort = () => {
      this[kQuestionCancel]();
    };
    signal.addEventListener("abort", onAbort, { once: true });
    var cleanup = () => {
      signal.removeEventListener("abort", onAbort);
    };
    var originalCb = cb;
    cb = typeof cb === "function" ? (answer) => {
      cleanup();
      return originalCb(answer);
    } : cleanup;
  }
  if (typeof cb === "function") {
    this[kQuestion](query, cb);
  }
};
Interface2.prototype.question[promisify.custom] = {
  question(query, options) {
    if (options === null || typeof options !== "object") {
      options = kEmptyObject;
    }
    var signal = options?.signal;
    if (signal && signal.aborted) {
      return PromiseReject(@makeAbortError(@undefined, { cause: signal.reason }));
    }
    return new @Promise((resolve, reject) => {
      var cb = resolve;
      if (signal) {
        var onAbort = () => {
          reject(@makeAbortError(@undefined, { cause: signal.reason }));
        };
        signal.addEventListener("abort", onAbort, { once: true });
        cb = (answer) => {
          signal.removeEventListener("abort", onAbort);
          resolve(answer);
        };
      }
      this.question(query, options, cb);
    });
  }
}.question;
function createInterface(input, output, completer, terminal) {
  return new Interface2(input, output, completer, terminal);
}
ObjectDefineProperties(Interface2.prototype, {
  [kSetRawMode]: {
    get() {
      return this._setRawMode;
    }
  },
  [kOnLine]: {
    get() {
      return this._onLine;
    }
  },
  [kWriteToOutput]: {
    get() {
      return this._writeToOutput;
    }
  },
  [kAddHistory]: {
    get() {
      return this._addHistory;
    }
  },
  [kRefreshLine]: {
    get() {
      return this._refreshLine;
    }
  },
  [kNormalWrite]: {
    get() {
      return this._normalWrite;
    }
  },
  [kInsertString]: {
    get() {
      return this._insertString;
    }
  },
  [kTabComplete]: {
    get() {
      return this._tabComplete;
    }
  },
  [kWordLeft]: {
    get() {
      return this._wordLeft;
    }
  },
  [kWordRight]: {
    get() {
      return this._wordRight;
    }
  },
  [kDeleteLeft]: {
    get() {
      return this._deleteLeft;
    }
  },
  [kDeleteRight]: {
    get() {
      return this._deleteRight;
    }
  },
  [kDeleteWordLeft]: {
    get() {
      return this._deleteWordLeft;
    }
  },
  [kDeleteWordRight]: {
    get() {
      return this._deleteWordRight;
    }
  },
  [kDeleteLineLeft]: {
    get() {
      return this._deleteLineLeft;
    }
  },
  [kDeleteLineRight]: {
    get() {
      return this._deleteLineRight;
    }
  },
  [kLine]: {
    get() {
      return this._line;
    }
  },
  [kHistoryNext]: {
    get() {
      return this._historyNext;
    }
  },
  [kHistoryPrev]: {
    get() {
      return this._historyPrev;
    }
  },
  [kGetDisplayPos]: {
    get() {
      return this._getDisplayPos;
    }
  },
  [kMoveCursor]: {
    get() {
      return this._moveCursor;
    }
  },
  [kTtyWrite]: {
    get() {
      return this._ttyWrite;
    }
  },
  _decoder: {
    get() {
      return this[kDecoder];
    },
    set(value) {
      this[kDecoder] = value;
    }
  },
  _line_buffer: {
    get() {
      return this[kLine_buffer];
    },
    set(value) {
      this[kLine_buffer] = value;
    }
  },
  _oldPrompt: {
    get() {
      return this[kOldPrompt];
    },
    set(value) {
      this[kOldPrompt] = value;
    }
  },
  _previousKey: {
    get() {
      return this[kPreviousKey];
    },
    set(value) {
      this[kPreviousKey] = value;
    }
  },
  _prompt: {
    get() {
      return this[kPrompt];
    },
    set(value) {
      this[kPrompt] = value;
    }
  },
  _questionCallback: {
    get() {
      return this[kQuestionCallback];
    },
    set(value) {
      this[kQuestionCallback] = value;
    }
  },
  _sawKeyPress: {
    get() {
      return this[kSawKeyPress];
    },
    set(value) {
      this[kSawKeyPress] = value;
    }
  },
  _sawReturnAt: {
    get() {
      return this[kSawReturnAt];
    },
    set(value) {
      this[kSawReturnAt] = value;
    }
  }
});
Interface2.prototype._setRawMode = _Interface.prototype[kSetRawMode];
Interface2.prototype._onLine = _Interface.prototype[kOnLine];
Interface2.prototype._writeToOutput = _Interface.prototype[kWriteToOutput];
Interface2.prototype._addHistory = _Interface.prototype[kAddHistory];
Interface2.prototype._refreshLine = _Interface.prototype[kRefreshLine];
Interface2.prototype._normalWrite = _Interface.prototype[kNormalWrite];
Interface2.prototype._insertString = _Interface.prototype[kInsertString];
Interface2.prototype._tabComplete = function(lastKeypressWasTab) {
  this.pause();
  var string = StringPrototypeSlice.@call(this.line, 0, this.cursor);
  this.completer(string, (err, value) => {
    this.resume();
    if (err) {
      this._writeToOutput(`Tab completion error: ${inspect(err)}`);
      return;
    }
    this[kTabCompleter](lastKeypressWasTab, value);
  });
};
Interface2.prototype._wordLeft = _Interface.prototype[kWordLeft];
Interface2.prototype._wordRight = _Interface.prototype[kWordRight];
Interface2.prototype._deleteLeft = _Interface.prototype[kDeleteLeft];
Interface2.prototype._deleteRight = _Interface.prototype[kDeleteRight];
Interface2.prototype._deleteWordLeft = _Interface.prototype[kDeleteWordLeft];
Interface2.prototype._deleteWordRight = _Interface.prototype[kDeleteWordRight];
Interface2.prototype._deleteLineLeft = _Interface.prototype[kDeleteLineLeft];
Interface2.prototype._deleteLineRight = _Interface.prototype[kDeleteLineRight];
Interface2.prototype._line = _Interface.prototype[kLine];
Interface2.prototype._historyNext = _Interface.prototype[kHistoryNext];
Interface2.prototype._historyPrev = _Interface.prototype[kHistoryPrev];
Interface2.prototype._getDisplayPos = _Interface.prototype[kGetDisplayPos];
Interface2.prototype._getCursorPos = _Interface.prototype.getCursorPos;
Interface2.prototype._moveCursor = _Interface.prototype[kMoveCursor];
Interface2.prototype._ttyWrite = _Interface.prototype[kTtyWrite];
Interface2.prototype[Symbol.dispose] = _Interface.prototype[Symbol.dispose];
function _ttyWriteDumb(s, key) {
  key = key || kEmptyObject;
  if (key.name === "escape")
    return;
  if (this[kSawReturnAt] && key.name !== "enter")
    this[kSawReturnAt] = 0;
  if (key.ctrl) {
    if (key.name === "c") {
      if (this.listenerCount("SIGINT") > 0) {
        this.emit("SIGINT");
      } else {
        this.close();
      }
      return;
    } else if (key.name === "d") {
      this.close();
      return;
    }
  }
  switch (key.name) {
    case "return":
      this[kSawReturnAt] = DateNow();
      this._line();
      break;
    case "enter":
      if (this[kSawReturnAt] === 0 || DateNow() - this[kSawReturnAt] > this.crlfDelay) {
        this._line();
      }
      this[kSawReturnAt] = 0;
      break;
    default:
      if (typeof s === "string" && s) {
        this.line += s;
        this.cursor += s.length;
        this._writeToOutput(s);
      }
  }
}

class Readline {
  #autoCommit = false;
  #stream;
  #todo = [];
  constructor(stream, options = @undefined) {
    isWritable ??= (@getInternalField(@internalModuleRegistry, 117) || @createInternalModuleById(117)).isWritable;
    if (!isWritable(stream))
      throw @makeErrorWithCode(118, "stream", "Writable", stream);
    this.#stream = stream;
    if (options?.autoCommit != null) {
      validateBoolean(options.autoCommit, "options.autoCommit");
      this.#autoCommit = options.autoCommit;
    }
  }
  cursorTo(x, y = @undefined) {
    validateInteger(x, "x");
    if (y != null)
      validateInteger(y, "y");
    var data = y == null ? CSI`${x + 1}G` : CSI`${y + 1};${x + 1}H`;
    if (this.#autoCommit)
      process.nextTick(() => this.#stream.write(data));
    else
      ArrayPrototypePush.@call(this.#todo, data);
    return this;
  }
  moveCursor(dx, dy) {
    if (dx || dy) {
      validateInteger(dx, "dx");
      validateInteger(dy, "dy");
      var data = "";
      if (dx < 0) {
        data += CSI`${-dx}D`;
      } else if (dx > 0) {
        data += CSI`${dx}C`;
      }
      if (dy < 0) {
        data += CSI`${-dy}A`;
      } else if (dy > 0) {
        data += CSI`${dy}B`;
      }
      if (this.#autoCommit)
        process.nextTick(() => this.#stream.write(data));
      else
        ArrayPrototypePush.@call(this.#todo, data);
    }
    return this;
  }
  clearLine(dir) {
    validateInteger(dir, "dir", -1, 1);
    var data = dir < 0 ? kClearToLineBeginning : dir > 0 ? kClearToLineEnd : kClearLine;
    if (this.#autoCommit)
      process.nextTick(() => this.#stream.write(data));
    else
      ArrayPrototypePush.@call(this.#todo, data);
    return this;
  }
  clearScreenDown() {
    if (this.#autoCommit) {
      process.nextTick(() => this.#stream.write(kClearScreenDown));
    } else {
      ArrayPrototypePush.@call(this.#todo, kClearScreenDown);
    }
    return this;
  }
  commit() {
    const { resolve, reject, promise } = @newPromiseCapability(@Promise);
    try {
      const data = ArrayPrototypeJoin.@call(this.#todo, "");
      this.#stream.write(data, resolve);
      this.#todo = [];
    } catch (err) {
      reject(err);
    } finally {
      return promise;
    }
  }
  rollback() {
    this.#todo = [];
    return this;
  }
}
var PromisesInterface = class Interface3 extends _Interface {
  constructor(input, output, completer, terminal) {
    super(input, output, completer, terminal);
  }
  question(query, options = kEmptyObject) {
    var signal = options?.signal;
    if (signal) {
      validateAbortSignal(signal, "options.signal");
      if (signal.aborted) {
        return PromiseReject(@makeAbortError(@undefined, { cause: signal.reason }));
      }
    }
    const { promise, resolve, reject } = @newPromiseCapability(@Promise);
    var cb = resolve;
    if (options?.signal) {
      var onAbort = () => {
        this[kQuestionCancel]();
        reject(@makeAbortError(@undefined, { cause: signal.reason }));
      };
      signal.addEventListener("abort", onAbort, { once: true });
      cb = (answer) => {
        signal.removeEventListener("abort", onAbort);
        resolve(answer);
      };
    }
    this[kQuestion](query, cb);
    return promise;
  }
};
$ = {
  Interface: Interface2,
  clearLine,
  clearScreenDown,
  createInterface,
  cursorTo,
  emitKeypressEvents,
  moveCursor,
  promises: {
    Readline,
    Interface: PromisesInterface,
    createInterface(input, output, completer, terminal) {
      return new PromisesInterface(input, output, completer, terminal);
    }
  },
  [SymbolFor("__BUN_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED__")]: {
    CSI,
    utils: {
      getStringWidth,
      stripVTControlCharacters
    }
  }
};
return $})
