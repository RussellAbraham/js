SinglyLinkedList.prototype.unshift = function(val){
    var newNode = new Node(val);
    if(!this.head) {
        this.head = newNode;
        this.tail = this.head;
    } else {
        newNode.next = this.head;
        this.head = newNode;
    }
    this.length++;
    return this;    
}