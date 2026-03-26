#pragma once
// File generated via `create-hash-table.ts`
static constinit const struct CompactHashIndex processBindingHTTPParserTableIndex[9] = {
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { -1, -1 },
    { 1, -1 },
    { 0, -1 },
    { 2, 8 },
    { 3, -1 },
};

static constinit const struct HashTableValue processBindingHTTPParserTableValues[4] = {
   { "methods"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, ProcessBindingHTTPParser_methods } },
   { "allMethods"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, ProcessBindingHTTPParser_allMethods } },
   { "HTTPParser"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, ProcessBindingHTTPParser_HTTPParser } },
   { "ConnectionsList"_s, static_cast<unsigned>(PropertyAttribute::PropertyCallback), NoIntrinsic, { HashTableValue::LazyPropertyType, ProcessBindingHTTPParser_ConnectionsList } },
};

static constinit const struct HashTable processBindingHTTPParserTable =
    { 4, 7, false, nullptr, processBindingHTTPParserTableValues, processBindingHTTPParserTableIndex };
