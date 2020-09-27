
function curry(callback){
    var args = [].slice(arguments, 1);
    return function(){
        return callback.apply(this, args.concat([].slice(arguments)));
    }
}

function curry(callback){
    return function(param1){
        return function(param2){
            callback(param1, param2);
        }
    }
}
