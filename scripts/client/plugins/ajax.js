function $GET(url){
  $.ajax({
	url : url,
	type : "GET",
	data : { "key" : "value" },
	content : "application/json; charset=utf-8",
    	async : true,
	dataType : 'json',
	success : function(data, status, xhr) {		
	console.log(data, status, xhr);
    }
  });
}
