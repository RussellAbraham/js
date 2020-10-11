const Todos = Backbone.Collection.extend({

    model: Todo,

    /* localForage Adapter */
    sync : Backbone.localforage.sync("todos-backbone"),

    /* localStorage Adapter */
    // localStorage : new Backbone.LocalStorage("todos-backbone"),

    initialize: function () {},

    done: function () {
        return this.where({
            done: true
        });
    },

    remaining: function () {
        return this.where({
            done: false
        });
    },

    nextOrder: function () {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    comparator: 'order'

});