#pragma once
#include "Bindgen/ExternTraits.h"
#include "JSDOMConvertEnumeration.h"

namespace Bun {
namespace Bindgen {
namespace Generated {
enum class SocketConfigBinaryType : ::std::uint32_t {
    kArraybuffer,
    kBuffer,
    kUint8array,
};
using IDLSocketConfigBinaryType = ::WebCore::IDLEnumeration<Generated::SocketConfigBinaryType>;
}
template<> struct ExternTraits<Generated::SocketConfigBinaryType> : TrivialExtern<Generated::SocketConfigBinaryType> {};
}
template<>
struct IDLHumanReadableName<::WebCore::IDLEnumeration<Bindgen::Generated::SocketConfigBinaryType>>
    : BaseIDLHumanReadableName {
    static constexpr auto humanReadableName
        = std::to_array("\"arraybuffer\", \"buffer\", or \"uint8array\"");
};
}

template<> std::optional<Bun::Bindgen::Generated::SocketConfigBinaryType>
WebCore::parseEnumerationFromString<Bun::Bindgen::Generated::SocketConfigBinaryType>(
    const WTF::String&);

template<> std::optional<Bun::Bindgen::Generated::SocketConfigBinaryType>
WebCore::parseEnumeration<Bun::Bindgen::Generated::SocketConfigBinaryType>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value);
