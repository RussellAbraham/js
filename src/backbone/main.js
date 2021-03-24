define(['router'], function(Router){
    
    function Main(){
        this.preinitialize.apply(this, arguments);
        this.router = new Router();
        this.initialize.apply(this, arguments);
    };

    Main.prototype.preinitialize = function(){};
    Main.prototype.initialize = function(){};

    return Main;
    
});