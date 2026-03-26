// @bun
// build/release/tmp_modules/node/cluster.ts
var $, { isPrimary } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 12) || __intrinsic__createInternalModuleById(12), cluster = isPrimary ? __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 13) || __intrinsic__createInternalModuleById(13) : __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 11) || __intrinsic__createInternalModuleById(11);
$ = cluster;
function initializeClusterIPC() {
  if (process.argv[1] && process.env.NODE_UNIQUE_ID)
    cluster._setupWorker(), delete process.env.NODE_UNIQUE_ID;
}
if (Bun.isMainThread)
  initializeClusterIPC();
$$EXPORT$$($).$$EXPORT_END$$;
