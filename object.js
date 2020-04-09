(function (object) {
    var property = function(key) {
        return function(obj) {
          return obj == null ? void 0 : obj[key];
        };  
    };	
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    /* *** isArray()    *** */
    function isArray(obj) {
        return toString.call(obj) === "[object Array]";
    }
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    /* *** isBuffer() *** */
    function isBuffer(val) {
        return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
    /* *** isObject()    *** */
    function isObject(obj) { 
	    return obj === Object(obj); 
    }
    /* *** isObjectLike()    *** */
    function isObjectLike(value) { 
	    return value != null && typeof value == 'object'; 
    }

    object['isArray'] = function(obj){
        return isArray(obj)
    }
    object['isArrayLike'] = function(obj){
        return isArrayLike(obj)
    }
    object['isBuffer'] = function(obj){
        return isBuffer(obj)
    }
    object['isArrayBufferView'] = function(obj){
        return isArrayBufferView(obj)
    }	
    object['isObject'] = function(obj){
        return isObject(obj)
    }
    object['isObjectLike'] = function(obj){
        return isObjectLike(obj)
    }

    ['Arguments', 'Location', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
        object['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        }
    });


    object['function'] = function (obj) {
        return Function('"use strict";return (' + obj + ')')();
    }

    if (typeof window !== 'undefined') {
        window.object = object;
    }

})(new Object())
