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
function charCount(str){
  var result = {};
  for(var char of str){
    if(isAlphaNumeric(char)){
      char = char.toLowerCase();
      result[char] = ++result[char] || 1;
    }
  }
  return result
}
/*  *** isAlphaNumeric() ***  */
// requires a "" as argument
function isAlphaNumeric(str){
  var code = str.charCodeAt(0);
    if(!(code > 47 && code < 58) && // numeric (0-9)
       !(code > 64 && code < 91) && // uppercase (A-Z)
       !(code > 96 && code < 123)){ // lowercase (a-z)
      return false;
    }
  return true;
}
/* *** isNumber()    *** */ 
function isNumber(obj) {
  return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
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
/* *** isEven()      *** */ 
function isEven(num) {
  return num % 2 === 0;
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
/* *** isNull()      *** */ 
function isNull(obj) {
  return obj === null;
}
/* *** isUndefined() *** */ 
function isUndefined(obj) {
  return obj === void 0;
}
/* *** isPlainObject() *** */ 
function isPlainObject(obj){		
  var proto, Ctor;
  // Detect obvious negatives		
  // Use toString instead of jQuery.type to catch host objects
  if ( !obj || toString.call( obj ) !== "[object Object]" ) {
    return false;
  }
  proto = getProto( obj );
  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if ( !proto ) {
    return true;
  }
  // Objects with prototype are plain iff they were constructed by a global Object function
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
/* *** isWindow ** */
function isWindow(obj){
  return obj != null && obj === obj.window;
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
["Arguments","Function","Error","Symbol","Map","WeakMap","Set","WeakSet"].forEach(function(name){
    window["is" + name] = function(obj) {
      return toString.call(obj) === "[object " + name + "]";
    };
});

//* sort arguments into objects, push objects to container by type */
function check(arg){
  var obj = {data:arg,name: String(arg), id:Date.now()}
  if(isObject(arg)){
    console.log('object', arg);
    checked.object.push(obj); 
  }
  if(isArray(arg)){
    console.log('array', arg);
    // checked.array.push(obj); 
  }  
  if(isLocation(arg)){
    console.log('location', arg);
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
  if(isMatch(arg)){
    console.log('match', arg);
  }      
  if(isRegExp(arg)){
    console.log('regexp', arg);
  }
  if(isUniform(arg)){
    console.log('uniform', arg);
  }
  if(isBoolean(arg)){
    console.log('boolean', arg);
    checked.boolean.push(arg)
  }
  if(isString(arg)){        
    console.log('string', arg);      
    checked.string.push(arg);    
  }
  if(isDate(arg)){
    console.log('date', arg);
  }
  if(isAlphaNumeric(String(arg))){
    console.log('alphanumeric', arg);
  }
  if(isNumber(arg)){    
    console.log('number', arg);
    checked.number.push(arg);
  }
  if(isPrime(arg)){
    console.log('prime', arg);
  }
  if(isEven(arg)){
    console.log('even', arg);
  }
  if(isNull(arg)){
    console.log('null', arg)
    //checked.nill.push(arg);
  }
  if(isUndefined(arg)){
    console.log('undefined', arg);  
    //checked.undefined.push('undefined');
  }
}

/* global reference to any data we have parsed */
const checked = {
    object:typesChecked[0].container,
    string:typesChecked[1].container,
    boolean:typesChecked[2].container,
    number:typesChecked[3].container,
    nill:typesChecked[4].container,
    undefinded:typesChecked[5].container,
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
