function Xtor(){
	this.request = new XMLHttpRequest();
	this.request.addEventListener('error', this.onRequestError.bind(this, true), false);
	this.request.addEventListener('load', this.onRequestLoad.bind(this, true), false);		
	this.request.addEventListener('readystatechange', this.onReadyStateChange.bind(this, true), false);		
}	
Xtor.prototype = {
	get : function(options){
		options = (options || {});
		this.request.open('GET', options.url, true);
		this.request.responseType = options.type;
		this.request.send(null);			
	},
	onRequestError : function(event){},
	onRequestLoad : function(event){
		console.log(this.request.response);
	},
	onReadyStateChange : function(event){
		if(this.request.readyState === this.request.HEADERS_RECEIVED){
			var headers = this.request.getAllResponseHeaders();
			console.log(headers);
		}
	}
};

/*-----------------------------------------------*/

const assets = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/';

function loadResource(options) {
	options = (options || {});
	return new Promise(function (resolve, reject) {		
		var request = new XMLHttpRequest();		
		request.open("GET", assets + options.url, true);	
		request.responseType = options.type;
		
		request.onreadystatechange = function(){
			if(this.readyState === this.HEADERS_RECEIVED){
				console.info(request.getAllResponseHeaders());
			}    
		}
		
		request.onload = function () {		
			if (request.status === 200) {			
				resolve(request.response);	
			} else {			
				reject( Error(request.statusText) );			
			}				
		};
		
		request.onerror = function () {
			reject(Error("request failed: "));
		};		
		
		request.send(null);		
		
	});	
}

// example
/*
loadResource({ url : 'types.json', type : 'text' })
.then(function(response){ 
	console.log(Object.keys(JSON.parse(response)));
	console.log(Object.values(JSON.parse(response))); 
})
.catch(function(er){
	console.log(er.stack)
})
*/

/*-----------------------------------------------*/

const request = new XMLHttpRequest();

function loadJson() {
    request.open();
    request.send();
    request.onload = function () {
        if (request.status === 200) {
            return request.response;
        } else {
            throw new Error('could not GET');
        }
    }
}

function readyJson() {
    request.onreadystatechange = function (response) {
        if (request.resopnse === 4) {
            if (request.status === 200) {

            } else {

            }
        }
    }
}

function fetchBlob() {
    request.open();
    request.responseType = 'blob';
    request.onload - function () {
        if (request.status === 200) {
            var blob = URL.createObjectURL(request.response);
            return blob;
        } else {
            throw new Error('')
        }
    }
}

function extend(object, props){
	for(var prop in props){
		if(props[prop]){
			object[prop] = props[prop]
		}
	}
	return object;
}

function listen(object, events){
	for(var event in events){
		object.addEventListener(event, events[event])
	}
}

/*-----------------------------------------------*/

/* 
(function(platform){

	// redirect bb10 browser to media stream fallback ( deprecated )
	
	function Ctor(){
		this.check();
	}

	Ctor.prototype = {
	
		Win32 : function(){
			location.href = 'a/';
		},
		
		BlackBerry : function(){
			location.href = 'b/';
		},
		
		check : function(){
			var self = this;
			switch(platform){
				case 'BlackBerry' : self.BlackBerry(); break;
				case 'Win32' : self.Win32(); break;
			}
		}
	
	}

})(navigator.platform);

function Ctor(options){
	options = options || {};
	this.node = options.node;
	this.isActive = false;
}
Ctor.prototype = {
	on:function(){
		this.isActive = true;
	},
	off:function(){
		this.isActive = false;
	},
	toggle:function(){
		return this.check() ? this.off() : this.on()
	},
	check:function(){
		return this.isActive;
	}
}
*/

/*-----------------------------------------------*/

function Ajax(){
	this.transport = new XMLHttpRequest();
	this.data = new FormData();
}

Ajax.prototype = {
	
	get : function(options){	
		
		var self = this;				
		
		this.options = extend({ 
			url : '', 
			responseType : '' 
		}, options);		
		
		listen(this.transport, {			
			
			'readystatechange' : function(){
				if (this.readyState == this.HEADERS_RECEIVED) {			
					var headers = request.getAllResponseHeaders();			
					var arr = headers.trim().split(/[\r\n]+/);			
					var headerMap = {};			
					arr.forEach(function (line) {				
						var parts = line.split(': ');				
						var header = parts.shift();				
						var value = parts.join(': ');				
						headerMap[header] = value;			
					});		
				}				
			},
			
			'error' : function(event){},
			
			'load' : function(){						
				if(this.transport.status === 200){  
					// ok
				} else {
					// handle error
				}
			}	
			
		});
		
		this.transport.open('GET', self.options.url, true);
		this.transport.responseType = self.options.responseType;
		this.transport.send(null);
		
	},
	
	post : function(){
		this.data.append('', '');
		this.data.append('', '');
		this.data.append('', '');
		// 
		this.transport.open('POST', '');		
		this.transport.send(this.data);
	}
	
}

/*-----------------------------------------------*/

function Index(db){
	this.db = db;
}

Index.prototype = {
	
	// handle errors.. check how to handle upgrades and versions
	open : function(){},
	
	// create and add new object
	create : function(){},

	// iterate over key values
	read : function(){},

	// put new value then resolve
	update : function(){},
	
	// delete single item by UID
	destroy : function(){},
	
	// output a json file backup
	export : function(){},
	
	// json data from XHR
	import : function(){},
	
	// json data from file input
	upload : function(){}
	
}


var request, response, blob;


function getjson(url){
	// assing instance
	request = new XMLHttpRequest();      
	// open "GET" request
	request.open('GET', url);        
	// responseType text is for legacy with 'json' resopnse type
	request.responseType = 'text';        
	//
	request.onload = function(){        
		
		if(request.status === 200){                
			response = JSON.parse(request.response);                
			populate(response);            
		} else {
			console.warn('Network request failed ' + request.status + ':' + request.statusText);            
		}        
	}
	request.send();
}
    
function getjson2(url){
	
	request = new XMLHttpRequest();        
        request.open("GET", url);
        request.responseType = 'text';
	
	request.onreadystatechange = function(){
            if(this.readyState === this.HEADERS_RECEIVED){
                var headers = request.getAllResponseHeaders();
                console.log(headers);
            }
        }
	
        request.onload = function(){
            response = JSON.parse(request.response);
            populate(response);
        }
	

	request.send();
    
}

// GET request for Blob Data
function getimg(url){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        request.onload = function(){
            if(request.status === 200){
                response = request.response;
                blob = window.URL.createObjectURL(response);
                populate(blob);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);            
            }
        }
        request.send();
    }

    function populate(obj){
        //self.postMessage(obj);
    }

})();

/*-----------------------------------------------*/

/* 
  core request response mechanism for 'paging' navigation 
  todo:
  bootstrap
*/

const xhr = new XMLHttpRequest();

xhr.open('GET', location, true);

// accepted mime type, default is *
xhr.setRequestHeader('ACCEPT', '*/*');

// 
xhr.setRequestHeader('X-CUSTOM', 'true');

xhr.onreadystatechange = function(){
	console.log(this.getAllResponseHeaders());
}

xhr.onload = function(){		
	
	const responseText = this.responseText;  	
	
	if (/<html/i.test(responseText)) {		
		history.pushState({
			head : responseText.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
			body : responseText.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]
		},'test','test');		   
	} 	
	
	console.log(history.state);
	
}

xhr.send(null);

setTimeout(function(){
	history.back(1);
}, 200);
