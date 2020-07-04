var bookView = Backbone.View.extend({
    tagName: "li",
    model: Book,

    initialize: function() {
        // lets listen to model change and update ourselves
        this.listenTo(this.model, "change", this.render);
    },

    render: function (){
        this.$el.html('<li>' + this.model.get("BookName") + '</li>');
        return this;
    }
});
var bookView2 = Backbone.View.extend({
   
    model: Book,
    tagName: 'li',
    template: '',

    events: {
        'click': "itemClicked"
    },

    itemClicked: function () {
        alert('clicked: ' + this.model.get('BookName'));
    },

    initialize: function() {
        this.template = _.template($('#bookItem').html());
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});