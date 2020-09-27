const Task = Backbone.Model.extend({
    defaults: {
        title: '',
        priority: '',
        date: '',
        time: ''
    },
    initialize: function () {
        this.validate();
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
    }
});

const t1 = new Task({
    title: 'First Task',
    priority: 'normal',
    date: new Date(),
    time: Date.now()
});