(function(){

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

    function Controller(model,view){
        var self = this;
        self.model = model;
        self.view = view;
    };
    
    Controller.prototype = Object.create(Constructor.prototype, {constructor:{
        constructor : {
            configurable : true,
            enumerable : true,
            value : Controller,
            writeable : true
        }
    }});

    Controller.prototype.preinitialize = function(){
        
    };

    Controller.prototype.initialize = function(){

    };

})();