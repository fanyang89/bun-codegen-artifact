// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/duplexpair.ts


"use strict";

const Duplex = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44/*internal/streams/duplex*/) || __intrinsic__createInternalModuleById(44/*internal/streams/duplex*/));

const kCallback = Symbol("Callback");
const kInitOtherSide = Symbol("InitOtherSide");

class DuplexSide extends Duplex {
  #otherSide = null;
  [kCallback]: (() => void) | null = null;

  constructor(options) {
    super(options);
    this.#otherSide = null;
  }

  [kInitOtherSide](otherSide) {
    // Ensure this can only be set once, to enforce encapsulation.
    if (this.#otherSide === null) {
      this.#otherSide = otherSide;
    } else {
      !(IS_BUN_DEVELOPMENT?$assert(this.#otherSide === null,"this.#otherSide === null"):void 0);
    }
  }

  _read() {
    const callback = this[kCallback];
    if (callback) {
      this[kCallback] = null;
      callback();
    }
  }

  _write(chunk, encoding, callback) {
    !(IS_BUN_DEVELOPMENT?$assert(this.#otherSide !== null,"this.#otherSide !== null"):void 0);
    !(IS_BUN_DEVELOPMENT?$assert(this.#otherSide[kCallback] === null,"this.#otherSide[kCallback] === null"):void 0);
    if (chunk.length === 0) {
      process.nextTick(callback);
    } else {
      this.#otherSide.push(chunk);
      this.#otherSide[kCallback] = callback;
    }
  }

  _final(callback) {
    this.#otherSide.on("end", callback);
    this.#otherSide.push(null);
  }
}

function duplexPair(options) {
  const side0 = new DuplexSide(options);
  const side1 = new DuplexSide(options);
  side0[kInitOtherSide](side1);
  side1[kInitOtherSide](side0);
  return [side0, side1];
}

$ = duplexPair;
;$$EXPORT$$($).$$EXPORT_END$$;
