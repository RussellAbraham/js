const DesktopRouter = Backbone.Router.extend({
    initialize: function () {
        Backbone.history.start();
    },
    routes: {
        "": "index"
    },
    index: function () {
        new View();
    }
});