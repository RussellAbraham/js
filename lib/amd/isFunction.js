/* *** isFunction() *** */

define(function(){
    
    var isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };
    
    return isFunction;

});