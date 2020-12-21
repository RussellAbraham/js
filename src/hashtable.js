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

// Collection helpers from backbone.js

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

  // Defining an @@iterator method implements JavaScript's Iterable protocol.
  // In modern ES2015 browsers, this value is found at Symbol.iterator.
  /* global Symbol */
  var $$iterator = typeof Symbol === 'function' && Symbol.iterator;
  if ($$iterator) {
    Collection.prototype[$$iterator] = Collection.prototype.values;
  }

  // IterableProtocol
  // ------------------

  // A IterableProtocol implements JavaScript's Iterator protocol, allowing the
  // use of `for of` loops in modern browsers and interoperation between
  // Backbone.Collection and other JavaScript functions and third-party libraries
  // which can operate on Iterables.
  var IterableProtocol = function(collection, kind) {
    this._collection = collection;
    this._kind = kind;
    this._index = 0;
  };

  // This "enum" defines the three possible kinds of values which can be emitted
  // by a IterableProtocol that correspond to the values(), keys() and entries()
  // methods on Collection, respectively.
  var ITERATOR_VALUES = 1;
  var ITERATOR_KEYS = 2;
  var ITERATOR_KEYSVALUES = 3;

  // All Iterators should themselves be Iterable.
  if ($$iterator) {
    IterableProtocol.prototype[$$iterator] = function() {
      return this;
    };
  }

  IterableProtocol.prototype.next = function() {
    if (this._collection) {

      // Only continue iterating if the iterated collection is long enough.
      if (this._index < this._collection.length) {
        var model = this._collection.at(this._index);
        this._index++;

        // Construct a value depending on what kind of values should be iterated.
        var value;
        if (this._kind === ITERATOR_VALUES) {
          value = model;
        } else {
          var id = this._collection.modelId(model.attributes);
          if (this._kind === ITERATOR_KEYS) {
            value = id;
          } else { // ITERATOR_KEYSVALUES
            value = [id, model];
          }
        }
        return {value: value, done: false};
      }
      // Once exhausted, remove the reference to the collection so future
      // calls to the next method always return done.
      this._collection = void 0;
    }
    return {value: void 0, done: true};
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