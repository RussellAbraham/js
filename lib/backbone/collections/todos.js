const Todos = Backbone.Collection.extend({
    model : Todo,
    localStorage : new Backbone.localStorage('todos-backbone'),
    completed : function(){
        return this.where({ completed : true });
    },
    remaining : function(){
        return this.where({ completed : false });
    },
    nextOrder : function(){
        return this.length ? this.last().get('order') + 1 : 1;
    },
    comparator : 'order'
});