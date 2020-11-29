function Node(val){
    this.val = val;
    this.next = null;
    this.prev = null;
}

Node.prototype.constructor = Node;

function DoublyLinkedList(){
    this.head = null;
    this.tail = null;
    this.prev = 0;
}

DoublyLinkedList.prototype.constructor = DoublyLinkedList;