#pragma once
#include "Bindgen.h"
#include "JSDOMConvertDictionary.h"
#include <GeneratedSocketConfigBinaryType.h>

namespace Bun {
namespace Bindgen {
namespace Generated {
struct SocketConfigHandlers {
    using MemberType0 = ::Bun::IDLRawAny::ImplementationType;
    MemberType0 onOpen;
    using MemberType1 = ::Bun::IDLRawAny::ImplementationType;
    MemberType1 onClose;
    using MemberType2 = ::Bun::IDLRawAny::ImplementationType;
    MemberType2 onError;
    using MemberType3 = ::Bun::IDLRawAny::ImplementationType;
    MemberType3 onData;
    using MemberType4 = ::Bun::IDLRawAny::ImplementationType;
    MemberType4 onWritable;
    using MemberType5 = ::Bun::IDLRawAny::ImplementationType;
    MemberType5 onHandshake;
    using MemberType6 = ::Bun::IDLRawAny::ImplementationType;
    MemberType6 onEnd;
    using MemberType7 = ::Bun::IDLRawAny::ImplementationType;
    MemberType7 onConnectError;
    using MemberType8 = ::Bun::IDLRawAny::ImplementationType;
    MemberType8 onTimeout;
    using MemberType9 = ::Bun::Bindgen::Generated::IDLSocketConfigBinaryType::ImplementationType;
    MemberType9 binary_type;
};
using IDLSocketConfigHandlers = ::WebCore::IDLDictionary<SocketConfigHandlers>;
struct ExternSocketConfigHandlers {
    using MemberType0 = ExternTraits<SocketConfigHandlers::MemberType0>::ExternType;
    MemberType0 onOpen;
    using MemberType1 = ExternTraits<SocketConfigHandlers::MemberType1>::ExternType;
    MemberType1 onClose;
    using MemberType2 = ExternTraits<SocketConfigHandlers::MemberType2>::ExternType;
    MemberType2 onError;
    using MemberType3 = ExternTraits<SocketConfigHandlers::MemberType3>::ExternType;
    MemberType3 onData;
    using MemberType4 = ExternTraits<SocketConfigHandlers::MemberType4>::ExternType;
    MemberType4 onWritable;
    using MemberType5 = ExternTraits<SocketConfigHandlers::MemberType5>::ExternType;
    MemberType5 onHandshake;
    using MemberType6 = ExternTraits<SocketConfigHandlers::MemberType6>::ExternType;
    MemberType6 onEnd;
    using MemberType7 = ExternTraits<SocketConfigHandlers::MemberType7>::ExternType;
    MemberType7 onConnectError;
    using MemberType8 = ExternTraits<SocketConfigHandlers::MemberType8>::ExternType;
    MemberType8 onTimeout;
    using MemberType9 = ExternTraits<SocketConfigHandlers::MemberType9>::ExternType;
    MemberType9 binary_type;
};
extern "C" bool bindgenConvertJSToSocketConfigHandlers(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSocketConfigHandlers* result);
}

template<> struct ExternTraits<Generated::SocketConfigHandlers> {
    using ExternType = Generated::ExternSocketConfigHandlers;
    static ExternType convertToExtern(Generated::SocketConfigHandlers&& cppValue)
    {
        return ExternType {
            .onOpen = ExternTraits<Generated::SocketConfigHandlers::MemberType0>::convertToExtern(::std::move(cppValue.onOpen)),
            .onClose = ExternTraits<Generated::SocketConfigHandlers::MemberType1>::convertToExtern(::std::move(cppValue.onClose)),
            .onError = ExternTraits<Generated::SocketConfigHandlers::MemberType2>::convertToExtern(::std::move(cppValue.onError)),
            .onData = ExternTraits<Generated::SocketConfigHandlers::MemberType3>::convertToExtern(::std::move(cppValue.onData)),
            .onWritable = ExternTraits<Generated::SocketConfigHandlers::MemberType4>::convertToExtern(::std::move(cppValue.onWritable)),
            .onHandshake = ExternTraits<Generated::SocketConfigHandlers::MemberType5>::convertToExtern(::std::move(cppValue.onHandshake)),
            .onEnd = ExternTraits<Generated::SocketConfigHandlers::MemberType6>::convertToExtern(::std::move(cppValue.onEnd)),
            .onConnectError = ExternTraits<Generated::SocketConfigHandlers::MemberType7>::convertToExtern(::std::move(cppValue.onConnectError)),
            .onTimeout = ExternTraits<Generated::SocketConfigHandlers::MemberType8>::convertToExtern(::std::move(cppValue.onTimeout)),
            .binary_type = ExternTraits<Generated::SocketConfigHandlers::MemberType9>::convertToExtern(::std::move(cppValue.binary_type)),
        };
    }
};
}

template<>
struct IDLHumanReadableName<::WebCore::IDLDictionary<Bindgen::Generated::SocketConfigHandlers>>
    : BaseIDLHumanReadableName {
    static constexpr auto humanReadableName
        = ::std::to_array("SocketHandler");
};
}

template<> Bun::Bindgen::Generated::SocketConfigHandlers
WebCore::convertDictionary<Bun::Bindgen::Generated::SocketConfigHandlers>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value);

template<> struct WebCore::IDLDictionary<::Bun::Bindgen::Generated::SocketConfigHandlers>
    : ::Bun::Bindgen::IDLStackOnlyDictionary<::Bun::Bindgen::Generated::SocketConfigHandlers> {};
