
const requireModule = document.getElementById('requireModule');
const build = URL.createObjectURL(new Blob([requireModule.textContent],{ type :'text/javascript;charset=UTF-8' }));
const js = document.createElement('script');
js.src = build;

const mod = document.querySelector('script[type=\'text\/js-module\']');
const mjs = mod.textContent;
const blb = new Blob([mjs], { type :'text/javascript;charset=UTF-8' });
const obj = URL.createObjectURL(blb);

document.worker = new Worker(obj);

document.worker.addEventListener('message', function(event){
	console.log(event.data);	
}, false);

document.worker.postMessage('sending');
(function () {
    
    var root = this,
        breaker = {},
        
        ArrayProto = Array.prototype,
        ObjProto = Object.prototype,

        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,

        slice = [].slice,
        unshift = [].unshift,
        nativeForEach = [].forEach,
        nativeMap = [].map,

        toString = {}.toString,
        hasOwnProperty = {}.hasOwnProperty;

    var _ = function (obj) {
        return new wrapper(obj);
    };
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = _;
        _._ = _;
    } else {
        root['_'] = _;
    }
    _.VERSION = '1.0.0';
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
    _.map = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };
    _.has = function (obj, key) {
        return obj != null && {}.hasOwnProperty.call(obj, key);
    }
    _.toArray = function (iterable) {
        if (!iterable) return [];
        if (iterable.toArray) return iterable.toArray();
        if (_.isArray(iterable)) return slice.call(iterable);
        if (_.isArguments(iterable)) return slice.call(iterable);
        return _.values(iterable);
    };
    _.defineProperty = function (obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(func, args);
        }, wait);
    };
    _.defer = function (func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.wrap = function (func, wrapper) {
        return function () {
            var args = [func].concat(slice.call(arguments));
            return wrapper.apply(this, args);
        };
    };
    _.keys = nativeKeys || function (obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
        return keys;
    };
    _.allKeys = function (obj) {
        if (!_.isObject(obj)) {
            return [];
        }
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    };
    _.values = function (obj) {
        return _.map(obj, _.identity);
    };
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    };
    _.clone = function (obj) {
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.isEqual = function (a, b) {
        if (a === b) return true;
        var atype = typeof (a),
            btype = typeof (b);
        if (atype != btype) return false;
        if (a == b) return true;
        if ((!a && b) || (a && !b)) return false;
        if (a._chain) a = a._wrapped;
        if (b._chain) b = b._wrapped;
        if (a.isEqual) return a.isEqual(b);
        if (b.isEqual) return b.isEqual(a);
        if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
        if (_.isNaN(a) && _.isNaN(b)) return false;
        if (_.isRegExp(a) && _.isRegExp(b)) return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
        if (atype !== 'object') return false;
        if (a.length && (a.length !== b.length)) return false;
        var aKeys = _.keys(a),
            bKeys = _.keys(b);
        if (aKeys.length != bKeys.length) return false;
        for (var key in a)
            if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
        return true;
    };
    _.isEmpty = function (obj) {
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj)
            if (hasOwnProperty.call(obj, key)) return false;
        return true;
    };
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType == 1);
    };
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) === '[object Array]';
    };
    _.isObject = function (obj) {
        return obj === Object(obj);
    };
    _.isArguments = function (obj) {
        return !!(obj && hasOwnProperty.call(obj, 'callee'));
    };
    _.isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };
    _.isString = function (obj) {
        return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
    };
    _.isNumber = function (obj) {
        return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
    };
    _.isNaN = function (obj) {
        return obj !== obj;
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false;
    };
    _.isDate = function (obj) {
        return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
    };
    _.isRegExp = function (obj) {
        return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
    };
    _.isNull = function (obj) {
        return obj === null;
    };
    _.isUndefined = function (obj) {
        return obj === void 0;
    };
    _.identity = function (value) {
        return value;
    };
    _.mixin = function (obj) {
        each(_.functions(obj), function (name) {
            addToWrapper(name, _[name] = obj[name]);
        });
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };
    _.defaults = function (object) {
        if (!object) {
            return object
        }
        for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex += 1) {
            var iterable = arguments[argsIndex];
            if (iterable) {
                for (var key in iterable) {
                    if (object[key] == null) {
                        object[key] = iterable[key]
                    }
                }
            }
        }
        return object
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text
                .slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match]
                });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='"
            }
            index = offset + match.length;
            return match
        });
        source += "';\n";
        if (!settings.variable) {
            source = 'with(obj||{}){\n' + source + '}\n'
        }
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments" +
                ",'');};\n" + source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source)
        } catch (e) {
            e.source = source;
            throw e
        }
        if (data) {
            return render(data, _)
        }
        var template = function (data) {
            return render.call(this, data, _)
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template
    };
    var wrapper = function (obj) {
        this._wrapped = obj;
    };
    _.prototype = wrapper.prototype;
    var result = function (obj, chain) {
        return chain ? _(obj).chain() : obj;
    };
    var addToWrapper = function (name, func) {
        wrapper.prototype[name] = function () {
            var args = slice.call(arguments);
            unshift.call(args, this._wrapped);
            return result(func.apply(_, args), this._chain);
        };
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function () {
            method.apply(this._wrapped, arguments);
            return result(this._wrapped, this._chain);
        };
    });
    each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function () {
            return result(method.apply(this._wrapped, arguments), this._chain);
        };
    });
    wrapper.prototype.chain = function () {
        this._chain = true;
        return this;
    };
    wrapper.prototype.value = function () {
        return this._wrapped;
    };
})();
(function (root) {
	var require, define;

	(function () {
		const modules = {};
		const requireStack = [];
		const inProgressModules = {};
		const separator = ".";
		function build(module) {
			var factory = module.factory,
				localRequire = function (id) {
					var resultantId = id;
					//Its a relative path, so lop off the last portion and add the id (minus "./")
					if (id.charAt(0) === ".") {
						resultantId =
							module.id.slice(0, module.id.lastIndexOf(separator)) +
							separator +
							id.slice(2);
					}
					return require(resultantId);
				};
			module.exports = {};
			delete module.factory;
			factory(localRequire, module.exports, module);
			return module.exports;
		}

		require = function (id) {
			if (!modules[id]) {
				throw "module " + id + " not found";
			} else if (id in inProgressModules) {
				var cycle =
					requireStack.slice(inProgressModules[id]).join("->") + "->" + id;
				throw "Cycle in require graph: " + cycle;
			}
			if (modules[id].factory) {
				try {
					inProgressModules[id] = requireStack.length;
					requireStack.push(id);
					return build(modules[id]);
				} finally {
					delete inProgressModules[id];
					requireStack.pop();
				}
			}
			return modules[id].exports;
		};

		define = function (id, factory) {
			if (modules[id]) {
				throw "module " + id + " already defined";
			}

			modules[id] = {
				id: id,
				factory: factory
			};
		};

		define.remove = function (id) {
			delete modules[id];
		};

		define.moduleMap = modules;
	})();
	
	define("debug", function (require, exports, module) {
		const debug = {
			logLevel: 0,
			info: 1,
			warning: 2,
			error: 3,
			exception: 4,
			numMsgs: 0,
			log: function (source, message, debugLevel) {
				if (debugLevel >= this.logLevel) {
          debug.numMsgs = debug.numMsgs + 1;
					//console.log("DEBUG [" + source + "] " + message);
					return "DEBUG [".concat(source,"] ",message);

				}
			},
			size: function () {
				return debug.numMsgs;
			},
			clear: function () {
				debug.numMsgs = 0;
			}
		};
		module.exports = debug;
	});
	
	if (typeof root !== "undefined") {
		root.require = require;
		root.define = define;
	}
	
})(this);

define('Data', function(require, module, exports){
	
	function Data(string){
    this.string = string;
	}
	
	module.exports = Data;
	
});

	function Data(string){
    this.string = string;
	}


const debug = require("debug");
const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true 
};

const observer = new MutationObserver(function(mutations) {
    
    var i;
    const length = mutations.length;
    const buffer = [];

    //loop config object, check equality while looping mutation records
    //

    for(var i = mutations.length - 1; i <= 0;i--){
        
        //mutations[i]

    }


    Object.values(mutations).forEach(function(mutation){});

})

// document 
if('document' in this){
	console.log(
		debug.log(window, "Scope [[this]]", 1)
	);
	document.body.innerHTML += ''.concat(debug.log(window, '', 1)).fontcolor('#0D47A1').link('#');
}

// browser, worker, and nodejs
else {
	postMessage(
		debug.log(self, 'Scope[[this]]')
	)
}