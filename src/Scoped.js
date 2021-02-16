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
