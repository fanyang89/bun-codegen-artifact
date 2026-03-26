#pragma once
#include "root.h"
#include "JSDOMConvertEnumeration.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Fmt_jsFmtString(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/fmt.zig
namespace fmt {

enum class Formatter : uint8_t {
    EscapePowershell,
    HighlightJavascript,
};

constexpr auto* jsFmtString = &bindgen_Fmt_jsFmtString;

} // namespace fmt

} // namespace Generated

namespace WebCore {

// Implement WebCore::IDLEnumeration trait for Formatter
String convertEnumerationToString(Generated::fmt::Formatter);
template<> JSC::JSString* convertEnumerationToJS(JSC::JSGlobalObject&, Generated::fmt::Formatter);
template<> std::optional<Generated::fmt::Formatter> parseEnumerationFromString<Generated::fmt::Formatter>(const String&);
template<> std::optional<Generated::fmt::Formatter> parseEnumeration<Generated::fmt::Formatter>(JSC::JSGlobalObject&, JSC::JSValue);
template<> ASCIILiteral expectedEnumerationValues<Generated::fmt::Formatter>();

} // namespace WebCore
