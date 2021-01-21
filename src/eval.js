// this file contains methods for inspecting javascripts standard objects and producing output using eval

//

var SimplePropertyRetriever = {
    getOwnEnumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._enumerable);
        // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
    },
    getOwnNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._notEnumerable);
    },
    getOwnEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
        // Or just use: return Object.getOwnPropertyNames(obj);
    },
    getPrototypeEnumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._enumerable);
    },
    getPrototypeNonenumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._notEnumerable);
    },
    getPrototypeEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
    },
    getOwnAndPrototypeEnumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._enumerable);
        // Or could use unfiltered for..in
    },
    getOwnAndPrototypeNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._notEnumerable);
    },
    getOwnAndPrototypeEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
    },
    // Private static property checker callbacks
    _enumerable: function (obj, prop) {
        return obj.propertyIsEnumerable(prop);
    },
    _notEnumerable: function (obj, prop) {
        return !obj.propertyIsEnumerable(prop);
    },
    _enumerableAndNotEnumerable: function (obj, prop) {
        return true;
    },
    _getPropertyNames: function getAllPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
        var props = [];
        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function (prop) {
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
    var json = '',
        i, vi, type = '',
        parts = [],
        names = [],
        circular = false;
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
            parts.push(stringify(names[i], undefined, visited) + ': ' + stringify(o[names[i]], simple, visited));
        }
        json += parts.join(', ') + '}';
    } else if (type == '[object Number]') {
        json = o + '';
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
            json = o + ''; // should look like an object
        } catch (e) {}
    }
    return json;
}


function toSource(func) {
    if (func != null) {
        try {
            return Function.prototype.toString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}

function toProps(obj) {
    var resultSet = {};
    for (var o = obj; o; o = o.__proto__) {
        try {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; ++i) resultSet[names[i]] = "[" + typeof obj[names[i]] + "]";
        } catch (e) {}
    }
    return JSON.stringify(resultSet, null, 2);
}

// if input has (

// -o
// > __proto__

// -p
// prototype

// -c
// constructor

// )

// run additional level of parsing if the indicated flags properties are present on the input, 

// else return input value and error, that the requested property, does not exist on the input


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

var api = (window.api = (function (api) {
    return api;
})({}));

function parse(string) {
    return string.split(/\s+/);
}

function format(array) {
    while (array.length > 0 && array[0] === "") {
        array = array.slice(1);
    }
    while (array.length > 0 && array[array.length - 1] === "") {
        array = array.slice(0, array.length - 1);
    }
    return array;
}

function first(array, n, guard) {
    return n != null && !guard ? [].slice.call(array, 0, n) : array[0];
}

function rest(array, index, guard) {
    return [].slice.call(array, index == null || guard ? 1 : index);
}

function last(array) {
    return array[array.length - 1];
}

function reparse(string) {
    var tokens = parse(string);
    var array = format(tokens);
    var wrapper = api[first(tokens)];
    wrapper.apply(this, rest(array));
}


// 

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
