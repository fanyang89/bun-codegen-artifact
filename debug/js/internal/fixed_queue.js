(function (){"use strict";// build/debug/tmp_modules/internal/fixed_queue.ts
var $;
var kSize = 2048;
var kMask = kSize - 1;

class FixedCircularBuffer {
  top;
  bottom;
  list;
  next;
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = @newArrayWithSize(kSize);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    var { list, bottom } = this;
    const nextItem = list[bottom];
    if (nextItem === @undefined)
      return null;
    list[bottom] = @undefined;
    this.bottom = bottom + 1 & kMask;
    return nextItem;
  }
}

class FixedQueue {
  head;
  tail;
  constructor() {
    this.head = this.tail = new FixedCircularBuffer;
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer;
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
      tail.next = null;
    }
    return next;
  }
}
$ = {
  FixedCircularBuffer,
  FixedQueue
};
return $})
