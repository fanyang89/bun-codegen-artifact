// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/inspector.promises.ts


// Hardcoded module "node:inspector/promises"
const inspector = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 103/*node:inspector*/) || __intrinsic__createInternalModuleById(103/*node:inspector*/));

const { Session: BaseSession, console, open, close, url, waitForDebugger } = inspector;

// Promise-based Session that wraps the callback-based Session
class Session extends BaseSession {
  post(method: string, params?: object): Promise<any> {
    return new Promise((resolve, reject) => {
      super.post(method, params, (err: Error | null, result: any) => {
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
  Session,
};
;$$EXPORT$$($).$$EXPORT_END$$;
