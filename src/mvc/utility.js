var 
    require, 
    define;

(function(_){

    function defineProperty(obj, key, value) { 
        if (key in obj) { 
            Object.defineProperty(obj, key, {  
                value: value,  
                enumerable: true,  
                configurable: true, 
                writable: true  
            });  
        } else {  
            obj[key] = value;  
        } 
        return obj;  
    }

    const templateSettings = {
        evaluate : '',
        interpolate : ''
    }

    function template(){

    }

    _.api = function(){
        return {
            template : template
        }
    }

    if(typeof this !== 'undefined'){
        this._ = _.api();
    }

})(new Object());