window.$ = (function ($) {

    $.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    $.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    $.on = function (target, type, callback) {
        target.addEventListener(type, callback, false);
    };

    return $;

})({});