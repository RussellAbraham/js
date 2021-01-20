(function(window){
    
    function Constructor(){
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    };

    Constructor.prototype.preinitialize = function(){
        /* override */
    };

    Constructor.prototype.valueOf = function(){
        return this;
    };

    Constructor.prototype.preinitialize= function(){
        /* override */        
    };

    window.Aria = (function(Aria){ 
        
        Aria.Util = {};

        Aria.Debug = function(){

        };

        Aria.Debug.prototype = Object.create(Constructor.prototype, {
            constructor : {
                configurable : true,
                enumerable : true,
                value : Aria.Debug,
                writeable : true
            }
        });
        
        Aria.Debug.prototype.preinitialize = function(){

        };

        Aria.Debug.prototype.initialize = function(){

        };
        
        Aria.Dialog = function(){
            
        };

        Aria.Dialog.prototype = Object.create(Constructor.prototype, {
            constructor : {
                configurable : true,
                enumerable : true,
                value : Aria.Dialog,
                writeable : true
            }
        });

        Aria.Dialog.prototype.preinitialize = function(){

        };

        Aria.Dialog.prototype.initialize = function(){

        };
        return Aria; 
    
    })({});
})(window);