DoublyLinkedList.prototype.push(val) {
    var newNode = new Node(val);
    if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    this.length++;
    return this;
}