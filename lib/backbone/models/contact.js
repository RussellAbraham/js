const Contact = Backbone.Model.extend({
    defaults: {
      name : '',
      email : ''
    },
    validateEmail : function(){
        var rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rgx.test(this.get('email'));
    }
});