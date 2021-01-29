(function (global) {
	function Ctor() {}

	Ctor.prototype.valueOf = function () {
		return this;
	};

	function Node(val) {
		var self = this;
		self.value = val;
		self.next = null;
	}

	Node.prototype = Object.create(Ctor.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Node,
			writable: true
		}
	});

	function Queue() {
		var self = this;
		self.first = null;
		self.last = null;
		self.size = 0;
	}

	Queue.prototype = Object.create(Ctor.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Queue,
			writable: true
		}
	});

	Queue.prototype.enqueue = function (val) {
		var self = this;
		var newNode = new Node(val);
		if (!self.first) {
			self.first = newNode;
			self.last = newNode;
		} else {
			self.last.next = newNode;
			self.last = newNode;
		}
		return ++self.size;
	};

	Queue.prototype.dequeue = function () {
		var self = this;
		if (!self.first) return null;
		var temp = self.first;
		if (self.first === self.last) {
			self.last = null;
		}
		self.first = self.first.next;
		self.size--;
		return temp.value;
	};

	global.Queue = Queue;
})(this);

function testQueue() {
	var nq = null;
	nq = window.nq = new Queue();
	function xq() {
		while (nq.size > 0) nq.dequeue();
	}
	setTimeout(function () {
		console.log("Testing Queue");
		nq.enqueue(0);
		console.log(JSON.stringify(nq, null, 2));
	}, 250);
	setTimeout(function () {
		nq.enqueue(1);
		console.log(JSON.stringify(nq, null, 2));
	}, 500);
	setTimeout(function () {
		nq.enqueue(2);
		console.log(JSON.stringify(nq, null, 2));
	}, 750);
	setTimeout(function () {
		xq();
		console.log(JSON.stringify(nq, null, 2));
		delete window.nq;
		nq = null;
		console.log('Queue Tested');
	}, 1000);
}

testQueue();