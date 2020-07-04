var count = 0;
var full = false;
var max = 256;

define('reset', function(require, exports, module){
	var reset = function(){
		return countDown(count);
	}
	module.exports = reset;
});

define('countUp', function(require, exports, module){
	var countUp = function(){
		if(!full){ 		
			count++;
			if(count === max){
				full = true;
			}
			return count;
		}
	}
	module.exports = countUp;
});

define('countDown', function(require, exports, module){	
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
	module.exports = countDown;
});
