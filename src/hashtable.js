function HashTable(size) {
    this.size = size = 53;
    this.keyMap = new Array(size);
};

// change modes of operation
HashTable.prototype = Object.create(Object.prototype, {
    constructor: {
        enumerable: true,
        value: HashTable,
        configurable: true,
        writeable: true
    }
});

HashTable.prototype = {

    _hash: function (key) {
        var total = 0;
        var WEIRD_PRIME = 3;
        var i, length = key.length;
        for (i = 0; i < Math.min(length, 100); i++) {
            var char = key[i];
            var value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    },

    set: function () {},

    get: function () {}

};

// mode options for set.

var setOptions = {
    add: true,
    remove: true,
    merge: true
};
var addOptions = {
    add: true,
    remove: false
};


// helpers

// Splices `insert` into `array` at index `at`.

var splice = function (array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
};

// example

// move instances to global object
['tab1', 'tab2', 'tab3'].forEach(function (tab) {
    this[tab] = new HashTable();
});

delete this.tab1;
delete this.tab2;
delete this.tab3;

['id1', 'id2'].forEach(function (id) {
    window[id] = document.getElementById(id)
});

delete window.id1;
delete window.id2;