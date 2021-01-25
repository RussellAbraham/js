

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

/* *** isBase64 *** */
function isBase64(input) {
    if (/^data:[^;]+;base64,/.test(input)) return true;
    return false;
};

var _ = {
    isFunction : isFunction,
    isDate : isDate,
    isRegExp : isRegExp,
    isObject : isObject,
    isString : isString,
    isBoolean : isBoolean,
    isNumber : isNumber,
    isUndefined : isUndefined,  
    isNull : isNull,
//

//
    isFinite : isFinite,
    isEven : isEven,
    isPrime : isPrime,

    isAlphaNumeric : isAlphaNumeric,
    

    isFile : isFile,
    isBlob : isBlob,
    
    isStream : isStream,


    
    isArrayBuffer : isArrayBuffer,
    isArrayBufferView : isArrayBufferView,
    isBase64 : isBase64


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

function sanitizeMarkup(html){
    return html.replace(/<[^>]*>/g, '')
};

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


