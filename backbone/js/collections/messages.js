var MessagesCollection = Backbone.Collection.extend({    
	model: MessageModel,  
	url: 'http://localhost:8888/messages'  
});