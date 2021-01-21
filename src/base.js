(function (factory) {
  var root = this;
  
  root.Base = factory(root, {
    Aria : {},
    Debug : {}
  });
  
})(function (root, Base) {
     
  var reference = root.Base;
  
  Base.VERSION = '0.0.1';    
  
  Base.noConflict = function(){  
    root.Base = reference;    
    return this;    
  };

  var Emitter = Base.Emitter = {};
  
  Emitter.on = function(event, listener){  
    this.events = this.events || {};    
    this.events[event] = this.events[event] || [];    
    this.events[event].push(listener);    
    return this;  
  };
        
  Emitter.once = function(){};
      
  Emitter.listen = function(){};
  
  Emitter.off = function(event, listener){    
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
  
  Emitter.emit = function(event){  
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

  return Base;
});
