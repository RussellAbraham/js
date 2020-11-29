
DoublyLinkedList.prototype.pop = function () {
    if(!this.head) return undefined;
    var poppedNode = this.tail;
    if(this.length === 1){
        this.head = null;
        this.tail = null;
    } else {
        this.tail = poppedNode.prev;
        this.tail.next = null;
        poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
}