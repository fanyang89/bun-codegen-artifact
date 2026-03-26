(function (){"use strict";// build/debug/tmp_modules/internal/freelist.ts
var $;

class FreeList {
  name;
  max;
  ctor;
  list;
  constructor(name, max, ctor) {
    this.name = name;
    this.ctor = ctor;
    this.max = max;
    this.list = [];
  }
  alloc() {
    return this.list.length > 0 ? this.list.pop() : new this.ctor(...arguments);
  }
  free(obj) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  }
}
$ = FreeList;
return $})
