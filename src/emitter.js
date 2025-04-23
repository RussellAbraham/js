

var Events = (function(Events){

    Events.on = function(event, listener){
        this.events = this.events || {};
        this.events[event] = this.events[event] || [];
        this.events[event].push(listener);
        return this;
    };
    
    Events.once = function(){};
    
    Events.listen = function(){};

    Events.off = function(event, listener){
        var listeners = undefined;
        if(!this.events || !(listeners = this.events[event])){
            return this;
        }
        listeners.forEach(function(func, index){
            if(func === listener || func.listener === listener){
                listeners.splice(index, 1);
            }
        });
        if(listeners.length === 0){
            delete this.events[event];
        }
        return this;
    };

    Events.emit = function(event){
        var self = this, length = arguments.length;
        for(length, args = Array(length > 1 ? length - 1 : 0), key = 1;key < length;key += 1){
            args[key - 1] = arguments[key];
        }
        var listeners = undefined;
        if(!this.events || !(listeners = this.events[event])){
            return this;
        }
        listeners.forEach(function(func){
            return func.apply(self, args);
        })
    };

    return Events;

})({});

// middleware function
function Listening(listener, obj) {
    this.id = listener.cid;
    this.listener = listener;
    this.obj = obj;
    this.interop = true;
    this.count = 0;
    this.events = void 0;
};

Listening.prototype.on = function(){};

Listening.prototype.off = function(){};

Listening.prototype.cleanup = function () {
    delete this.listener.listeningTo[this.obj.cid];
    if (!this.interop) delete this.obj.listeners[this.id];
};

function Emitter(name){
    this.name = name;
};

Emitter.prototype = Object.create(Object.prototype,{
    constructor : {
        configurable : true,
        enumerable : true,
        value : Emitter,
        writeable : true
    }
});

Emitter.prototype.valueOf = function(){
    return this;
};

Emitter.prototype.on = function(event, listener){
    this.events = this.events || {};
    this.events[event] = this.events[event] || [];
    this.events[event].push(listener);
    return this;
};
  
Emitter.prototype.once = function(event, listener){        
    var self = this;
    function func() {
        self.off(event, func);    
        listener.apply(this, arguments);
    }
    func.listener = listener;
    this.on(event, func);
    return this;
};

Emitter.prototype.off = function(event, listener){        
    var listeners = undefined;    
    if(!this.events || !(listeners = this.events[event])){    
        return this;    
    }    
    listeners.forEach(function(func, index){    
        if(func === listener || func.listener === listener){    
            listeners.splice(index, 1);    
        }    
    });    
    if(listeners.length === 0){    
        delete this.events[event];    
    }    
    return this;    
};

Emitter.prototype.emit = function(event){        
    var self = this, length = arguments.length;    
    for(length, args = Array(length > 1 ? length - 1 : 0), key = 1;key < length;key += 1){
        args[key - 1] = arguments[key];
    }
    var listeners = undefined;
    if(!this.events || !(listeners = this.events[event])){    
        return this;
    }    
    listeners.forEach(function(func){    
        return func.apply(self, args);    
    });    
};


// EventEmitter.js

export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] ||= []).push(listener);
    return this;
  }

  off(event, listener) {
    const listeners = this.events[event];
    if (!listeners) return this;

    this.events[event] = listeners.filter(fn => fn !== listener && fn.listener !== listener);
    if (this.events[event].length === 0) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events[event];
    if (!listeners) return this;

    listeners.forEach(fn => fn.apply(this, args));
    return this;
  }
}

