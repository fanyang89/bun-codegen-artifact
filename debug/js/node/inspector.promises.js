(function (){"use strict";// build/debug/tmp_modules/node/inspector.promises.ts
var $;
var inspector = @getInternalField(@internalModuleRegistry, 103) || @createInternalModuleById(103);
var { Session: BaseSession, console, open, close, url, waitForDebugger } = inspector;

class Session extends BaseSession {
  post(method, params) {
    return new @Promise((resolve, reject) => {
      super.post(method, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
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
return $})
