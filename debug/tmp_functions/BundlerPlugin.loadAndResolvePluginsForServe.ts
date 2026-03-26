// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/BundlerPlugin.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(plugins,bunfig_folder,runSetupFn,) {  // Same config as created in HTMLBundle.init
  let config: BuildConfigExt = {
    experimentalCss: true,
    experimentalHtml: true,
    target: "browser",
    root: bunfig_folder,
  };

  class InvalidBundlerPluginError extends TypeError {
    pluginName: string;
    constructor(pluginName: string, reason: string) {
      super(`"${pluginName}" is not a valid bundler plugin: ${reason}`);
      this.pluginName = pluginName;
    }
  }

  let bundlerPlugin = this;
  let promiseResult = (async (
    plugins: string[],
    bunfig_folder: string,
    runSetupFn: typeof runSetupFunction,
    bundlerPlugin: BundlerPlugin,
  ) => {
    let onstart_promises_array: Array<Promise<any>> | undefined = undefined;
    for (let i = 0; i < plugins.length; i++) {
      let pluginModuleResolved = await Bun.resolve(plugins[i], bunfig_folder);

      let pluginModuleRaw = await import(pluginModuleResolved);
      if (!pluginModuleRaw || !pluginModuleRaw.default) {
        __intrinsic__throwTypeError(`Expected "${plugins[i]}" to be a module which default exports a bundler plugin.`);
      }
      let pluginModule = pluginModuleRaw.default;
      if (!pluginModule) throw new InvalidBundlerPluginError(plugins[i], "default export is missing");
      if (pluginModule.name === undefined) throw new InvalidBundlerPluginError(plugins[i], "name is missing");
      if (pluginModule.setup === undefined) throw new InvalidBundlerPluginError(plugins[i], "setup() is missing");
      onstart_promises_array = await runSetupFn.__intrinsic__apply(bundlerPlugin, [
        pluginModule.setup,
        config,
        onstart_promises_array,
        i === plugins.length - 1,
        false,
      ]);
    }
    if (onstart_promises_array !== undefined) {
      await Promise.all(onstart_promises_array);
    }
  })(plugins, bunfig_folder, runSetupFn, bundlerPlugin);

  return promiseResult;
}).$$capture_end$$;
