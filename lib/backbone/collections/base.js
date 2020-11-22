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

	public : function(){
		return this.where({
			public : true
		})
	},

    clear: function () {
        var i;
        const arr = this.models.length;
        for (var i = arr - 1; i >= 0; i--) {
            this.models[0].destroy();
        }
    }
});