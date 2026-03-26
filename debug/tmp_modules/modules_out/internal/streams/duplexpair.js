// @bun
// build/debug/tmp_modules/internal/streams/duplexpair.ts
var $;
var Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44);
var kCallback = Symbol("Callback");
var kInitOtherSide = Symbol("InitOtherSide");

class DuplexSide extends Duplex {
  #otherSide = null;
  [kCallback] = null;
  constructor(options) {
    super(options);
    this.#otherSide = null;
  }
  [kInitOtherSide](otherSide) {
    if (this.#otherSide === null) {
      this.#otherSide = otherSide;
    } else {
      $assert(this.#otherSide === null, "this.#otherSide === null");
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
    $assert(this.#otherSide !== null, "this.#otherSide !== null");
    $assert(this.#otherSide[kCallback] === null, "this.#otherSide[kCallback] === null");
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
$$EXPORT$$($).$$EXPORT_END$$;
