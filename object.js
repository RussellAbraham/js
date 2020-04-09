(function(object){

    ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function(name){
        object['is' + name] = function(obj){
            return toString.call(obj) === '[object ' + name + ']';
        }
    });

    object['function'] = function(obj){
        return Function('"use strict";return (' + obj + ')')();
    }

    if(typeof window !== 'undefined'){
        window.object = object;
    }

})(new Object())
