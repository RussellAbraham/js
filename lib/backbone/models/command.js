const Command = Backbone.Model.extend({

    defaults: {
        command: '',
        parameter: ''
    },

    initialize: function () {
        this.validate();
    },

    validate: function () {

        const command = this.get('command');
        const parameter = this.get('parameter');

        if (command === 'create') {
            this.create(parameter);
        } else if (command === 'read') {
            //
        } else if (command === 'update') {
            // 
        } else if (command === 'destroy') {
            //
        }
    },

    create: function () {
        console.log(this.get('parameter'));
    },

    read: function () {},
    update: function () {},
    destroy: function () {}

});

function executeCommand(string, parameter) {
    this.flag = new Command({
        command: string,
        parameter: parameter
    });
}

executeCommand('create', 'parameter');