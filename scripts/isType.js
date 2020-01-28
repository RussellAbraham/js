

function each(obj, iterator, context) {
  var breaker = {},
    ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    hasOwnProperty = ObjProto.hasOwnProperty,
    nativeForEach = ArrayProto.forEach;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (i in obj && iterator.call(context, obj[i], i, obj) === breaker)
        return;
    }
  } else {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) return;
      }
    }
  }
}

/* *** isArray()     *** */ 
function isArray(obj) {
  return toString.call(obj) === "[object Array]";
}

/* *** isObject()    *** */ 
function isObject(obj) {
  return obj === Object(obj);
}

/* *** isString()    *** */ 
function isString(obj) {
  return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

/* *** isNumber()    *** */ 
function isNumber(obj) {
  return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

/* *** isNaN()       *** */ 
function isNan(obj) {
  return obj !== obj;
}

/* *** isBoolean()   *** */ 
function isBoolean(obj) {
  return obj === true || obj === false;
}

/* *** isNull()      *** */ 
function isNull(obj) {
  return obj === null;
}

/* *** isUndefined() *** */ 
function isUndefined(obj) {
  return obj === void 0;
}

/* *** isDate()      *** */ 
function isDate(obj) {
  return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

/* *** isRegExp()    *** */ 
function isRegExp(obj) {
  return !!(
    obj &&
    obj.test &&
    obj.exec &&
    (obj.ignoreCase || obj.ignoreCase === false)
  );
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

/* *** isEven()      *** */ 
function isEven(num) {
  return num % 2 === 0;
}

/* *** isMatch()     *** */
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
}

/*  *** isAlphaNumeric() ***  */
function isAlphaNumeric(str) {
  var code = str.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // uppercase (A-Z)
    !(code > 96 && code < 123)
  ) {
    // lowercase (a-z)
    return false;
  }
  return true;
}

/*  *** isElement() ***  */
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
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

each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"], function(name) {
    window["is" + name] = function(obj) {
      return toString.call(obj) === "[object " + name + "]";
    };
});

function isLocation(obj){
  return toString.call(obj) === "[object Location]";
}

// [native code] 


