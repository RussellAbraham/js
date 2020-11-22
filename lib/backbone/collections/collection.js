const Collection = Backbone.Collection.extend({
	
	model : Model,
	
	sync : Backbone.localforage.sync("collection-backbone"),
	
	export : function(){
		const data = JSON.stringify(this.toJSON(), null, 2);
		const blob = new Blob([data], { type : 'application/json' });
		const url = window.URL.createObjectURL(blob);
		var fragment = new DocumentFragment();
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'export-' + Date.now() + '.json';
		fragment.appendChild(anchor);
		anchor.click();
		fragment.removeChild(anchor);
		fragment = null;
	},
	
	import : function(json){
		var self = this;
		json.forEach(function(obj){
			return self.create(obj)
		});
		console.log(this.toJSON())
	}
	
});