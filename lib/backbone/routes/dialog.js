const Router = Backbone.Router.extend({
	
	initialize : function(){
		this.container = new Container();
	},
	routes : {
		'' : '',
		'about' : 'about',
		'dialog(/:id)(/:message)' : 'dialog'
	},
	
	about : function(){
		this.view2 = new View2();
		this.container.child = this.view2;
		this.container.render();
	},
	
	dialog : function(id, message){
		switch(id){
				
			case 'alert' : new Modal({ title : 'Alert', allowCancel: true, animate : true, content : message }).open(function(){ alert(message); }); break;

      
			case 'confirm' : new Modal({ title : 'Confirm', allowCancel: false, animate : true, content : message }).open(function(){ alert(message); }); break;
            
      
			case 'prompt' : new Modal({ title : 'Prompt', allowCancel: true, animate : true, content : '<input class="form-control" id="promptInput">' }).open(function(){ alert($('#promptInput').val()); }); break;

		}
	}
	
	
});