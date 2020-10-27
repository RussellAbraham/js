/* */

function Storage(name, callback){
    callback = callback || function(){}
    this.name = name;
    if(!localStorage.getItem(name)){
        var cache = [];
        localStorage.setItem(name, JSON.stringify(cache));
    }
    callback.call(this, JSON.parse(localStorage.getItem(name)));
}

Storage.prototype.find = function(query, callback){
    if(!callback){ return; }
    var cache = JSON.parse(localStorage.getItem(this.name));
    callback.call(this, cache.filter(function(object){
        for(var q in query){
            if(query[q] !== object[q]){
                return false;
            }
        }
        return true;
    }))
};

Storage.prototype.findAll = function(callback){
    callback = callback || function(){}
    callback.call(this, JSON.parse(localStorage.getItem(this.name)));
};

Storage.prototype.save = function(update, callback, id){
    var cache = JSON.parse(localStorage.getItem(this.name));
    callback = callback || function(){}
    if(id){
        for(var i = 0;i < cache.length;i++){
            if(cache[i].id === id){
                for(var key in update){
                    cache[i][key] = update[key]
                }
                break;
            }
        }
        localStorage.setItem(this.name, JSON.stringify(cache));
        callback.call(this, cache);
    }
};

Storage.prototype.remove = function(id, callback){
    var cache = JSON.parse(localStorage.getItem(this.name));
    var i, len = cache.length;
    for(i = 0;i < len;i++){
        if(cache[i].id == id){
            cache.splice(i, 1);
            break;
        }
    }
};


Storage.prototype.drop = function(callback){
    var cache = [];
    localStorage.setItem(this.name, JSON.stringify(cache));
    callback.call(this, cache);
};


define('Storage', function(require, exports, module){
	module.exports = Storage;
});
