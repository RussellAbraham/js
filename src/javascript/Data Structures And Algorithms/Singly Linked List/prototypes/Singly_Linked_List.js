function Node(val) {
    this.val = val;
    this.next = null;
}

Node.prototype.constructor = Node;

function SinglyLinkedList() {
    this.preinitialize.apply(this, arguments);
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.initialize.apply(this, arguments);
}

SinglyLinkedList.prototype.constructor = SinglyLinkedList;

SinglyLinkedList.prototype.preinitialize = function(){

};

SinglyLinkedList.prototype.initialize = function(){

};

function splice(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
};