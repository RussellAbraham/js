/* build array of types; todo: Add all additional types */
const typeCheck = "Object,Array,String,Boolean,Number,Null,Undefined",
      arrayCheck = typeCheck.split(","),
      typesChecked = [];

/* build object, push object to typesChecked Array */
arrayCheck.forEach(function(type){
  console.log('storing: [' + type + ']', Date.now());
  var obj = { type: type, date: new Date(), container: [] }
  typesChecked.push(obj);
});
  
/* global reference to any data we have parsed */
const checked = {
    object:typesChecked[0].container,
    string:typesChecked[1].container,
    boolean:typesChecked[2].container,
    number:typesChecked[3].container,
    nill:typesChecked[4].container,
    undefinded:typesChecked[5].container,
}

/* *** isObject()    *** */ 
function isObject(obj) {
  return obj === Object(obj);
}
function isArray(obj) {
  return toString.call(obj) === "[object Array]";
}
/*  *** isLocation() ***  */
function isLocation(obj){
  return toString.call(obj) === "[object Location]";
}
/*  *** isFunction() ***  */
function isFunction(obj){
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
/*  *** isCallable() ***  */
function isCallable(obj){
    return typeof obj === 'function';
}
/*  *** isConstructor() ***  */
function isContstructor(obj){
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
function isWindow(obj){
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
function isPlainObject(obj){		
  var proto, Ctor;
  if ( !obj || toString.call( obj ) !== "[object Object]" ) {
    return false;
  }
  proto = getProto( obj );
  if ( !proto ) {
    return true;
  }
  Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;		
  return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;	
}

/* *** isEmptyObject *** */	
function isEmptyObject(obj){
  var name; 
  for ( name in obj ) {
    return false;
  }
  return true;
}

 function isAlphaNumeric(str){
   var code = str.charCodeAt(0);
     if(!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // uppercase (A-Z)
        !(code > 96 && code < 123)){ // lowercase (a-z)
       return false;
     }
   return true;
 }



function checks(arg){
    if(isObject(arg)){
      console.log('object', arg);
    }
    if(isArray(arg)){
      console.log('array', arg);
    }  
    if(isLocation(arg)){
      console.log('location', arg);
    }
    if(isFunction(arg)){
      console.log('function', arg);
    }
    if(isCallable(arg)){
      console.log('callable', arg);
    }
    if(isContstructor(arg)){
      console.log('constructor', arg);
    }
    if(isElement(arg)){
      console.log('element', arg);
    }
    if(isWindow(arg)){
      console.log('window', arg);
    }
    if(isEmptyObject(arg)){
      console.log('emptyObject', arg);
    }    
    if(isRegExp(arg)){
      console.log('regexp', arg);
    }
    if(isUniform(arg)){
      console.log('uniform', arg);
    }
    if(isBoolean(arg)){
      console.log('boolean', arg);
    }
    if(isString(arg)){        
      console.log('string', arg);         
    }
    if(isDate(arg)){
      console.log('date', arg);
    }
    if(isAlphaNumeric(String(arg))){
      console.log('alphanumeric', arg);
    }
    if(isNumber(arg)){    
      console.log('number', arg);
    }
    if(isPrime(arg)){
      console.log('prime', arg);
    }
    if(isEven(arg)){
      console.log('even', arg);
    }
    if(isNull(arg)){
      console.log('null', arg)
    }
    if(isUndefined(arg)){
      console.log('undefined', arg);  
    }
}



/* additional functions */
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

/* *** isNaN()       *** */ 
function isNan(obj) {
  return obj !== obj;
}
