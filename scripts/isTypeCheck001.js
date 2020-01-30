const typeCheck = "Object,String,Boolean,Number,Null,Undefined",
      arrayCheck = typeCheck.split(","),
      typesChecked = [],
      config = [
        { title: 'object' },
        { title: 'string' },
        { title: 'boolean' },
        { title: 'number'},
        { title: 'null'},
        { title: 'undefined'}
    ];

arrayCheck.forEach(function(type){
  console.log('storing: [' + type + ']', Date.now());
  var obj = { type: type, date: new Date(), container: [] }
  typesChecked.push(obj);
});


function isObject(obj) {
  return obj === Object(obj);
}
function isString(obj) {
  return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}
function isBoolean(obj) {
  return obj === true || obj === false;
}
function isNumber(obj) {
  return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}
function isNull(obj) {
  return obj === null;
}
function isUndefined(obj) {
  return obj === void 0;
}
function check(arg){
  var obj = {data:arg,name: String(arg), id:Date.now()}
  if(isObject(arg)){
    console.log('object', arg);
    checked.object.push(obj); 
  }
  if(isBoolean(arg)){
    console.log('boolean', arg);
    checked.boolean.push(arg)
  }
  if(isString(arg)){        
    console.log('string', arg);      
    checked.string.push(arg);    
  }
  if(isNumber(arg)){    
    console.log('number', arg);
    checked.number.push(arg);
  }    
  if(isNull(arg)){
    console.log('null', arg)
  }
  if(isUndefined(arg)){
    console.log('undefined', arg);  
  }
}
  
const objectTemplate    = "",
      booleanTemplate   = "",
      stringTemplate    = "",
      numberTemplate    = "",
      nullTemplate      = "",
      undefinedTemplate = "";
  
function hashSwitch(){
    const hash = window.location.hash;
    switch (hash) {
      case "object":
        break;
      case "boolean":
        break;
      case "string":
        break;
      case "number":
        break;
      case "null":
        break;
      case "undefined":
        break;    
      default:
        break;
    } 
}
  
window.addEventListener("hashchange", hashSwitch);
window.addEventListener("load", hashSwitch);
