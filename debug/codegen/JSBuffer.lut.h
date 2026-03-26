#pragma once
// File generated via `create-hash-table.ts`
static constinit const struct CompactHashIndex jsBufferConstructorTableIndex[33] = {
    { -1, -1 },
    { 8, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { 7, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { 6, -1 },
    { 9, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { 1, 32 },
    { -1, -1 },
    { -1, -1 },
    { 3, -1 },
    { -1, -1 },
    { 2, -1 },
    { -1, -1 },
    { -1, -1 },
    { 0, -1 },
    { 5, -1 },
    { 4, -1 },
};

static constinit const struct HashTableValue jsBufferConstructorTableValues[10] = {
   { "alloc"_s, static_cast<unsigned>(PropertyAttribute::Constructable|PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_alloc, 1 } },
   { "allocUnsafe"_s, static_cast<unsigned>(PropertyAttribute::Constructable|PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_allocUnsafe, 1 } },
   { "allocUnsafeSlow"_s, static_cast<unsigned>(PropertyAttribute::Constructable|PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_allocUnsafeSlow, 1 } },
   { "byteLength"_s, static_cast<unsigned>(PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_byteLength, 2 } },
   { "compare"_s, static_cast<unsigned>(PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_compare, 2 } },
   { "concat"_s, static_cast<unsigned>(PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_concat, 2 } },
   { "copyBytesFrom"_s, static_cast<unsigned>(PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_copyBytesFrom, 1 } },
   { "from"_s, ((static_cast<unsigned>(PropertyAttribute::Builtin|PropertyAttribute::Function)) & ~PropertyAttribute::Function) | PropertyAttribute::Builtin, NoIntrinsic, { HashTableValue::BuiltinGeneratorType, jsBufferConstructorFromCodeGenerator, 1 } },
   { "isBuffer"_s, ((static_cast<unsigned>(PropertyAttribute::Builtin|PropertyAttribute::Function)) & ~PropertyAttribute::Function) | PropertyAttribute::Builtin, NoIntrinsic, { HashTableValue::BuiltinGeneratorType, jsBufferConstructorIsBufferCodeGenerator, 1 } },
   { "isEncoding"_s, static_cast<unsigned>(PropertyAttribute::Function), NoIntrinsic, { HashTableValue::NativeFunctionType, &jsBufferConstructorFunction_isEncoding, 1 } },
};

static constinit const struct HashTable jsBufferConstructorTable =
    { 10, 31, false, nullptr, jsBufferConstructorTableValues, jsBufferConstructorTableIndex };
