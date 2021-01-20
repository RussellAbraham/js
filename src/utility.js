/* *** isFunction() *** */
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/* *** isDate()      *** */
function isDate(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

/* *** isRegExp()    *** */
function isRegExp(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
}

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

/* *** isString()    *** */
function isString(obj) {
    return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

/* *** isBoolean()   *** */
function isBoolean(obj) {
    return obj === true || obj === false;
}

/* *** isNumber()    *** */
function isNumber(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

/* *** isNull()      *** */
function isNull(obj) {
    return obj === null;
}

/* *** isUndefined() *** */
function isUndefined(obj) {
    return obj === void 0;
}

/* *** isObjectLike()    *** */
function isObjectLike(value) {
    return value != null && typeof value == 'object';
}

/* *** isArray()    *** */
function isArray(obj) {
    return toString.call(obj) === "[object Array]";
}

/*  *** isLocation() ***  */
function isLocation(obj) {
    return toString.call(obj) === "[object Location]";
}

/*  *** isCallable() ***  */
function isCallable(obj) {
    return typeof obj === 'function';
}

/*  *** isConstructor() ***  */
function isContstructor(obj) {
    return isCallable(obj);
}

/*  *** isElement() ***  */
function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
}

/* *** isWindow ** */
function isWindow(obj) {
    return obj != null && obj === obj.window;
}

/* *** isEven()      *** */
function isEven(num) {
    return num % 2 === 0;
};

/* *** isOdd()      *** */
function isOdd(num){
    return !this.isEven(num);
};

/* *** isFinite() *** */
function isFinite(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
}

/* *** isBuffer() *** */
function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
        typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/* *** isArrayBuffer() *** */
function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
}

/* *** isFile() *** */
function isFile(val) {
    return toString.call(val) === '[object File]';
}

/* *** isBlob() *** */
function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}

/* *** isStream() *** */
function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}

/* *** isURLSearchParams() *** */
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/* *** isFormData() *** */
function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/*  *** isPrime() ***  */
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

/* *** isUniform()   *** */
function isUniform(arr) {
    var first = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== first) {
            return false;
        }
    }
    return true;
}

/* *** isPlainObject() *** */
function isPlainObject(obj) {
    var proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }
    proto = getProto(obj);
    if (!proto) {
        return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

/* *** isEmptyObject *** */
function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

/*  *** isAlphaNumeric() ***  */
function isAlphaNumeric(str) {
    var code = str.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // uppercase (A-Z)
        !(code > 96 && code < 123)) { // lowercase (a-z)
        return false;
    }
    return true;
}

/* *** isArrayBuffer *** */
function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
    } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
}

function isBase64(input) {
    if (/^data:[^;]+;base64,/.test(input)) return true;
    return false;
};

function encodeString(string) {
    return 'data:application/octet-stream;base64,'.concat(btoa(string));
};

function stringToUint8ToArray(input) {
    var i, data = atob(input.split(',')[1]),
        length = data.length,
        output = [];
    var dataView = new Uint8Array(data.length);
    for (i = 0; i < length; i++) {
        dataView[i] = data.charCodeAt(i);
        output.push(dataView[i]);
    }
    return JSON.stringify(output, null, 2);
}

function stringToUint8(string) {
    var i, length = string.length
    var buffer = new ArrayBuffer(length);
    var array = new Uint8Array(buffer);
    for (i = 0; i < length; i++) {
        array[i] = string.charCodeAt(i);
    }
    return buffer;
}

function base64ToUint8(url) {
    var dataView;
    if (isBase64Url(url)) {
        var data = atob(url.split(',')[1]);
        dataView = new Uint8Array(data.length);
        var i, length = data.length;
        for (i = 0; i < length; ++i) {
            dataView[i] = data.charCodeAt(i);
        }
    }
    return dataView;
}

function stringToBuffer(input) {
    var i, data = atob(input.split(',')[1]),
        length = data.length,
        output = [];
    var dataView = new ArrayBuffer(data.length);
    for (i = 0; i < length; i++) {
        dataView[i] = data.charCodeAt(i);
        output.push(dataView[i]);
    }
    return JSON.stringify(output, null, 2);
}

