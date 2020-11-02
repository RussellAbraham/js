var count = 0;
var full = false;
var max = 256;
function loader(secs,elem) {
    var element = document.getElementById(elem);
    element.innerHTML = "Please wait for "+secs+" seconds";
    if(secs < 1) {
        clearTimeout(timer);
        element.innerHTML = '<h2>Countdown Complete!</h2>';
        element.innerHTML += '<a href="#">Click here now</a>';
    }
    secs--;
    var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
}


function countDown(num){
    if(num <= 0) {
        console.log("All done!");
        return;
    }
    console.log(num);
    num--;
    countDown(num);
    
}


function recurse(num){
  if (num <= 0) {
    console.log("Complete");
    return;
  }
  num--;
  setTimeout(function(num){
  num = num || 0;      
      recurse(num);
      console.log(num--);
  }, 3000, num);

}

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

//
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
