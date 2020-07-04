/* uses localStorage adapter */
var TodoLocal = Backbone.Model.extend({
    defaults: function() {
      return {
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },
    toggle: function() {
      this.save({done: !this.get("done")});
    }
});

/* uses localForage adapter */
var TodoForage = Backbone.Model.extend({    
	defaults: function() {  
		return {    
			title: "empty todo...",      
			order: Todos.nextOrder(),      
			done: false      
		};		
	},
	toggle: function() {  
		this.save({done: !this.get("done")});  		
	},
	sync: Backbone.localforage.sync("todos-backbone")
});

