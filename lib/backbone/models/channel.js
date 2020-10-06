const Channel = Backbone.Model.extend({
	defaults : {
		channel : new MessageChannel(),
		iframe : document.getElementById('frame')
	},
	initialize : function(){
		var channel = this.get('channel');
		this.port1 = channel.port1;
		this.get('iframe').contentWindow.postMessage('init', '*', [channel.port2]);
	},
	post:function(message){
		this.port1.postMessage(message);
	}
});