const hasOwnProperty = {}.hasOwnProperty;

// Immutable, object whose value cannot change.
function extend(target){
	let i, len = arguments.length;
	for(i = 0;i < len;i++){
		let source = arguments[i];
		for(let key in source){
			if(hasOwnProperty.call(source, key)){
				target[key] = source[key];
			}
		}
	}
	return target;
}

// Mutable, object whose value can change once created
function extend(){
	let i, len = arguments.length;
	const target = {};
	for(i = 0;i < len;i++){
		let source = arguments[i];
		for(let key in source){
			if(hasOwnProperty.call(source, key)){
				target[key] = source[key];
			}
		}
	}
	return target;
}

function extend(obj){
	[].slice.call(arguments, 1).forEach(function(source){
      		for (var prop in source) {
	        		if (source[prop] !== void 0) obj[prop] = source[prop];
      		}
	});
	return obj;
};


function extend(obj, props) {
	for (var prop in props) {
    		if (props[prop]) {
      			obj[prop] = props[prop];
    		}
  	}
	return obj;
}
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
