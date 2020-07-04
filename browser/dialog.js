function js(){
	alert(eval(prompt()));
}

/* invoke built in dialogs */
function todoList(){
  
	var todos = ["purchase time"];
	
  	var input = prompt("What would you like to do?");  
	
  	while(input !== "quit"){
	  	if(input === "list") {
	  		printList();
	  	} else if(input === "new") {
	  		addTodo();
	  	} else if(input === "delete") {
	  		deleteTodo();
	  	} 		
	  	input = prompt("What would you like to do?");
  }

  console.log("OK, YOU QUIT THE APP");
  
  function printList() {
  	console.log("**********");
  	todos.forEach(function(todo, index){
  		console.log(index + ": " + todo);
  	});
  	console.log("**********");
  }
  
  function addTodo(){
  	var newTodo = prompt("Enter new todo");
  	todos.push(newTodo);
  	console.log(newTodo + " added to list")
  }

  function deleteTodo(){
  	  var index = prompt("Enter index of todo to delete");
  	  todos.splice(index, 1);
    	console.log("Todo Removed")
  }


}

function sendMessage() {
	var imgPath, title, message;	
	imgPath = "img/icon.png";
	imgPath = "https://icon.png";
	title = "Web Notification";
	message = "Sent from the Kitchen Sink app.";	
	webkitNotifications.createNotification(imgPath, title, message).show();
}

function sendNotification(e) {
	if (window.webkitNotifications) {
		if (window.webkitNotifications.checkPermission() === 0) {
			sendMessage();
		} else {
			webkitNotifications.requestPermission(sendMessage);
		}
	} else {
		console.log("Error in sendNotification: webkitNotifications API is undefined");
	}
}

// Bootstrap Alerts
function element(target, element, attrs, text){	
	const myElement = document.createElement(element);
	const myTextNode = document.createTextNode(text);
	for(var attr in attrs){
		myElement.setAttribute(attr, attrs[attr])
	}
    if(text){
		myElement.appendChild(myTextNode);
	}
	return target.appendChild(myElement);
}

/* Bootstrap Alert Messages. todo : use fragment, insertBefore */
function AlertMessage(str, type, target){
  var myAlert = element(target, 'div', { class: 'alert alert-dismissible fade show', role: 'alert' }, str); 
  var myBtn = element(myAlert, 'button', { class: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' });  
  var mySpan = element(myBtn, "span", { "aria-hidden": "true" }, "x");
  "primary"   === type && myAlert.classList.add("alert-primary"), 
  "secondary" === type && myAlert.classList.add("alert-secondary"), 
  "success"   === type && myAlert.classList.add("alert-success"), 
  "danger"    === type && myAlert.classList.add("alert-danger"), 
  "warning"   === type && myAlert.classList.add("alert-warning"), 
  "info"      === type && myAlert.classList.add("alert-info"), 
  "light"     === type && myAlert.classList.add("alert-light"), 
  "dark"      === type && myAlert.classList.add("alert-dark");
}


