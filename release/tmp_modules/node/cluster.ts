// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/cluster.ts


// Hardcoded module "node:cluster"

const { isPrimary } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 12/*internal/cluster/isPrimary*/) || __intrinsic__createInternalModuleById(12/*internal/cluster/isPrimary*/));
const cluster = isPrimary ? (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 13/*internal/cluster/primary*/) || __intrinsic__createInternalModuleById(13/*internal/cluster/primary*/)) : (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 11/*internal/cluster/child*/) || __intrinsic__createInternalModuleById(11/*internal/cluster/child*/));
$ = cluster;

//
//

function initializeClusterIPC() {
  if (process.argv[1] && process.env.NODE_UNIQUE_ID) {
    cluster._setupWorker();
    // Make sure it's not accidentally inherited by child processes.
    delete process.env.NODE_UNIQUE_ID;
  }
}

if (Bun.isMainThread) {
  initializeClusterIPC();
}
;$$EXPORT$$($).$$EXPORT_END$$;
