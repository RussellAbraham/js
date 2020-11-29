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