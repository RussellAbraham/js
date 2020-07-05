(function (root) {
    
    var GlobalController = function(object){
        this.object = object;
    };

    GlobalController.prototype = {
        object: function(key){
            return this.object[key];
        }
    };
    
    var object = {};
    
    var Controller = new GlobalController(object);

    var Auto = function () {
        this.test();
    };

    Auto.prototype = {
        test:function(){
            var self = this;
            console.log(self);
        },
        init:function(keys){
            for(var key in keys){

            }
        }
    };

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return {
                Controller: Controller,
                Auto: Auto
            };
        });
    }

    if (typeof exports !== 'undefined') {
        exports.Controller = Controller;
        exports.Auto = Auto;
    }

    if (typeof root !== 'undefined') {
        root.Controller = Controller;
        root.Auto = Auto;
    }

})(this);