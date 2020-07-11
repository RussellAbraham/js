
var theSocket;

function openSocket(){
	try {
		if (window.WebSocket){
			theSocket = new WebSocket("ws://node.remysharp.com:8001");
			theSocket.onopen    = onSocketOpen;
			theSocket.onmessage = onSocketMessage;
			theSocket.onclose   = onSocketClose;
		}
		else {
			appendContent("messages", "HTML5 Web Sockets are not supported by this application.");
			debug.log("openSocket", "HTML5 Web Sockets are not supported by this application.", debug.error);
		}
	} 
	catch (e) {
		debug.log("openSocket", e, debug.exception);
	}
}
function closeSocket() {
	try {
		if (theSocket) {
			if (theSocket.readyState !== WebSocket.CLOSED) {
				theSocket.close();
			}
			else {
				debug.log("closeSocket", "Socket is already closed", debug.info);
			}
		}
	} 
	catch (e) {
		debug.log("closeSocket", e, debug.exception);
	}
}


function doPageLoad() {
	try {
		hide("btnSend");
	} 
	catch (e) {
		debug.log("doPageLoad", e, debug.exception);
	}
}

function doPageUnload() {
	closeSocket();
}

window.addEventListener("load",   doPageLoad,   false);
window.addEventListener("unload", doPageUnload, false);