function Constructor() {};

function Node(value, priority) {
    this.value = value;
    this.priority = priority;
};

function PriorityQueue() {
    this.values = [];
};

PriorityQueue.prototype.enqueue = function (val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
};

PriorityQueue.prototype.bubbleUp = function () {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.values[parentIdx];
        if (element.priority >= parent.priority) break;
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
    }
};

PriorityQueue.prototype.sinkDown = function () {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild, rightChild;
        let swap = null;

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
};

PriorityQueue.prototype.dequeue = function () {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
        this.values[0] = end;
        this.sinkDown();
    }
    return min;
};

function WeightedGraph() {
    this.adjacencyList = {};
};


WeightedGraph.prototype.addVertex = function (vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
};

WeightedGraph.prototype.addEdge = function (vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({
        node: vertex2,
        weight
    });
    this.adjacencyList[vertex2].push({
        node: vertex1,
        weight
    });
};

WeightedGraph.prototype.Dijkstra = function () {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [] //to return at end
    let smallest;
    //build up initial state
    for (let vertex in this.adjacencyList) {
        if (vertex === start) {
            distances[vertex] = 0;
            nodes.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }
    while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
            while (previous[smallest]) {
                path.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
        if (smallest || distances[smallest] !== Infinity) {
            for (var neighbor in this.adjacencyList[smallest]) {
                var nextNode = this.adjacencyList[smallest][neighbor];
                var candidate = distances[smallest] + nextNode.weight;
                var nextNeighbor = nextNode.node;
                if (candidate < distances[nextNeighbor]) {
                    distances[nextNeighbor] = candidate;
                    previous[nextNeighbor] = smallest;
                    nodes.enqueue(nextNeighbor, candidate);
                }
            }
        }
    }
    return path.concat(smallest).reverse();
};

var graph = new WeightedGraph()