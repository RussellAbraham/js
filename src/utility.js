var root = this;

var ArrayProto = Array.prototype,
  ObjProto = Object.prototype,
  FuncProto = Function.prototype;

var
  push = ArrayProto.push,
  slice = ArrayProto.slice,
  toString = ObjProto.toString,
  hasOwnProperty = ObjProto.hasOwnProperty;

var
  nativeIsArray = Array.isArray,
  nativeKeys = Object.keys,
  nativeBind = FuncProto.bind,
  nativeCreate = Object.create;

var
  argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  promiseTag = '[object Promise]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]';
var
  arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

function _defineProperty(obj, key, value) { 
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

var property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

function partial (func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function () {
      var position = 0,
      length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === window ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
        return executeBound(func, bound, this, this, args);
    };
    return bound;
};

function before(times, func){
  var memo;
  return function(){
      if(--times > 0){
          memo = func.apply(this, arguments);
      }
      if(times <= 1) func = null;
      return memo;
  }
}

var once = partial(before, 2);

var createAssigner = function (keysFunc, undefinedOnly) {
  return function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
        keys = keysFunc(source),
        l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

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
/* *** times() *** */
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizCallback(iteratee, context, 1);
  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
  return accum;
};

/* *** extend() *** */
function extend() {
  createAssigner(allKeys)
}


var idCounter = 0;    
function uniqueId(prefix) {
    var id = idCounter++;
     return prefix ? prefix + id : id;
};

var keys = nativeKeys || function(obj){

    if (obj !== Object(obj)) throw new TypeError('Invalid Object');
  
    var keys = [];

    for (var key in obj)
        if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
        return keys;
}

['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function(name){
    window['is' + name] = function(obj){
        return toString.call(obj) === '[object ' + name + ']';
    }
});

/* *** isObject()    *** */
function isObject(obj) {
  return obj === Object(obj);
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
/* *** isDate()      *** */
function isDate(obj) {
  return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}
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
/* *** isWindow ** */
function isWindow(obj) {
  return obj != null && obj === obj.window;
}
/* *** isEven()      *** */
function isEven(num) {
  return num % 2 === 0;
}
/* *** isNull()      *** */
function isNull(obj) {
  return obj === null;
}
/* *** isUndefined() *** */
function isUndefined(obj) {
  return obj === void 0;
}
/* *** isRegExp()    *** */
function isRegExp(obj) {
  return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
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

/* *** isFunction() *** */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/* *** isStream() *** */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/* *** isURLSearchParams() *** */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
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

/**
 * 
 *  
 */

/* *** trim() *** */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/* *** has() *** */
function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}

/* *** keys *** */
function getKeys(obj) {
  if (!isObject(obj)) {
    return [];
  }
  if (nativeKeys) {
    return nativeKeys(obj);
  }
  var keys = [];
  for (var key in obj) {
    if (has(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
}

/* *** allKeys *** */
function allKeys(obj) {
  if (!isObject(obj)) {
    return [];
  }
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

/* *** getValues() *** */
function getValues(obj) {
  var keys = getKeys(obj);
  var length = keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};

/* *** checks() *** */
function checks(arg) {
  if (isObject(arg)) {
    console.log('object', arg);
  }
  if (isArray(arg)) {
    console.log('array', arg);
  }
  if (isLocation(arg)) {
    console.log('location', arg);
  }
  if (isCallable(arg)) {
    console.log('callable', arg);
  }
  if (isContstructor(arg)) {
    console.log('constructor', arg);
  }
  if (isElement(arg)) {
    console.log('element', arg);
  }
  if (isWindow(arg)) {
    console.log('window', arg);
  }
  if (isEmptyObject(arg)) {
    console.log('emptyObject', arg);
  }
  if (isRegExp(arg)) {
    console.log('regexp', arg);
  }
  if (isUniform(arg)) {
    console.log('uniform', arg);
  }
  if (isBoolean(arg)) {
    console.log('boolean', arg);
  }
  if (isString(arg)) {
    console.log('string', arg);
  }
  if (isDate(arg)) {
    console.log('date', arg);
  }
  if (isAlphaNumeric(String(arg))) {
    console.log('alphanumeric', arg);
  }
  if (isNumber(arg)) {
    console.log('number', arg);
  }
  if (isPrime(arg)) {
    console.log('prime', arg);
  }
  if (isEven(arg)) {
    console.log('even', arg);
  }
  if (isFunction(arg)) {
    console.log('function', arg);
  }
  if (isStream(arg)) {
    console.log('stream', arg);
  }
  if (isPlainObject(arg)) {
    console.log('plain object', arg);
  }
  if (isBuffer(arg)) {
    console.log('buffer', arg);
  }
  if (isArrayBuffer(arg)) {
    console.log('array buffer', arg);
  }
  if (isURLSearchParams(arg)) {
    console.log('url param', arg);
  }
  if (isBlob(arg)) {
    console.log('blob', arg);
  }
  if (isFile(arg)) {
    console.log('file', arg);
  }
  if (isNull(arg)) {
    console.log('null', arg)
  }
  if (isUndefined(arg)) {
    console.log('undefined', arg);
  }
}
function checks(o) {
	isObject(o) && console.log("object", o), 
	isArray(o) && console.log("array", o), 
	isLocation(o) && console.log("location", o), 
	isCallable(o) && console.log("callable", o), 
	isContstructor(o) && console.log("constructor", o), 
	isElement(o) && console.log("element", o), 
	isWindow(o) && console.log("window", o), 
	isEmptyObject(o) && console.log("emptyObject", o), 
	isRegExp(o) && console.log("regexp", o), 
	isUniform(o) && console.log("uniform", o), 
	isBoolean(o) && console.log("boolean", o), 
	isString(o) && console.log("string", o), 
	isDate(o) && console.log("date", o), 
	isAlphaNumeric(String(o)) && console.log("alphanumeric", o), 
	isNumber(o) && console.log("number", o), 
	isPrime(o) && console.log("prime", o), 
	isEven(o) && console.log("even", o), 
	isFunction(o) && console.log("function", o), 
	isStream(o) && console.log("stream", o), 
	isPlainObject(o) && console.log("plain object", o), 
	isBuffer(o) && console.log("buffer", o), 
	isArrayBuffer(o) && console.log("array buffer", o), 
	isURLSearchParams(o) && console.log("url param", o), 
	isBlob(o) && console.log("blob", o), 
	isFile(o) && console.log("file", o), 
	isNull(o) && console.log("null", o), 
	isUndefined(o) && console.log("undefined", o)
}
