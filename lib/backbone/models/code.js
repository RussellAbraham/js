const CodeModel = Backbone.Model.extend({
    
    defaults: { 
        html:'',
        css:'',
        js:''
    },

    update : function(id, string){			
        this.save({ 
            id : string 
        });
    }

});