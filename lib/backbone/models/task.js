const Task = Backbone.Model.extend({
    defaults: {
        title: '',
        priority: '',
        date: ''
    },
    initialize: function () {
        this.validate();
    },    
    validate: function () {
        const priority = this.get('priority');
        if (priority === 'low') {
            //
        } else if(priority === 'normal') {
            // 
        } else if(priority === 'high') {
            //
        }
    }
});

const task1 = new Task({
    title : 'Task 1',
    priority : 'low',
    date : Date.now(),
});

const task1 = new Task({
    title : 'Task 2',
    priority : 'normal',
    date : Date.now(),
});

const task1 = new Task({
    title : 'Task 3',
    priority : 'high',
    date : Date.now(),
});