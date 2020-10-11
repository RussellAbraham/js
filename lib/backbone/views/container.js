const Container = Backbone.View.extend({
	
	el : '#main',
	
	initialize : function(){
		this.$header = this.$('header');
		this.$article = this.$('article');
		this.$footer = this.$('footer');
		this.listenTo(collection, 'add', this.addOne);
		this.listenTo(collection, 'all', _.debounce(this.render, 0));		
	},
    
	render: function(){ 
		return this;   
	},
	
	addOne : function(model){
		var view = new View({ model : model });
		this.$article.append(view.render().el);
	}

});