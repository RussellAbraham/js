const SandboxView = Backbone.View.extend({
	initialize: function() {},
	template: _.template(),
	format : _.template(),
	render:function(){},
	update : function(){},
	setValue : function(){},
	getCaret : function(){},
	setCaret: function(){},
	toEscaped: function(){},
	focus: function() {},
	keydown:function(){},
	keyup:function(){},
	keypress:function(){},
	specialCommands: function(command) {			
		if (command === ":clear") { this.model.destroy(); return true; }
		if ( command === ":help" ) { return this.model.addHistory({ command : ':help', result : this.helpText }); }
		if ( command.indexOf(":load") > -1 ) { return this.model.addHistory({ command : command, result : this.model.load( command.substring(6) ) }); } 
		if (command === ':reload'){ return this.model.addHistory({ command : command, result : window.location.reload() });								 }	
		return false;		
	}	
})