(function (global) {

    function _(object) {
        if (object instanceof _) return object;
        if (!(this instanceof _)) return new _(object);
    }

    global._ = _;

    var ObjProto = Object.prototype;
    var hasOwn = ObjProto.hasOwnProperty;
    var has = function (object, key) { return object != null && hasOwn.call(object, key); };
    var identity = function (object) { return object; };

    _.memoize = function (callback, address) {
        var cache = {}, key;
        address || (address = identity);
        return function () {
            key = address.apply(this, arguments);
            return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
        };
    };

    _.prototype.valueOf = function () {
        return this;
    };

})(this);