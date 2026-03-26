// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ProcessObjectInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(process,nextTickQueue,drainMicrotasksFn,reportUncaughtExceptionFn,) {  var queue;
  var process;
  var nextTickQueue = nextTickQueue;
  var drainMicrotasks = drainMicrotasksFn;
  var reportUncaughtException = reportUncaughtExceptionFn;

  const { validateFunction } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));

  var setup;
  setup = () => {
    const { FixedQueue } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 18/*internal/fixed_queue*/) || __intrinsic__createInternalModuleById(18/*internal/fixed_queue*/));
    queue = new FixedQueue();

    function processTicksAndRejections() {
      var tock;
      do {
        while ((tock = queue.shift()) !== null) {
          var callback = tock.callback;
          var args = tock.args;
          var frame = tock.frame;
          var restore = __intrinsic__getInternalField(__intrinsic__asyncContext, 0);
          __intrinsic__putInternalField(__intrinsic__asyncContext, 0, frame);
          try {
            if (args === undefined) {
              callback();
            } else {
              switch (args.length) {
                case 1:
                  callback(args[0]);
                  break;
                case 2:
                  callback(args[0], args[1]);
                  break;
                case 3:
                  callback(args[0], args[1], args[2]);
                  break;
                case 4:
                  callback(args[0], args[1], args[2], args[3]);
                  break;
                default:
                  callback(...args);
                  break;
              }
            }
          } catch (e) {
            reportUncaughtException(e);
          } finally {
            __intrinsic__putInternalField(__intrinsic__asyncContext, 0, restore);
          }
        }

        drainMicrotasks();
      } while (!queue.isEmpty());
    }

    __intrinsic__putInternalField(nextTickQueue, 0, 0);
    __intrinsic__putInternalField(nextTickQueue, 1, queue);
    __intrinsic__putInternalField(nextTickQueue, 2, processTicksAndRejections);
    setup = undefined;
  };

  function nextTick(cb, ...args) {
    validateFunction(cb, "callback");
    if (setup) {
      setup();
      process = globalThis.process;
    }
    if (process._exiting) return;

    queue.push({
      callback: cb,
      // We want to avoid materializing the args if there are none because it's
      // a waste of memory and Array.prototype.slice shows up in profiling.
      args: __intrinsic__argumentCount() > 1 ? args : undefined,
      frame: __intrinsic__getInternalField(__intrinsic__asyncContext, 0),
    });
    __intrinsic__putInternalField(nextTickQueue, 0, 1);
  }

  return nextTick;
}).$$capture_end$$;
