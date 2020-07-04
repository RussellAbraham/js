var FormView = Backbone.View.extend({
    template: _.template($('#formtpl').html()),
    events: {
        'submit form': 'submit',
        'click [data-action="add"]': 'addItem',
        'click [data-action="refresh"]': 'refresh',
        'click [data-action="clear"]': 'clear'
    },

    submit: function(event) {
        event.preventDefault();
        this.addItem(event);
    },

    addItem: function(event) {
        event.preventDefault();

        var attrs = {
            content: this.$input.val()
        };

        // It'll write on the localforage offline store
        if (this.model) {
            this.model.save(attrs);
            this.updateSaveIcon();
        }
        else {
            this.collection.create(attrs);
        }

        // clear form input
        this.$input.val('');

        // remove reference to edited model
        this.model = null;
    },

    editItem: function(model) {
        this.$input.val(model.get('content'));
        this.$input.focus();
        this.updateSaveIcon();

        // keep reference to current model edited
        this.model = model;
    },

    render: function() {
        // Render the form template on this.$el and append the
        // collection content
        this.$el.html(this.template());

        // cache DOM list container
        this.$input = this.$('[name="content"]');
        this.$addButtonIcon = this.$('[data-action="add"] > .icon');
        return this;
    },

    refresh: function(event) {
        event.preventDefault();
        refreshCollection();
    },

    clear: function() {
        clearCollection();
    },

    updateSaveIcon: function() {
        this.$addButtonIcon.toggleClass('icon-plus').toggleClass('icon-download');
    }
});