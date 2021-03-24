
var Events = (function () {

	function Events() {
		if (!(this instanceof Events)) {
			throw new TypeError("not a function");
		}
	};

	Events.prototype.on = function (event, listener) {
		this.events = this.events || {};
		this.events[event] = this.events[event] || [];
		this.events[event].push(listener);
		return this;
	};

	Events.prototype.once = function (event) {
		var self = this;

		function func() {
			self.off(event, func);
			listener.apply(this, arguments);
		}
		func.listener = listener;
		this.on(event, func);
		return this;
	};

	Events.prototype.off = function (event, listener) {
		var listeners = undefined;
		if (!this.events || !(listeners = this.events[event])) {
			return this;
		}
		listeners.forEach(function (func, index) {
			if (func === listener || func.listener === listener) {
				listeners.splice(index, 1);
			}
		});
		if (listeners.length === 0) {
			delete this.events[event];
		}
		return this;
	};

	Events.prototype.emit = function (event) {
		var self = this,
			length = arguments.length;
		for (length, args = Array(length > 1 ? length - 1 : 0), key = 1; key < length; key += 1) {
			args[key - 1] = arguments[key];
		}
		var listeners = undefined;
		if (!this.events || !(listeners = this.events[event])) {
			return this;
		}
		listeners.forEach(function (func) {
			return func.apply(self, args);
		})
	};

	return Events;

})();

function extend(obj, props) {
	for (var prop in props) {
		if (props[prop]) {
			obj[prop] = props[prop];
		}
	}
	return obj;
};

function inherits(child, parent) {
	child.prototype = extend(child.prototype || {}, parent.prototype);
};

function Ctor(){};

Ctor.prototype.valueOf = function(){
	return this;
};

function Node(value) {
	this.value = value;
	this.next = null;
};

Node.prototype = Object.create(Ctor.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: Node,
		writeable: true
	}
});

function SinglyLinkedList(){
	this.head = null;
	this.tail = null;
	this.length = 0;
};

SinglyLinkedList.prototype = Object.create(Ctor.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: SinglyLinkedList,
		writeable: true
	}
});

inherits(SinglyLinkedList, Events);

SinglyLinkedList.prototype.push = function (val) {
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
};

SinglyLinkedList.prototype.pop = function () {
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
};

SinglyLinkedList.prototype.shift = function () {
	if (!this.head) return undefined;
	var currentHead = this.head;
	this.head = currentHead.next;
	this.length--;
	if (this.length === 0) {
		this.tail = null;
	}
	return currentHead;
};

SinglyLinkedList.prototype.unshift = function (val) {
	var newNode = new Node(val);
	if (!this.head) {
		this.head = newNode;
		this.tail = this.head;
	}
	newNode.next = this.head;
	this.head = newNode;
	this.length++;
	return this;
};

SinglyLinkedList.prototype.get = function (index) {
	if (index < 0 || index >= this.length) return null;
	var counter = 0;
	var current = this.head;
	while (counter !== index) {
		current = current.next;
		counter++;
	}
	return current;
};

SinglyLinkedList.prototype.set = function (index, val) {
	var foundNode = this.get(index);
	if (foundNode) {
		foundNode.value = val;
		return true;
	}
	return false;
};

SinglyLinkedList.prototype.insert = function (index, val) {
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
};

SinglyLinkedList.prototype.remove = function (index) {
	if (index < 0 || index >= this.length) return undefined;
	if (index === 0) return this.shift();
	if (index === this.length - 1) return this.pop();
	var previousNode = this.get(index - 1);
	var removed = previousNode.next;
	previousNode.next = removed.next;
	this.length--;
	return removed;
};

SinglyLinkedList.prototype.reverse = function () {
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
};

SinglyLinkedList.prototype.print = function () {
	var arr = [];
	var current = this.head;
	while (current) {
		arr.push(current.value);
		current = current.next;
	}
	console.log(arr);
};

SinglyLinkedList.prototype.toJSON = function () {
	var arr = [];
	var current = this.head;
	while (current) {
		arr.push(current.value);
		current = current.next;
	}
	return arr;
}