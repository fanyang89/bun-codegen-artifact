// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Ipc.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(target,serialized,fd) {  const emit = __intrinsic__lazy(148);
  const net = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 104/*node:net*/) || __intrinsic__createInternalModuleById(104/*node:net*/));
  // const dgram = require("node:dgram");
  switch (serialized.type) {
    case "net.Server": {
      const server = new net.Server();
      server.listen({ fd }, () => {
        emit(target, serialized.message, server);
      });
      return;
    }
    case "net.Socket": {
      throw new Error("TODO case net.Socket");
    }
    case "dgram.Socket": {
      throw new Error("TODO case dgram.Socket");
    }
    default: {
      throw new Error("failed to parse handle");
    }
  }
}).$$capture_end$$;
