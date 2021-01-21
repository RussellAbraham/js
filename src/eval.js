// this file contains methods for inspecting javascripts standard objects and producing output using eval

//

this._ = (function (_) {
    
    function Constructor(name){	
        this.preinitialize.apply(this, arguments);	
        this.name = name;
        this.initialize.apply(this, arguments);
    };
    Constructor.prototype.preinitialize = function(){};
    Constructor.prototype.initialize = function(){};
    Constructor.prototype.toString = function(){
        return "[object "+this.name +"]";
    };
    Constructor.prototype.valueOf = function(){
        return this;
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


function sortci(a, b) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  }
  
  // custom because I want to be able to introspect native browser objects *and* functions
  function stringify(o, simple, visited) {
    var json = '', i, vi, type = '', parts = [], names = [], circular = false;
    visited = visited || [];
  
    try {
      type = ({}).toString.call(o);
    } catch (e) { // only happens when typeof is protected (...randomly)
      type = '[object Object]';
    }
  
    // check for circular references
    for (vi = 0; vi < visited.length; vi++) {
      if (o === visited[vi]) {
        circular = true;
        break;
      }
    }
  
    if (circular) {
      json = '[circular]';
    } else if (type == '[object String]') {
      json = '"' + o.replace(/"/g, '\\"') + '"';
    } else if (type == '[object Array]') {
      visited.push(o);
  
      json = '[';
      for (i = 0; i < o.length; i++) {
        parts.push(stringify(o[i], simple, visited));
      }
      json += parts.join(', ') + ']';
      json;
    } else if (type == '[object Object]') {
      visited.push(o);
  
      json = '{';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        parts.push( stringify(names[i], undefined, visited) + ': ' + stringify(o[ names[i] ], simple, visited) );
      }
      json += parts.join(', ') + '}';
    } else if (type == '[object Number]') {
      json = o+'';
    } else if (type == '[object Boolean]') {
      json = o ? 'true' : 'false';
    } else if (type == '[object Function]') {
      json = o.toString();
    } else if (o === null) {
      json = 'null';
    } else if (o === undefined) {
      json = 'undefined';
    } else if (simple == undefined) {
      visited.push(o);
  
      json = type + '{\n';
      for (i in o) {
        names.push(i);
      }
      names.sort(sortci);
      for (i = 0; i < names.length; i++) {
        try {
          parts.push(names[i] + ': ' + stringify(o[names[i]], true, visited)); // safety from max stack
        } catch (e) {
          if (e.name == 'NS_ERROR_NOT_IMPLEMENTED') {
            // do nothing - not sure it's useful to show this error when the variable is protected
            // parts.push(names[i] + ': NS_ERROR_NOT_IMPLEMENTED');
          }
        }
      }
      json += parts.join(',\n') + '\n}';
    } else {
      try {
        json = o+''; // should look like an object
      } catch (e) {}
    }
    return json;
  }

 
  function toSource(func) { if (func != null) { try { return Function.prototype.toString.call(func); } catch (e) {} try { return func + ""; } catch (e) {} } return ""; }
  function toProps(obj) { var resultSet = {}; for (var o = obj; o; o = o.__proto__) { try { var names = Object.getOwnPropertyNames(o); for (var i = 0; i < names.length; ++i) resultSet[names[i]] = "[" + typeof obj[names[i]] + "]"; } catch (e) {} } return JSON.stringify(resultSet, null, 2); }
 
// if input has (

    // -o
    // > __proto__

    // -p
    // prototype

    // -c
    // constructor

// )

// run additional level of parsing if the indicated flags properties are present on the input, 

// else return input value and error, that nested level, does not exist on the input


function parse(string) {

    var result;

    if (typeof string == "function" || false) {
        result = toSource(string);
    }

    else if (!!(string && string.test && string.exec && (string.ignoreCase || string.ignoreCase === false))) {
        result = new RegExp(string).toString();
    } 
      
    else if (!!(string && string.getTimezoneOffset && string.setUTCFullYear)) {
        result = string.toString();
    } 

    else if (typeof string === "object" || false) {
        result = toProps(string);
    } 
      
    else if (!!(string === "" || (string && string.charCodeAt && string.substr))) {
        result = string;
    } 
      
    else if (!!(string === 0 || (string && string.toExponential && string.toFixed))) {          
        result = string;
    } 
    
    else if (string === true || string === false) {
        result = string;
    } 
      
    else if (string === void 0) {
        result = undefined;
    } 
      
    else if (string === null) {
        result = null;
    }

    return result;

}

(function(global) {
    function toSource(func) { if (func != null) { try { return Function.prototype.toString.call(func); } catch (e) {} try { return func + ""; } catch (e) {} } return ""; }
    function toProps(obj) { var resultSet = {}; for (var o = obj; o; o = o.__proto__) { try { var names = Object.getOwnPropertyNames(o); for (var i = 0; i < names.length; ++i) resultSet[names[i]] = "[" + typeof obj[names[i]] + "]"; } catch (e) {} } return JSON.stringify(resultSet, null, 2); }
    function data(options) { options = options || {}; var prefix = '<data class="'; var suffix = '" value="' + options.value.length + '">'; var tail = "</data>"; return prefix .concat(options.class) .concat(suffix) .concat(options.value) .concat(tail); }
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




function initPort(event) {      		
    port2 = event.ports[0];        			
    port2.onmessage = onMessage;        			
}

function onMessage(event) {									
    var data = event.data;
    var result;
    try {}
    catch (er) {			
        result = er.stack; 			
    }						
    finally {			
        port2.postMessage(data);
    }
}




window.addEventListener('');