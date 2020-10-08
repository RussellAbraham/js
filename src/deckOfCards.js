// @ line 237
"use strict";
	
var optimizCallback = function (func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1: return function (value) { return func.call(context, value); };
    case 2: return function (value, other) { return func.call(context, value, other); };
    case 3: return function (value, index, collection) { return func.call(context, value, index, collection); };
    case 4: return function (accumulator, value, index, collection) { return func.call(context, accumulator, value, index, collection); };
  }
  return function () {
    return func.apply(context, arguments);
  };
};

function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}

function identity(object){
  return object;
}

function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizCallback(iteratee, context, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
};

function memoize(callback, address){
  var cache = {}, key;
  address || (address = identity);
  return function(){
    key = address.apply(this, arguments);
    return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
	}
}
	
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


const decks = new SinglyLinkedList();

const suits = ["hearts", "clubs", "diamonds", "spades"];

const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");

const limit = values.length * suits.length;

function buildDeck() {
	
	let i, 			
	    deck = [],	
	    slen = suits.length;
	
	for (i = limit - 1; i >= 0; i--) {		
		let value = values[Math.floor(i / slen)];		
		let suit = suits[Math.floor(i % slen)];		
		deck.push({ 
			suit : suit, 	
			value : value 
		});		
	}
	
	return decks.push(
		JSON.stringify(deck)
	);
	
}

/*
{
    NODE - methods
  "head": {
      JSON DATA
    "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
    NODE - methods
    "next": {
        JSON DATA - no methods
      "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
      NODE
      "next": {
        JSON DATA - no methods
        "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
        "next": {
          "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
          "next": {
            "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
            "next": {
              "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
              "next": {
                "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
                "next": {
                  "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
                  "next": {
                    "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
                    "next": {
                      "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
                      "next": null
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "tail": {
    "val": "[{\"suit\":\"spades\",\"value\":\"A\"},{\"suit\":\"diamonds\",\"value\":\"A\"},{\"suit\":\"clubs\",\"value\":\"A\"},{\"suit\":\"hearts\",\"value\":\"A\"},{\"suit\":\"spades\",\"value\":\"K\"},{\"suit\":\"diamonds\",\"value\":\"K\"},{\"suit\":\"clubs\",\"value\":\"K\"},{\"suit\":\"hearts\",\"value\":\"K\"},{\"suit\":\"spades\",\"value\":\"Q\"},{\"suit\":\"diamonds\",\"value\":\"Q\"},{\"suit\":\"clubs\",\"value\":\"Q\"},{\"suit\":\"hearts\",\"value\":\"Q\"},{\"suit\":\"spades\",\"value\":\"J\"},{\"suit\":\"diamonds\",\"value\":\"J\"},{\"suit\":\"clubs\",\"value\":\"J\"},{\"suit\":\"hearts\",\"value\":\"J\"},{\"suit\":\"spades\",\"value\":\"10\"},{\"suit\":\"diamonds\",\"value\":\"10\"},{\"suit\":\"clubs\",\"value\":\"10\"},{\"suit\":\"hearts\",\"value\":\"10\"},{\"suit\":\"spades\",\"value\":\"9\"},{\"suit\":\"diamonds\",\"value\":\"9\"},{\"suit\":\"clubs\",\"value\":\"9\"},{\"suit\":\"hearts\",\"value\":\"9\"},{\"suit\":\"spades\",\"value\":\"8\"},{\"suit\":\"diamonds\",\"value\":\"8\"},{\"suit\":\"clubs\",\"value\":\"8\"},{\"suit\":\"hearts\",\"value\":\"8\"},{\"suit\":\"spades\",\"value\":\"7\"},{\"suit\":\"diamonds\",\"value\":\"7\"},{\"suit\":\"clubs\",\"value\":\"7\"},{\"suit\":\"hearts\",\"value\":\"7\"},{\"suit\":\"spades\",\"value\":\"6\"},{\"suit\":\"diamonds\",\"value\":\"6\"},{\"suit\":\"clubs\",\"value\":\"6\"},{\"suit\":\"hearts\",\"value\":\"6\"},{\"suit\":\"spades\",\"value\":\"5\"},{\"suit\":\"diamonds\",\"value\":\"5\"},{\"suit\":\"clubs\",\"value\":\"5\"},{\"suit\":\"hearts\",\"value\":\"5\"},{\"suit\":\"spades\",\"value\":\"4\"},{\"suit\":\"diamonds\",\"value\":\"4\"},{\"suit\":\"clubs\",\"value\":\"4\"},{\"suit\":\"hearts\",\"value\":\"4\"},{\"suit\":\"spades\",\"value\":\"3\"},{\"suit\":\"diamonds\",\"value\":\"3\"},{\"suit\":\"clubs\",\"value\":\"3\"},{\"suit\":\"hearts\",\"value\":\"3\"},{\"suit\":\"spades\",\"value\":\"2\"},{\"suit\":\"diamonds\",\"value\":\"2\"},{\"suit\":\"clubs\",\"value\":\"2\"},{\"suit\":\"hearts\",\"value\":\"2\"}]",
    "next": null
  },
  "length": 10
}
*/
