#pragma once
// File generated via `create-hash-table.ts`
static constinit const struct CompactHashIndex JSEventTableIndex[2] = {
    { -1, -1 },
    { 0, -1 },
};

static constinit const struct HashTableValue JSEventTableValues[1] = {
   { "isTrusted"_s, static_cast<unsigned>(PropertyAttribute::DontDelete|PropertyAttribute::ReadOnly|PropertyAttribute::CustomAccessor|PropertyAttribute::DOMAttribute), NoIntrinsic, { HashTableValue::GetterSetterType, jsEvent_isTrusted, 0 } },
};

static constinit const struct HashTable JSEventTable =
    { 1, 1, true, nullptr, JSEventTableValues, JSEventTableIndex };
