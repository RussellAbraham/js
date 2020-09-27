const UserModel = Backbone.Model.extend({
    defaults: {
        username: '',
        password: '',
        admin: false
    }
});