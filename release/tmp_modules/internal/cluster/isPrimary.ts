// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/cluster/isPrimary.ts


// tiny module to shortcut getting access to this boolean without loading the entire node:cluster module
$ = {
  isPrimary: Bun.env.NODE_UNIQUE_ID == null,
};
;$$EXPORT$$($).$$EXPORT_END$$;
