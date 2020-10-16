const Container = Backbone.View.extend({
	
	el : $('#main'),
	
	initialize : function(){
		this.$header = this.$('header');
		this.$article = this.$('article');
		this.$footer = this.$('footer');		
	},
    
	render: function(){ 
		return this;   
	}

});