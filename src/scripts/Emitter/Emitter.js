function Emitter(){};

Emitter.prototype = {
    on : function(event, listener){
        this._eventCollection = this._eventCollection || {};
        this._eventCollection[event] = this._eventCollection[event] || [];
        this._eventCollection[event].push(listener);
        return this;
    },
    once : function(event, listener){
        var self = this;
        function fn() {
            self.off(event, fn);
            listener.apply(this, arguments);
        }
        fn.listener = listener;
        this.on(event, fn);
        return this;
    },
    off : function(event, listener){
        var listeners = undefined;
        if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
            return this;
        }
        listeners.forEach(function (fn, i) {
            if (fn === listener || fn.listener === listener) {
                listeners.splice(i, 1);
            }
        });
        if (listeners.length === 0) {
            delete this._eventCollection[event];
        }
        return this;
    },
    emit : function(event){
        var _this = this, _len = arguments.length;
        for (_len, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key += 1) {
            args[_key - 1] = arguments[_key];
        }
        var listeners = undefined;
        if ( !this._eventCollection || !(listeners = this._eventCollection[event])) {
            return this;
        }
        listeners = listeners.slice(0);
        listeners.forEach(function (fn) {
            return fn.apply(_this, args);
        });
        return this;
    }
};
