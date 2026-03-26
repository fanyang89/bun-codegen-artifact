(async (unloadedModuleRegistry, config) => {
  var cssStore = new Map;
  var registeredLinkTags = new Map;
  function validateCssId(id) {
    if (!/^[a-f0-9]{16}$/.test(id)) {
      throw new Error(`Invalid CSS id: ${id}`);
    }
  }
  function deactivateCss(css) {
    if (css.active) {
      const { sheet, link } = css;
      css.active = false;
      if (sheet) {
        sheet.disabled = true;
      } else if (link) {
        const linkSheet = link.sheet;
        if (linkSheet)
          linkSheet.disabled = true;
      }
    }
  }
  function activateCss(css) {
    if (!css.active) {
      css.active = true;
      if (css.sheet) {
        css.sheet.disabled = false;
      } else if (css.link) {
        const linkSheet = css.link.sheet;
        if (linkSheet)
          linkSheet.disabled = false;
      }
    }
  }
  var headObserver = new MutationObserver((list) => {
    for (const mutation of list) {
      if (mutation.type === "childList") {
        let i = 0;
        let len = mutation.removedNodes.length;
        while (i < len) {
          const node = mutation.removedNodes[i];
          const id = registeredLinkTags.get(node);
          if (id) {
            const existingSheet = cssStore.get(id);
            if (existingSheet) {
              deactivateCss(existingSheet);
            }
            registeredLinkTags.delete(node);
          }
          i++;
        }
        i = 0;
        len = mutation.addedNodes.length;
        while (i < len) {
          const node = mutation.addedNodes[i];
          if (node instanceof HTMLLinkElement) {
            maybeAddCssLink(node);
          }
          i++;
        }
      } else if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target.tagName === "LINK" && target.rel === "stylesheet") {
          const id = registeredLinkTags.get(target);
          if (id) {
            const existing = cssStore.get(id);
            if (existing) {
              const disabled = target.disabled;
              if (disabled) {
                deactivateCss(existing);
              } else {
                activateCss(existing);
              }
            }
          }
        }
      }
    }
  });
  function maybeAddCssLink(link) {
    const pathname = new URL(link.href).pathname;
    if (pathname.startsWith("/_bun/asset/")) {
      const id = pathname.slice("/_bun/asset/".length).slice(0, 16);
      if (!/^[a-f0-9]{16}$/.test(id)) {
        return;
      }
      const existing = cssStore.get(id);
      if (existing) {
        const { sheet } = existing;
        if (sheet) {
          sheet.disabled = false;
          const linkSheet = link.sheet;
          if (linkSheet)
            linkSheet.disabled = true;
        }
        existing.link = link;
      } else {
        cssStore.set(id, {
          sheet: null,
          link,
          active: true
        });
      }
      registeredLinkTags.set(link, id);
    }
  }
  headObserver.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["disabled"]
  });
  document.querySelectorAll("head>link[rel=stylesheet]").forEach(maybeAddCssLink);
  function editCssArray(array) {
    const removedCssKeys = new Set(cssStore.keys());
    for (const css of array) {
      if (true)
        validateCssId(css);
      const existing = cssStore.get(css);
      removedCssKeys.delete(css);
      if (existing) {
        activateCss(existing);
      } else {
        cssStore.set(css, {
          sheet: null,
          link: null,
          active: true
        });
      }
    }
    for (const css of removedCssKeys) {
      const entry = cssStore.get(css);
      if (entry) {
        deactivateCss(entry);
      }
    }
  }
  function editCssContent(id, newContent) {
    let entry = cssStore.get(id);
    if (!entry)
      return;
    let sheet = entry.sheet;
    if (!entry.sheet) {
      sheet = entry.sheet = new CSSStyleSheet;
      sheet.replace(newContent);
      document.adoptedStyleSheets.push(sheet);
      const linkSheet = entry.link?.sheet;
      if (linkSheet)
        linkSheet.disabled = true;
      return false;
    }
    sheet.replace(newContent);
    return !sheet.disabled;
  }
  var td = /* @__PURE__ */ new TextDecoder;
  var te = /* @__PURE__ */ new TextEncoder;
  
  class DataViewReader {
    view;
    cursor;
    constructor(view, cursor = 0) {
      this.view = view;
      this.cursor = cursor;
    }
    u32() {
      const value = this.view.getUint32(this.cursor, true);
      this.cursor += 4;
      return value;
    }
    i32() {
      const value = this.view.getInt32(this.cursor, true);
      this.cursor += 4;
      return value;
    }
    u16() {
      const value = this.view.getUint16(this.cursor, true);
      this.cursor += 2;
      return value;
    }
    u8() {
      const value = this.view.getUint8(this.cursor);
      this.cursor += 1;
      return value;
    }
    stringWithLength(byteLength) {
      const str = td.decode(this.view.buffer.slice(this.cursor, this.cursor + byteLength));
      this.cursor += byteLength;
      return str;
    }
    string32() {
      return this.stringWithLength(this.u32());
    }
    hasMoreData() {
      return this.cursor < this.view.byteLength;
    }
    rest() {
      return this.view.buffer.slice(this.cursor);
    }
  }
  
  class DataViewWriter {
    view;
    uint8ArrayView;
    cursor;
    capacity;
    static initCapacity(capacity) {
      const view = new DataView(new ArrayBuffer(capacity));
      return new DataViewWriter(view, 0, capacity);
    }
    constructor(view, cursor, capacity) {
      this.view = view;
      this.cursor = cursor;
      this.capacity = capacity;
      this.uint8ArrayView = new Uint8Array(view.buffer);
    }
    u8(value) {
      this.view.setUint8(this.cursor, value);
      this.cursor += 1;
    }
    u32(value) {
      this.view.setUint32(this.cursor, value, true);
      this.cursor += 4;
    }
    i32(value) {
      this.view.setInt32(this.cursor, value, true);
      this.cursor += 4;
    }
    string(value) {
      if (value.length === 0)
        return;
      const encodeResult = te.encodeInto(value, this.uint8ArrayView.subarray(this.cursor));
      if (encodeResult.read !== value.length) {
        throw new Error("Failed to encode string");
      }
      this.cursor += encodeResult.written;
    }
    stringWithLength(value) {
      const cursor = this.cursor;
      this.u32(0);
      this.string(value);
      this.view.setUint32(cursor, this.cursor - cursor - 4, true);
    }
  }
  var inspectSymbol = Symbol.for("nodejs.util.inspect.custom");
  var defaultOptions = {
    showHidden: false,
    depth: 2,
    maxArrayLength: 100,
    maxStringLength: 1e4,
    breakLength: 80,
    compact: 3,
    sorted: false,
    getters: false,
    numericSeparator: false,
    customInspect: true
  };
  function inspect(obj, options = {}) {
    const ctx = {
      seen: [],
      currentDepth: 0,
      ...defaultOptions,
      ...options
    };
    return formatValue(ctx, obj, 0);
  }
  function formatValue(ctx, value, recurseTimes) {
    if (value === null)
      return "null";
    if (value === undefined)
      return "undefined";
    if (ctx.customInspect !== false && value !== null && typeof value === "object" && typeof value[inspectSymbol] === "function" && value[inspectSymbol] !== inspect) {
      return String(value[inspectSymbol](recurseTimes, { ...ctx }));
    }
    if (ctx.seen.includes(value)) {
      return "[Circular]";
    }
    switch (typeof value) {
      case "string":
        return formatString(ctx, value);
      case "number":
        return formatNumber(value, ctx.numericSeparator);
      case "bigint":
        return `${value}n`;
      case "boolean":
        return `${value}`;
      case "symbol":
        return formatSymbol(value);
      case "function":
        return formatFunction(value);
      case "object":
        return formatObject(ctx, value, recurseTimes);
      default:
        return String(value);
    }
  }
  function formatString(ctx, value) {
    if (value.length > ctx.maxStringLength) {
      const remaining = value.length - ctx.maxStringLength;
      const truncated = value.slice(0, ctx.maxStringLength);
      return `'${escape(truncated)}'... ${remaining} more character${remaining > 1 ? "s" : ""}`;
    }
    return `'${escape(value)}'`;
  }
  function escape(str) {
    return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x1F\x7F-\x9F]/g, (ch) => {
      const code = ch.charCodeAt(0);
      return `\\x${code.toString(16).padStart(2, "0")}`;
    });
  }
  function formatNumber(value, useNumericSeparator) {
    if (Object.is(value, -0))
      return "-0";
    if (!useNumericSeparator)
      return String(value);
    const str = String(value);
    if (!/^\d+$/.test(str))
      return str;
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, "_");
  }
  function formatSymbol(value) {
    return value.toString();
  }
  function formatFunction(value) {
    const name = value.name || "<anonymous>";
    const constructorName = Object.getPrototypeOf(value)?.constructor?.name;
    if (constructorName === "AsyncFunction") {
      return `[AsyncFunction: ${name}]`;
    }
    if (constructorName === "GeneratorFunction") {
      return `[GeneratorFunction: ${name}]`;
    }
    if (constructorName === "AsyncGeneratorFunction") {
      return `[AsyncGeneratorFunction: ${name}]`;
    }
    return `[Function: ${name}]`;
  }
  function formatObject(ctx, value, recurseTimes) {
    if (recurseTimes >= ctx.depth) {
      if (Array.isArray(value))
        return "[Array]";
      return `[${getConstructorName(value)}]`;
    }
    ctx.seen.push(value);
    recurseTimes += 1;
    let output;
    if (Array.isArray(value)) {
      output = formatArray(ctx, value, recurseTimes);
    } else if (value instanceof Date) {
      output = formatDate(value);
    } else if (value instanceof RegExp) {
      output = formatRegExp(value);
    } else if (value instanceof Error) {
      output = formatError(value);
    } else if (value instanceof Map) {
      output = formatMap(ctx, value, recurseTimes);
    } else if (value instanceof Set) {
      output = formatSet(ctx, value, recurseTimes);
    } else if (value instanceof WeakMap) {
      output = "WeakMap { ... }";
    } else if (value instanceof WeakSet) {
      output = "WeakSet { ... }";
    } else if (value instanceof Promise) {
      output = "Promise { ... }";
    } else if (ArrayBuffer.isView(value)) {
      output = formatTypedArray(ctx, value);
    } else if (value instanceof ArrayBuffer) {
      output = formatArrayBuffer(ctx, value);
    } else {
      output = formatPlainObject(ctx, value, recurseTimes);
    }
    ctx.seen.pop();
    return output;
  }
  function formatArray(ctx, value, recurseTimes) {
    if (value.length === 0)
      return "[]";
    const maxLength = Math.min(ctx.maxArrayLength, value.length);
    const output = [];
    for (let i = 0;i < maxLength; i++) {
      if (Object.prototype.hasOwnProperty.call(value, i)) {
        output.push(formatValue(ctx, value[i], recurseTimes));
      } else {
        output.push("empty");
      }
    }
    if (value.length > maxLength) {
      const remaining = value.length - maxLength;
      output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    const keys = Object.keys(value).filter((key) => {
      return !(Number(key) >= 0 && Number(key) < value.length && Number(key) === +key);
    });
    if (keys.length > 0) {
      for (const key of keys) {
        output.push(`${key}: ${formatValue(ctx, value[key], recurseTimes)}`);
      }
    }
    return `[ ${output.join(", ")} ]`;
  }
  function formatPlainObject(ctx, value, recurseTimes) {
    const constructorName = getConstructorName(value);
    const prefix = constructorName !== "Object" ? `${constructorName} ` : "";
    const keys = getObjectKeys(value, ctx.showHidden);
    if (keys.length === 0) {
      if (constructorName !== "Object" && getPrototypeKeys(value).length > 0) {
        return formatWithPrototype(ctx, value, recurseTimes, constructorName);
      }
      return `${prefix}{}`;
    }
    const output = [];
    for (const key of keys) {
      try {
        const desc = Object.getOwnPropertyDescriptor(value, key);
        if (desc) {
          if (desc.get || desc.set) {
            if (desc.get && desc.set) {
              output.push(`${formatPropertyKey(key)}: [Getter/Setter]`);
            } else if (desc.get) {
              output.push(`${formatPropertyKey(key)}: [Getter]`);
            } else {
              output.push(`${formatPropertyKey(key)}: [Setter]`);
            }
          } else {
            output.push(`${formatPropertyKey(key)}: ${formatValue(ctx, value[key], recurseTimes)}`);
          }
        }
      } catch (err) {
        output.push(`${formatPropertyKey(key)}: undefined`);
      }
    }
    if (ctx.sorted) {
      output.sort();
    }
    if (output.length === 0) {
      return `${prefix}{}`;
    }
    if (output.join(", ").length < ctx.breakLength) {
      return `${prefix}{ ${output.join(", ")} }`;
    }
    return `${prefix}{
    ${output.join(`,
    `)}
  }`;
  }
  function formatWithPrototype(ctx, value, recurseTimes, constructorName) {
    const protoKeys = getPrototypeKeys(value);
    if (protoKeys.length === 0) {
      return `${constructorName} {}`;
    }
    const output = [];
    for (const key of protoKeys) {
      try {
        output.push(`${formatPropertyKey(key)}: ${formatValue(ctx, value[key], recurseTimes)}`);
      } catch (err) {
        output.push(`${formatPropertyKey(key)}: undefined`);
      }
    }
    if (ctx.sorted) {
      output.sort();
    }
    if (output.length === 0) {
      return `${constructorName} {}`;
    }
    if (output.join(", ").length < ctx.breakLength) {
      return `${constructorName} { ${output.join(", ")} }`;
    }
    return `${constructorName} {
    ${output.join(`,
    `)}
  }`;
  }
  function getPrototypeKeys(obj) {
    const proto = Object.getPrototypeOf(obj);
    if (!proto || proto === Object.prototype) {
      return [];
    }
    const protoKeys = Object.getOwnPropertyNames(proto).filter((key) => {
      if (key === "constructor")
        return false;
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      return typeof descriptor?.value !== "function" && key !== "__proto__";
    });
    return protoKeys;
  }
  function formatPropertyKey(key) {
    if (typeof key === "symbol") {
      return `[${key.toString()}]`;
    }
    if (key === "__proto__") {
      return "['__proto__']";
    }
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      return key;
    }
    return `'${escape(String(key))}'`;
  }
  function getObjectKeys(obj, showHidden) {
    if (showHidden) {
      return Object.getOwnPropertyNames(obj);
    }
    return Object.keys(obj);
  }
  function getConstructorName(obj) {
    if (!obj || typeof obj !== "object") {
      return "";
    }
    let constructorName = obj.constructor?.name;
    if (!constructorName) {
      const prototype = Object.getPrototypeOf(obj);
      const protoName = prototype?.constructor?.name;
      if (protoName) {
        constructorName = protoName;
      }
    }
    return constructorName || "Object";
  }
  function formatDate(value) {
    if (isNaN(value.getTime())) {
      return "Invalid Date";
    }
    return `${value.toISOString()} [Date]`;
  }
  function formatRegExp(value) {
    return String(value);
  }
  function formatError(value) {
    return value?.stack || value + "";
  }
  function formatMap(ctx, value, recurseTimes) {
    const output = [];
    const size = value.size;
    let i = 0;
    for (const [k, v] of value) {
      if (i >= ctx.maxArrayLength) {
        const remaining = size - ctx.maxArrayLength;
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
        break;
      }
      output.push(`${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v, recurseTimes)}`);
      i++;
    }
    if (output.length === 0) {
      return "Map {}";
    }
    const joined = output.join(", ");
    if (joined.length < ctx.breakLength) {
      return `Map { ${joined} }`;
    }
    return `Map {
    ${output.join(`,
    `)}
  }`;
  }
  function formatSet(ctx, value, recurseTimes) {
    const output = [];
    const size = value.size;
    let i = 0;
    const max = ctx.maxArrayLength;
    for (const v of value) {
      if (i >= max) {
        const remaining = size - max;
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
        break;
      }
      output.push(formatValue(ctx, v, recurseTimes));
      i++;
    }
    if (output.length === 0) {
      return "Set {}";
    }
    if (output.join(", ").length < ctx.breakLength) {
      return `Set { ${output.join(", ")} }`;
    }
    return `Set {
    ${output.join(`,
    `)}
  }`;
  }
  function formatTypedArray(ctx, value) {
    const name = value.constructor.name;
    const length = value.length;
    const maxLength = Math.min(ctx.maxArrayLength, length);
    const output = [];
    for (let i = 0;i < maxLength; i++) {
      output.push(String(value[i]));
    }
    if (value.length > maxLength) {
      const remaining = value.length - maxLength;
      output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return `${name} [ ${output.join(", ")} ]`;
  }
  function formatArrayBuffer(ctx, value) {
    const constructorName = getConstructorName(value);
    let bytes;
    try {
      bytes = new Uint8Array(value);
    } catch {
      return `${constructorName} { [Detached] }`;
    }
    const byteLength = bytes.byteLength;
    const maxLength = Math.min(ctx.maxArrayLength, byteLength);
    const output = [];
    for (let i = 0;i < maxLength; i++) {
      output.push(bytes[i].toString(16).padStart(2, "0"));
    }
    if (byteLength > maxLength) {
      const remaining = byteLength - maxLength;
      output.push(`... ${remaining} more byte${remaining > 1 ? "s" : ""}`);
    }
    return `${constructorName} { ${output.join(" ")} }`;
  }
  function decodeSerializedError(reader) {
    const kind = reader.u8();
    if (kind >= 0 && kind <= 4) {
      return readLogMsg(reader, kind);
    } else {
      throw new Error("TODO: JS Errors");
    }
  }
  function readLogMsg(r, level) {
    const message = r.string32();
    const location2 = readBundlerMessageLocationOrNull(r);
    const noteCount = r.u32();
    const notes = new Array(noteCount);
    for (let i = 0;i < noteCount; i++) {
      notes[i] = readLogData(r);
    }
    return {
      kind: "bundler",
      level,
      message,
      location: location2,
      notes
    };
  }
  function readLogData(r) {
    return {
      message: r.string32(),
      location: readBundlerMessageLocationOrNull(r)
    };
  }
  function readBundlerMessageLocationOrNull(r) {
    const line = r.u32();
    if (line == 0)
      return null;
    const column = r.u32();
    const length = r.u32();
    const lineText = r.string32();
    return {
      line,
      column,
      length,
      lineText
    };
  }
  var keywordColorMap = new Map([
    ["if", "syntax-pink"],
    ["else", "syntax-pink"],
    ["for", "syntax-pink"],
    ["while", "syntax-pink"],
    ["do", "syntax-pink"],
    ["switch", "syntax-pink"],
    ["case", "syntax-pink"],
    ["break", "syntax-pink"],
    ["continue", "syntax-pink"],
    ["return", "syntax-pink"],
    ["try", "syntax-pink"],
    ["catch", "syntax-pink"],
    ["finally", "syntax-pink"],
    ["throw", "syntax-pink"],
    ["const", "syntax-pink"],
    ["let", "syntax-pink"],
    ["var", "syntax-pink"],
    ["function", "syntax-pink"],
    ["class", "syntax-pink"],
    ["interface", "syntax-cyan italic"],
    ["type", "syntax-cyan italic"],
    ["enum", "syntax-cyan italic"],
    ["namespace", "syntax-cyan italic"],
    ["abstract", "syntax-cyan italic"],
    ["implements", "syntax-cyan italic"],
    ["readonly", "syntax-cyan italic"],
    ["private", "syntax-cyan italic"],
    ["protected", "syntax-cyan italic"],
    ["public", "syntax-cyan italic"],
    ["static", "syntax-cyan italic"],
    ["declare", "syntax-cyan italic"],
    ["extends", "syntax-cyan italic"],
    ["true", "syntax-purple"],
    ["false", "syntax-purple"],
    ["null", "syntax-purple"],
    ["undefined", "syntax-purple"],
    ["this", "syntax-orange italic"],
    ["import", "syntax-pink"],
    ["export", "syntax-pink"],
    ["from", "syntax-pink"],
    ["as", "syntax-cyan italic"],
    ["default", "syntax-pink"],
    ["async", "syntax-pink"],
    ["await", "syntax-pink"],
    ["new", "syntax-pink bold"]
  ]);
  var typeModifiers = new Set(["private", "protected", "public", "readonly", "abstract", "static", "declare"]);
  var htmlTags = new Set([
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
  ]);
  var sensitivePatterns = new Set(["_auth", "_authToken", "token", "_password", "email"]);
  var IDENTIFIER_START = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_");
  var IDENTIFIER_PART = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_");
  var WHITESPACE = new Set(` 	
  \r`);
  var DIGITS = new Set("0123456789");
  var HEX_DIGITS = new Set("0123456789abcdefABCDEF");
  var OPERATORS = new Set("+-*/%=<>!&|^~?:");
  
  class DraculaSyntaxHighlighter {
    text;
    pos = 0;
    line = 1;
    column = 0;
    options;
    isInJSXTag = false;
    isJSXTagStart = false;
    isExpectingTypeName = false;
    isInGenericType = false;
    isInDestructuring = false;
    isAfterExtendsOrImplements = false;
    constructor(text, options = {}) {
      this.text = text;
      this.options = {
        enableColors: true,
        redactSensitiveInformation: false,
        languageName: "javascript",
        showLineNumbers: false,
        ...options
      };
      this.pos = 0;
      this.line = 1;
      this.column = 0;
      this.isInJSXTag = false;
      this.isJSXTagStart = false;
      this.isExpectingTypeName = false;
      this.isInGenericType = false;
      this.isInDestructuring = false;
      this.isAfterExtendsOrImplements = false;
    }
    peek(offset = 0) {
      return this.text[this.pos + offset] || "";
    }
    consume(length = 1) {
      const value = this.text.slice(this.pos, this.pos + length);
      for (const char of value) {
        if (char === `
  `) {
          this.line++;
          this.column = 0;
        } else {
          this.column++;
        }
      }
      this.pos += length;
      return value;
    }
    createToken(type, value, tokenClass) {
      return {
        type,
        value,
        line: this.line,
        column: this.column - value.length,
        tokenClass
      };
    }
    lexWhitespace() {
      let value = "";
      while (this.pos < this.text.length && this.isWhitespace(this.peek()) && this.peek() !== `
  `) {
        value += this.consume();
      }
      return value ? this.createToken("Whitespace", value) : null;
    }
    lexNewline() {
      return this.peek() === `
  ` ? this.createToken("Newline", this.consume()) : null;
    }
    lexIdentifierOrKeyword() {
      if (!this.isIdentifierStart(this.peek()))
        return null;
      const value = this.consumeIdentifier();
      const tokenClass = keywordColorMap.get(value);
      if (this.isInJSXTag) {
        if (this.isJSXTagStart) {
          this.isJSXTagStart = false;
          return this.createToken("JSXTag", value, htmlTags.has(value.toLowerCase()) ? "syntax-cyan" : "syntax-green");
        }
        return this.createToken("JSXAttribute", value, "syntax-orange");
      }
      if (tokenClass) {
        if (typeModifiers.has(value)) {
          return this.createToken("Keyword", value, "syntax-cyan italic");
        }
        if (value === "interface" || value === "type" || value === "enum") {
          this.isExpectingTypeName = true;
          return this.createToken("Keyword", value, "syntax-cyan italic");
        }
        if (value === "extends" || value === "implements") {
          this.isAfterExtendsOrImplements = true;
        }
        return this.createToken("Keyword", value, tokenClass);
      }
      if (this.isExpectingTypeName) {
        this.isExpectingTypeName = false;
        return this.createToken("Identifier", value, "syntax-cyan italic");
      }
      const nextChar = this.peek();
      const prevChar = this.pos > 0 ? this.text[this.pos - 1] : "";
      if (prevChar === ":" && !this.isInDestructuring || this.isAfterExtendsOrImplements || prevChar === "<" && this.isInGenericType || prevChar === "<" && nextChar !== "=" && !this.isInJSXTag) {
        return this.createToken("Identifier", value, "syntax-cyan italic");
      }
      if (this.peek() === "(") {
        return this.createToken("Identifier", value, "syntax-green");
      }
      return this.createToken("Identifier", value, "syntax-fg");
    }
    lexNumber() {
      if (!this.isDigit(this.peek()))
        return null;
      const value = this.consumeNumber();
      return this.createToken("Number", value, "syntax-purple");
    }
    lexString() {
      const quote = this.peek();
      if (quote !== '"' && quote !== "'" && quote !== "`")
        return null;
      if (quote === "`") {
        return this.lexTemplateString();
      }
      const value = this.consumeString(quote);
      return this.createToken("String", value, "syntax-yellow");
    }
    lexTemplateString() {
      const tokens = [];
      let str = this.consume();
      while (this.pos < this.text.length) {
        const char = this.peek();
        const prevChar = this.peek(-1);
        if (char === "`" && prevChar !== "\\") {
          str += this.consume();
          tokens.push(this.createToken("TemplateString", str, "syntax-yellow"));
          break;
        }
        if (char === "$" && this.peek(1) === "{" && prevChar !== "\\") {
          if (str) {
            tokens.push(this.createToken("TemplateString", str, "syntax-yellow"));
            str = "";
          }
          const interpStart = this.consume(2);
          tokens.push(this.createToken("TemplateInterpolation", interpStart, "syntax-pink"));
          let braceCount = 1;
          while (this.pos < this.text.length && braceCount > 0) {
            const c = this.peek();
            if (c === "{")
              braceCount++;
            if (c === "}")
              braceCount--;
            if (braceCount === 0) {
              tokens.push(this.createToken("TemplateInterpolation", this.consume(), "syntax-pink"));
            } else {
              const token = this.nextToken();
              if (token)
                tokens.push(token);
            }
          }
          continue;
        }
        if (char === "\\") {
          str += this.consume(2);
        } else {
          str += this.consume();
        }
      }
      return tokens[0];
    }
    lexComment() {
      if (this.peek() !== "/" || this.peek(1) !== "/" && this.peek(1) !== "*")
        return null;
      const value = this.consumeComment();
      return this.createToken("Comment", value, "syntax-gray");
    }
    lexOperator() {
      if (!this.isOperator(this.peek()))
        return null;
      const value = this.consumeOperator();
      return this.createToken("Operator", value, "syntax-pink");
    }
    lexPunctuator() {
      const char = this.peek();
      if ("[](){}.,;".includes(char)) {
        if (char === "<") {
          const next = this.peek(1);
          if (this.isIdentifierStart(next) || next === "/") {
            this.isInJSXTag = true;
            this.isJSXTagStart = true;
          } else if (this.isIdentifierStart(this.peek(2))) {
            this.isInGenericType = true;
          }
        } else if (char === ">") {
          this.isInJSXTag = false;
          this.isInGenericType = false;
        } else if (char === "{") {
          this.isInDestructuring = true;
        } else if (char === "}") {
          this.isInDestructuring = false;
        }
        return this.createToken("Punctuator", this.consume(), "syntax-pink");
      }
      return null;
    }
    nextToken() {
      if (this.pos >= this.text.length)
        return null;
      const token = this.lexWhitespace() || this.lexNewline() || this.lexComment() || this.lexString() || this.lexIdentifierOrKeyword() || this.lexNumber() || this.lexOperator() || this.lexPunctuator() || this.createToken("Operator", this.consume(), "syntax-pink");
      if (token?.type !== "Whitespace" && token?.type !== "Newline") {
        this.isAfterExtendsOrImplements = false;
      }
      return token;
    }
    *tokenize() {
      while (this.pos < this.text.length) {
        const token = this.nextToken();
        if (token)
          yield token;
      }
    }
    highlight() {
      const containerClass = this.options.languageName ? `dracula-theme language-${this.options.languageName}` : "dracula-theme";
      const classAttr = this.options.showLineNumbers ? `${containerClass} with-line-numbers` : containerClass;
      let result = "";
      let lineContent = "";
      let currentLine = 1;
      const startNewLine = () => {
        if (lineContent) {
          result += this.buildHtmlElement("div", { class: "line" }, lineContent);
          lineContent = "";
        }
      };
      for (const token of this.tokenize()) {
        if (token.type === "Newline") {
          startNewLine();
          currentLine++;
          continue;
        }
        if (token.tokenClass) {
          lineContent += this.wrap(token.value, token.tokenClass);
        } else {
          lineContent += this.escapeHtml(token.value);
        }
      }
      startNewLine();
      return this.buildHtmlElement("pre", { class: classAttr }, result);
    }
    highlightLine() {
      let lineContent = "";
      for (const token of this.tokenize()) {
        if (token.type === "Newline") {
          continue;
        }
        if (token.tokenClass) {
          lineContent += this.wrap(token.value, token.tokenClass);
        } else {
          lineContent += this.escapeHtml(token.value);
        }
      }
      return lineContent;
    }
    escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    buildHtmlElement(tag, attributes, content) {
      const attrs = Object.entries(attributes).map(([key, value]) => `${key}="${this.escapeHtml(value)}"`).join(" ");
      return `<${tag}${attrs ? " " + attrs : ""}>${content}</${tag}>`;
    }
    wrap(content, tokenClass) {
      if (!this.options.enableColors)
        return this.escapeHtml(content);
      const classes = tokenClass.split(" ").map((cls) => cls.trim()).join(" ");
      return `<span class="${classes}">${this.escapeHtml(content)}</span>`;
    }
    isIdentifierStart(char) {
      return IDENTIFIER_START.has(char);
    }
    isIdentifierPart(char) {
      return IDENTIFIER_PART.has(char);
    }
    isWhitespace(char) {
      return WHITESPACE.has(char);
    }
    isDigit(char) {
      return DIGITS.has(char);
    }
    isHexDigit(char) {
      return HEX_DIGITS.has(char);
    }
    isOperator(char) {
      return OPERATORS.has(char);
    }
    consumeIdentifier() {
      let identifier = this.consume();
      while (this.pos < this.text.length && this.isIdentifierPart(this.peek())) {
        identifier += this.consume();
      }
      return identifier;
    }
    consumeString(quote) {
      let str = "";
      let pos = this.pos;
      let isEscaped = false;
      str += this.consume();
      while (this.pos < this.text.length) {
        const char = this.peek();
        if (isEscaped) {
          str += this.consume();
          isEscaped = false;
          continue;
        }
        if (char === "\\") {
          str += this.consume();
          isEscaped = true;
          continue;
        }
        if (char === quote) {
          str += this.consume();
          break;
        }
        str += this.consume();
      }
      return str;
    }
    consumeTemplateString() {
      let str = "";
      let pos = this.pos;
      let isEscaped = false;
      str += this.consume();
      while (this.pos < this.text.length) {
        const char = this.peek();
        if (isEscaped) {
          str += this.consume();
          isEscaped = false;
          continue;
        }
        if (char === "\\") {
          str += this.consume();
          isEscaped = true;
          continue;
        }
        if (char === "`") {
          str += this.consume();
          break;
        }
        if (char === "$" && this.peek(1) === "{") {
          return str;
        }
        str += this.consume();
      }
      return str;
    }
    consumeNumber() {
      let num = "";
      if (this.peek() === "0") {
        const next = this.peek(1);
        if (next === "x" || next === "X") {
          num = this.consume(2);
          while (this.pos < this.text.length && this.isHexDigit(this.peek())) {
            num += this.consume();
          }
          return num;
        }
      }
      while (this.pos < this.text.length) {
        const char = this.peek();
        if (this.isDigit(char) || char === "." || char === "e" || char === "E") {
          num += this.consume();
        } else {
          break;
        }
      }
      return num;
    }
    consumeComment() {
      const commentStart = this.consume(2);
      let comment = commentStart;
      const isLineComment = commentStart === "//";
      if (isLineComment) {
        while (this.pos < this.text.length) {
          const char = this.peek();
          if (char === `
  `) {
            break;
          }
          comment += this.consume();
        }
      } else {
        let foundEnd = false;
        while (this.pos < this.text.length && !foundEnd) {
          if (this.peek() === "*" && this.peek(1) === "/") {
            comment += this.consume(2);
            foundEnd = true;
          } else {
            comment += this.consume();
          }
        }
      }
      return comment;
    }
    consumeOperator() {
      let operator = this.consume();
      const next = this.peek();
      if (this.isOperator(next)) {
        const combined = operator + next;
        if (["==", "===", "!=", "!==", ">=", "<=", "++", "--", "&&", "||", "??", ">>", "<<", "=>"].includes(combined)) {
          operator += this.consume();
          if ((combined === "==" || combined === "!=" || combined === "<<" || combined === ">>") && this.peek() === combined[0]) {
            operator += this.consume();
          }
        }
      }
      return operator;
    }
    shouldRedactSensitive(str) {
      if (str.length === 36 && str[8] === "-" && str[13] === "-" && str[18] === "-" && str[23] === "-") {
        const isValidChar = (c) => this.isHexDigit(c) || c === "-";
        return [...str].every(isValidChar);
      }
      if (str.includes("@") && (str.startsWith("http://") || str.startsWith("https://") || str.startsWith("ftp://"))) {
        return true;
      }
      if (str.startsWith("npm_") && str.length === 68) {
        const isValidTokenChar = (c) => this.isIdentifierPart(c);
        return str.slice(4).every(isValidTokenChar);
      }
      return false;
    }
  }
  function syntaxHighlight(code) {
    return new DraculaSyntaxHighlighter(code).highlightLine();
  }
  var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
  var LOCATION_REGEXP = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  var blobToSourceMap = new Map;
  var gcBlobs = [];
  var gcSize = 1024 * 1024 * 2;
  function parseStackTrace(error) {
    const stack = error?.stack;
    if (typeof stack === "string") {
      if (stack.match(CHROME_IE_STACK_REGEXP)) {
        return parseV8OrIE(stack);
      }
      return parseFFOrSafari(stack);
    }
    return null;
  }
  function parseV8OrIE(stack) {
    return stack.split(`
  `).filter((line) => !!line.match(CHROME_IE_STACK_REGEXP) && !line.includes("Bun HMR Runtime")).map(function(line) {
      let sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
      let loc = sanitizedLine.match(/ (\(.+\)$)/);
      sanitizedLine = loc ? sanitizedLine.replace(loc[0], "") : sanitizedLine;
      let locationParts = extractLocation(loc ? loc[1] : sanitizedLine);
      let functionName = loc && sanitizedLine || undefined;
      let fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
      return {
        fn: functionName || "unknown",
        file: fileName,
        line: 0 | locationParts[1],
        col: 0 | locationParts[2]
      };
    });
  }
  function parseFFOrSafari(stack) {
    return stack.split(/\n/g).map((source, i) => {
      let fn = "";
      let file = null;
      let line = null;
      let col = null;
      if (source.endsWith("@")) {
        fn = source.slice(0, -1);
      } else if (source.indexOf("@") === -1 && source.indexOf(":") === -1) {
        fn = source.endsWith("@") ? source.slice(0, -1) : source;
      } else {
        var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
        var matches = source.match(functionNameRegex);
        var functionName = matches && matches[1] ? matches[1] : undefined;
        var locationParts = extractLocation(source.replace(functionNameRegex, ""));
        fn = functionName;
        file = locationParts[0];
        line = 0 | locationParts[1];
        col = 0 | locationParts[2];
      }
      if (fn === "module code")
        fn = "";
      return {
        fn,
        file,
        line,
        col
      };
    });
  }
  function extractLocation(urlLike) {
    if (urlLike.indexOf(":") === -1) {
      return [urlLike];
    }
    const parts = LOCATION_REGEXP.exec(urlLike.replace(/[()]/g, ""));
    return [remapFileName(parts[1]), parts[2] || undefined, parts[3] || undefined];
  }
  function remapFileName(fileName) {
    if (fileName.startsWith("blob:")) {
      const sourceMapURL = blobToSourceMap.get(fileName);
      if (sourceMapURL) {
        return location.origin + "/_bun/client/hmr-" + sourceMapURL.id + ".js";
      }
    }
    return fileName;
  }
  function addMapping(blobUrl, value) {
    DEBUG.ASSERT(!blobToSourceMap.has(blobUrl));
    blobToSourceMap.set(blobUrl, value);
  }
  function derefMapping(value) {
    const refs = --value.refs;
    if (refs <= 0) {
      if (value.size > gcSize) {
        const url = value.url;
        revokeObjectURL(value);
        blobToSourceMap.delete(url);
      } else {
        gcBlobs.push(value);
        let acc = 0;
        for (let i = gcBlobs.length - 1;i >= 0; i--) {
          const size = gcBlobs[i].size;
          acc += size;
          if (acc > gcSize) {
            acc -= size;
            revokeObjectURL(gcBlobs[i]);
            gcBlobs.splice(i, 1);
          }
        }
      }
    }
  }
  function revokeObjectURL(value) {
    URL.revokeObjectURL(value.url);
  }
  function configureSourceMapGCSize(size) {
    gcSize = size;
  }
  function clearDisconnectedSourceMaps() {
    for (const sourceMap of blobToSourceMap.values()) {
      sourceMap.refs = 1;
      derefMapping(sourceMap);
    }
  }
  function getKnownSourceMaps() {
    return { blobToSourceMap, gcBlobs };
  }
  if (false)
    ;
  var hasFatalError = false;
  var buildErrors = new Map;
  var runtimeErrors = [];
  var errorDoms = new Map;
  var updatedErrorOwners = new Set;
  var activeErrorIndex = -1;
  var lastActiveErrorIndex = -1;
  var needUpdateNavbar = false;
  var domShadowRoot;
  var domModalTitle;
  var domErrorContent;
  var domFooterText;
  var domNavBar = {};
  function elem(tagName, props, children) {
    const node = document.createElement(tagName);
    if (props)
      for (let key in props) {
        node.setAttribute(key, props[key]);
      }
    if (children)
      for (const child of children) {
        node.appendChild(child);
      }
    return node;
  }
  function elemText(tagName, props, innerHTML) {
    const node = document.createElement(tagName);
    if (props)
      for (let key in props) {
        node.setAttribute(key, props[key]);
      }
    node.textContent = innerHTML;
    return node;
  }
  var textNode = (str = "") => document.createTextNode(str);
  function mountModal() {
    if (domModalTitle)
      return;
    domShadowRoot = elem("bun-hmr", {
      style: "position:fixed!important;" + "display:none!important;" + "top:0!important;" + "left:0!important;" + "width:100%!important;" + "height:100%!important;" + "background:#8883!important;" + "z-index:2147483647!important"
    });
    const shadow = domShadowRoot.attachShadow({ mode: "open" });
    const sheet = new CSSStyleSheet;
    sheet.replace("*{box-sizing:border-box;margin:0;padding:0}.root{all:initial;--modal-bg:#202020;--modal-text:#fafafa;--modal-text-faded:#fafafa88;--item-bg:#0f0f0f;--item-bg-main:#262626;--log-error:#ff5858;--log-warn:#fbbf24;--log-note:#22d3ee;--log-colon:#888;--red:#ff5858;--red-faded:#ff58582f;--error-bg:#ff58582f;--warn-bg:#eab3082f;--syntax-comment:#6272a4;--syntax-cyan:#8be9fd;--syntax-green:#50fa7b;--syntax-orange:#ffb86c;--syntax-pink:#ff79c6;--syntax-purple:#bd93f9;--syntax-red:#f55;--syntax-yellow:#f1fa8c;position:fixed;display:flex;flex-direction:column;align-items: center;width:100%;height:100%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,Oxygen,Open Sans,sans-serif;top:0;left:0}code,.message,.function-name,.file-name,.code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}pre,code{font:unset}button{appearance:none;font-size:unset;cursor:pointer;background-color:#0000;border:none}.flex{flex:1}.muted{color:var(--modal-text-faded)}.modal{color:var(--modal-text);background-color:var(--modal-bg);border-top:8px solid var(--red);border-radius:8px;width:100%;max-width:940px;margin:4rem 2rem 2rem;box-shadow:0 2px 6px #0004,0 2px 32px #0003}footer{display:flex;color:var(--modal-text-faded);margin:1rem}nav{display:flex;color:var(--modal-text-faded);align-items: center;margin:1rem}.tab-button{background-color:var(--red-faded);border-radius:4px;width:24px;height:24px}.tab-button[disabled]{opacity:.5}.tab-button.left{border-top-right-radius:0;border-bottom-right-radius:0;margin-right:2px}.tab-button.right{border-top-left-radius:0;border-bottom-left-radius:0;margin-right:.5rem}.dismiss-all{width:24px;height:24px}header{display:flex;align-items: center;margin:1rem}.title{color:var(--red);font-size:2rem;font-weight:700}.r-error{background-color:var(--item-bg)}.message-desc{padding:0 1.5rem}.message-desc.error{background-color:var(--error-bg);padding:1rem 1.5rem}.message-desc.warn{background-color:var(--warn-bg);padding:1rem 1.5rem}.r-error .name{color:var(--red);font-weight:700}.file-name{color:var(--modal-text);font-weight:700}.r-code-wrap{background-color:var(--item-bg-main);--color:var(--log-error)}.b-group{display:flex;background-color:var(--item-bg);flex-direction:column}.b-group+.b-group{border-top:1px solid var(--modal-text-faded)}.b-group .code{padding-bottom:1rem}.log-error{--color:var(--log-error);font-weight:700}.log-warn{--color:var(--log-warn)}.log-note{--color:var(--log-note)}.log-colon{--color:var(--log-colon)}.log-label{color:var(--color)}.message-desc.note+.code{padding-top:.75rem}.trace-frame{padding:.7rem 1.5rem}.trace-frame+.trace-frame{margin-top:-.5rem}.function-name{color:var(--syntax-cyan);font-style:italic}.code{display:flex;padding-top:1rem}.code .gutter{display:flex;text-align:right;user-select:none;pointer-events:none;color:var(--modal-text-faded);border-right:1px solid var(--modal-text-faded);border-width:1.5px;flex-direction:column;margin-right:1rem;padding:.3rem .5rem}.code .gutter div{white-space:pre}.code .gutter .highlight-gap{font-size:8px}.code .view{padding:.3rem 0}.highlight-wrap{color:#0000;user-select:none;-webkit-user-select:none;pointer-events:none;margin-bottom:-10px;transform:translateY(-16px)}.highlight-wrap:last-child{position:absolute;margin-bottom:0}.highlight-gap{height:10px}.highlight-wrap .line{text-decoration:underline;text-decoration-style:wavy;text-decoration-color:var(--color)}@media (prefers-color-scheme:light){.log-warn,.log-note{font-weight:700}}.syntax-pink{color:var(--syntax-pink)}.syntax-cyan{color:var(--syntax-cyan)}.syntax-orange{color:var(--syntax-orange)}.syntax-red{color:var(--syntax-red)}.syntax-green{color:var(--syntax-green)}.syntax-yellow{color:var(--syntax-yellow)}.syntax-gray{color:var(--syntax-comment)}.syntax-purple{color:var(--syntax-purple)}.tab-button.left{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjZmY1ODU4Ij48cGF0aCBkPSJtMzEzLTQ0MCAyMjQgMjI0LTU3IDU2LTMyMC0zMjAgMzIwLTMyMCA1NyA1Ni0yMjQgMjI0aDQ4N3Y4MEgzMTNaIi8+PC9zdmc+)}.tab-button.right{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjZmY1ODU4Ij48cGF0aCBkPSJNNjQ3LTQ0MEgxNjB2LTgwaDQ4N0w0MjMtNzQ0bDU3LTU2IDMyMCAzMjAtMzIwIDMyMC01Ny01NiAyMjQtMjI0WiIvPjwvc3ZnPg==)}.dismiss-all{opacity:.5;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjRkZGIj48cGF0aCBkPSJtMjU2LTIwMC01Ni01NiAyMjQtMjI0LTIyNC0yMjQgNTYtNTYgMjI0IDIyNCAyMjQtMjI0IDU2IDU2LTIyNCAyMjQgMjI0IDIyNC01NiA1Ni0yMjQtMjI0LTIyNCAyMjRaIi8+PC9zdmc+)}@media (prefers-color-scheme:light){.dismiss-all{filter:invert(1)}}");
    shadow.adoptedStyleSheets = [sheet];
    const root = elem("div", { class: "root" }, [
      elem("div", { class: "modal" }, [
        domNavBar.root = elem("nav", null, [
          domNavBar.prevBtn = elemText("button", { class: "tab-button left", disabled: "true", "aria-label": "Previous error" }, ""),
          domNavBar.nextBtn = elemText("button", { class: "tab-button right", "aria-label": "Next error" }, ""),
          elem("span", null, [
            domNavBar.active = elem("code"),
            textNode(" of "),
            domNavBar.total = elem("code"),
            domNavBar.label = textNode(" Errors")
          ]),
          elem("div", { class: "flex" }),
          domNavBar.dismissAllBtn = elem("button", { class: "dismiss-all", "aria-label": "Dismiss all errors" })
        ]),
        elem("header", null, [domModalTitle = elem("div", { class: "title" })]),
        domErrorContent = elem("div", { class: "error-content" }),
        elem("footer", null, [
          domFooterText = elemText("div", null, ""),
          elem("div", { class: "flex" }),
          elemText("div", null, "Bun v" + config.bun)
        ])
      ])
    ]);
    domNavBar.dismissAllBtn.addEventListener("click", onDismissAllErrors);
    domNavBar.prevBtn.addEventListener("click", onPrevError);
    domNavBar.nextBtn.addEventListener("click", onNextError);
    shadow.appendChild(root);
    document.body.appendChild(domShadowRoot);
  }
  var isModalVisible = false;
  function setModalVisible(visible) {
    if (isModalVisible === visible || !domShadowRoot)
      return;
    isModalVisible = visible;
    domShadowRoot.style.display = visible ? "block" : "none";
  }
  function onServerErrorPayload(view) {
    const reader = new DataViewReader(view, 1);
    const removedCount = reader.u32();
    for (let i = 0;i < removedCount; i++) {
      const removed = reader.u32();
      updatedErrorOwners.add(removed);
      buildErrors.delete(removed);
    }
    while (reader.hasMoreData()) {
      decodeAndAppendServerError(reader);
    }
    updateErrorOverlay();
  }
  async function onRuntimeError(err, fatal = false, async = false) {
    try {
      if (fatal) {
        hasFatalError = true;
      }
      let name = err?.name ?? "error";
      if (name === "Error")
        name = "error";
      let message = err?.message;
      if (!message)
        try {
          message = JSON.stringify(err);
        } catch (e) {
          message = "[error while serializing error: " + e + "]";
        }
      else if (typeof message !== "string") {
        try {
          message = JSON.stringify(message);
        } catch (e) {
          message = "[error while serializing error message: " + e + "]";
        }
      }
      const parsed = parseStackTrace(err) ?? [];
      const browserUrl = location.href;
      let bufferLength = 3 * 4 + (name.length + message.length + browserUrl.length) * 3;
      for (const frame of parsed) {
        bufferLength += 4 * 4 + ((frame.fn?.length ?? 0) + (frame.file?.length ?? 0)) * 3;
      }
      const writer = DataViewWriter.initCapacity(bufferLength);
      writer.stringWithLength(name);
      writer.stringWithLength(message);
      writer.stringWithLength(browserUrl);
      writer.u32(parsed.length);
      for (const frame of parsed) {
        writer.i32(frame.line ?? 0);
        writer.i32(frame.col ?? 0);
        writer.stringWithLength(frame.fn ?? "");
        const fileName = frame.file;
        if (fileName) {
          writer.stringWithLength(fileName);
        } else {
          writer.u32(0);
        }
      }
      const response = await fetch("/_bun/report_error", {
        method: "POST",
        body: writer.view.buffer
      });
      try {
        if (!response.ok) {
          throw new Error("Failed to report error");
        }
        const reader = new DataViewReader(new DataView(await response.arrayBuffer()), 0);
        const trace = [];
        const traceLen = reader.u32();
        for (let i = 0;i < traceLen; i++) {
          const line = reader.i32();
          const col = reader.i32();
          const fn = reader.string32();
          const file = reader.string32();
          trace.push({
            fn,
            file,
            line,
            col
          });
        }
        let code;
        const codePreviewLineCount = reader.u8();
        if (codePreviewLineCount > 0) {
          const lineOfInterestOffset = reader.u32();
          const firstLineNumber = reader.u32();
          const highlightedColumn = reader.u32();
          let lines = new Array(codePreviewLineCount);
          for (let i = 0;i < codePreviewLineCount; i++) {
            const line = reader.string32();
            lines[i] = line;
          }
          const { col, len } = expandHighlight(lines[lineOfInterestOffset], highlightedColumn);
          lines = lines.map((line) => syntaxHighlight(line));
          code = {
            lines,
            col,
            loi: lineOfInterestOffset,
            len,
            firstLine: firstLineNumber
          };
        }
        runtimeErrors.push({
          name,
          message,
          trace,
          remapped: true,
          async,
          code
        });
      } catch (e) {
        console.error("Failed to remap error", e);
        runtimeErrors.push({
          name,
          message,
          trace: parsed,
          remapped: false,
          async
        });
      }
      needUpdateNavbar = true;
      updateErrorOverlay();
    } catch (e) {
      console.error("Failed to report error", e);
    }
  }
  function expandHighlight(line, col) {
    let rest = line.slice(Math.max(0, col - 1));
    let len = 1;
    len = 0;
    let prev = line.slice(0, col - 1);
    if (rest.match(/^new\s/)) {
      len += 4;
      rest = rest.slice(4);
    }
    const newText = prev.match(/new\s+$/)?.[0];
    if (newText) {
      len += newText.length;
      col -= newText.length;
      prev = prev.slice(0, prev.length - newText.length);
    }
    const throwText = prev.match(/throw\s+$/)?.[0];
    if (throwText) {
      len += throwText.length;
      col -= throwText.length;
    }
    len += (rest.match(/.\b/)?.index ?? -1) + 1;
    if (len <= 0)
      len = 1;
    return { col, len };
  }
  function decodeAndAppendServerError(r) {
    const owner = r.u32();
    const file = r.string32() || null;
    const messageCount = r.u32();
    const messages = new Array(messageCount);
    for (let i = 0;i < messageCount; i++) {
      messages[i] = decodeSerializedError(r);
    }
    buildErrors.set(owner, { file, messages });
    updatedErrorOwners.add(owner);
    activeErrorIndex = -1;
    needUpdateNavbar = true;
  }
  function updateErrorOverlay() {
    const totalErrors = runtimeErrors.length + buildErrors.size;
    if (totalErrors === 0) {
      if (false) {} else {
        setModalVisible(false);
      }
      return;
    }
    if (activeErrorIndex === -1 && buildErrors.size === 0) {
      activeErrorIndex = 0;
      needUpdateNavbar = true;
    } else if (activeErrorIndex >= runtimeErrors.length) {
      needUpdateNavbar = true;
      if (activeErrorIndex === 0) {
        activeErrorIndex = -1;
      } else {
        activeErrorIndex = runtimeErrors.length - 1;
      }
    }
    mountModal();
    if (needUpdateNavbar) {
      needUpdateNavbar = false;
      if (activeErrorIndex >= 0) {
        const err = runtimeErrors[activeErrorIndex];
        domModalTitle.innerHTML = err.async ? "Unhandled Promise Rejection" : "Runtime Error";
        updateRuntimeErrorOverlay(err);
      } else {
        domModalTitle.innerHTML = `<span class="count">${buildErrors.size}</span> Build Error${buildErrors.size === 1 ? "" : "s"}`;
      }
      domNavBar.active.textContent = (activeErrorIndex + 1 + (buildErrors.size > 0 ? 1 : 0)).toString();
      domNavBar.total.textContent = totalErrors.toString();
      domNavBar.label.textContent = totalErrors === 1 ? " Error" : " Errors";
      domNavBar.nextBtn.disabled = activeErrorIndex >= runtimeErrors.length - 1;
      domNavBar.prevBtn.disabled = buildErrors.size > 0 ? activeErrorIndex < 0 : activeErrorIndex == 0;
    }
    if (activeErrorIndex === -1) {
      if (lastActiveErrorIndex !== -1) {
        domErrorContent.innerHTML = "";
        updateBuildErrorOverlay({ remountAll: true });
      } else {
        updateBuildErrorOverlay({});
      }
    }
    lastActiveErrorIndex = activeErrorIndex;
    if (buildErrors.size > 0) {
      domFooterText.style.display = "block";
      domFooterText.innerText = activeErrorIndex === -1 ? "Errors during a build can only be dismissed by fixing them." : "This dialog cannot be dismissed as there are additional build errors.";
    } else {
      domFooterText.style.display = "none";
    }
    domNavBar.dismissAllBtn.style.display = buildErrors.size > 0 ? "none" : "block";
    domNavBar.root.style.display = runtimeErrors.length > 0 ? "flex" : "none";
    setModalVisible(true);
  }
  function updateRuntimeErrorOverlay(err) {
    domErrorContent.innerHTML = "";
    const dom = elem("div", { class: "r-error" });
    let name = err.name;
    if (!name || name === "Error")
      name = "error";
    dom.appendChild(elem("div", { class: "message-desc error" }, [
      elemText("code", { class: "name" }, name),
      elemText("code", { class: "muted" }, ": "),
      elemText("code", {}, err.message)
    ]));
    const { code } = err;
    let trace = err.trace;
    if (code) {
      const {
        lines,
        col: columnToHighlight,
        loi: lineOfInterestOffset,
        len: highlightLength,
        firstLine: firstLineNumber
      } = code;
      const codeFrame = trace[0];
      trace = trace.slice(1);
      const domCode = elem("div", { class: "r-code-wrap" });
      const aboveRoi = lines.slice(0, lineOfInterestOffset + 1);
      const belowRoi = lines.slice(lineOfInterestOffset + 1);
      const gutter = elem("div", { class: "gutter" }, [
        elemText("div", null, aboveRoi.map((_, i) => `${i + firstLineNumber}`).join(`
  `)),
        elem("div", { class: "highlight-gap" }),
        elemText("div", null, belowRoi.map((_, i) => `${i + firstLineNumber + aboveRoi.length}`).join(`
  `))
      ]);
      domCode.appendChild(elem("div", { class: "code" }, [
        gutter,
        elem("div", { class: "view" }, [
          ...aboveRoi.map((line) => mapCodePreviewLine(line)),
          elem("div", { class: "highlight-wrap log-error" }, [
            elemText("span", { class: "space" }, "_".repeat(columnToHighlight - 1)),
            elemText("span", { class: "line" }, "_".repeat(highlightLength))
          ]),
          ...belowRoi.map((line) => mapCodePreviewLine(line))
        ])
      ]));
      domCode.appendChild(renderTraceFrame(codeFrame, "trace-frame"));
      dom.appendChild(domCode);
    }
    dom.appendChild(elem("div", { class: "r-error-trace" }, trace.map((frame) => renderTraceFrame(frame, "trace-frame"))));
    domErrorContent.appendChild(dom);
  }
  function updateBuildErrorOverlay({ remountAll = false }) {
    let totalCount = 0;
    const owners = remountAll ? buildErrors.keys() : updatedErrorOwners;
    for (const owner of owners) {
      const data = buildErrors.get(owner);
      let dom = errorDoms.get(owner);
      if (!data) {
        dom?.root.remove();
        errorDoms.delete(owner);
        continue;
      }
      totalCount += data.messages.length;
      if (!dom || remountAll) {
        let fileName;
        const root = elem("div", { class: "b-group" }, [
          elem("div", { class: "trace-frame" }, [elem("div", { class: "file-name" }, [fileName = textNode()])])
        ]);
        dom = { root, fileName, messages: [] };
        domErrorContent.appendChild(root);
        errorDoms.set(owner, dom);
      } else {
        dom.messages.forEach((msg) => msg.remove());
      }
      dom.fileName.textContent = data.file;
      for (const msg of data.messages) {
        const domMessage = renderBundlerMessage(msg);
        dom.root.appendChild(domMessage);
        dom.messages.push(domMessage);
      }
    }
    updatedErrorOwners.clear();
  }
  function mapCodePreviewLine(line) {
    const pre = elem("pre");
    pre.innerHTML = line;
    return pre;
  }
  var bundleLogLevelToName = ["error", "warn", "note", "debug", "verbose"];
  function renderBundlerMessage(msg) {
    return elem("div", { class: "b-msg" }, [
      renderErrorMessageLine(msg.level, msg.message),
      ...msg.location ? renderCodeLine(msg.location, msg.level) : [],
      ...msg.notes.map(renderNote)
    ].flat(1));
  }
  function renderTraceFrame(frame, className) {
    const hasFn = !!frame.fn;
    return elem("div", { class: className }, [
      elemText("span", { class: "muted" }, "at "),
      ...hasFn ? [
        elemText("span", { class: "function-name" }, frame.fn),
        elemText("span", { class: "muted" }, " in ")
      ] : [],
      elemText("span", { class: "file-name" }, frame.file),
      ...frame.line ? [elemText("code", { class: "muted" }, `:${frame.line}` + (frame.col ? `:${frame.col}` : ""))] : []
    ]);
  }
  function renderErrorMessageLine(level, text) {
    const levelName = bundleLogLevelToName[level];
    if (!levelName) {
      throw new Error("Unknown log level: " + level);
    }
    return elem("div", { class: "message-desc " + levelName }, [
      elemText("span", { class: "log-label log-" + levelName }, levelName),
      elemText("span", { class: "log-colon" }, ": "),
      elemText("span", { class: "log-text" }, text)
    ]);
  }
  function renderCodeLine(location2, level) {
    return [
      elem("div", { class: "code" }, [
        elem("div", { class: "gutter" }, [elemText("div", null, `${location2.line}`)]),
        elem("div", { class: "view" }, [
          mapCodePreviewLine(syntaxHighlight(location2.lineText)),
          elem("div", { class: "highlight-wrap log-" + bundleLogLevelToName[level] }, [
            elemText("span", { class: "space" }, "_".repeat(location2.column - 1)),
            elemText("span", { class: "line" }, "_".repeat(location2.length))
          ])
        ])
      ])
    ];
  }
  function renderNote(note) {
    return [
      renderErrorMessageLine(2, note.message),
      ...note.location ? renderCodeLine(note.location, 2) : []
    ];
  }
  function onDismissAllErrors() {
    if (buildErrors.size === 0) {
      setModalVisible(false);
    } else {
      activeErrorIndex = -1;
      updateErrorOverlay();
    }
  }
  function onPrevError() {
    if (activeErrorIndex === -1)
      return;
    if (activeErrorIndex === 0 && buildErrors.size === 0)
      return;
    activeErrorIndex--;
    needUpdateNavbar = true;
    updateErrorOverlay();
  }
  function onNextError() {
    if (activeErrorIndex >= runtimeErrors.length - 1)
      return;
    activeErrorIndex++;
    needUpdateNavbar = true;
    updateErrorOverlay();
  }
  var isLocal = location.host === "localhost" || location.host === "127.0.0.1";
  var wait = typeof document !== "undefined" ? () => new Promise((done) => {
    let timer = null;
    const onBlur = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const onTimeout = () => {
      if (timer !== null)
        clearTimeout(timer);
      window.removeEventListener("focus", onTimeout);
      window.removeEventListener("blur", onBlur);
      done();
    };
    window.addEventListener("focus", onTimeout);
    if (document.hasFocus()) {
      timer = setTimeout(() => {
        timer = null;
        onTimeout();
      }, isLocal ? 2500 : 2500);
      window.addEventListener("blur", onBlur);
    }
  }) : () => new Promise((done) => setTimeout(done, 2500));
  var mainWebSocket = null;
  var normalizeWebSocketURL = (url) => {
    const origin = globalThis?.location?.origin ?? globalThis?.location?.href ?? "http://localhost:3000";
    let object = new URL(url, origin);
    if (object.protocol === "https:") {
      object.protocol = "wss:";
    } else if (object.protocol === "http:") {
      object.protocol = "ws:";
    }
    return object.toString();
  };
  function initWebSocket(handlers, { url = "/_bun/hmr", onStatusChange } = {}) {
    url = normalizeWebSocketURL(url);
    let firstConnection = true;
    let closed = false;
    let sendQueue = [];
    let sendQueueLength = 0;
    const MAX_SEND_QUEUE_LENGTH = 1024 * 256;
    const wsProxy = {
      wrapped: null,
      send(data) {
        const wrapped = this.wrapped;
        if (wrapped && wrapped.readyState === 1) {
          wrapped.send(data);
        }
      },
      sendBuffered(data) {
        const wrapped = this.wrapped;
        if (wrapped && wrapped.readyState === 1) {
          wrapped.send(data);
        } else if (wrapped && wrapped.readyState === 0 && sendQueueLength < MAX_SEND_QUEUE_LENGTH) {
          sendQueue.push(data);
          sendQueueLength += typeof data === "string" ? data.length : data.byteLength;
        }
      },
      close() {
        closed = true;
        this.wrapped?.close();
        if (mainWebSocket === this) {
          mainWebSocket = null;
        }
      },
      [Symbol.dispose]() {
        this.close();
      }
    };
    if (mainWebSocket === null) {
      mainWebSocket = wsProxy;
    }
    function onFirstOpen() {
      console.info("[Bun] Hot-module-reloading socket connected, waiting for changes...");
      onStatusChange?.(true);
      const oldSendQueue = sendQueue;
      sendQueue = [];
      sendQueueLength = 0;
      for (const data of oldSendQueue) {
        wsProxy.send(data);
      }
    }
    function onMessage(ev) {
      const { data } = ev;
      if (typeof data === "object") {
        const view = new DataView(data);
        if (true) {
          console.info("[WS] receive message '" + String.fromCharCode(view.getUint8(0)) + "',", new Uint8Array(data));
        }
        handlers[view.getUint8(0)]?.(view, ws);
      }
    }
    function onError(ev) {
      if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
        ev.preventDefault();
      }
    }
    async function onClose() {
      onStatusChange?.(false);
      console.warn("[Bun] Hot-module-reloading socket disconnected, reconnecting...");
      await new Promise((done) => setTimeout(done, 1000));
      sendQueue.length = sendQueueLength = 0;
      while (true) {
        if (closed)
          return;
        let done;
        const promise = new Promise((cb) => done = cb);
        ws = wsProxy.wrapped = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        ws.onopen = () => {
          console.info("[Bun] Reconnected");
          done(true);
          onStatusChange?.(true);
          ws.onerror = onError;
        };
        ws.onmessage = onMessage;
        ws.onerror = (ev) => {
          ev.preventDefault();
          done(false);
        };
        if (await promise) {
          break;
        }
        await wait();
      }
    }
    let ws = wsProxy.wrapped = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.onopen = onFirstOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
    ws.onerror = onError;
    return wsProxy;
  }
  if (true) {
    globalThis.DEBUG = {
      ASSERT: function ASSERT(condition, message) {
        if (!condition) {
          if (typeof Bun === "undefined") {
            console.assert(false, "ASSERTION FAILED" + (message ? `: ${message}` : ""));
          } else {
            console.error("ASSERTION FAILED" + (message ? `: ${message}` : ""));
          }
        }
      }
    };
  }
  var __name = (target, name) => {
    Object.defineProperty(target, "name", {
      value: name,
      enumerable: false,
      configurable: true
    });
    return target;
  };
  var __legacyDecorateClassTS = function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1;i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __legacyDecorateParamTS = (index, decorator) => (target, key) => decorator(target, key, index);
  var __legacyMetadataTS = (k, v) => {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __using = (stack, value, async) => {
    if (value != null) {
      if (typeof value !== "object" && typeof value !== "function")
        throw TypeError('Object expected to be assigned to "using" declaration');
      let dispose;
      if (async)
        dispose = value[Symbol.asyncDispose];
      if (dispose === undefined)
        dispose = value[Symbol.dispose];
      if (typeof dispose !== "function")
        throw TypeError("Object not disposable");
      stack.push([async, dispose, value]);
    } else if (async) {
      stack.push([async]);
    }
    return value;
  };
  var __callDispose = (stack, error, hasError) => {
    let fail = (e) => error = hasError ? new SuppressedError(e, error, "An error was suppressed during disposal") : (hasError = true, e), next = (it) => {
      while (it = stack.pop()) {
        try {
          var result = it[1] && it[1].call(it[2]);
          if (it[0])
            return Promise.resolve(result).then(next, (e) => (fail(e), next()));
        } catch (e) {
          fail(e);
        }
      }
      if (hasError)
        throw error;
    };
    return next();
  };
  var registry = new Map;
  var registrySourceMapIds = new Map;
  var onServerSideReload = null;
  var eventHandlers = {};
  var refreshRuntime;
  var lazyDynamicImportWithOptions = null;
  
  class HMRModule {
    id;
    esm;
    state = 0;
    exports = null;
    cjs;
    failure = null;
    imports = null;
    updateImport = null;
    onDispose = null;
    selfAccept = null;
    depAccepts = null;
    importers = new Set;
    data = {};
    constructor(id, isCommonJS) {
      this.id = id;
      this.esm = !isCommonJS;
      this.cjs = isCommonJS ? {
        id,
        exports: {},
        require: this.require.bind(this)
      } : null;
    }
    requireResolve(id) {
      return id;
    }
    require(id) {
      try {
        const mod = loadModuleSync(id, true, this);
        return mod.esm ? mod.cjs ??= toCommonJS(mod.exports) : mod.cjs.exports;
      } catch (e) {
        if (e instanceof AsyncImportError) {
          e.message = `Cannot require "${id}" because "${e.asyncId}" uses top-level await, but 'require' is a synchronous operation.`;
        }
        throw e;
      }
    }
    dynamicImport(id, opts) {
      const found = loadModuleAsync(id, true, this);
      if (found) {
        if (found.id === id)
          return Promise.resolve(getEsmExports(found));
        return found.then(getEsmExports);
      }
      return opts ? (lazyDynamicImportWithOptions ??= new Function("specifier, opts", "import(specifier, opts)"))(id, opts) : import(id);
    }
    reactRefreshAccept() {
      if (isReactRefreshBoundary(this.exports)) {
        this.accept();
      }
    }
    get importMeta() {
      const importMeta = {
        url: `${location.origin}/${this.id}`,
        main: false,
        require: this.require.bind(this),
        get hot() {
          throw new Error("import.meta.hot cannot be used indirectly.");
        }
      };
      Object.defineProperty(this, "importMeta", { value: importMeta });
      return importMeta;
    }
    accept(arg1, arg2) {
      if (arg2 == undefined) {
        if (arg1 == undefined) {
          this.selfAccept = implicitAcceptFunction;
          return;
        }
        if (typeof arg1 !== "function") {
          throw new Error("import.meta.hot.accept requires a callback function");
        }
        this.selfAccept = arg1;
      } else {
        throw new Error('"import.meta.hot.accept" must be directly called with string literals for the specifiers. This way, the bundler can pre-process the arguments.');
      }
    }
    acceptSpecifiers(specifiers, cb) {
      this.depAccepts ??= {};
      const isArray = Array.isArray(specifiers);
      const accept = {
        modules: isArray ? specifiers : [specifiers],
        cb,
        single: !isArray
      };
      if (isArray) {
        for (const specifier of specifiers) {
          this.depAccepts[specifier] = accept;
        }
      } else {
        this.depAccepts[specifiers] = accept;
      }
    }
    decline() {}
    dispose(cb) {
      (this.onDispose ??= []).push(cb);
    }
    prune(cb) {}
    invalidate() {
      emitEvent("bun:invalidate", null);
      throw new Error("TODO: implement ImportMetaHot.invalidate");
    }
    on(event, cb) {
      if (event.startsWith("vite:")) {
        event = "bun:" + event.slice(4);
      }
      (eventHandlers[event] ??= []).push(cb);
      this.dispose(() => this.off(event, cb));
    }
    off(event, cb) {
      const handlers = eventHandlers[event];
      if (!handlers)
        return;
      const index = handlers.indexOf(cb);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
    send(event, cb) {
      throw new Error("TODO: implement ImportMetaHot.send");
    }
  }
  if (false) {}
  HMRModule.prototype.indirectHot = new Proxy({}, {
    get(_, prop) {
      if (typeof prop === "symbol")
        return;
      throw new Error(`import.meta.hot.${prop} cannot be used indirectly.`);
    },
    set() {
      throw new Error(`The import.meta.hot object cannot be mutated.`);
    }
  });
  function loadModuleSync(id, isUserDynamic, importer) {
    let mod = registry.get(id);
    if (mod) {
      if (mod.state === 3)
        throw mod.failure;
      if (mod.state === 1) {
        mod.state = 0;
        isUserDynamic = false;
      } else {
        if (importer) {
          mod.importers.add(importer);
        }
        return mod;
      }
    }
    const loadOrEsmModule = unloadedModuleRegistry[id];
    if (!loadOrEsmModule)
      throwNotFound(id, isUserDynamic);
    if (typeof loadOrEsmModule === "function") {
      if (!mod) {
        mod = new HMRModule(id, true);
        registry.set(id, mod);
      } else if (mod.esm) {
        mod.esm = false;
        mod.cjs = {
          id,
          exports: {},
          require: mod.require.bind(this)
        };
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      try {
        const cjs = mod.cjs;
        loadOrEsmModule(mod, cjs, cjs.exports);
      } catch (e) {
        mod.state = 1;
        mod.cjs.exports = {};
        throw e;
      }
      mod.state = 2;
    } else {
      if (true) {
        try {
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[0]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[1]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[2]));
          DEBUG.ASSERT(typeof loadOrEsmModule[3] === "function");
          DEBUG.ASSERT(typeof loadOrEsmModule[4] === "boolean");
        } catch (e) {
          console.warn(id, loadOrEsmModule);
          throw e;
        }
      }
      const { [0]: deps, [3]: load, [4]: isAsync } = loadOrEsmModule;
      if (isAsync) {
        throw new AsyncImportError(id);
      }
      if (!mod) {
        mod = new HMRModule(id, false);
        registry.set(id, mod);
      } else if (!mod.esm) {
        mod.esm = true;
        mod.cjs = null;
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      const { list: depsList } = parseEsmDependencies(mod, deps, loadModuleSync);
      const exportsBefore = mod.exports;
      mod.imports = depsList.map(getEsmExports);
      load(mod);
      mod.imports = depsList;
      if (mod.exports === exportsBefore)
        mod.exports = {};
      mod.cjs = null;
      mod.state = 2;
    }
    return mod;
  }
  function loadModuleAsync(id, isUserDynamic, importer) {
    let mod = registry.get(id);
    if (mod) {
      const { state } = mod;
      if (state === 3)
        throw mod.failure;
      if (state === 1) {
        mod.state = 0;
        isUserDynamic = false;
      } else {
        if (importer) {
          mod.importers.add(importer);
        }
        return mod;
      }
    }
    const loadOrEsmModule = unloadedModuleRegistry[id];
    if (!loadOrEsmModule) {
      if (isUserDynamic)
        return null;
      throwNotFound(id, isUserDynamic);
    }
    if (typeof loadOrEsmModule === "function") {
      if (!mod) {
        mod = new HMRModule(id, true);
        registry.set(id, mod);
      } else if (mod.esm) {
        mod.esm = false;
        mod.cjs = {
          id,
          exports: {},
          require: mod.require.bind(this)
        };
        mod.exports = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      try {
        const cjs = mod.cjs;
        loadOrEsmModule(mod, cjs, cjs.exports);
      } catch (e) {
        mod.state = 1;
        mod.cjs.exports = {};
        throw e;
      }
      mod.state = 2;
      return mod;
    } else {
      if (true) {
        try {
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[0]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[1]));
          DEBUG.ASSERT(Array.isArray(loadOrEsmModule[2]));
          DEBUG.ASSERT(typeof loadOrEsmModule[3] === "function");
          DEBUG.ASSERT(typeof loadOrEsmModule[4] === "boolean");
        } catch (e) {
          console.warn(id, loadOrEsmModule);
          throw e;
        }
      }
      const [deps, , , load] = loadOrEsmModule;
      if (!mod) {
        mod = new HMRModule(id, false);
        registry.set(id, mod);
      } else if (!mod.esm) {
        mod.esm = true;
        mod.exports = null;
        mod.cjs = null;
      }
      if (importer) {
        mod.importers.add(importer);
      }
      const { list, isAsync } = parseEsmDependencies(mod, deps, loadModuleAsync);
      DEBUG.ASSERT(isAsync ? list.some((x) => x instanceof Promise) : list.every((x) => x instanceof HMRModule));
      return isAsync ? Promise.all(list).then((list2) => finishLoadModuleAsync(mod, load, list2), (e) => {
        mod.state = 3;
        mod.failure = e;
        throw e;
      }) : finishLoadModuleAsync(mod, load, list);
    }
  }
  function finishLoadModuleAsync(mod, load, modules) {
    try {
      const exportsBefore = mod.exports;
      mod.imports = modules.map(getEsmExports);
      const shouldPatchImporters = !mod.selfAccept || mod.selfAccept === implicitAcceptFunction;
      const p = load(mod);
      mod.imports = modules;
      if (p) {
        return p.then(() => {
          mod.state = 2;
          if (mod.exports === exportsBefore)
            mod.exports = {};
          mod.cjs = null;
          if (shouldPatchImporters)
            patchImporters(mod);
          return mod;
        });
      }
      if (mod.exports === exportsBefore)
        mod.exports = {};
      mod.cjs = null;
      if (shouldPatchImporters)
        patchImporters(mod);
      mod.state = 2;
      return mod;
    } catch (e) {
      mod.state = 3;
      mod.failure = e;
      throw e;
    }
  }
  function parseEsmDependencies(parent, deps, enqueueModuleLoad) {
    let i = 0;
    let list = [];
    let isAsync = false;
    const { length } = deps;
    while (i < length) {
      const dep = deps[i];
      DEBUG.ASSERT(typeof dep === "string");
      let expectedExportKeyEnd = i + 2 + deps[i + 1];
      DEBUG.ASSERT(typeof deps[i + 1] === "number");
      const promiseOrModule = enqueueModuleLoad(dep, false, parent);
      list.push(promiseOrModule);
      const unloadedModule = unloadedModuleRegistry[dep];
      if (!unloadedModule) {
        throwNotFound(dep, false);
      }
      if (typeof unloadedModule !== "function") {
        const availableExportKeys = unloadedModule[1];
        i += 2;
        while (i < expectedExportKeyEnd) {
          const key = deps[i];
          DEBUG.ASSERT(typeof key === "string");
          i++;
        }
        isAsync ||= promiseOrModule instanceof Promise;
      } else {
        DEBUG.ASSERT(!registry.get(dep)?.esm);
        i = expectedExportKeyEnd;
        if (true) {
          DEBUG.ASSERT(list[list.length - 1] instanceof HMRModule);
        }
      }
    }
    return { list, isAsync };
  }
  function getEsmExports(m) {
    return m.esm ? m.exports : m.exports ??= toESM(m.cjs.exports);
  }
  async function replaceModules(modules, sourceMapId) {
    Object.assign(unloadedModuleRegistry, modules);
    emitEvent("bun:beforeUpdate", null);
    const toReload = new Set;
    const toAccept = [];
    let failures = null;
    const toDispose = [];
    outer:
      for (const key of Object.keys(modules)) {
        if (true) {
          DEBUG.ASSERT(sourceMapId);
          const existingSourceMapId = registrySourceMapIds.get(key);
          if (existingSourceMapId)
            derefMapping(existingSourceMapId);
          registrySourceMapIds.set(key, sourceMapId);
        }
        const existing = registry.get(key);
        if (!existing)
          continue;
        toReload.add(existing);
        const visited = new Set;
        const queue = [existing];
        visited.add(existing);
        while (true) {
          const mod = queue.shift();
          if (!mod)
            break;
          let hadSelfAccept = true;
          if (mod.selfAccept) {
            toReload.add(mod);
            visited.add(mod);
            hadSelfAccept = false;
            if (mod.onDispose) {
              toDispose.push(mod);
            }
          } else if (Object.keys(mod.data).length > 0) {
            mod.selfAccept ??= implicitAcceptFunction;
            toReload.add(mod);
            visited.add(mod);
            hadSelfAccept = false;
            if (mod.onDispose) {
              toDispose.push(mod);
            }
          }
          if (hadSelfAccept && mod.importers.size === 0) {
            failures ??= new Set;
            failures.add(key);
            continue outer;
          }
          for (const importer of mod.importers) {
            const cb = importer.depAccepts?.[key];
            if (cb) {
              toAccept.push({ cb, key });
            } else if (hadSelfAccept) {
              if (visited.has(importer))
                continue;
              visited.add(importer);
              queue.push(importer);
            }
          }
        }
      }
    if (failures) {
      let message = "[Bun] Hot update was not accepted because it or its importers do not call `import.meta.hot.accept`. To prevent full page reloads, call `import.meta.hot.accept` in one of the following files to handle the update:\n\n";
      for (const boundary of failures) {
        const path = [];
        let current = registry.get(boundary);
        DEBUG.ASSERT(!boundary.endsWith(".html"));
        DEBUG.ASSERT(current);
        DEBUG.ASSERT(current.selfAccept === null);
        if (current.importers.size === 0) {
          message += `Module "${boundary}" is a root module that does not self-accept.
  `;
          continue;
        }
        outer:
          while (current.importers.size > 0) {
            path.push(current.id);
            inner:
              for (const importer of current.importers) {
                if (importer.selfAccept)
                  continue inner;
                if (importer.depAccepts?.[boundary])
                  continue inner;
                current = importer;
                continue outer;
              }
            DEBUG.ASSERT(false);
            break;
          }
        path.push(current.id);
        DEBUG.ASSERT(path.length > 0);
        message += `Module "${boundary}" is not accepted by ${path[1]}${path.length > 1 ? "," : "."}
  `;
        for (let i = 2, len = path.length;i < len; i++) {
          const isLast = i === len - 1;
          message += `${isLast ? "└" : "├"} imported by "${path[i]}"${isLast ? "." : ","}
  `;
        }
      }
      message = message.trim();
      if (true) {
        sessionStorage?.setItem?.("bun:hmr:message", JSON.stringify?.({
          message,
          kind: "warn"
        }));
        fullReload();
      } else {}
    }
    if (toDispose.length > 0) {
      const disposePromises = [];
      for (const mod of toDispose) {
        mod.state = 1;
        for (const fn of mod.onDispose) {
          const p = fn(mod.data);
          if (p && p instanceof Promise) {
            disposePromises.push(p);
          }
        }
        mod.onDispose = null;
      }
      if (disposePromises.length > 0) {
        await Promise.all(disposePromises);
      }
    }
    const promises = [];
    for (const mod of toReload) {
      mod.state = 1;
      const selfAccept = mod.selfAccept;
      mod.selfAccept = null;
      mod.depAccepts = null;
      const modOrPromise = loadModuleAsync(mod.id, false, null);
      if (modOrPromise === mod) {
        if (selfAccept) {
          selfAccept(getEsmExports(mod));
        }
      } else {
        DEBUG.ASSERT(modOrPromise instanceof Promise);
        promises.push(modOrPromise.then((mod2) => {
          if (selfAccept) {
            selfAccept(getEsmExports(mod2));
          }
          return mod2;
        }));
      }
    }
    if (promises.length > 0) {
      await Promise.all(promises);
    }
    for (const mod of toReload) {
      const { selfAccept } = mod;
      if (selfAccept && selfAccept !== implicitAcceptFunction)
        continue;
      patchImporters(mod);
    }
    for (const { cb: cbEntry, key } of toAccept) {
      const { cb: cbFn, modules: modules2, single } = cbEntry;
      cbFn(single ? getEsmExports(registry.get(key)) : createAcceptArray(modules2, key));
    }
    if (refreshRuntime) {
      refreshRuntime.performReactRefresh();
    }
    emitEvent("bun:afterUpdate", null);
  }
  function patchImporters(mod) {
    const { importers } = mod;
    const exports = getEsmExports(mod);
    for (const importer of importers) {
      if (!importer.esm || !importer.updateImport)
        continue;
      const index = importer.imports.indexOf(mod);
      if (index === -1)
        continue;
      importer.updateImport[index](exports);
    }
  }
  function createAcceptArray(modules, key) {
    const arr = new Array(modules.length);
    arr.fill(undefined);
    const i = modules.indexOf(key);
    DEBUG.ASSERT(i !== -1);
    arr[i] = getEsmExports(registry.get(key));
    return arr;
  }
  function emitEvent(event, data) {
    const handlers = eventHandlers[event];
    if (!handlers)
      return;
    for (const handler of handlers) {
      handler(data);
    }
  }
  function throwNotFound(id, isUserDynamic) {
    if (isUserDynamic) {
      throw new Error(`Failed to resolve dynamic import '${id}'. With Bun's bundler, all imports must be statically known at build time so that the bundler can trace everything.`);
    }
    if (true) {
      console.warn("Available modules:", Object.keys(unloadedModuleRegistry));
    }
    throw new Error(`Failed to load bundled module '${id}'. This is not a dynamic import, and therefore is a bug in Bun's bundler.`);
  }
  function fullReload() {
    try {
      emitEvent("bun:beforeFullReload", null);
    } catch {}
    location.reload();
  }
  
  class AsyncImportError extends Error {
    asyncId;
    constructor(asyncId) {
      super(`Cannot load async module "${asyncId}" synchronously because it uses top-level await.`);
      this.asyncId = asyncId;
      Object.defineProperty(this, "name", { value: "Error" });
    }
  }
  function toCommonJS(from) {
    var desc, entry = Object.defineProperty({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function")
      Object.getOwnPropertyNames(from).map((key) => !Object.prototype.hasOwnProperty.call(entry, key) && Object.defineProperty(entry, key, {
        get: () => from[key],
        enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable
      }));
    return entry;
  }
  function toESM(mod) {
    const to = Object.defineProperty(Object.create(null), "default", { value: mod, enumerable: true });
    for (let key of Object.getOwnPropertyNames(mod))
      if (!Object.prototype.hasOwnProperty.call(to, key))
        Object.defineProperty(to, key, {
          get: () => mod[key],
          enumerable: true
        });
    return to;
  }
  function registerSynthetic(id, esmExports) {
    const module = new HMRModule(id, false);
    module.exports = esmExports;
    registry.set(id, module);
    unloadedModuleRegistry[id] = true;
  }
  function setRefreshRuntime(runtime2) {
    refreshRuntime = getEsmExports(runtime2);
    if (typeof refreshRuntime.injectIntoGlobalHook === "function") {
      refreshRuntime.injectIntoGlobalHook(window);
    } else {
      console.warn("refreshRuntime.injectIntoGlobalHook is not a function. Something is wrong with the React Fast Refresh runtime.");
    }
  }
  function isReactRefreshBoundary(esmExports) {
    const { isLikelyComponentType } = refreshRuntime;
    if (!isLikelyComponentType)
      return true;
    if (isLikelyComponentType(esmExports)) {
      return true;
    }
    if (esmExports == null || typeof esmExports !== "object") {
      return false;
    }
    let hasExports = false;
    let areAllExportsComponents = true;
    for (const key in esmExports) {
      hasExports = true;
      const desc = Object.getOwnPropertyDescriptor(esmExports, key);
      if (desc && desc.get) {
        return false;
      }
      const exportValue = esmExports[key];
      if (!isLikelyComponentType(exportValue)) {
        areAllExportsComponents = false;
      }
    }
    return hasExports && areAllExportsComponents;
  }
  function implicitAcceptFunction() {}
  registerSynthetic("bun:wrap", {
    __name,
    __legacyDecorateClassTS,
    __legacyDecorateParamTS,
    __legacyMetadataTS,
    __using,
    __callDispose
  });
  if (false) {}
  if (true) {
    registerSynthetic("bun:bake/client", {
      onServerSideReload: (cb) => onServerSideReload = cb
    });
  }
  var consoleErrorWithoutInspector = console.error;
  if (false) {}
  var isPerformingRouteReload = false;
  var shouldPerformAnotherRouteReload = false;
  var currentRouteIndex = -1;
  async function performRouteReload() {
    console.info("[Bun] Server-side code changed, reloading!");
    if (isPerformingRouteReload) {
      shouldPerformAnotherRouteReload = true;
      return;
    }
    if (onServerSideReload) {
      try {
        isPerformingRouteReload = true;
        do {
          shouldPerformAnotherRouteReload = false;
          await onServerSideReload();
        } while (shouldPerformAnotherRouteReload);
        isPerformingRouteReload = false;
        return;
      } catch (err) {
        console.error("Failed to perform Server-side reload.");
        console.error(err);
        console.error("The page will hard-reload now.");
      }
    }
    fullReload();
  }
  var pendingScriptSymbol = Symbol.for("bun:hmr:pendingScripts");
  var scriptTags = globalThis[pendingScriptSymbol] ?? new Map;
  globalThis[pendingScriptSymbol] = scriptTags;
  globalThis[Symbol.for("bun:hmr")] = (modules, id) => {
    const queue = scriptTags.get(id);
    let entry = queue?.shift() ?? null;
    if (queue && queue.length === 0) {
      scriptTags.delete(id);
    }
    if (!entry) {
      throw new Error("Unknown HMR script: " + id);
    }
    const { script, size, url } = entry;
    const map = {
      id,
      url,
      refs: Object.keys(modules).length,
      size
    };
    addMapping(url, map);
    script.remove();
    replaceModules(modules, map).catch((e) => {
      console.error(e);
      fullReload();
    });
  };
  var isFirstRun = true;
  var handlers = {
    [86](view) {
      if (td.decode(view.buffer.slice(1)) !== config.version) {
        console.error("Version mismatch, hard-reloading");
        fullReload();
        return;
      }
      if (isFirstRun) {
        isFirstRun = false;
      } else {
        fullReload();
        return;
      }
      ws.sendBuffered("she");
      ws.sendBuffered("n" + location.pathname);
      const fn = globalThis[Symbol.for("bun:loadData")];
      if (fn) {
        document.removeEventListener("visibilitychange", fn);
        ws.send("i" + config.generation);
      }
    },
    [117](view) {
      const reader = new DataViewReader(view, 1);
      const serverSideRoutesUpdated = new Set;
      do {
        const routeId = reader.i32();
        if (routeId === -1 || routeId == undefined)
          break;
        serverSideRoutesUpdated.add(routeId);
      } while (true);
      let isServerSideRouteUpdate = false;
      do {
        const routeId = reader.i32();
        if (routeId === -1 || routeId == undefined)
          break;
        if (routeId === currentRouteIndex) {
          isServerSideRouteUpdate = serverSideRoutesUpdated.has(routeId);
          const cssCount = reader.i32();
          if (cssCount !== -1) {
            const cssArray = new Array(cssCount);
            for (let i = 0;i < cssCount; i++) {
              cssArray[i] = reader.stringWithLength(16);
            }
            editCssArray(cssArray);
          }
          let nextRouteId = reader.i32();
          while (nextRouteId != null && nextRouteId !== -1) {
            const i = reader.i32();
            reader.cursor += 16 * Math.max(0, i);
            nextRouteId = reader.i32();
          }
          break;
        } else {
          const i = reader.i32();
          reader.cursor += 16 * Math.max(0, i);
        }
      } while (true);
      {
        let i = reader.u32();
        while (i--) {
          const identifier = reader.stringWithLength(16);
          const code = reader.string32();
          editCssContent(identifier, code);
        }
      }
      if (hasFatalError && (isServerSideRouteUpdate || reader.hasMoreData())) {
        fullReload();
        return;
      }
      if (isServerSideRouteUpdate) {
        performRouteReload();
        return;
      }
      if (reader.hasMoreData()) {
        const sourceMapSize = reader.u32();
        const rest = reader.rest();
        const sourceMapId = td.decode(new Uint8Array(rest, rest.byteLength - 24, 16));
        DEBUG.ASSERT(sourceMapId.match(/[a-f0-9]{16}/));
        const blob = new Blob([rest], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const script = document.createElement("script");
        const pendingScripts = scriptTags.get(sourceMapId);
        const entry = {
          script,
          size: sourceMapSize,
          url
        };
        if (pendingScripts) {
          pendingScripts.push(entry);
        } else {
          scriptTags.set(sourceMapId, [entry]);
        }
        script.className = "bun-hmr-script";
        script.src = url;
        script.onerror = onHmrLoadError;
        document.head.appendChild(script);
      } else {
        emitEvent("bun:afterUpdate", null);
      }
    },
    [110](view) {
      const reader = new DataViewReader(view, 1);
      currentRouteIndex = reader.u32();
    },
    [101]: onServerErrorPayload
  };
  var ws = initWebSocket(handlers, {
    onStatusChange(connected) {
      emitEvent(connected ? "bun:ws:connect" : "bun:ws:disconnect", null);
    }
  });
  function onHmrLoadError(event, source, lineno, colno, error) {
    if (typeof event === "string") {
      console.error(event);
    } else if (error) {
      console.error(error);
    } else {
      console.error("Failed to load HMR script", event);
    }
    fullReload();
  }
  {
    const truePushState = History.prototype.pushState;
    History.prototype.pushState = function pushState(state, title, url) {
      truePushState.call(this, state, title, url);
      ws.sendBuffered("n" + location.pathname);
    };
    const trueReplaceState = History.prototype.replaceState;
    History.prototype.replaceState = function replaceState(state, title, url) {
      trueReplaceState.call(this, state, title, url);
      ws.sendBuffered("n" + location.pathname);
    };
  }
  window.addEventListener("error", (event) => {
    const value = event.error || event.message;
    if (!value) {
      console.log("[Bun] The HMR client detected a runtime error, but no useful value was found. Below is the full error event:");
      console.log(event);
    }
    onRuntimeError(value, true, false);
  });
  window.addEventListener("unhandledrejection", (event) => {
    onRuntimeError(event.reason, true, true);
  });
  {
    let reloadError = sessionStorage?.getItem?.("bun:hmr:message");
    if (reloadError) {
      sessionStorage.removeItem("bun:hmr:message");
      reloadError = JSON.parse(reloadError);
      if (reloadError.kind === "warn") {
        console.warn(reloadError.message);
      } else {
        console.error(reloadError.message);
      }
    }
  }
  if (config.console) {
    let websocketInspect = function(logLevel, values) {
      let str = "l" + logLevel;
      let first = true;
      for (const value of values) {
        if (first) {
          first = false;
        } else {
          str += " ";
        }
        if (typeof value === "string") {
          str += value;
        } else {
          str += inspect(value);
        }
      }
      ws.sendBuffered(str);
    };
    const originalLog = console.log;
    if (typeof originalLog === "function") {
      console.log = function log(...args) {
        originalLog(...args);
        websocketInspect("l", args);
      };
    }
    if (typeof consoleErrorWithoutInspector === "function") {
      console.error = function error(...args) {
        consoleErrorWithoutInspector(...args);
        websocketInspect("e", args);
      };
    }
  }
  var testingHook = globalThis[Symbol.for("bun testing api, may change at any time")];
  testingHook?.({
    configureSourceMapGCSize,
    clearDisconnectedSourceMaps,
    getKnownSourceMaps
  });
  try {
    const { refresh } = config;
    if (refresh) {
      const refreshRuntime2 = await loadModuleAsync(refresh, false, null);
      setRefreshRuntime(refreshRuntime2);
    }
    await loadModuleAsync(config.main, false, null);
    emitEvent("bun:ready", null);
  } catch (e) {
    consoleErrorWithoutInspector(e);
    onRuntimeError(e, true, false);
  }
})({
