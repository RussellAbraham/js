const ContainerView = Backbone.View.extend({
     
    el : $(),

    child : null,

    render: function(){
        this.$el.html(''); 
        this.$el.append(this.child.$el); 
        return this;
    }

});