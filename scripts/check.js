function check(arg){
    if(isBoolean(arg)){
        console.log('boolean', arg)
    }
    if(isNull(arg)){
        console.log('null', arg)
    }
    if(isNan(arg)){
        console.log('NaN', arg)
    }
    if(isUndefined(arg)){
        console.log('undefined', arg)
    }
    if(isNumber(arg)){
        console.log('number', arg)
    }
    if(isPrime(arg)){
        console.log('prime', arg)
    }
    if(isEven(arg)){
        console.log('even', arg)
    }    
    if(isString(arg)){
        console.log('string', arg)
    }
    if(isSymbol(arg)){
        console.log('symbol', arg)
    }
    if(isObject(arg)){
        console.log('object', arg)
    }
    if(isArray(arg)){
        console.log('array', arg)
    }
    if(isElement(arg)){
        console.log('element', arg)
    }
    if(isLocation(arg)){
        console.log('location', arg)
    }
}