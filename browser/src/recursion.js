
// Pure Recursion Example

function collection(arr){

    let array = []

    if(array.length === 0){
        return array;
    }

    if(arr[0] % 2 !== 0){
        array.push(arr[0]);
    }

    array = array.concat(collection(arr.slice(1)))

    return array;
}

// Helper Method Recursion Example

function collector(arr){

    let result = [];

    function helper(helperInput){

        if(helperInput.length === 0){
            return;
        }
        
        if(helperInput[0] % 2 !== 0){
            result.push(helperInput[0])
        }
        
        helper(helperInput.slice(1))

    }

    helper(arr);

    return result;

}

/* Helper Functions */

function stringSortCase(alpha, beta){
    return alpha.toLowerCase() < beta.toLowerCase() ? -1 : 1;
}

function isObjectLike(object){
    return ( 
        !!object && ( typeof ( object ) === 'object' ) && ( typeof ( object.length ) === 'undefined' )   
    );
}

function isArrayLike(object){
    if ( typeof ( object ) === 'array' ) return true;
    return ( 
        !! object && typeof ( object ) === 'object' ) && ( typeof ( object.length ) != 'undefined' )     
    );
}

/* polyfill for...of values iterator, getValues( this.__proto__ ) */
function _each(obj, iterator, context){ var breaker = {}; if (obj == null) return;      if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {  obj.forEach(iterator, context);  } else if (obj.length === +obj.length) {  for (var i = 0, l = obj.length; i < l; i++) {  if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;  }  } else {  for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) {  if (iterator.call(context, obj[key], key, obj) === breaker) return; }  }  } }
function _map(obj, iterator, context){    var results = []; if(obj == null) return results; if(Array.prototype.map && obj.map === Array.prototype.map) return obj.map(iterator, context); _each(obj, function(value, index, list) {  results[results.length] = iterator.call(context, value, index, list);  }); return results; }
function cid(value){ return value }
function getValues(obj){ 
    return _map(obj, cid) 
}

// primitves
function isObject(obj) { return obj === Object(obj); } 
function isString(obj) { return !!(obj === "" || (obj && obj.charCodeAt && obj.substr)); } 
function isBoolean(obj) { return obj === true || obj === false; } 
function isNumber(obj) { return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed)); } 
function isNull(obj) { return obj === null; } 
function isUndefined(obj) { return obj === void 0; }  
function isDate(obj) { return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear); } 

var thrown = null;

function forceCatchWithThrow(object){
/* 
    determine data type of the argument passed,     
    then throw it to outside catch with an added prefix and suffix 
*/
	function primitive(object){        		
		try {			          			            
			if(isObject(object)){ throw '[ Object : ' + object + ']'; }
		    	if(isBoolean(object)){ throw '[ Boolean : ' + object + ']'; }
		    	if(isNumber(object)){ throw '[ Number : ' + object + ']'; }
		    	if(isString(object)){ throw '[ String : ' + object + ']'; }
		    	if(isUndefined(object)){ throw '[ Undefined : ' + object + ']'; }
		    	if(isNull(object)){ throw '[ Null : ' + object + ']'; }	    	    
		}      
		catch(er){
			throw 'Error : ' + er.stack;
		}
	}
	try {
		primitive ( object )
	} 
	/* output result */    
	catch ( result ) {
        	thrown = result;
        	console.info( result );
	}
	finally {
        	thrown = null;
        	console.info( 'complete' );    
	}        
}

// Recursive parser, handles circular and native objects

function stringify(object, plain, iterator){
    
    var string = '', 
        type   = '';
    
    var keys   = [];
    var values = [];
    
    var i, j;
    
    var circular = false;
    
    iterator = iterator || [];
    
    try {
        
        type = ({}.toString.call(object));
    
    } catch (er) { 
    
        type = '[object Object]';
        
        return er.stack; 
    
    }
    
}

