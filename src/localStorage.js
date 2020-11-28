function Ctor(){};

function Local(name, callback){
	callback = callback || function () {};
    this._dbName = name;
	this.cache = cache;
	if (!this.cache.getItem(name)) {
		var buffer = [];
		this.cache.setItem(name, JSON.stringify(buffer));
	}
	callback.call(this, JSON.parse(this.localStorage.getItem(name)));
};

Local.prototype = Object.create(Ctor.prototype,{
    constructor: {value:Local}
});

Local.prototype.find = function (query, callback) {
	if (!callback) { return; }
	var buffer = JSON.parse(this.cache.getItem(this._dbName));
	callback.call( this, buffer.filter(function (object) {
			for (var q in query) {
				if (query[q] !== object[q]) {
					return false;
				}
			}
			return true;
		})
	);
};

Local.prototype.findAll = function (callback) {
	callback = callback || function () {};
	callback.call(this, JSON.parse(this.cache.getItem(this._dbName)));
};

Local.prototype.save = function (updateData, callback, id) {
	var buffer = JSON.parse(this.cache.getItem(this._dbName));
	callback = callback || function () {};
	if (id) {
		var i, length = buffer.length, key;
		for (i = 0; i < length; i++) {
			if (buffer[i].id === id) {
				for (key in updateData) { buffer[i][key] = updateData[key]; }
				break;
			}
		}
		this.cache.setItem(this._dbName, JSON.stringify(buffer));
		callback.call(this, buffer);
	} else {
		updateData.id = new Date().getTime();
		buffer.push(updateData);
		this.cache.setItem(this._dbName, JSON.stringify(buffer));
		callback.call(this, [updateData]);
	}
};

Local.prototype.remove = function (id, callback) {
	var buffer = JSON.parse(this.cache.getItem(this._dbName));
	for (var i = 0; i < buffer.length; i++) {
		if (buffer[i].id == id) {
			buffer.splice(i, 1);
			break;
		}
	}
	this.cache.setItem(this._dbName, JSON.stringify(buffer));
	callback.call(this, buffer);
};

Local.prototype.drop = function (callback) {
	var buffer = [];
	this.cache.setItem(this._dbName, JSON.stringify(buffer));
	callback.call(this, buffer);
};

function Model() {
	this.storage = new Local('local');
}

Model.prototype.create = function (title, callback) {
	title = title || "";
	callback = callback || function () {};
	var newItem = { title: title.trim(), uid: guid(), time: time(), completed: false };
	this.storage.save(newItem, callback);
};

Model.prototype.read = function (query, callback) {
	var queryType = typeof query;
	callback = callback || function () {};
	if (queryType === "function") {
		callback = query;
		return this.storage.findAll(callback);
	} else if (queryType === "string" || queryType === "number") {
		query = parseInt(query, 10);
		this.storage.find({ id: query }, callback);
	} else {
		this.storage.find(query, callback);
	}
};

Model.prototype.update = function (id, data, callback) {
	this.storage.save(data, callback, id);
};

Model.prototype.remove = function (id, callback) {
	this.storage.remove(id, callback);
};

Model.prototype.removeAll = function (callback) {
	this.storage.drop(callback);
};

Model.prototype.getCount = function (callback) {
	var todos = { active: 0, completed: 0, total: 0 };
	this.storage.findAll(function (data) {
		data.forEach(function (todo) {
			if (todo.completed) { todos.completed++; } 
			else { todos.active++; }
			todos.total++;
		});
		callback(todos);
	});
	
};

function Controller(model, view) {
	var self = this;
	self.model = model;
	self.view = view;
}

Controller.prototype.create = function(todo){
	var self = this;
	self.model.create(todo, function(){

	});
	
}
