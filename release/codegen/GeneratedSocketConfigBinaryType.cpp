#include "root.h"
#include "GeneratedSocketConfigBinaryType.h"
#include <wtf/SortedArrayMap.h>

template<> std::optional<Bun::Bindgen::Generated::SocketConfigBinaryType>
WebCore::parseEnumerationFromString<Bun::Bindgen::Generated::SocketConfigBinaryType>(const WTF::String& stringVal)
{
    static constexpr ::WTF::SortedArrayMap enumerationMapping { ::std::to_array<::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType>>({
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "ArrayBuffer"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kArraybuffer,
        },
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "Buffer"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kBuffer,
        },
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "Uint8Array"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kUint8array,
        },
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "arraybuffer"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kArraybuffer,
        },
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "buffer"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kBuffer,
        },
        ::std::pair<::WTF::ComparableASCIILiteral, ::Bun::Bindgen::Generated::SocketConfigBinaryType> {
            "uint8array"_s,
            ::Bun::Bindgen::Generated::SocketConfigBinaryType::kUint8array,
        },
    }) };
    if (auto* enumerationValue = enumerationMapping.tryGet(stringVal)) [[likely]] {
        return *enumerationValue;
    }
    return std::nullopt;
}

template<> std::optional<Bun::Bindgen::Generated::SocketConfigBinaryType>
WebCore::parseEnumeration<Bun::Bindgen::Generated::SocketConfigBinaryType>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value)
{
    return parseEnumerationFromString<::Bun::Bindgen::Generated::SocketConfigBinaryType>(
        value.toWTFString(&globalObject)
    );
}
