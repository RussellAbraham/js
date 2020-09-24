const Modal = Backbone.View.extend({
    className: 'modal',
    events : {},
    initialize : function(options){
        this.options = _.extend({}, options);
    },
    render : function(){},
    open : function(){},
    close : function(){},
    preventClose : function(){}
}, { count : 0 });