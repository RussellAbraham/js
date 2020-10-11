const Router = Backbone.Router.extend({
		
    routes : {
        '*all(/:id)' : 'searchAll',
        'dialog(/:id)(/:page)' : 'dialog'
    },
    
    dialog : function(id, page){
        switch(id){
            case 'alert' : break;
            case 'confirm' : break;
            case 'prompt' : break;
        }
    }

});