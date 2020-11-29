DoublyLinkedList.prototype.unshift = function (val) {
    var newNode = new Node(val);
    if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
    }
    this.length++;
    return this;
}