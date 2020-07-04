var ContainerView = Backbone.View.extend({
     myChildView: null,
     
     render: function() {
        this.$el.html("Greeting Area"); 

        this.$el.append(this.myChildView.$el); 
        return this;
    }
});