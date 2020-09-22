var sampleView = Backbone.View.extend({
    initialize: function() {
        console.log('sampleView has been created');
    }
});

var sampleView2 = Backbone.View.extend({
    tagName: 'div',
    id: 'sampleDiv'
});