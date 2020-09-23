const Task = Backbone.Model.extend({

    defaults: {
        title: '',
        priority: '',
        date: '',
        time: ''
    },

    validate: function () {
        const priority = this.get('priority');
        if (priority === '') {
            this.set('priority', 'normal');
        } else if(date === '') {
            // 
        } else if(time === '') {
            //
        }
    },

    initialize: function () {
        this.validate();
    }

});

const t1 = new Task({
    title: 'First Task',
    priority: 'normal',
    date: new Date(),
    time: Date.now()
});