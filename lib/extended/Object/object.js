$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    c = $jscomp.makeIterator(c);
    for (d = c.next(); !d.done; d = c.next())
        if (d = d.value)
            for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
    return a
};
$jscomp.object.is = function (a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
};


Object.defineProperty(Array.prototype, "remove",
{
    /**
     * @this {Array.<*>}
     */
    value: function(value, onlyFirst)
    {
        if (onlyFirst) {
            var index = this.indexOf(value);
            if (index !== -1)
                this.splice(index, 1);
            return;
        }

        var length = this.length;
        for (var i = 0; i < length; ++i) {
            if (this[i] === value)
                this.splice(i, 1);
        }
    }
});

Object.defineProperty(Array.prototype, "keySet",
{
    /**
     * @this {Array.<*>}
     */
    value: function()
    {
        var keys = {};
        for (var i = 0; i < this.length; ++i)
            keys[this[i]] = true;
        return keys;
    }
});

Object.defineProperty(Array.prototype, "upperBound",
{
    /**
     * @this {Array.<number>}
     */
    value: function(value)
    {
        var first = 0;
        var count = this.length;
        while (count > 0) {
          var step = count >> 1;
          var middle = first + step;
          if (value >= this[middle]) {
              first = middle + 1;
              count -= step + 1;
          } else
              count = step;
        }
        return first;
    }
});

Object.defineProperty(Array.prototype, "rotate",
{
    /**
     * @this {Array.<*>}
     * @param {number} index
     * @return {Array.<*>}
     */
    value: function(index)
    {
        var result = [];
        for (var i = index; i < index + this.length; ++i)
            result.push(this[i % this.length]);
        return result;
    }
});

Object.defineProperty(Uint32Array.prototype, "sort", {
   value: Array.prototype.sort
});


/**
*** Object.appendChain(@object, @prototype)
*
* Appends the first non-native prototype of a chain to a new prototype.
* Returns @object (if it was a primitive value it will transformed into an object).
*
*** Object.appendChain(@object [, "@arg_name_1", "@arg_name_2", "@arg_name_3", "..."], "@function_body")
*** Object.appendChain(@object [, "@arg_name_1, @arg_name_2, @arg_name_3, ..."], "@function_body")
*
* Appends the first non-native prototype of a chain to the native Function.prototype object, then appends a
* new Function(["@arg"(s)], "@function_body") to that chain.
* Returns the function.
*
**/

Object.appendChain = function(oChain, oProto) {
    if (arguments.length < 2) {
      throw new TypeError('Object.appendChain - Not enough arguments');
    }
    if (typeof oProto !== 'object' && typeof oProto !== 'string') {
      throw new TypeError('second argument to Object.appendChain must be an object or a string');
    }
  
    var oNewProto = oProto,
        oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);
  
    for (var o1st = this.getPrototypeOf(o2nd);
      o1st !== Object.prototype && o1st !== Function.prototype;
      o1st = this.getPrototypeOf(o2nd)
    ) {
      o2nd = o1st;
    }
  
    if (oProto.constructor === String) {
      oNewProto = Function.prototype;
      oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
      this.setPrototypeOf(oReturn, oLast);
    }
  
    this.setPrototypeOf(o2nd, oNewProto);
    return oReturn;
  }

// First example: Appending a chain to a prototype

function Mammal() {
  this.isMammal = 'yes';
}

function MammalSpecies(sMammalSpecies) {
  this.species = sMammalSpecies;
}

MammalSpecies.prototype = new Mammal();
MammalSpecies.prototype.constructor = MammalSpecies;

var oCat = new MammalSpecies('Felis');

console.log(oCat.isMammal); // 'yes'

function Animal() {
  this.breathing = 'yes';
}

Object.appendChain(oCat, new Animal());

console.log(oCat.breathing); // 'yes'