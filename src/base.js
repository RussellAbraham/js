/* start of a protocol extension library */

(function (global) {

    var ObjProto = Object.prototype;
    var hasOwnProperty = ObjProto.hasOwnProperty;

    function has(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    function isObject(obj) {
        var type = typeof obj;
        return type === "function" || (type === "object" && !!obj);
    };

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };

    function isMatch(object, attrs) {
        var keys = Object.keys(attrs),
            length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };

    /* *** low level helper for older environments *** */
    var property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    /* ruleset for functions that pass input through arraylike, if no, should provide a throw and figure out a fix */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    /* this function is going to optimize the custom forEach and map functions 
       that in turn allow the mutable extend function to glue the Emitter to framework objects shared prototypes
    */
    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };
    function identity(object) {
        return object;
    }
    
    function matcher(attrs) {
        attrs = extendOwn({}, attrs);
        return function (obj) {
            return isMatch(obj, attrs);
        };
    };
    
    var cb = function (value, context, argCount) {
        if (value == null) return identity;
        if (isFunction(value)) return optimizeCb(value, context, argCount);
        if (isObject(value)) return matcher(value);
        return property(value);
    };

    // Generator function to create the indexOf and lastIndexOf functions
    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function (array, item, idx) {
            var i = 0,
                length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };
    }


    function createPredicateIndexFinder(dir) {
        return function (array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    };

    var findIndex = createPredicateIndexFinder(1);


    function sortedIndex(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1;
            else high = mid;
        }
        return low;
    };

    var indexOf = createIndexFinder(1, findIndex, sortedIndex);

    function createAssigner(keysFunc, undefinedOnly) {

        return function (obj) {
            var length = arguments.length,
                index,
                i;
            if (length < 2 || obj == null) return obj;
            for (index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

    function values(obj) {
        var keys = Object.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    function contains(obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) obj = values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return indexOf(obj, item, fromIndex) >= 0;
    }

    var hasEnumBug = !{
        toString: null
    }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'
    ];

    function collectNonEnumProps(obj, _keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = isFunction(constructor) && constructor.prototype || ObjProto;
        var prop = 'constructor';
        if (has(obj, prop) && !contains(_keys, prop)) _keys.push(prop);
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !contains(_keys, prop)) {
                _keys.push(prop);
            }
        }
    }

    // Retrieve all the property names of an object.
    function allKeys(obj) {
        if (!isObject(obj)) return [];
        var _keys = [];
        for (var key in obj) _keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, _keys);
        return _keys;
    }

    /* glues the Emitter to framework object prototypes */
    var extend = createAssigner(allKeys);

    var extendOwn = createAssigner(Object.keys);


    function Ctor() {};

    function baseCreate(prototype) {
        if (!isObject(prototype)) return {};
        if (Object.create) return Object.create(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor();
        Ctor.prototype = null;
        return result;
    };

    function create(prototype, props) {
        var result = baseCreate(prototype);
        if (props) extendOwn(result, props);
        return result;
    };

    function inherits(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && has(protoProps, "constructor")) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        extend(child, parent, staticProps);
        child.prototype = create(parent.prototype, protoProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };

    var Events = global.Events = {};

    function onApi() {};

    function onceMap() {};

    function offApi() {};

    function triggerApi() {};

    function triggerEvents() {};




    Events.on = function () {};
    Events.once = function () {};

    Events.listenTo = function () {};
    Events.listenToOnce = function () {};

    Events.off = function () {};
    Events.stopListening = function () {};

    var Listening = function (listener, obj) {
        this.id = listener._listenId;
        this.listener = listener;
        this.obj = obj;
        this.interop = true;
        this.count = 0;
        this._events = void 0;
    };

    Listening.prototype.on = Events.on;
    Listening.prototype.off = function (name, callback) {};
    Listening.prototype.cleanup = function () {};

    Events.bind = Events.on;
    Events.unbind = Events.off;

    global.Model = function () {
        /* over rideable, preinitialize is constructor  */
        this.preinitialize.apply(this, arguments);
        /* over rideable, initialize works like constructor */
        this.initialize.apply(this, arguments);
    };

    /* Accsessor Properties, I don't know if stricter configuration should be done yet  */
    global.Model.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: Model,
            writable: true
        }
    });

    /* Events glued to prototypes */
    extend(global.Model.prototype, global.Events, {
        /* over rideable, preinitialize is constructor  */
        preinitialize: function () {},
        /* over rideable, initialize works like constructor */
        initialize: function () {}
    });

    /* DOM Class, not instanced like all primitives, this allows framework to run in nodejs, with workers and as an amd module */
    global.View = function () {
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    };

    /* Accsessor Properties, I don't know if stricter configuration should be done yet  */
    global.View.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: View,
            writable: true
        }
    });

    /* Events glued to prototypes */
    extend(global.View.prototype, global.Events, {
        preinitialize: function () {},
        initialize: function () {}
    });

    global.Model.extend = global.View.extend = inherits;

})(this);