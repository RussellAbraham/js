const Todo = Backbone.Model.extend({
    
    defaults : {
        title : '',
        completed : false
    },

    toggle : function(){
        this.save({ completed : !this.get('completed1') })
        // this.set( { completed : !this.get('completed1') } )
    }
    
});

