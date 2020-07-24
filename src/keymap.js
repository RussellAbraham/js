
// todo : auto key map with unicode support
// fire keys and their connected peripherals remotely

var array = [
	
 { value : '=', keyCode: 13,  class : "e text-white" }, 
 { value : '-', keyCode: 109, class : "x text-success" }, 
 { value : '+', keyCode: 107, class : "p text-success" }, 
 { value : '/', keyCode: 111, class : "e text-success" }, 
 { value : '*', keyCode: 106, class : "m text-success" }, 
 { value : '%', keyCode: 49,  class : "d text-success" },   

 { value : '1', keyCode: 49, class : "n  text-primary" }, 
 { value : '2', keyCode: 50, class : "n  text-primary" }, 
 { value : '3', keyCode: 51, class : "n  text-primary" }, 
 { value : '4', keyCode: 52, class : "n  text-primary" }, 
 { value : '5', keyCode: 53, class : "n  text-primary" }, 
 { value : '6', keyCode: 54, class : "n  text-primary" }, 
 { value : '7', keyCode: 55, class : "n  text-primary" }, 
 { value : '8', keyCode: 56, class : "n  text-primary" }, 
 { value : '9', keyCode: 57, class : "n  text-primary" },
 { value : '0', keyCode: 48, class : "n  text-primary" },

 { value : '',  keyCode: 0,  class : "c  text-danger"  },
 { value : '.', keyCode: 1,  class : "d  text-white"   }

];

const templates = {
    
    keys : _.template(
        '<% _.each(keyData, function(arr, index, obj) { %>' +
	        '<a ></a>' +
		'<% }); %>'
	)

}
