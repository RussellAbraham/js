var ListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'table-view',

    initialize: function() {
        this.listenTo(this.collection, 'add', this.addItemView);
        this.listenTo(this.collection, 'remove', this.removeItem);
        this.listenTo(this.collection, 'reset', this.reset);
        this._itemsView = {};
    },

    addItemView: function(model) {
        var itemView = new ItemView({model: model});
        this.$el.append(itemView.render().el);
        this._itemsView[model.id] = itemView;
    },

    removeItem: function(model) {
        this._itemsView[model.id].remove();
        this._itemsView[model.id] = null;
        delete this._itemsView[model.id];
    },

    reset: function(model, options) {
        options.previousModels.map(this.removeItem, this);
    },

    render: function() {
        this.collection.map(this.addItemView, this);
        return this;
    }
});