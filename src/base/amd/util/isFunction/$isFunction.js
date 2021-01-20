/* *** isFunction() *** */
define(function() {
    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };
    return isFunction;
});
