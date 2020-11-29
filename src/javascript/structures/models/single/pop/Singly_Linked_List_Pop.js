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
}