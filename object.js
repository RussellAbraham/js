(function(object){
    
	['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function(name){        
		object['is' + name] = function(obj){            
			return toString.call(obj) === '[object ' + name + ']';        
		}    
	});
    
	object['function'] = function(obj){        
		return Function('"use strict";return (' + obj + ')')();   
	}
        
	function listen(object, events){			
		for(var event in events){
			object.addEventListener(event, events[event])
		}	    
	}
	
	function Template(links){        
		var self = this;
		self.links = links;       
		self.index = 0;		
		var i, len = self.links.length;		
		for(i = 0;i < len;i++){		
			listen(window['links' + i], {			
				'click' : function(){
					// 				
				}.bind(object, i),				
				'touchstart' : function(){				
					//
				}.bind(object, i),				
				'touchend' : function(){
					//				
				}.bind(object, i)			
			})		
		}		
	}
    	
	object['template'] = function(obj){	
		return Template(obj);	
	}
        
	if(typeof window !== 'undefined'){        
		window.object = object;    
	}

})(new Object())
