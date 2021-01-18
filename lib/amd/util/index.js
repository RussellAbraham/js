
requirejs.config({
    baseUrl : "./",
    paths : {
        isFunction : 'isFunction/$isFunction',
        isDate : 'isDate/$isDate',
        isRegExp : 'isRegExp/$isRegExp',
        isObject : 'isObject/$isObject',
        isString : 'isString/$isString',
        isBoolean : 'isBoolean/$isBoolean',
        isNumber : 'isNumber/$isNumber',
        isUndefined : 'isUndefined/$isUndefined',
        isNull : 'isNull/$isNull',
        isBase64 : 'isBase64/$isBase64',
        isArrayBuffer : 'isArrayBuffer/$isArrayBuffer',
        isBlob : 'isBlob/$isBlob'
    }
});

requirejs([],function(){
    
});