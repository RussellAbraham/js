const TodoRouter = Backbone.Router.extend({		
	routes: {	
		'*filter': 'setFilter'		
	},	
	setFilter: function (param) {
		// Common.TodoFilter = param || '';
		Todos.trigger('filter');
	}		
});