var HeaderTemplate = _.template(
	'<header class="navbar" id="header">'+	    
	
		'<nav class="btn-group">'+				
			'<% _.each(arr, function(obj, index, arr) { %>' +	
				'<a class="<%= obj.class %>"><%= obj.value %></a>' +	
			'<% }); %>' +  		
		'</nav>' +
    
		'<nav class="btn-group">'+	
			'<% _.each(arr, function(obj, index, arr) { %>' +
	    			'<a class="<%= obj.class %>"><%= obj.value %></a>' +
	    		'<% }); %>' +  
		'</nav>' +
  
		'<nav class="btn-group">'+
			'<% _.each(arr, function(obj, index, arr) { %>' +
	    			'<a class="<%= obj.class %>"><%= obj.value %></a>' +	    
			'<% }); %>' +  
		'</nav>' +
	
	'</header>'
);