/* *** trim() *** */
function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/* *** uniqueId() *** */
var idCounter = 0;

function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
};

function keys(object) {
    if (object !== Object(object)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in object)
        if (has(object, key)) keys[keys.length] = key;
    return keys;
}

function allKeys(object) {
    if (!obj === Object(obj)) {
        return [];
    }
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }
    return keys;
}

function format(ms) {
    if (ms < 0) {
        ms = -ms;
    }
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    }
    return Object.entries(time)
        .filter(function (val) {
            return val[1] !== 0;
        })
        .map(function (sliced) {
            var key = [].slice.call(sliced)[0];
            var val = [].slice.call(sliced)[1];
            return "".concat(val, " ").concat(key).concat(val !== 1 ? 's' : '');
        })
        .join(', ');
};

function jsEscape(string) {
    return string
        .replace(/(['\\])/g, '\\$1')
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029");
}

function htmlEscape(string) {
    return String(string)
        .replace(/\\"/g, '"')
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function uriEscape(string) {
    return encodeURIComponent(string).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}


function htmlEscape(str) {
    str = str + "";
    return str.replace(/[^\w :\-\/.?=]/gi, function (c) {
        return "&#" + +c.charCodeAt(0) + ";";
    });
}

function findPos(obj) {
    var left = 0,
        top = 0;
    if (obj.offsetParent) {
        while (1) {
            left += obj.offsetLeft;
            top += obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj = obj.offsetParent;
        }
    } else if (obj.x && obj.y) {
        left += obj.x;
        top += obj.y;
    }
    return [left, top];
}


/* Underscores templating a little more portable, change the wrapping name if needed */

window._ = (function (_) {
    _.defaults = function (object) {
        if (!object) {
            return object;
        }
        for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
            var iterable = arguments[argsIndex];
            if (iterable) {
                for (var key in iterable) {
                    if (object[key] == null) {
                        object[key] = iterable[key];
                    }
                }
            }
        }
        return object;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
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

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match];
                });

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";

        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        if (data) return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };

        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

        return template;
    };

    return _;
})({});

function Standard(object){
   	if (object instanceof Standard) return object;
	if (!(this instanceof Standard)) return new Standard(object);
	this.shadow = object;
};

Standard.prototype.value = function(){
	return this.shadow;
};

Standard.prototype.valueOf = Standard.prototype.toJSON = Standard.prototype.value;

Standard.prototype.toString = function() {
	return '' + this.shadow;
};

function Constructor(name){	
	this.preinitialize.apply(this, arguments);	
	this.name = name;
	this.initialize.apply(this, arguments);
}

Constructor.prototype.preinitialize = function(){
	/* override */
};

Constructor.prototype.prefix = function(){
	return "";
};

Constructor.prototype.toString = function(){
	return "[object "+this.name +"]";
};

Constructor.prototype.valueOf = function(){
	return this;
};

Constructor.prototype.initialize = function(){
	/* override */	
};

function Output(name, type){
	Constructor.call(this,name);
	this.name = name;
	this.type = type;
}

Output.prototype = Object.create(Constructor.prototype,{
	constructor: {
		configurable : true,
		enumerable: true,
		value:Output,
		writable:true
	}
});

Output.prototype.preinitialize = function(){
	console.log(this);
};

Output.prototype.prefix = function(){
	return Constructor.prototype.prefix.call(this) + " ";
};

Output.prototype.toString = function(){
	return "[object " + this.name + " type " + this.type + "]";
};

Output.prototype.initialize = function(){
	console.log(JSON.stringify(this.valueOf()))
};


var ctor = new Constructor("Constructor");

var output = new Output("Ouput", "Plain");

console.log(ctor.prefix());
console.log(output.prefix());

console.log(ctor.toString());
console.log(output.toString());

console.log(ctor instanceof Constructor);
console.log(ctor instanceof Object);

console.log(output instanceof Constructor);
console.log(output instanceof Output);
console.log(output instanceof Object);

