/**
 * Represents a single node in the stack.
 * @constructor
 * @param {*} val - The value to store in the node.
 */
function Node(val) {
	/** @type {*} */
	this.value = val;

	/** @type {Node|null} */
	this.next = null;
}

/**
 * Represents a stack (LIFO).
 * @constructor
 */
function Stack() {
	/** @type {Node|null} */
	this.first = null;

	/** @type {Node|null} */
	this.last = null;

	/** @type {number} */
	this.size = 0;
}

/**
 * Adds a new element to the top of the stack.
 * @param {*} val - The value to push onto the stack.
 * @returns {number} The new size of the stack.
 */
Stack.prototype.push = function (val) {
	var newNode = new Node(val);

	if (!this.first) {
		this.first = newNode;
		this.last = newNode;
	} else {
		var temp = this.first;
		this.first = newNode;
		this.first.next = temp;
	}

	return ++this.size;
};

/**
 * Removes the top element from the stack and returns its value.
 * @returns {*|null} The value of the removed node, or null if the stack is empty.
 */
Stack.prototype.pop = function () {
	if (!this.first) return null;

	var temp = this.first;

	if (this.first === this.last) {
		this.last = null;
	}

	this.first = this.first.next;
	this.size--;

	return temp.value;
};
