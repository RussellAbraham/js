"use strict";

(function (global) {
    
    function has(obj, key) {
        return obj != null && {}.hasOwnProperty.call(obj, key);
    };
    
    function isObject(obj) {
        var type = typeof obj;
        return type === "function" || (type === "object" && !!obj);
    };
    
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
    
    var extendOwn = createAssigner(Object.keys);
    
    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    };
    
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
    
    // The protocol for extension is moved into the global the object
	
    global.Base = function(){
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    };
	
    // configure the modes of operation
	
    global.Base.prototype = Object.create(Ctor.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: Base,
            writable: true
        }
    });
	
    extend(global.Base.prototype, {
        preinitialize: function () {},
        initialize: function () {}
    });

    // Base prototypes called from extend
    global.Base.extend = inherits;

const Model = Base.extend({
    preinitialize: function () {
        console.log(1,"model pre initializing");
    },
    initialize: function () {
        console.log(2,"model initialized");
    }
});

const View = Base.extend({
    preinitialize: function () {
        console.log(3,'view pre initializing');
    },
    initialize: function () {
        console.log(4,'view initialized');
    }
});

function Main(){  
	this.preinitialize.apply(this, arguments);      
	this.model = new Model();
	this.view = new View();
	this.initialize.apply(this, arguments);	
};

Main.prototype = {
    preinitialize: function () {
        console.log(0, 'pre initializing main');
    },
    initialize: function () {
        console.log(5,'initialized main');
    }	
}

    // 
	
    function Protocol(collection, kind){        
        this._collection = collection;
        this._kind = kind;
        this._index = 0;
    }

    function _(object){
        if (object instanceof _) return object;
        if (!(this instanceof _)) return new _(object);
    };
    

})(this);
