
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



function doLoad(e) {
	var btn = document.getElementById("btnNotify");
	if (btn) {
		btn.addEventListener("click", sendNotification, false);
	}
}

window.addEventListener("load", doLoad, false);