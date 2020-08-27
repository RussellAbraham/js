
/**
 * @function { each }
 * iterate over array or object data type
 */

function each(object, iterator, context){
    
    if(object == null){ return }

    // If type is array and no context object, use the native forEach 
    if([].forEach && object.forEach === [].forEach){
      object.forEach(iterator, context);  
    } 

    // If type is array and context object is a parameter, iterator calls function on each context object     
    else if (object.length === +object.length) {
        for(var i = 0, l = obj.length; i < l;i++){
            if(i in object && iterator.call(context, object[i], i, object) === breaker) return;
        }
    }

    // If type is object, iterate over the keys 
    else {
        for(var key in object){
            if({}.hasOwnProperty.call(object, key)){
                if(iterator.call(context, obj[key], key, obj) === {}) return;
            }
        }
    }
     
}

// function reverse(array){
//    for(var i = array.length - 1; i >= 0; i--){
//
//    }
// }


// try a reverse iteration

function eachReverse(object, iterator, context){
    
    if(object == null){ return }

    else if(object.length === +object.length){
        for(var i = object.length - 1; i > -1; i--){
            if(object[i] && iterator.call(context, object[i], i, object) === breaker) return;
        }
    }

}

