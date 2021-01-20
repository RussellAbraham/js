(function (factory) {
    
    var root = typeof self == 'object' && self.self === self && self || 
                typeof global == 'object' && global.global === global && global;
    
    root.Base = factory(root, {});
    
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            root.Base = factory(root, exports);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);
    }
})(function (Base) {
    
    
    
    return Base;

});
