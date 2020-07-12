
function Controller(model, view){
    var self = this;
    self.model = model;
    self.view = view;
}

define('Controller', function(require, exports, module){
	module.exports = Controller;
});
