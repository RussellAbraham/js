define(['backbone'], function(Backbone){
    var Router = Backbone.Router.extend({
        preinitialize : function(){},
        initialize : function(){
            Backbone.history.start();
        }
    });
    return Router;
})