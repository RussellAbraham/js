var ItemView = Backbone.View.extend({
    template: _.template($('#itemtpl').html()),
    tagName: 'li',
    className: 'table-view-cell',

    events: {
        'click [data-action="delete"]': 'deleteItem',
        'click [data-action="edit"]': 'editItem'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        // build the model localeForage key only for debug purpose
        // at this point this key might not have been set if no sync
        // operation has been made
        this.model.sync._localeForageKeyFn(this.model);

        this.$el.html(this.template({
            content: this.model.get('content'),
            syncKey: this.model.sync.localforageKey
        }));
        return this;
    },

    deleteItem: function(event) {
        event.preventDefault();
        this.model.destroy();
    },

    editItem: function(event) {
        event.preventDefault();
        formView.editItem(this.model);
    }
});