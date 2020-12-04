
plugins.Alert = function(message){
    return new plugins.Views.Modal({
        title : "Alert",
        animate : true,
        allowCancel : true,
        content : message
    }).open();	
};

plugins.Confirm = function(message) {
    return new plugins.Views.Modal({
        title: "Confirm",
        animate: true,
        allowCancel: false,
        content: message
    }).open();
};

plugins.Prompt = function(str) {
    return new plugins.Views.Modal({
        title : "prompt",
        animate : true,
        allowCancel: false,
        content : '<input class="form-control">'
    }).open();
};

