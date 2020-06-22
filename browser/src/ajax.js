const jqxhr = $.getJSON(url, function() {  
	console.log( "success" ); 
})	
.done(function() { 
	console.log( "second success" ); 
}) 
.fail(function() { 
	console.log( "error" ); 
})
.always(function() { 
	console.log( "complete" ); 	
});

jqxhr.always(function() {
  console.log( "second complete" );
});
