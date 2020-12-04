function Ctor() {};

function Data(cid){
	this.cid = ''.concat(cid, '');
	this.initialize.apply(this, arguments);
};

Data.prototype = {
	initialize : function(options){
		options = (options || {
			title : ''
		});
	}
};

function Daemon(context, callback) {
	if(context){ this.context = context; };
	this.callback = callback;
};

Daemon.forceCall = function(object){
	if(object.callback.call(object.context) === false){ return false; };
	return true;
};

Daemon.prototype = Object.create(Ctor.prototype, {
	constructor : { 
		value: Daemon 
	}
});

Daemon.prototype = {
	context : null,
	callback : null,  
};

Daemon.prototype.synchronize = function(){
	Daemon.forceCall(this);
};

function Editor(){

};

Editor.prototype = Object.create(Ctor.prototype, {
	constructor : {
		value : Editor,
		writeable : true
	}
});

Editor.prototype = {

};
