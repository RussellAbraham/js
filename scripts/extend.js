//
function extend(obj){
	Array.prototype.slice.call(arguments, 1).forEach(function(source){
      		for (var prop in source) {
	        		if (source[prop] !== void 0) obj[prop] = source[prop];
      		}
	});
	return obj;
}

//
window.extend = function (obj, extObj) {
    obj = obj || {};
    if (arguments.length > 2) {
        for (var a = 1; a < arguments.length; a++) {
            window.extend(obj, arguments[a]);
        }
    } else {
        for (var i in extObj) {
            obj[i] = extObj[i];
        }
    }
    return obj;
};
