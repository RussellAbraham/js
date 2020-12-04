(function (Collections) {

	const Base = Backbone.Collection.extend({
		initialize: function () {
			this.fetch();
		},
		import: function (json) {
			var self = this;
			json.forEach(function (obj) {
				return self.create(obj);
			});
		},
		export: function () {
			const data = JSON.stringify(this.toJSON(), null, 2);
			const blob = new Blob([data], {
				type: "application/json"
			});
			const url = window.URL.createObjectURL(blob);
			const fragment = new DocumentFragment();
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = "export-" + Date.now() + ".json";
			fragment.appendChild(anchor);
			anchor.click();
			fragment.removeChild(anchor);
		},
		clear: function () {
			var i;
			const arr = this.models.length;
			for (var i = arr - 1; i >= 0; i--) {
				this.models[0].destroy();
			}
		}
	});

	Collections.Tasks = Base.extend({
		model: plugins.Models.Task,
		sync: Backbone.localforage.sync("tasks"),
		completed: function () {
			return this.where({completed: true});
		},
		remaining: function () {
			return this.where({completed: false});
		},
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},
		comparator: 'order'
	});

	return Collections;

})(plugins.Collections);