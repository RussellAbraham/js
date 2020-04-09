(function (object) {	
	    
	['Arguments', 'Location', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {  
		object['is' + name] = function (obj) {    
			return toString.call(obj) === '[object ' + name + ']';      
		}    
	});

	object['function'] = function (obj) {  
		return Function('"use strict";return (' + obj + ')')();    
	}
	
	object['fragment'] = new DocumentFragment(); 
	object['request'] = new XMLHttpRequest();	
	object['worker'] = function (obj) {
    
	}
	
	
	if (typeof window !== 'undefined') {
  
		window.object = object;
    
	}

})(new Object())
