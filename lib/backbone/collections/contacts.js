const Contacts = Backbone.Collection.extend({
    
    model : Contact,

    /* localforage adapter */
    sync : Backbone.localforage.sync("contacts-backbone"),
    
    /* localStorage adapter */
    localStorage : new Backbone.LocalStorage("contacts-backbone"),

    search : function(string){
        var pattern = new RegExp(string, 'gi');
        return (this.filter(function(contact){
            return pattern.test(contact.get('name'));
        }));
    }

});