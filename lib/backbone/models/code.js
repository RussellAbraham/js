const CodeModel = Backbone.Model.extend({
    
    defaults: { 
        html:'',
        css:'',
        js:''
    },

    update : function(id, string){
        const target = this.get(id);
        this.save({ 
            id : string 
        });
    }

});