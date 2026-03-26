#pragma once
#include "Bindgen.h"
#include "JSDOMConvertDictionary.h"
#include <GeneratedSSLConfigFile.h>
#include <GeneratedALPNProtocols.h>

namespace Bun {
namespace Bindgen {
namespace Generated {
struct SSLConfig {
    using MemberType0 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType0 passphrase;
    using MemberType1 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType1 dh_params_file;
    using MemberType2 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType2 server_name;
    using MemberType3 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType3 low_memory_mode;
    using MemberType4 = ::WebCore::IDLNullable<::Bun::IDLStrictBoolean>::ImplementationType;
    MemberType4 reject_unauthorized;
    using MemberType5 = ::Bun::IDLStrictBoolean::ImplementationType;
    MemberType5 request_cert;
    using MemberType6 = ::Bun::Bindgen::Generated::IDLSSLConfigFile::ImplementationType;
    MemberType6 ca;
    using MemberType7 = ::Bun::Bindgen::Generated::IDLSSLConfigFile::ImplementationType;
    MemberType7 cert;
    using MemberType8 = ::Bun::Bindgen::Generated::IDLSSLConfigFile::ImplementationType;
    MemberType8 key;
    using MemberType9 = ::Bun::IDLStrictInteger<::std::uint32_t>::ImplementationType;
    MemberType9 secure_options;
    using MemberType10 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType10 key_file;
    using MemberType11 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType11 cert_file;
    using MemberType12 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType12 ca_file;
    using MemberType13 = ::Bun::Bindgen::Generated::IDLALPNProtocols::ImplementationType;
    MemberType13 alpn_protocols;
    using MemberType14 = ::WebCore::IDLNullable<::Bun::IDLStrictString>::ImplementationType;
    MemberType14 ciphers;
    using MemberType15 = ::Bun::IDLStrictInteger<::std::uint32_t>::ImplementationType;
    MemberType15 client_renegotiation_limit;
    using MemberType16 = ::Bun::IDLStrictInteger<::std::uint32_t>::ImplementationType;
    MemberType16 client_renegotiation_window;
};
using IDLSSLConfig = ::WebCore::IDLDictionary<SSLConfig>;
struct ExternSSLConfig {
    using MemberType0 = ExternTraits<SSLConfig::MemberType0>::ExternType;
    MemberType0 passphrase;
    using MemberType1 = ExternTraits<SSLConfig::MemberType1>::ExternType;
    MemberType1 dh_params_file;
    using MemberType2 = ExternTraits<SSLConfig::MemberType2>::ExternType;
    MemberType2 server_name;
    using MemberType3 = ExternTraits<SSLConfig::MemberType3>::ExternType;
    MemberType3 low_memory_mode;
    using MemberType4 = ExternTraits<SSLConfig::MemberType4>::ExternType;
    MemberType4 reject_unauthorized;
    using MemberType5 = ExternTraits<SSLConfig::MemberType5>::ExternType;
    MemberType5 request_cert;
    using MemberType6 = ExternTraits<SSLConfig::MemberType6>::ExternType;
    MemberType6 ca;
    using MemberType7 = ExternTraits<SSLConfig::MemberType7>::ExternType;
    MemberType7 cert;
    using MemberType8 = ExternTraits<SSLConfig::MemberType8>::ExternType;
    MemberType8 key;
    using MemberType9 = ExternTraits<SSLConfig::MemberType9>::ExternType;
    MemberType9 secure_options;
    using MemberType10 = ExternTraits<SSLConfig::MemberType10>::ExternType;
    MemberType10 key_file;
    using MemberType11 = ExternTraits<SSLConfig::MemberType11>::ExternType;
    MemberType11 cert_file;
    using MemberType12 = ExternTraits<SSLConfig::MemberType12>::ExternType;
    MemberType12 ca_file;
    using MemberType13 = ExternTraits<SSLConfig::MemberType13>::ExternType;
    MemberType13 alpn_protocols;
    using MemberType14 = ExternTraits<SSLConfig::MemberType14>::ExternType;
    MemberType14 ciphers;
    using MemberType15 = ExternTraits<SSLConfig::MemberType15>::ExternType;
    MemberType15 client_renegotiation_limit;
    using MemberType16 = ExternTraits<SSLConfig::MemberType16>::ExternType;
    MemberType16 client_renegotiation_window;
};
extern "C" bool bindgenConvertJSToSSLConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSSLConfig* result);
}

template<> struct ExternTraits<Generated::SSLConfig> {
    using ExternType = Generated::ExternSSLConfig;
    static ExternType convertToExtern(Generated::SSLConfig&& cppValue)
    {
        return ExternType {
            .passphrase = ExternTraits<Generated::SSLConfig::MemberType0>::convertToExtern(::std::move(cppValue.passphrase)),
            .dh_params_file = ExternTraits<Generated::SSLConfig::MemberType1>::convertToExtern(::std::move(cppValue.dh_params_file)),
            .server_name = ExternTraits<Generated::SSLConfig::MemberType2>::convertToExtern(::std::move(cppValue.server_name)),
            .low_memory_mode = ExternTraits<Generated::SSLConfig::MemberType3>::convertToExtern(::std::move(cppValue.low_memory_mode)),
            .reject_unauthorized = ExternTraits<Generated::SSLConfig::MemberType4>::convertToExtern(::std::move(cppValue.reject_unauthorized)),
            .request_cert = ExternTraits<Generated::SSLConfig::MemberType5>::convertToExtern(::std::move(cppValue.request_cert)),
            .ca = ExternTraits<Generated::SSLConfig::MemberType6>::convertToExtern(::std::move(cppValue.ca)),
            .cert = ExternTraits<Generated::SSLConfig::MemberType7>::convertToExtern(::std::move(cppValue.cert)),
            .key = ExternTraits<Generated::SSLConfig::MemberType8>::convertToExtern(::std::move(cppValue.key)),
            .secure_options = ExternTraits<Generated::SSLConfig::MemberType9>::convertToExtern(::std::move(cppValue.secure_options)),
            .key_file = ExternTraits<Generated::SSLConfig::MemberType10>::convertToExtern(::std::move(cppValue.key_file)),
            .cert_file = ExternTraits<Generated::SSLConfig::MemberType11>::convertToExtern(::std::move(cppValue.cert_file)),
            .ca_file = ExternTraits<Generated::SSLConfig::MemberType12>::convertToExtern(::std::move(cppValue.ca_file)),
            .alpn_protocols = ExternTraits<Generated::SSLConfig::MemberType13>::convertToExtern(::std::move(cppValue.alpn_protocols)),
            .ciphers = ExternTraits<Generated::SSLConfig::MemberType14>::convertToExtern(::std::move(cppValue.ciphers)),
            .client_renegotiation_limit = ExternTraits<Generated::SSLConfig::MemberType15>::convertToExtern(::std::move(cppValue.client_renegotiation_limit)),
            .client_renegotiation_window = ExternTraits<Generated::SSLConfig::MemberType16>::convertToExtern(::std::move(cppValue.client_renegotiation_window)),
        };
    }
};
}

template<>
struct IDLHumanReadableName<::WebCore::IDLDictionary<Bindgen::Generated::SSLConfig>>
    : BaseIDLHumanReadableName {
    static constexpr auto humanReadableName
        = ::std::to_array("TLSOptions");
};
}

template<> Bun::Bindgen::Generated::SSLConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::SSLConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value);
