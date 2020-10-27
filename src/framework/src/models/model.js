
function Model(storage){
    this.storage = storage;
}

Model.prototype.create = function (title, callback) {
    title = title || '';
    callback = callback || function(){}
    var newItem = {
        title : title.trim(),
        completed : false
    }
    this.storage.save(newItem, callback);
}
Model.prototype.read = function (title, callback) {}
Model.prototype.update = function (title, callback) {}
Model.prototype.destroy = function (title, callback) {}
Model.prototype.destroyAll = function (title, callback) {}
Model.prototype.getCount = function (title, callback) {}

define('Model', function(require, exports, module){
	module.exports = Model;
});
