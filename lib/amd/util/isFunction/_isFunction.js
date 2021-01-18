/* *** isFunction() *** */

_.isFunction = function (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};