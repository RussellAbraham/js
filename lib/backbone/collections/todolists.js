/* uses localStorage adapter */
var TodoListLocal = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage("todos-backbone"),
    done: function() {
      return this.where({done: true});
    },
    remaining: function() {
      return this.where({done: false});
    },
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: 'order'
});

/* uses localforage adapter */
var TodoListForage = Backbone.Collection.extend({
	model: Todo,
	sync: Backbone.localforage.sync("todos-backbone"),
 	done: function() {
		return this.where({done: true});
  },
 	remaining: function() {  
	 return this.where({done: false});
  },
	nextOrder: function() {  
		if (!this.length) return 1;    
		return this.last().get('order') + 1; 
	},
	comparator: 'order'
});