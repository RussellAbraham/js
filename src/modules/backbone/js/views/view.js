






var View1 = Backbone.View.extend({
  
  template:_.template( $('#languagesTemplate').html()),
  
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template({ language: languages }));
        return this;
    }
});

var View2 = Backbone.View.extend({
   
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.model.get('Message') + " from the View 2"); 
        return this;
    }
  
});

var View3 = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.model.get('Message') + " <iframe src='html/sandbox/sandbox.html'></iframe>"); 
        return this;
    }
});
