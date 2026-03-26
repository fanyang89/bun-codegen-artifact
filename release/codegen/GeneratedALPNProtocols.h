#pragma once
#include "Bindgen/IDLTypes.h"

namespace Bun::Bindgen::Generated {
using IDLALPNProtocols = ::Bun::IDLOrderedUnion<::Bun::IDLStrictNull, ::Bun::IDLStrictString, ::Bun::IDLArrayBufferRef>;
using ALPNProtocols = IDLALPNProtocols::ImplementationType;
}
