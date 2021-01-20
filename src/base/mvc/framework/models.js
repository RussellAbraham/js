(function(Models){

    Models.Task = Backbone.Model.extend({
        defaults: {
            title: "",
            completed: false
        },
        sync: Backbone.localforage.sync("task"),
        toggle: function () {
            this.save({
                completed: !this.get("completed")
            });
        }
    });

    return Models;

})(plugins.Models);