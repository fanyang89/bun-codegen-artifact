// @bun
// build/release/tmp_modules/internal/fifo.ts
var $, slice = __intrinsic__Array.prototype.slice;

class Dequeue {
  _head;
  _tail;
  _capacityMask;
  _list;
  constructor() {
    this._head = 0, this._tail = 0, this._capacityMask = 3, this._list = __intrinsic__newArrayWithSize(4);
  }
  size() {
    if (this._head === this._tail)
      return 0;
    if (this._head < this._tail)
      return this._tail - this._head;
    else
      return this._capacityMask + 1 - (this._head - this._tail);
  }
  isEmpty() {
    return this.size() == 0;
  }
  isNotEmpty() {
    return this.size() > 0;
  }
  shift() {
    var { _head: head, _tail, _list, _capacityMask } = this;
    if (head === _tail)
      return __intrinsic__undefined;
    var item = _list[head];
    if (__intrinsic__putByValDirect(_list, head, __intrinsic__undefined), head = this._head = head + 1 & _capacityMask, head < 2 && _tail > 1e4 && _tail <= _list.length >>> 2)
      this._shrinkArray();
    return item;
  }
  peek() {
    if (this._head === this._tail)
      return __intrinsic__undefined;
    return this._list[this._head];
  }
  push(item) {
    var tail = this._tail;
    if (__intrinsic__putByValDirect(this._list, tail, item), this._tail = tail + 1 & this._capacityMask, this._tail === this._head)
      this._growArray();
  }
  toArray(fullCopy) {
    var list = this._list, len = __intrinsic__toLength(list.length);
    if (fullCopy || this._head > this._tail) {
      var _head = __intrinsic__toLength(this._head), _tail = __intrinsic__toLength(this._tail), total = __intrinsic__toLength(len - _head + _tail), array = __intrinsic__newArrayWithSize(total), j = 0;
      for (var i = _head;i < len; i++)
        __intrinsic__putByValDirect(array, j++, list[i]);
      for (var i = 0;i < _tail; i++)
        __intrinsic__putByValDirect(array, j++, list[i]);
      return array;
    } else
      return slice.__intrinsic__call(list, this._head, this._tail);
  }
  clear() {
    this._head = 0, this._tail = 0, this._list.fill(__intrinsic__undefined);
  }
  _growArray() {
    if (this._head)
      this._list = this.toArray(!0), this._head = 0;
    this._tail = __intrinsic__toLength(this._list.length), this._list.length <<= 1, this._capacityMask = this._capacityMask << 1 | 1;
  }
  _shrinkArray() {
    this._list.length >>>= 1, this._capacityMask >>>= 1;
  }
}
$ = Dequeue;
$$EXPORT$$($).$$EXPORT_END$$;
