(function (global) {

    function Ctor() {};

    Ctor.prototype.valueOf = function () {
        return this;
    };

    function Node(val) {
        this.value = val;
        this.next = null;
    };

    Node.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: Node,
            writable: true
        }
    });

    function Stack() {
        this.first = null;
        this.last = null;
        this.size = 0;
    };

    Stack.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: Stack,
            writable: true
        }
    });

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

    global.Stack = Stack;

})(this);

function testStack() {
	var nq = null;
	nq = window.nq = new Stack();
	function xq() {
		while (nq.size > 0) nq.pop();
	}
	setTimeout(function () {
		console.log("Testing Stack");
		nq.push(0);
		console.log(JSON.stringify(nq, null, 2));
	}, 250);
	setTimeout(function () {
		nq.push(1);
		console.log(JSON.stringify(nq, null, 2));
	}, 500);
	setTimeout(function () {
		nq.push(2);
		console.log(JSON.stringify(nq, null, 2));
	}, 750);
	setTimeout(function () {
		xq();
		console.log(JSON.stringify(nq, null, 2));
		delete window.nq;
		nq = null;
		console.log('Stack Tested');
	}, 1000);
}

testStack();