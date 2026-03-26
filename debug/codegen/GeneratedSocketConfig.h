#pragma once
#include "Bindgen.h"
#include "JSDOMConvertDictionary.h"
#include <GeneratedSocketConfigHandlers.h>
#include <GeneratedSocketConfigTLS.h>

namespace Bun {
namespace Bindgen {
namespace Generated {
struct SocketConfig {
    using MemberType0 = ::Bun::Bindgen::Generated::IDLSocketConfigHandlers::ImplementationType;
    MemberType0 handlers;
    using MemberType1 = ::Bun::IDLRawAny::ImplementationType;
    MemberType1 data;
    using MemberType2 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType2 allow_half_open;
    using MemberType3 = ::Bun::IDLLooseNullable<::Bun::IDLDOMString>::ImplementationType;
    MemberType3 hostname;
    using MemberType4 = ::WebCore::IDLNullable<::Bun::IDLLooseInteger<::std::uint16_t>>::ImplementationType;
    MemberType4 port;
    using MemberType5 = ::Bun::Bindgen::Generated::IDLSocketConfigTLS::ImplementationType;
    MemberType5 tls;
    using MemberType6 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType6 exclusive;
    using MemberType7 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType7 reuse_port;
    using MemberType8 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType8 ipv6_only;
    using MemberType9 = ::Bun::IDLLooseNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType9 unix_;
    using MemberType10 = ::WebCore::IDLOptional<::Bun::IDLStrictInteger<::std::int32_t>>::ImplementationType;
    MemberType10 fd;
};
using IDLSocketConfig = ::WebCore::IDLDictionary<SocketConfig>;
struct ExternSocketConfig {
    using MemberType0 = ExternTraits<SocketConfig::MemberType0>::ExternType;
    MemberType0 handlers;
    using MemberType1 = ExternTraits<SocketConfig::MemberType1>::ExternType;
    MemberType1 data;
    using MemberType2 = ExternTraits<SocketConfig::MemberType2>::ExternType;
    MemberType2 allow_half_open;
    using MemberType3 = ExternTraits<SocketConfig::MemberType3>::ExternType;
    MemberType3 hostname;
    using MemberType4 = ExternTraits<SocketConfig::MemberType4>::ExternType;
    MemberType4 port;
    using MemberType5 = ExternTraits<SocketConfig::MemberType5>::ExternType;
    MemberType5 tls;
    using MemberType6 = ExternTraits<SocketConfig::MemberType6>::ExternType;
    MemberType6 exclusive;
    using MemberType7 = ExternTraits<SocketConfig::MemberType7>::ExternType;
    MemberType7 reuse_port;
    using MemberType8 = ExternTraits<SocketConfig::MemberType8>::ExternType;
    MemberType8 ipv6_only;
    using MemberType9 = ExternTraits<SocketConfig::MemberType9>::ExternType;
    MemberType9 unix_;
    using MemberType10 = ExternTraits<SocketConfig::MemberType10>::ExternType;
    MemberType10 fd;
};
extern "C" bool bindgenConvertJSToSocketConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSocketConfig* result);
}

template<> struct ExternTraits<Generated::SocketConfig> {
    using ExternType = Generated::ExternSocketConfig;
    static ExternType convertToExtern(Generated::SocketConfig&& cppValue)
    {
        return ExternType {
            .handlers = ExternTraits<Generated::SocketConfig::MemberType0>::convertToExtern(::std::move(cppValue.handlers)),
            .data = ExternTraits<Generated::SocketConfig::MemberType1>::convertToExtern(::std::move(cppValue.data)),
            .allow_half_open = ExternTraits<Generated::SocketConfig::MemberType2>::convertToExtern(::std::move(cppValue.allow_half_open)),
            .hostname = ExternTraits<Generated::SocketConfig::MemberType3>::convertToExtern(::std::move(cppValue.hostname)),
            .port = ExternTraits<Generated::SocketConfig::MemberType4>::convertToExtern(::std::move(cppValue.port)),
            .tls = ExternTraits<Generated::SocketConfig::MemberType5>::convertToExtern(::std::move(cppValue.tls)),
            .exclusive = ExternTraits<Generated::SocketConfig::MemberType6>::convertToExtern(::std::move(cppValue.exclusive)),
            .reuse_port = ExternTraits<Generated::SocketConfig::MemberType7>::convertToExtern(::std::move(cppValue.reuse_port)),
            .ipv6_only = ExternTraits<Generated::SocketConfig::MemberType8>::convertToExtern(::std::move(cppValue.ipv6_only)),
            .unix_ = ExternTraits<Generated::SocketConfig::MemberType9>::convertToExtern(::std::move(cppValue.unix_)),
            .fd = ExternTraits<Generated::SocketConfig::MemberType10>::convertToExtern(::std::move(cppValue.fd)),
        };
    }
};
}

template<>
struct IDLHumanReadableName<::WebCore::IDLDictionary<Bindgen::Generated::SocketConfig>>
    : BaseIDLHumanReadableName {
    static constexpr auto humanReadableName
        = ::std::to_array("SocketOptions");
};
}

template<> Bun::Bindgen::Generated::SocketConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::SocketConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value);

template<> struct WebCore::IDLDictionary<::Bun::Bindgen::Generated::SocketConfig>
    : ::Bun::Bindgen::IDLStackOnlyDictionary<::Bun::Bindgen::Generated::SocketConfig> {};
