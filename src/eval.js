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