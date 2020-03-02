var count = 0;
var full = false;
var max = 256;

function add(){
	if(!full){
		count++;
		if(count === max){
			full = true;
		}
		console.log(count);
	}
}

function reset(){
  count = 0;
  full = false;
}
