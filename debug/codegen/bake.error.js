var td = /* @__PURE__ */ new TextDecoder;

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
var blobToSourceMap = new Map;
var gcSize = 1024 * 1024 * 2;
if (false)
  ;
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
    if (true) {
      location.reload();
    } else {}
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
{
  const reader = new DataViewReader(new DataView(error.buffer), 0);
  while (reader.hasMoreData()) {
    try {
      decodeAndAppendServerError(reader);
    } catch (e) {
      console.error(e);
      break;
    }
  }
  updateErrorOverlay();
}
var firstVersionPacket = true;
var ws = initWebSocket({
  [86](dv) {
    if (firstVersionPacket) {
      firstVersionPacket = false;
    } else {
      location.reload();
    }
    ws.send("se");
  },
  [101]: onServerErrorPayload
});
