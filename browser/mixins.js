(function(){
	
	_.mixin({
		jqxhr : function(url){
			$.getJSON(url, function(data){
				console.log(data);
				console.log('success')
			})
			.done(function() { 
				console.log( "second success" ); 
			}) 
			.fail(function() { 
				console.log( "error" ); 
			})
			.always(function() { 
				console.log( "complete" ); 	
			})
		}
	})
	
})()
