(function(root){

	var count = 0;
	var full = false;
	var max = 256;

	function reset(){
	  countDown(count)	
	  // count = 0;
	  // full = false;
	}

	 function countUp(){
		if(!full){
			count++;
			if(count === max){
				full = true;
			}
			console.log(count);
		}
	}

	function countDown(num){
	  if (num <= 0) {
	    console.log("Complete", count);
	    return;
	  }
	  num--;
	  count--;
	  setTimeout(function(num){
	  num = num || 0;      
	      countDown(num);
	      console.log(num--);
	  }, 250, num);
	
	}
	
	const Count = {
		reset : reset,
		countUp : countUp,
		countDown : countDown
	}
	
	if(typeof root !== 'undefined'){
		root.Count = Count;
	}
	

})(this);
