#pragma once
// File generated via `create-hash-table.ts`
static constinit const struct CompactHashIndex processBindingConstantsTableIndex[16] = {
    { -1, -1 },
    { 0, -1 },
    { -1, -1 },
    { 3, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { 1, -1 },
    { -1, -1 },
    { 4, -1 },
    { -1, -1 },
    { -1, -1 },
    { 2, -1 },
    { -1, -1 },
};

static constinit const struct HashTableValue processBindingConstantsTableValues[5] = {
   { "os"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, processBindingConstantsGetOs } },
   { "fs"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, processBindingConstantsGetFs } },
   { "crypto"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, processBindingConstantsGetCrypto } },
   { "zlib"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, processBindingConstantsGetZlib } },
   { "trace"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, processBindingConstantsGetTrace } },
};

static constinit const struct HashTable processBindingConstantsTable =
    { 5, 15, false, nullptr, processBindingConstantsTableValues, processBindingConstantsTableIndex };
