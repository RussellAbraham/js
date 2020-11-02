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

"use strict";

function Node(value) {
	this.value = value;
	this.next = null;
}

function SinglyLinkedList() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

SinglyLinkedList.prototype = {
	constructor: SinglyLinkedList,
	push: function (val) {
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
	},

	pop: function () {
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
	},

	shift: function () {
		if (!this.head) return undefined;
		var currentHead = this.head;
		this.head = currentHead.next;
		this.length--;

		if (this.length === 0) {
			this.tail = null;
		}

		return currentHead;
	},

	unshift: function (val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		}
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	},

	get: function (index) {
		if (index < 0 || index >= this.length) return null;
		var counter = 0;
		var current = this.head;
		while (counter !== index) {
			current = current.next;
			counter++;
		}
		return current;
	},

	set: function (index, val) {
		var foundNode = this.get(index);
		if (foundNode) {
			foundNode.value = val;
			return true;
		}
		return false;
	},

	insert: function (index, val) {
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
	},

	remove: function (index) {
		if (index < 0 || index >= this.length) return undefined;
		if (index === 0) return this.shift();
		if (index === this.length - 1) return this.pop();
		var previousNode = this.get(index - 1);
		var removed = previousNode.next;
		previousNode.next = removed.next;
		this.length--;
		return removed;
	},

	reverse: function () {
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
	},

	print : function () {
		var arr = [];

		var current = this.head;

		while (current) {
			arr.push(current.value);
			current = current.next;
		}

		console.log(arr);
	},
	
	toJSON : function(){
		var arr = [];
		var current = this.head;
		while (current) {
			arr.push(current.value);
			current = current.next;
		}
		return arr[0];
	}
	
};

const decks = new SinglyLinkedList();

const suits = ["hearts", "clubs", "diamonds", "spades"];

const values = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");

const limit = values.length * suits.length;

function build() {
	
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
	
	return decks.push(deck);
	
}
