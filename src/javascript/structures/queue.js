function PriorityNode(val, priority) {
    this.val = val;
    this.priority = priority;
};

function PriorityQueue() {
    this.values = [];
};

PriorityQueue.prototype = {

    enqueue: function (val, priority) {
        var newNode = new PriorityNode(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    },

    bubbleUp: function () {
        var idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            var parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    },

    dequeue: function () {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    },

    sinkDown: function () {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            var leftChildIdx = 2 * idx + 1;
            var rightChildIdx = 2 * idx + 2;
            var leftChild, rightChild;
            var swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

};

const q = new PriorityQueue();

q.enqueue('alert("two")', 2);
q.enqueue('alert("two 2")', 2);
q.enqueue('alert("three")', 3);
q.enqueue('alert("one")', 1);

eval(q.dequeue().val);