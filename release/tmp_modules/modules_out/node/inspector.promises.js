// @bun
// build/release/tmp_modules/node/inspector.promises.ts
var $, inspector = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 103) || __intrinsic__createInternalModuleById(103), { Session: BaseSession, console, open, close, url, waitForDebugger } = inspector;

class Session extends BaseSession {
  post(method, params) {
    return new __intrinsic__Promise((resolve, reject) => {
      super.post(method, params, (err, result) => {
        if (err)
          reject(err);
        else
          resolve(result);
      });
    });
  }
}
$ = {
  console,
  open,
  close,
  url,
  waitForDebugger,
  Session
};
$$EXPORT$$($).$$EXPORT_END$$;
