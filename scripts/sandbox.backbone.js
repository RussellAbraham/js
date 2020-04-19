var Templates = {
    input : _.template(
        '<ul>' +
            '<li>' +
                '<input type="text">' +
            '</li>' +
        '</ul>'
    ),
    output : _.template(
        '<ul>' +
            '<li>' +
                '' +
            '</li>' +
        '</ul>'
    )
}

var Sandbox = {

    Model : Backbone.Model.extend({
        defaults : {},
        initialize : function(){},
        parse : function(){},
        stringify : function(){},
        addHistory : function(){},
        iframeSetup : function(){},
        iframeRun : function(){},
        load : function(){},
        run : function(){}
    }),
    
    View : Backbone.View.extend({
        initialize:function(){},
        render:function(){},
        update:function(){},
        setValue:function(){},
        getCaret:function(){},
        setCaret:function(){},
        focus:function(){},
        keydown:function(){},
        keyup:function(){},
        specialCommands:function(){}
    })

}


jQuery(document).ready(function($) {
    window.sandbox = new Sandbox.View({
	    el : $('#sandbox'),
		model : new Sandbox.Model({
		    iframe : true,
            fallback : true
		})
    });
});
