// @bun
// build/debug/tmp_modules/node/crypto.ts
var $;
var StringDecoder = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 143) || __intrinsic__createInternalModuleById(143)).StringDecoder;
var LazyTransform = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 49) || __intrinsic__createInternalModuleById(49);
var { defineCustomPromisifyArgs } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 31) || __intrinsic__createInternalModuleById(31);
var Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59);
var { CryptoHasher } = Bun;
var {
  getCurves,
  certVerifySpkac,
  certExportPublicKey,
  certExportChallenge,
  getCiphers,
  getCipherInfo,
  Sign: _Sign,
  sign,
  Verify: _Verify,
  verify,
  Hmac: _Hmac,
  Hash: _Hash,
  ECDH,
  DiffieHellman,
  DiffieHellmanGroup,
  diffieHellman,
  checkPrime,
  checkPrimeSync,
  generatePrime,
  generatePrimeSync,
  Cipher,
  hkdf,
  hkdfSync,
  publicEncrypt,
  publicDecrypt,
  privateEncrypt,
  privateDecrypt,
  KeyObject,
  createSecretKey,
  createPublicKey,
  createPrivateKey,
  generateKey,
  generateKeySync,
  generateKeyPair,
  generateKeyPairSync,
  X509Certificate
} = __intrinsic__lazy(45);
var {
  pbkdf2: _pbkdf2,
  pbkdf2Sync,
  timingSafeEqual,
  randomInt,
  randomUUID,
  randomBytes,
  randomFillSync,
  randomFill,
  secureHeapUsed,
  getFips,
  setFips,
  setEngine,
  getHashes,
  scrypt,
  scryptSync
} = __intrinsic__lazy(46);
var normalizeEncoding = __intrinsic__lazy(37);
var { validateString } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var kHandle = Symbol("kHandle");
function verifySpkac(spkac, encoding) {
  return certVerifySpkac(getArrayBufferOrView(spkac, "spkac", encoding));
}
function exportPublicKey(spkac, encoding) {
  return certExportPublicKey(getArrayBufferOrView(spkac, "spkac", encoding));
}
function exportChallenge(spkac, encoding) {
  return certExportChallenge(getArrayBufferOrView(spkac, "spkac", encoding));
}
function Certificate() {
  if (!new.target) {
    return new Certificate;
  }
  this.verifySpkac = verifySpkac;
  this.exportPublicKey = exportPublicKey;
  this.exportChallenge = exportChallenge;
}
Certificate.prototype = {};
Certificate.verifySpkac = verifySpkac;
Certificate.exportPublicKey = exportPublicKey;
Certificate.exportChallenge = exportChallenge;
var Buffer = globalThis.Buffer;
var { isAnyArrayBuffer, isArrayBufferView } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144);
function getArrayBufferOrView(buffer, name, encoding) {
  if (buffer instanceof KeyObject) {
    if (buffer.type !== "secret") {
      const error2 = __intrinsic__makeTypeError(`ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE: Invalid key object type ${key.type}, expected secret`);
      error2.code = "ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE";
      throw error2;
    }
    buffer = buffer.export();
  }
  if (isAnyArrayBuffer(buffer))
    return buffer;
  if (typeof buffer === "string") {
    if (encoding === "buffer")
      encoding = "utf8";
    return Buffer.from(buffer, encoding);
  }
  if (!isArrayBufferView(buffer)) {
    var error = __intrinsic__makeTypeError(`ERR_INVALID_ARG_TYPE: The "${name}" argument must be of type string or an instance of ArrayBuffer, Buffer, TypedArray, or DataView. Received ` + buffer);
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  return buffer;
}
var crypto = globalThis.crypto;
var crypto_exports = {};
crypto_exports.getRandomValues = (value) => crypto.getRandomValues(value);
crypto_exports.constants = __intrinsic__processBindingConstants.crypto;
crypto_exports.KeyObject = KeyObject;
crypto_exports.generateKey = generateKey;
crypto_exports.generateKeySync = generateKeySync;
defineCustomPromisifyArgs(generateKeyPair, ["publicKey", "privateKey"]);
crypto_exports.generateKeyPair = generateKeyPair;
crypto_exports.generateKeyPairSync = generateKeyPairSync;
crypto_exports.createSecretKey = createSecretKey;
crypto_exports.createPublicKey = createPublicKey;
crypto_exports.createPrivateKey = createPrivateKey;
var webcrypto = crypto;
var _subtle = webcrypto.subtle;
crypto_exports.hash = function hash(algorithm, input, outputEncoding = "hex") {
  return CryptoHasher.hash(algorithm, input, outputEncoding);
};
function pbkdf2(password, salt, iterations, keylen, digest, callback) {
  if (typeof digest === "function") {
    callback = digest;
    digest = __intrinsic__undefined;
  }
  const promise = _pbkdf2(password, salt, iterations, keylen, digest, callback);
  if (callback) {
    promise.then((result) => callback(null, result), (err) => callback(err));
    return;
  }
  promise.then(() => {});
}
crypto_exports.pbkdf2 = pbkdf2;
crypto_exports.pbkdf2Sync = pbkdf2Sync;
crypto_exports.hkdf = hkdf;
crypto_exports.hkdfSync = hkdfSync;
crypto_exports.getCurves = getCurves;
crypto_exports.getCipherInfo = getCipherInfo;
crypto_exports.timingSafeEqual = timingSafeEqual;
crypto_exports.webcrypto = webcrypto;
crypto_exports.subtle = _subtle;
crypto_exports.X509Certificate = X509Certificate;
crypto_exports.Certificate = Certificate;
function Sign(algorithm, options) {
  if (!(this instanceof Sign)) {
    return new Sign(algorithm, options);
  }
  validateString(algorithm, "algorithm");
  this[kHandle] = new _Sign;
  this[kHandle].init(algorithm);
  Writable.__intrinsic__apply(this, [options]);
}
__intrinsic__toClass(Sign, "Sign", Writable);
Object.assign(Sign.prototype, {
  _write: function(chunk, encoding, callback) {
    this.update(chunk, encoding);
    callback();
  },
  update: function(data, encoding) {
    return this[kHandle].update(this, data, encoding);
  },
  sign: function(options, encoding) {
    return this[kHandle].sign(options, encoding);
  }
});
crypto_exports.Sign = Sign;
crypto_exports.sign = sign;
function createSign(algorithm, options) {
  return new Sign(algorithm, options);
}
crypto_exports.createSign = createSign;
function Verify(algorithm, options) {
  if (!(this instanceof Verify)) {
    return new Verify(algorithm, options);
  }
  validateString(algorithm, "algorithm");
  this[kHandle] = new _Verify;
  this[kHandle].init(algorithm);
  Writable.__intrinsic__apply(this, [options]);
}
__intrinsic__toClass(Verify, "Verify", Writable);
Verify.prototype._write = Sign.prototype._write;
Verify.prototype.update = Sign.prototype.update;
Object.assign(Verify.prototype, {
  verify: function(options, signature, sigEncoding) {
    return this[kHandle].verify(options, signature, sigEncoding);
  }
});
crypto_exports.Verify = Verify;
crypto_exports.verify = verify;
function createVerify(algorithm, options) {
  return new Verify(algorithm, options);
}
crypto_exports.createVerify = createVerify;
function Hash(algorithm, options) {
  if (!new.target) {
    return new Hash(algorithm, options);
  }
  const handle = new _Hash(algorithm, options);
  this[kHandle] = handle;
  LazyTransform.__intrinsic__apply(this, [options]);
}
__intrinsic__toClass(Hash, "Hash", LazyTransform);
Object.assign(Hash.prototype, {
  copy: function(options) {
    return new Hash(this[kHandle], options);
  },
  _transform: function(chunk, encoding, callback) {
    this[kHandle].update(this, chunk, encoding);
    callback();
  },
  _flush: function(callback) {
    this.push(this[kHandle].digest(null, false));
    callback();
  },
  update: function(data, encoding) {
    return this[kHandle].update(this, data, encoding);
  },
  digest: function(outputEncoding) {
    return this[kHandle].digest(outputEncoding);
  }
});
crypto_exports.Hash = Hash;
crypto_exports.createHash = function createHash(algorithm, options) {
  return new Hash(algorithm, options);
};
function Hmac(hmac, key2, options) {
  if (!new.target) {
    return new Hmac(hmac, key2, options);
  }
  const handle = new _Hmac(hmac, key2, options);
  this[kHandle] = handle;
  LazyTransform.__intrinsic__apply(this, [options]);
}
__intrinsic__toClass(Hmac, "Hmac", LazyTransform);
Object.assign(Hmac.prototype, {
  update: function(data, encoding) {
    return this[kHandle].update(this, data, encoding);
  },
  digest: function(outputEncoding) {
    return this[kHandle].digest(outputEncoding);
  },
  _transform: function(chunk, encoding, callback) {
    this[kHandle].update(this, chunk, encoding);
    callback();
  },
  _flush: function(callback) {
    this.push(this[kHandle].digest());
    callback();
  }
});
crypto_exports.Hmac = Hmac;
crypto_exports.createHmac = function createHmac(hmac, key2, options) {
  return new Hmac(hmac, key2, options);
};
crypto_exports.getHashes = getHashes;
crypto_exports.randomInt = randomInt;
crypto_exports.randomFill = randomFill;
crypto_exports.randomFillSync = randomFillSync;
crypto_exports.randomBytes = randomBytes;
crypto_exports.randomUUID = randomUUID;
crypto_exports.checkPrime = checkPrime;
crypto_exports.checkPrimeSync = checkPrimeSync;
crypto_exports.generatePrime = generatePrime;
crypto_exports.generatePrimeSync = generatePrimeSync;
crypto_exports.secureHeapUsed = secureHeapUsed;
crypto_exports.setEngine = setEngine;
crypto_exports.getFips = getFips;
crypto_exports.setFips = setFips;
Object.defineProperty(crypto_exports, "fips", {
  __proto__: null,
  get: getFips,
  set: setFips
});
for (const rng of ["pseudoRandomBytes", "prng", "rng"]) {
  Object.defineProperty(crypto_exports, rng, {
    value: randomBytes,
    enumerable: false,
    configurable: true
  });
}
function createDiffieHellman(sizeOrKey, keyEncoding, generator, genEncoding) {
  return new DiffieHellman(sizeOrKey, keyEncoding, generator, genEncoding);
}
crypto_exports.DiffieHellmanGroup = DiffieHellmanGroup;
crypto_exports.getDiffieHellman = crypto_exports.createDiffieHellmanGroup = DiffieHellmanGroup;
crypto_exports.createDiffieHellman = createDiffieHellman;
crypto_exports.DiffieHellman = DiffieHellman;
crypto_exports.diffieHellman = diffieHellman;
crypto_exports.ECDH = ECDH;
crypto_exports.createECDH = function createECDH(curve) {
  return new ECDH(curve);
};
{
  let getDecoder2 = function(decoder, encoding) {
    const normalizedEncoding = normalizeEncoding(encoding);
    decoder ||= new StringDecoder(encoding);
    if (decoder.encoding !== normalizedEncoding) {
      if (normalizedEncoding === __intrinsic__undefined) {
        throw __intrinsic__makeErrorWithCode(254, encoding);
      }
      throw __intrinsic__makeErrorWithCode(264, "Cannot change encoding");
    }
    return decoder;
  }, Cipheriv2 = function(cipher, key2, iv, options) {
    if (!new.target) {
      return new Cipheriv2(cipher, key2, iv, options);
    }
    this[kHandle] = new Cipher(false, cipher, key2, iv, options);
    LazyTransform.__intrinsic__apply(this, [options]);
    this._decoder = null;
  }, Decipheriv2 = function(cipher, key2, iv, options) {
    if (!new.target) {
      return new Decipheriv2(cipher, key2, iv, options);
    }
    this[kHandle] = new Cipher(true, cipher, key2, iv, options);
    LazyTransform.__intrinsic__apply(this, [options]);
    this._decoder = null;
  };
  getDecoder = getDecoder2, Cipheriv = Cipheriv2, Decipheriv = Decipheriv2;
  __intrinsic__toClass(Cipheriv2, "Cipheriv", LazyTransform);
  Object.assign(Cipheriv2.prototype, {
    setAutoPadding: function(ap) {
      this[kHandle].setAutoPadding(ap);
      return this;
    },
    getAuthTag: function() {
      return this[kHandle].getAuthTag();
    },
    setAAD: function(aadbuf, options) {
      this[kHandle].setAAD(aadbuf, options);
      return this;
    },
    _transform: function(chunk, encoding, callback) {
      this.push(this[kHandle].update(chunk, encoding));
      callback();
    },
    _flush: function(callback) {
      try {
        this.push(this[kHandle].final());
      } catch (e) {
        callback(e);
        return;
      }
      callback();
    },
    update: function(data, inputEncoding, outputEncoding) {
      const res = this[kHandle].update(data, inputEncoding);
      if (outputEncoding && outputEncoding !== "buffer") {
        this._decoder = getDecoder2(this._decoder, outputEncoding);
        return this._decoder.write(res);
      }
      return res;
    },
    final: function(outputEncoding) {
      const res = this[kHandle].final();
      if (outputEncoding && outputEncoding !== "buffer") {
        this._decoder = getDecoder2(this._decoder, outputEncoding);
        return this._decoder.end(res);
      }
      return res;
    }
  });
  __intrinsic__toClass(Decipheriv2, "Decipheriv", LazyTransform);
  Object.assign(Decipheriv2.prototype, {
    setAutoPadding: Cipheriv2.prototype.setAutoPadding,
    setAuthTag: function(tagbuf, encoding) {
      this[kHandle].setAuthTag(tagbuf, encoding);
      return this;
    },
    setAAD: Cipheriv2.prototype.setAAD,
    _transform: Cipheriv2.prototype._transform,
    _flush: Cipheriv2.prototype._flush,
    update: Cipheriv2.prototype.update,
    final: Cipheriv2.prototype.final
  });
  crypto_exports.Cipheriv = Cipheriv2;
  crypto_exports.Decipheriv = Decipheriv2;
  crypto_exports.createCipheriv = function createCipheriv(cipher, key2, iv, options) {
    return new Cipheriv2(cipher, key2, iv, options);
  };
  crypto_exports.createDecipheriv = function createDecipheriv(cipher, key2, iv, options) {
    return new Decipheriv2(cipher, key2, iv, options);
  };
  crypto_exports.getCiphers = getCiphers;
}
var getDecoder;
var Cipheriv;
var Decipheriv;
crypto_exports.scrypt = scrypt;
crypto_exports.scryptSync = scryptSync;
crypto_exports.publicEncrypt = publicEncrypt;
crypto_exports.publicDecrypt = publicDecrypt;
crypto_exports.privateEncrypt = privateEncrypt;
crypto_exports.privateDecrypt = privateDecrypt;
$ = crypto_exports;
$$EXPORT$$($).$$EXPORT_END$$;
