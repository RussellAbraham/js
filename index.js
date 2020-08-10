(function(application, root){    
    
    'use strict';
    
    /* internal */
    function defineProperty(obj, key, value){ 
	    if (key in obj) { 
		    Object.defineProperty(obj, key, {  
			    value: value,  
			    enumerable: true,  
			    configurable: true, 
			    writable: true  
		    });  
	    } else {  
    		obj[key] = value;  
	    } return obj;   
    }    
    
    /* todo : if setting a dispatch object for a collection, this is an optimized approach */
    var optimizCallback = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function (value) { return func.call(context, value); };
            case 2: return function (value, other) { return func.call(context, value, other); };
            case 3: return function (value, index, collection) { return func.call(context, value, index, collection); };
            case 4: return function (accumulator, value, index, collection) { return func.call(context, accumulator, value, index, collection); };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };
    
    function Demo(context, callback){
        if(context){ this.context = context }
        this.callback = callback;
    }
    
    Demo.prototype = {
        context : null,
        callback : null
    }
    
    /* execute callback with object as parameter within the context   */
    Demo.call = function(object){
        if(object.callback.call(object.context === false)){
             return false;
        }
        return true;
    }
    
    /* define addition prototypes to chain */
    application['api'] = function(){
        return {
            Demo : Demo
        }
    }
    
    if(typeof root !== 'undefined'){
        root.app = application.api();
    }
    
})(new Object(), this);
