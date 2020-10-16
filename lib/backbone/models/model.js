const Model = Backbone.Model.extend({
	defaults: function() {
		return {
			title: "",
			completed: false
		};
	},

	sync: Backbone.localforage.sync("collection-backbone"),

	toggle: function() {
		this.save({
			completed: !this.get("completed")
		});
	}
});