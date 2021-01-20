function Reader(){
	this.preinitialize.apply(this, arguments);
	this.initialize.apply(this, arguments);
};

Reader.prototype.preinitialize = function(){
	this.file = new FileReader();
};

Reader.prototype.onLoad = function(event){
	console.log(event.target.result);
};

Reader.prototype.initialize = function(url){
	this.file.addEventListener('load', this.onLoad(this), false);
};

function Request(){
	this.preinitialize.apply(this, arguments);
	this.initialize.apply(this, arguments);
};

Request.prototype.preinitialize = function(){
	this.xhr = new XMLHttpRequest();
};

Request.prototype.onLoad = function(event){
	var blob = new Blob([this.response],{type:"application/octet-stream"});
	var reader = new Reader();
	reader.file.readAsBinaryString(blob);
};

Request.prototype.initialize = function(url){
	this.xhr.addEventListener('load', this.onLoad(this), false);
};

Request.prototype.load = function(url){
	this.xhr.open('GET', 'https://assets.codepen.io/1674766/'+url, true);
	this.xhr.responseType = 'arraybuffer';
	this.xhr.send(null);
};





function Control(){
	this.request = new Request();
};