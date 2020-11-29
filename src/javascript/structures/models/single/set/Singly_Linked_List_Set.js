SinglyLinkedList.prototype.set = function (index, val) {
    var foundNode = this.get(index);
    if (foundNode) {
        foundNode.val = val;
        return true;
    }
    return false;
}