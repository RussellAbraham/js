(function(){

	
	function Bitmap(){
  
  }

	Bitmap.prototype = {
		texture : function(){},
    optimize : function(){},
    render : function(){}
	}
	
	
	if(typeof window !== 'undefined'){
		window.Bitmap = Bitmap;
	}	
	
})();