(function(){    
    // internal
    function sortci(a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    }     
    function isHash(obj) {
    	return( !!obj && (typeof(obj) === 'object') && (typeof(obj.length) === 'undefined') );
    }
    function isArrayLike(obj) {
    	if (typeof(obj) == 'array') return true;
    	return( !!obj && (typeof(obj) === 'object') && (typeof(obj.length) != 'undefined') );
    }
    // good function but output it hacked together... todo : sort results into proper object for return
    function stringify(o, simple, visited) {
      var json = '', i, vi, type = '', parts = [], names = [], circular = false;
      visited = visited || [];
      try { type = ({}).toString.call(o); } catch (e) { /* only happens when typeof is protected (...randomly) */ type = '[object Object]'; } 
      /* check for circular references */
      for (vi = 0; vi < visited.length; vi++) { if (o === visited[vi]) { circular = true; break; } }  
      if (circular) { json = '[circular]'; } 
      else if (type == '[object String]') { json = '' + o.replace(/"/g, '\\"') + ''; /*json = '"' + o.replace(/"/g, '\\"') + '"'; */ }    
      else if (type == '[object Array]') { visited.push(o); json = '['; for (i = 0; i < o.length; i++) { parts.push(stringify(o[i], simple, visited)); } json += parts.join(', ') + ']'; json; }     
      else if (type == '[object Object]') { visited.push(o); json = '{'; for (i in o) { names.push(i); } names.sort(sortci); for (i = 0; i < names.length; i++) { parts.push( stringify(names[i], undefined, visited) + ': ' + stringify(o[ names[i] ], simple, visited) ); } json += parts.join(', ') + '}'; } 
      else if (type == '[object Number]') { json = o+''; } 
      else if (type == '[object Boolean]') { json = o ? 'true' : 'false'; } 
      else if (type == '[object Function]') { json = o.toString(); } 
      else if (o === null) { json = 'null'; } 
      else if (o === undefined) { json = 'undefined'; } 
      else if (simple == undefined) { visited.push(o);  json = type + '{\n'; for (i in o) { names.push(i); } names.sort(sortci); for (i = 0; i < names.length; i++) { try { parts.push(names[i] + ': ' + stringify(o[names[i]], true, visited)); /* safety from max stack*/ } catch (e) { if (e.name == 'NS_ERROR_NOT_IMPLEMENTED') { /* do nothing - not sure it's useful to show this error when the variable is protected*/ /* parts.push(names[i] + ': NS_ERROR_NOT_IMPLEMENTED');*/ } } } json += parts.join(',\n') + '\n}'; } else { try { json = o+''; /*should look like an object*/ } catch (e) {} } return json;  
    }
    function serialize(obj, r) {
      r || (r = ":");
      var string = "";
      if ("boolean" == typeof obj) string += obj ? "true" : "false";  
    	else if ("number" == typeof obj) string += obj;  
    	else if ("string" == typeof obj) string += '"' + obj
        .replace(/([\"\\])/g, "\\$1")
        .replace(/\r/g, "\\r")
        .replace(/\n/g, "\\n") + '"';	
      else if (isHash(obj)){
    		var i = 0, n = []; 
        for (var t in obj) n[i] = (t.match(/^[A-Za-z]\w*$/) ? t : '"' + t + '"') + r + serialize(obj[t], r), i++;
    		string += "{" + n.join(",") + "}"
    	} else if (isArrayLike(obj)) {
    		n = [];
    		for (var o = 0, f = obj.length; o < f; o++) n[o] = serialize(obj[o], r);
    		string += "[" + n.join(",") + "]"
    	} else string += "0";  
    	return string
    }
    function looseJsonParse(obj){
        return Function('"use strict";return (' + obj + ')')();
    }
    // export    
    if(typeof window !== 'undefined'){
      window.stringify = stringify;
      window.serialize = serialize;
      window.looseJsonParse = looseJsonParse;
    }
  })();
