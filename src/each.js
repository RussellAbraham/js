/**
 * @param  object 
 * @param  iterator
 * @param  context 
 */
function each(object, iterator, context){
    if(object == null){ return }
    if([].forEach && object.forEach === [].forEach){
      object.forEach(iterator, context);  
    } 
    else if (object.length === +object.length) { var i;
        for(i = 0, l = object.length; i < l;i++){
            if(i in object && iterator.call(context, object[i], i, object) === {}) return;
        }
    }
    else {
        for(var key in object){
            if({}.hasOwnProperty.call(object, key)){
                if(iterator.call(context, object[key], key, object) === {}) return;
            }
        }
    }    
}

/** 
 * @param object
 * @param iterator
 * @param context
 */
function map(object, iterator, context) {
    var results = [];
    if (object == null) return results;
    if ([].map && object.map === [].map) return object.map(iterator, context);
    each(object, function (value, index, list) {
        return results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
}

function isObject(obj) {
    return obj === Object(obj);
}

function keys(object) {
    if (object !== Object(object)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in object)
        if ({}.hasOwnProperty.call(object, key)) keys[keys.length] = key;
    return keys;
}

function allKeys(object) {
    if (!isObject(object)) {
        return [];
    }
    var keys = [];
    for (var key in object) {
        keys.push(key);
    }
    return keys;
}

function identity(object) {
    return object;
}

function getValues(object) {
    return map(object, identity);
}

/** eachReverse
 * @param { object }
 * @param { iterator }
 * @param { context }
 */
function eachReverse(object, iterator, context) {
    if (object == null) {
        return
    } else if (object.length === +object.length) {
        for (var i = object.length - 1; i > -1; i--) {
            if (object[i] && iterator.call(context, object[i], i, object) === breaker) return;
        }
    }

}
