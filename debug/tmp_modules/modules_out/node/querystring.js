// @bun
// build/debug/tmp_modules/node/querystring.ts
var $;
var ArrayIsArray = __intrinsic__Array.isArray;
var MathAbs = Math.abs;
var NumberIsFinite = Number.isFinite;
var ObjectKeys = Object.keys;
var StringPrototypeCharCodeAt = __intrinsic__String.prototype.charCodeAt;
var StringPrototypeSlice = __intrinsic__String.prototype.slice;
var StringPrototypeToUpperCase = __intrinsic__String.prototype.toUpperCase;
var NumberPrototypeToString = Number.prototype.toString;
var __commonJS = (cb, mod = __intrinsic__undefined) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var require_src = __commonJS((exports, module) => {
  function encodeStr(str, noEscapeTable, hexTable2) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = StringPrototypeCharCodeAt.__intrinsic__call(str, i);
        while (c < 128) {
          if (noEscapeTable[c] !== 1) {
            if (lastPos < i)
              out += StringPrototypeSlice.__intrinsic__call(str, lastPos, i);
            lastPos = i + 1;
            out += hexTable2[c];
          }
          if (++i === len)
            break outer;
          c = StringPrototypeCharCodeAt.__intrinsic__call(str, i);
        }
        if (lastPos < i)
          out += StringPrototypeSlice.__intrinsic__call(str, lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable2[192 | c >> 6] + hexTable2[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable2[224 | c >> 12] + hexTable2[128 | c >> 6 & 63] + hexTable2[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len)
          throw __intrinsic__makeErrorWithCode(139);
        const c2 = StringPrototypeCharCodeAt.__intrinsic__call(str, i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable2[240 | c >> 18] + hexTable2[128 | c >> 12 & 63] + hexTable2[128 | c >> 6 & 63] + hexTable2[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + StringPrototypeSlice.__intrinsic__call(str, lastPos);
    return out;
  }
  const hexTable = new __intrinsic__Array(256);
  for (let i = 0;i < 256; ++i)
    hexTable[i] = "%" + StringPrototypeToUpperCase.__intrinsic__call((i < 16 ? "0" : "") + NumberPrototypeToString.__intrinsic__call(i, 16));
  const isHexTable = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  const QueryString = module.exports = {
    unescapeBuffer,
    unescape: qsUnescape,
    escape: qsEscape,
    stringify,
    encode: stringify,
    parse,
    decode: parse
  };
  const unhexTable = new Int8Array([
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ]);
  function unescapeBuffer(s, decodeSpaces) {
    const out = __intrinsic__Buffer.allocUnsafe(s.length);
    let index = 0;
    let outIndex = 0;
    let currentChar;
    let nextChar;
    let hexHigh;
    let hexLow;
    const maxLength = s.length - 2;
    let hasHex = false;
    while (index < s.length) {
      currentChar = StringPrototypeCharCodeAt.__intrinsic__call(s, index);
      if (currentChar === 43 && decodeSpaces) {
        out[outIndex++] = 32;
        index++;
        continue;
      }
      if (currentChar === 37 && index < maxLength) {
        currentChar = StringPrototypeCharCodeAt.__intrinsic__call(s, ++index);
        hexHigh = unhexTable[currentChar];
        if (!(hexHigh >= 0)) {
          out[outIndex++] = 37;
          continue;
        } else {
          nextChar = StringPrototypeCharCodeAt.__intrinsic__call(s, ++index);
          hexLow = unhexTable[nextChar];
          if (!(hexLow >= 0)) {
            out[outIndex++] = 37;
            index--;
          } else {
            hasHex = true;
            currentChar = hexHigh * 16 + hexLow;
          }
        }
      }
      out[outIndex++] = currentChar;
      index++;
    }
    return hasHex ? out.slice(0, outIndex) : out;
  }
  function qsUnescape(s, decodeSpaces) {
    try {
      return decodeURIComponent(s);
    } catch {
      return QueryString.unescapeBuffer(s, decodeSpaces).toString();
    }
  }
  const noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function qsEscape(str) {
    if (typeof str !== "string") {
      if (typeof str === "object")
        str = __intrinsic__String(str);
      else
        str += "";
    }
    return encodeStr(str, noEscape, hexTable);
  }
  function stringifyPrimitive(v) {
    if (typeof v === "string")
      return v;
    if (typeof v === "number" && NumberIsFinite(v))
      return "" + v;
    if (typeof v === "bigint")
      return "" + v;
    if (typeof v === "boolean")
      return v ? "true" : "false";
    return "";
  }
  function encodeStringified(v, encode) {
    if (typeof v === "string")
      return v.length ? encode(v) : "";
    if (typeof v === "number" && NumberIsFinite(v)) {
      return MathAbs(v) < 1000000000000000000000 ? "" + v : encode("" + v);
    }
    if (typeof v === "bigint")
      return "" + v;
    if (typeof v === "boolean")
      return v ? "true" : "false";
    return "";
  }
  function encodeStringifiedCustom(v, encode) {
    return encode(stringifyPrimitive(v));
  }
  function stringify(obj, sep, eq, options) {
    sep ||= "&";
    eq ||= "=";
    let encode = QueryString.escape;
    if (options && typeof options.encodeURIComponent === "function") {
      encode = options.encodeURIComponent;
    }
    const convert = encode === qsEscape ? encodeStringified : encodeStringifiedCustom;
    if (obj !== null && typeof obj === "object") {
      const keys = ObjectKeys(obj);
      const len = keys.length;
      let fields = "";
      for (let i = 0;i < len; ++i) {
        const k = keys[i];
        const v = obj[k];
        let ks = convert(k, encode);
        ks += eq;
        if (ArrayIsArray(v)) {
          const vlen = v.length;
          if (vlen === 0)
            continue;
          if (fields)
            fields += sep;
          for (let j = 0;j < vlen; ++j) {
            if (j)
              fields += sep;
            fields += ks;
            fields += convert(v[j], encode);
          }
        } else {
          if (fields)
            fields += sep;
          fields += ks;
          fields += convert(v, encode);
        }
      }
      return fields;
    }
    return "";
  }
  function charCodes(str) {
    if (str.length === 0)
      return [];
    if (str.length === 1)
      return [StringPrototypeCharCodeAt.__intrinsic__call(str, 0)];
    const ret = new __intrinsic__Array(str.length);
    for (let i = 0;i < str.length; ++i)
      ret[i] = StringPrototypeCharCodeAt.__intrinsic__call(str, i);
    return ret;
  }
  const defSepCodes = [38];
  const defEqCodes = [61];
  function addKeyVal(obj, key, value, keyEncoded, valEncoded, decode) {
    if (key.length > 0 && keyEncoded)
      key = decodeStr(key, decode);
    if (value.length > 0 && valEncoded)
      value = decodeStr(value, decode);
    if (obj[key] === __intrinsic__undefined) {
      obj[key] = value;
    } else {
      const curValue = obj[key];
      if (curValue.pop)
        curValue[curValue.length] = value;
      else
        obj[key] = [curValue, value];
    }
  }
  function parse(qs, sep, eq, options) {
    const obj = Object.create(null);
    if (typeof qs !== "string" || qs.length === 0) {
      return obj;
    }
    const sepCodes = !sep ? defSepCodes : charCodes(__intrinsic__String(sep));
    const eqCodes = !eq ? defEqCodes : charCodes(__intrinsic__String(eq));
    const sepLen = sepCodes.length;
    const eqLen = eqCodes.length;
    let pairs = 1000;
    if (options && typeof options.maxKeys === "number") {
      pairs = options.maxKeys > 0 ? options.maxKeys : -1;
    }
    let decode = QueryString.unescape;
    if (options && typeof options.decodeURIComponent === "function") {
      decode = options.decodeURIComponent;
    }
    const customDecode = decode !== qsUnescape;
    let lastPos = 0;
    let sepIdx = 0;
    let eqIdx = 0;
    let key = "";
    let value = "";
    let keyEncoded = customDecode;
    let valEncoded = customDecode;
    const plusChar = customDecode ? "%20" : " ";
    let encodeCheck = 0;
    for (let i = 0;i < qs.length; ++i) {
      const code = StringPrototypeCharCodeAt.__intrinsic__call(qs, i);
      if (code === sepCodes[sepIdx]) {
        if (++sepIdx === sepLen) {
          const end = i - sepIdx + 1;
          if (eqIdx < eqLen) {
            if (lastPos < end) {
              key += StringPrototypeSlice.__intrinsic__call(qs, lastPos, end);
            } else if (key.length === 0) {
              if (--pairs === 0)
                return obj;
              lastPos = i + 1;
              sepIdx = eqIdx = 0;
              continue;
            }
          } else if (lastPos < end) {
            value += StringPrototypeSlice.__intrinsic__call(qs, lastPos, end);
          }
          addKeyVal(obj, key, value, keyEncoded, valEncoded, decode);
          if (--pairs === 0)
            return obj;
          keyEncoded = valEncoded = customDecode;
          key = value = "";
          encodeCheck = 0;
          lastPos = i + 1;
          sepIdx = eqIdx = 0;
        }
      } else {
        sepIdx = 0;
        if (eqIdx < eqLen) {
          if (code === eqCodes[eqIdx]) {
            if (++eqIdx === eqLen) {
              const end = i - eqIdx + 1;
              if (lastPos < end)
                key += StringPrototypeSlice.__intrinsic__call(qs, lastPos, end);
              encodeCheck = 0;
              lastPos = i + 1;
            }
            continue;
          } else {
            eqIdx = 0;
            if (!keyEncoded) {
              if (code === 37) {
                encodeCheck = 1;
                continue;
              } else if (encodeCheck > 0) {
                if (isHexTable[code] === 1) {
                  if (++encodeCheck === 3)
                    keyEncoded = true;
                  continue;
                } else {
                  encodeCheck = 0;
                }
              }
            }
          }
          if (code === 43) {
            if (lastPos < i)
              key += StringPrototypeSlice.__intrinsic__call(qs, lastPos, i);
            key += plusChar;
            lastPos = i + 1;
            continue;
          }
        }
        if (code === 43) {
          if (lastPos < i)
            value += StringPrototypeSlice.__intrinsic__call(qs, lastPos, i);
          value += plusChar;
          lastPos = i + 1;
        } else if (!valEncoded) {
          if (code === 37) {
            encodeCheck = 1;
          } else if (encodeCheck > 0) {
            if (isHexTable[code] === 1) {
              if (++encodeCheck === 3)
                valEncoded = true;
            } else {
              encodeCheck = 0;
            }
          }
        }
      }
    }
    if (lastPos < qs.length) {
      if (eqIdx < eqLen)
        key += StringPrototypeSlice.__intrinsic__call(qs, lastPos);
      else if (sepIdx < sepLen)
        value += StringPrototypeSlice.__intrinsic__call(qs, lastPos);
    } else if (eqIdx === 0 && key.length === 0) {
      return obj;
    }
    addKeyVal(obj, key, value, keyEncoded, valEncoded, decode);
    return obj;
  }
  function decodeStr(s, decoder) {
    try {
      return decoder(s);
    } catch {
      return QueryString.unescape(s, true);
    }
  }
});
$ = require_src();
$$EXPORT$$($).$$EXPORT_END$$;
