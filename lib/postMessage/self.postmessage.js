self.postMessage = self.webkitPostMessage || self.postMessage;

if (USE_TRANSFERRABLE) {
    self.postMessage(uInt8View.buffer, [uInt8View.buffer]);
} 
else {
	self.postMessage(e.data.ourArray);
}