var SimplePropertyRetriever = {
    getOwnEnumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._enumerable);
         // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
    },
    getOwnNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._notEnumerable);
    },
    getOwnEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
        // Or just use: return Object.getOwnPropertyNames(obj);
    },
    getPrototypeEnumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._enumerable);
    },
    getPrototypeNonenumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._notEnumerable);
    },
    getPrototypeEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
    },
    getOwnAndPrototypeEnumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._enumerable);
        // Or could use unfiltered for..in
    },
    getOwnAndPrototypeNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._notEnumerable);
    },
    getOwnAndPrototypeEnumerablesAndNonenumerables: function(obj) {
        return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
    },
    // Private static property checker callbacks
    _enumerable: function(obj, prop) {
        return obj.propertyIsEnumerable(prop);
    },
    _notEnumerable: function(obj, prop) {
        return !obj.propertyIsEnumerable(prop);
    },
    _enumerableAndNotEnumerable: function(obj, prop) {
        return true;
    },
    _getPropertyNames: function getAllPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
        var props = [];
        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function(prop) {
                    if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
                        props.push(prop);
                    }
                });
            }
            if (!iteratePrototypeBool) {
                break;
            }
            iterateSelfBool = true;
        } while (obj = Object.getPrototypeOf(obj));

        return props;
    }
};


(function(global) {
  
    function toSource(func) { if (func != null) { try { return Function.prototype.toString.call(func); } catch (e) {} try { return func + ""; } catch (e) {} } return ""; }
    function toProps(obj) { var resultSet = {}; for (var o = obj; o; o = o.__proto__) { try { var names = Object.getOwnPropertyNames(o); for (var i = 0; i < names.length; ++i) resultSet[names[i]] = "[" + typeof obj[names[i]] + "]"; } catch (e) {} } return JSON.stringify(resultSet, null, 2); }
    function data(options) { options = options || {}; var prefix = '<data class="'; var suffix = '" value="' + options.value.length + '">'; var tail = "</data>"; return prefix .concat(options.class) .concat(suffix) .concat(options.value) .concat(tail); }
    global.props = SimplePropertyRetriever;    
    
    global.evaluator = function(string) {  
      var result;    
      try {
        result = eval.call(this, string);
        if (typeof result == "function" || false) { result = data({ class: "function", value: toSource(result) }); } 
        else if (!!(result && result.test && result.exec && (result.ignoreCase || result.ignoreCase === false))) { result = data({ class: "regexp", value: new RegExp(result).toString() }); } 
        else if (!!(result && result.getTimezoneOffset && result.setUTCFullYear)) { result = data({ class: "date", value: "".concat(result) }); } 
        else if (typeof result === "object" || false) { result = data({ class: "object", value: toProps(result) }); } 
        else if (!!(result === "" || (result && result.charCodeAt && result.substr))) { result = data({ class: "string", value: "".concat(result) }); } 
        else if (!!(result === 0 || (result && result.toExponential && result.toFixed))) { result = data({ class: "number", value: "".concat(result) }); } 
        else if (result === true || result === false) { result = data({ class: "boolean", value: "".concat(result) }); } 
        else if (result === void 0) { result = data({ class: "undefined", value: "".concat(result) }); } 
        else if (result === null) { result = data({ class: "null", value: "".concat(result) }); } 
      }     
      catch (er) { 
        if (er instanceof TypeError) { result = data({ class: "type-error", value: "[[ Type ".concat("]] ", er.message) }).concat(er.message); } 
        else if (er instanceof SyntaxError) { result = data({ class: "syntax-error", value: "[[ Syntax ".concat("]] ") }).concat(er.message); } 
        else if (er instanceof ReferenceError) { result = data({ class: "reference-error", value: "[[ Reference ".concat("]] ") }).concat(er.message); } 
        else if (er instanceof RangeError) { result = data({ class: "range-error", value: "[[ Range ".concat("]] ") }).concat(er.message); } 
        else if (er instanceof EvalError) { result = data({ class: "eval-error", value: "[[ Eval ".concat("]] ") }).concat(er.message); } 
        else { result = String(er.stack).replace(/\\"/g, '"').replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); } 
      }    
      finally {    
        return result;      
      }    
    };    
  })(this);
