
worker.postMessage({ 'copy': 'true', 'ourArray': uInt8View.buffer });

if (useTransferrable ) {
	console.log ("# TRANSFER : " + uInt8View.length);
    	worker.postMessage(uInt8View.buffer, [uInt8View.buffer]);
} 
else {
	console.log ("# COPY : "+ uInt8View.length);
    	worker.postMessage({'copy': 'true', 'ourArray': uInt8View.buffer}); //uInt8View.buffer
}