#pragma once
#include "Bindgen/IDLTypes.h"
#include <GeneratedSSLConfig.h>

namespace Bun::Bindgen::Generated {
using IDLSocketConfigTLS = ::Bun::IDLOrderedUnion<::Bun::IDLStrictNull, ::Bun::IDLStrictBoolean, ::Bun::Bindgen::Generated::IDLSSLConfig>;
using SocketConfigTLS = IDLSocketConfigTLS::ImplementationType;
}
