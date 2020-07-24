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

// 

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
			'readystatechange' : function(){},
			'error' : function(){},
			'load' : function(){
			    alert('ok')
			}
		});
		
		this.transport.open('GET', self.options.url);		
		this.transport.send();
		
	},
	
	post : function(options){
	    var self = this;

	    this.options = extend({
	        url : ''
	    }, options);

        listen(this.transport, {
            'readystatechange' : function(){},
			'error' : function(){},
			'load' : function(){
			    alert('ok')
			}
        });
        // object to send, built in getters and setters
        this.data.append('','');

		this.transport.open('POST', self.options.url);		
		// send form data object to specified url, 
		// bind GET request within parser which will then POST when it has permission
		this.transport.send(this.data);


	}
	
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


// todo : 
// cleanup code, 
// add xhr function to handle arrayBuffer,
// add setup for Workers
