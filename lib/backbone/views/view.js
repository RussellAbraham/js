const View = Backbone.View.extend({
	tagName: "ul",
	className: "prompt",
	template: _.template('<li><input type="text"></li>'),
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	}
});