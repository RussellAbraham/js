
// version 1 : uses arguments keyword for second parameter
function extend(obj){
	[].slice.call(arguments, 1).forEach(function(source){
      		for (var prop in source) {
	        		if (source[prop] !== void 0) obj[prop] = source[prop];
      		}
	});
	return obj;
}

// version 2 : 
function extend(obj, props) {
	for (var prop in props) {
    		if (props[prop]) {
      			obj[prop] = props[prop];
    		}
  	}
	return obj;
}

// version 3 : 
function extend(obj, extObj) {
    	obj = obj || {};
    	if (arguments.length > 2) {
        	for (var a = 1; a < arguments.length; a++) {
            		this.extend(obj, arguments[a]);
        	}
    	} else {
        	for (var i in extObj) {
            		obj[i] = extObj[i];
        	}
    	}
    	return obj;
};
