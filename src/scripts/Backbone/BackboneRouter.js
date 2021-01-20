(function(window){
    
    var Model = Backbone.Model.extend({
        sync: Backbone.localforage.sync('backbone-model'),
        preinitialize: function() {},
        defaults: function() {
            return {
                order: router.collection.nextOrder()
            }
        },
        initialize: function() {}
    });
    
    var Collection = Backbone.Collection.extend({
        sync: Backbone.localforage.sync('backbone-collection'),
        model: Model,
        preinitialize: function() {},
        comparator: "order",
        nextOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        drop: function() {
            while (this.models.length) {
                this.models[0].destroy();
            }
        },
        initialize: function() {}
    });
    
    var Template = Backbone.View.extend({
        preinitialize: function() {},
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        }
    });
    
    var View = Backbone.View.extend({
        preinitialize: function() {},
        initialize: function() {
            this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        }
    });
    
    var Router = Backbone.Router.extend({
        preinitialize: function() {
            this.collection = new Collection();
            this.view = new View({
                collection: this.collection
            });
        },
        routes: {
            '*filter':'setFilter'
        },
        setFilter:function(param){
            window.Filter = param || '';
            this.collection.trigger("filter");
        },
        initialize: function() {
            Backbone.history.start();
        }
    });
    
    window.BackboneRouter = new Router();
    
})(window);