var FooterView = Backbone.View.extend({
    template: _.template($('#footertpl').html()),

    events: {
        'click .tab-item': 'onTabItemChange'
    },

    render: function() {
        this.$el.html(this.template());
        this.showSupport();
        this.showActiveDriver();
    },

    showSupport: function() {
        drivers.map(_.bind(this.updateDriverIcon, this));
    },

    showActiveDriver: function() {
        drivers.map(_.bind(this.updateDriverTabItem, this));
    },

    updateDriverTabItem: function(driverName) {
        var method = localforage.driver() === localforage[driverName] ? $.fn.addClass : $.fn.removeClass;
        var $el = this.$('[data-item=' + driverName + ']');
        method.call($el, 'active');
    },

    updateDriverIcon: function(driverName) {
        var isSupported = localforage.supports(localforage[driverName]);
        var className = isSupported ? 'icon-check' : 'icon-close';
        this.$('[data-item=' + driverName + '] > .icon').addClass(className);
    },

    onTabItemChange: function(event) {
        event.preventDefault();
        var driverName = $(event.currentTarget).data('item');
        localforage.setDriver(localforage[driverName]).then(_.bind(function() {
            this.showActiveDriver();
            refreshCollection();
        }, this));
    }
});
