// CodePen Demo
// https://codepen.io/RJLeyra/debug/dyMxpQM

"use strict";

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
};

var Node = function Node(val) {
  _classCallCheck(this, Node);

  this.val = val;
  this.next = null;
};

var SinglyLinkedList = /*#__PURE__*/ function () {
  function SinglyLinkedList() {
    _classCallCheck(this, SinglyLinkedList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(SinglyLinkedList, [{
    key: "push",
    value: function push(val) {
      var newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
        this.tail = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }

      this.length++;
      return this;
    }
  }, {
    key: "pop",
    value: function pop() {
      if (!this.head) return undefined;
      var current = this.head;
      var newTail = current;

      while (current.next) {
        newTail = current;
        current = current.next;
      }

      this.tail = newTail;
      this.tail.next = null;
      this.length--;

      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }

      return current;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (!this.head) return undefined;
      var currentHead = this.head;
      this.head = currentHead.next;
      this.length--;

      if (this.length === 0) {
        this.tail = null;
      }

      return currentHead;
    }
  }, {
    key: "unshift",
    value: function unshift(val) {
      var newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
        this.tail = this.head;
      }

      newNode.next = this.head;
      this.head = newNode;
      this.length++;
      return this;
    }
  }, {
    key: "get",
    value: function get(index) {
      if (index < 0 || index >= this.length) return null;
      var counter = 0;
      var current = this.head;

      while (counter !== index) {
        current = current.next;
        counter++;
      }

      return current;
    }
  }, {
    key: "set",
    value: function set(index, val) {
      var foundNode = this.get(index);

      if (foundNode) {
        foundNode.val = val;
        return true;
      }

      return false;
    }
  }, {
    key: "insert",
    value: function insert(index, val) {
      if (index < 0 || index > this.length) return false;
      if (index === this.length) return !!this.push(val);
      if (index === 0) return !!this.unshift(val);
      var newNode = new Node(val);
      var prev = this.get(index - 1);
      var temp = prev.next;
      prev.next = newNode;
      newNode.next = temp;
      this.length++;
      return true;
    }
  }, {
    key: "remove",
    value: function remove(index) {
      if (index < 0 || index >= this.length) return undefined;
      if (index === 0) return this.shift();
      if (index === this.length - 1) return this.pop();
      var previousNode = this.get(index - 1);
      var removed = previousNode.next;
      previousNode.next = removed.next;
      this.length--;
      return removed;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var node = this.head;
      this.head = this.tail;
      this.tail = node;
      var next;
      var prev = null;

      for (var i = 0; i < this.length; i++) {
        next = node.next;
        node.next = prev;
        prev = node;
        node = next;
      }

      return this;
    }
  }, {
    key: "print",
    value: function print() {
      var arr = [];
      var current = this.head;

      while (current) {
        arr.push(current.val);
        current = current.next;
      }

      console.log(arr);

    }
  }]);

  return SinglyLinkedList;
}();

const suits = ["hearts", "clubs", "diamonds", "spades"];
const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");

const limit = values.length * suits.length;


/* operation test using es6 for of */
const deck1 = new SinglyLinkedList();
function offs() {
	for (let value of values) {
		for (let suit of suits) {
			deck1.push({ value: value, suit: suit });
		}
	}
	return deck1;
}

/* operation test using for length minus */
const deck2 = new SinglyLinkedList();
function mins() {
	let i;
	for (i = limit - 1; i >= 0; i--) {
		let inst = values[Math.floor(i / suits.length)];
		let g = suits[Math.floor(i % suits.length)];
		deck2.push({ suit: g, value: inst });
	}
	return deck2;
}

function testmin() {
	let a = performance.now();
	_.times(100, mins);
	let b = performance.now();
	console.log(b - a);
}
function testof() {
	let a = performance.now();
	_.times(100, offs);
	let b = performance.now();
	console.log(b - a);
}

testmin = _.memoize(testmin);
testof = _.memoize(testof);

function test(cb) {
	_.times(100, cb);
}
