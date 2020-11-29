function Ftor(){

	this.reader = new FileReader();
	
	this.reader.addEventListener('load', this.onReaderLoad.bind(this, true), false);	
	
	this.reader.addEventListener('loadend', this.onReaderLoadEnd.bind(this, true), false);

}

Ftor.prototype = {

	load : function(options){
	
		options = (options || {});
		
		this.content = options.content;
		
		this.startbyte = options.startbye;
		
		this.stopbyte = options.stopbyte;
		
		this.id = options.id;
		
		var blob = new Blob([this.content], { type : 'application/octet-stream' }).slice(this.startbyte, this.stopbyte + 1);
		
		switch(this.id.toLowerCase()){				
		
			case 'arraybuffer' : this.reader.readAsArrayBuffer(blob); break;
			
			case 'blob' : this.reader.readAsBinaryString(blob); break;
			
			case 'text' : this.reader.readAsText(blob); break;
			
			case 'url' : this.reader.readAsDataURL(blob); break;
	
		}
		
	},

	onReaderLoad : function(event){
	
		// console.log(this.reader.result);
		
	},
	
	onReaderLoadEnd : function(event){
	
		if (this.reader.readyState === FileReader.DONE) {
		
			document.getElementById('text').value = this.reader.result;
			
			console.log(this.reader.result);
			
		}			
		
	}		
	
};
