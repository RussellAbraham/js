(function (global) {

    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    window.$delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            var targetElement = event.target;
            var potentialElements = window.qsa(selector, target);
            var hasMatch =
                Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }
        var useCapture = type === "blur" || type === "focus";
        window.$on(target, type, dispatchEvent, useCapture);
    };

    window.$parent = function (element, tagName) {
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return window.$parent(element.parentNode, tagName);
    };

    function has(obj, key) {
        return obj != null && {}.hasOwnProperty.call(obj, key);
    }

    function isObject(obj) {
        var type = typeof obj;
        return type === "function" || (type === "object" && !!obj);
    }

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

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
    }

    const extendOwn = createAssigner(Object.keys);

    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    }

    function Ctor() {}

    function baseCreate(prototype) {
        if (!isObject(prototype)) return {};
        if (Object.create) return Object.create(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor();
        Ctor.prototype = null;
        return result;
    }

    function create(prototype, props) {
        var result = baseCreate(prototype);
        if (props) extendOwn(result, props);
        return result;
    }

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
    }

    function Emitter() {}

    Emitter.prototype = {
        on: function (event, listener) {
            this._eventCollection = this._eventCollection || {};
            this._eventCollection[event] = this._eventCollection[event] || [];
            this._eventCollection[event].push(listener);
            return this;
        },
        once: function (event, listener) {
            var self = this;

            function fn() {
                self.off(event, fn);
                listener.apply(this, arguments);
            }
            fn.listener = listener;
            this.on(event, fn);
            return this;
        },
        off: function (event, listener) {
            var listeners = undefined;
            if (
                !this._eventCollection ||
                !(listeners = this._eventCollection[event])
            ) {
                return this;
            }
            listeners.forEach(function (fn, i) {
                if (fn === listener || fn.listener === listener) {
                    listeners.splice(i, 1);
                }
            });
            if (listeners.length === 0) {
                delete this._eventCollection[event];
            }
            return this;
        },
        emit: function (event) {
            var _this = this,
                _len = arguments.length;
            for (
                _len, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key += 1
            ) {
                args[_key - 1] = arguments[_key];
            }
            var listeners = undefined;
            if (
                !this._eventCollection ||
                !(listeners = this._eventCollection[event])
            ) {
                return this;
            }
            listeners = listeners.slice(0);
            listeners.forEach(function (fn) {
                return fn.apply(_this, args);
            });
            return this;
        }
    };

    function Base() {
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    }

    Base.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: Base,
            writable: true
        }
    });

    extend(Base.prototype, new Emitter(), {
        preinitialize: function () {},
        initialize: function () {}
    });

    Base.extend = inherits;

    if (typeof global !== "undefined") {
        global.Base = Base;
    }
})(this);


const Model = Base.extend({
    /* 
      Preinitialize and Initialize are overrideable functions 
      but will always execute in the same order if either are defined 
    */
    initialize: function () {
        console.log("Initialize Always Next");
    },

    preinitialize: function () {
        console.log("Preinitialize Always First");
    }

});

const View = Base.extend({

    initialize: function () {
        this.$body = qs(".markdown-body");
    }

});

const model = new Model();
const view = new View();
