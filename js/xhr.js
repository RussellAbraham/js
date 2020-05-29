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
