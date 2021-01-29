var Arr = Array.prototype;
var slice = Arr.slice;

var Obj = Object.prototype;
var hasOwn = Obj.hasOwnProperty;

var has = function (object, key) {
    return object != null && hasOwn.call(object, key);
};

var identity = function (object) {
    return object;
};

function Memoize(callback, address) {
    var cache = {}, key;
    address || (address = identity);
    return function () {
        key = address.apply(this, arguments);
        return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
    };
};

function Compose() {
    var modules = slice.call(arguments);
    return function () {
        var imports = slice.call(arguments),
            i, length = modules.length;
        for (i = length - 1; i >= 0; i--) {
            imports = [modules[i].apply(this, imports)];
        }
        return imports[0];
    }
};

function loadScripts(){
    function load(src, onload, onerror){
        var script = document.createElement('script');
        script.src = src;
        script.onload = onload;
        script.onerror = onload || onerror;
        return script;
    };
    function success(){

    };
    function error(){

    };
    slice.call(arguments).forEach(function(obj){
        load(obj, success, error);
    });
};

var scope = {};

[].forEach(function(){
    // load a script that adds prop to scope and loads a script to fill that prop with functions
});



function toH(obj){
    var b = function(x){ return "<"+x; };
    var m = function(x){ return x; };
    var e = function(x){ return x+">"; };
    var x = Compose(b, m, e);
    return x(obj);
}


toH('Hello'); // <Hello>


function sanitizeMarkup(html){
    return html.replace(/<[^>]*>/g, '')
};

function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
};
var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
(function (global) {

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;

    var setOptions = {
        add: true,
        remove: true,
        merge: true
    };

    var addOptions = {
        add: true,
        remove: false
    };

    var modelMethods = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };

    var collectionMethods = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 0,
        foldl: 0,
        inject: 0,
        reduceRight: 0,
        foldr: 0,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3,
        findIndex: 3,
        findLastIndex: 3
    };

})(this);