var objectTags = {
    'file': '[object File]',
    'blob': '[object Blob]',
    'location': '[object Location]',
    'arraybuffer': '[object ArrayBuffer]',
    'arguments': '[object Arguments]',
    'function': '[object Function]',
    'string': '[object String]',
    'Number': '[object Number]',
    'Date': '[object Date]',
    'RegExp': '[object RegExp]',
    'Error': '[object Error]'
}

function __(object) {
    if (object instanceof __) return object;
    if (!(this instanceof __)) return new __(object);
};

['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
    __['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
    }
});

/* *** toSource() *** */

function toSource(func) {
    if (func != null) {
        try {
            return Function.prototype.toString.call(func);
        } catch (er) {
            throw '';
        }
        try {
            return (func + '');
        } catch (er) {
            throw '';
        }
    }
    return '';
}
/* *** toProps() *** */

function toProps(object) {
    var resultSet = {};
    for (var o = object; o; o = o.__proto__) {
        try {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; ++i)
                resultSet[names[i]] = typeof object[names[i]];
        } catch (e) {}
    }
    return JSON.stringify(resultSet);
}

function dir(obj) {
    var result = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result.push(obj[prop]);
        }
    }
    return JSON.stringify(result);
}

function names(obj) {
    return JSON.stringify(Object.getOwnPropertyNames(obj), null, 2);
}

/* *** times() *** */
var optimizCallback = function (func, context, argCount) {
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

function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
};

/* *** memoize() *** */
function has(obj, key) {
    return obj != null && {}.hasOwnProperty.call(obj, key);
}

function identity(object) {
    return object;
}

function memoize(callback, address) {
    const cache = {};
    var key;
    address || (address = identity);
    return function () {
        key = address.apply(this, arguments);
        return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
    }
}

var limit = function (func, wait, debounce) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        var throttler = function () {
            timeout = null;
            func.apply(context, args);
        };
        if (debounce) clearTimeout(timeout);
        if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
};

function throttle(func, wait) {
    return limit(func, wait, false);
};

function debounce(func, wait) {
    return limit(func, wait, true);
};

function assign(keysCallback, undefinedOnly) {
    return function (object) {
        var length = arguments.length,
            index, i;
        if (length < 2 || object == null) return object;
        for (index = 1; index < length; index++) {
            var source = arguments[index];
            var keys = keysCallback(source),
                l = keys.length;
            for (i = 0; i < l; i++) {
                var key = keys[i];
                if (!undefinedOnly || object[key] === void 0) object[key] = source[key];
            }
        }
        return object;
    }
}

function names(obj) {
    var result = [];
    for (var key in obj) {
        result.push(key);
    }
    return result;
};

// Internal copy operations for objects
var extend = assign(names);
var extendOwn = createAssigner(Object.keys);

// Externale copy operation for objects
function extend(obj) {
    [].slice.call(arguments, 1).forEach(function (source) {
        for (var prop in source) {
            if (source[prop] !== void 0) obj[prop] = source[prop];
        }
    });
    return obj;
};



/* *** isArrayLike() *** */
var property = function (key) {
    return function (obj) {
        return obj == null ? void 0 : obj[key];
    };
};
/* !! iteratee[key][value] !! */
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function (collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

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
}

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