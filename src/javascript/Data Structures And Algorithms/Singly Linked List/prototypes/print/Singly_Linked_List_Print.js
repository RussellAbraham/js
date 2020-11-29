SinglyLinkedList.prototype.print = function(){
    var arr = [];
    var current = this.head
    while(current){
        arr.push(current.val)
        current = current.next
    }
    console.log(arr);
}