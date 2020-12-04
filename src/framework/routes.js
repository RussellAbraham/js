(function(Routes){
    
    Routes.Router = Backbone.Router.extend({    
        routes: {
            '*filter': 'setFilter',
            'search(/:key)(/:value)':'search'

        },
        setFilter : function (key) {
            key = key || '';
        },
        search : function(key, value){
            return {
                '' : key,
                '' : value
            }
        }        
    });
    
    return Routes;

})(plugins.Routes);