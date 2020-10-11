const SandboxModel = Backbone.Model.extend({
    defaults : {
        history : []
    },
    /* localforage adapter */
    sync : Backbone.localforage.sync("sandbox-backbone"),
    /* localStorage adapter */
    localStorage : new Backbone.LocalStorage("sandbox-backbone"),
    initialize : function(){},
    parse : function(){},
    stringify : function(){},
    addHistory : function(){},
    iframeSetup : function(){},
    iframeRun : function(){},
    load : function(){},
    run : function(){}
});