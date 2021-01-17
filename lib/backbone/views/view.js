const Views = {};

(function(Views){

    Views.Section = Backbone.View.extend({
        
        preinitialize : function(){},

        tagName : 'section',

        className : 'section',

        template : _.template('<div></div>'),

        events : {},

        initialize : function(){},

        render : function(){}

    });

    return Views;

})(Views);