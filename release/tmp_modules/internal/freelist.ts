// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/freelist.ts


class FreeList {
  name: string;
  max: number;
  ctor: Function;
  list: any[];

  constructor(name: string, max: number, ctor: Function) {
    this.name = name;
    this.ctor = ctor;
    this.max = max;
    this.list = [];
  }

  alloc() {
    return this.list.length > 0 ? this.list.pop() : new (this.ctor as any)(...arguments);
  }

  free(obj: any) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  }
}

$ = FreeList;
;$$EXPORT$$($).$$EXPORT_END$$;
