
const SandboxModel = Backbone.Model.extend({
	
	defaults: {
		history : [],
		iframe : false, // if true, run `eval` inside a sandboxed iframe
		fallback : true // if true, use native `eval` if the iframe method fails
	},

	initialize: function(){
		this.fetch();
	},

	localStorage: new Store("sandbox"),

	parse : function(data) {	
		if ( !_.isArray(data) || data.length < 1 || !data[0] ) return data;
		data[0].history = _.map(data[0].history, function(command) {
			command._hidden = true;
			if ( command.result ) delete command.result;
			if ( command._class ) delete command._class;
			return command;
		});
		delete data[0].iframe;
		return data[0];
	},
	stringify : function(obj) {
		try {
			return JSON.stringify(obj);
		} catch(e) {
			return obj.toString();
		}
	},
	addHistory: function(item) {
		var history = this.get('history');
		if (_.isString(item.result)) item.result = '\"' + item.result.toString().replace(/"/g, '\\"') + '\"';
		if (_.isFunction(item.result)) item.result = item.result.toString().replace(/"/g, '\\"');
		if (_.isObject(item.result)) item.result = this.stringify(item.result).replace(/"/g, '\\"');
		if (_.isUndefined(item.result)) item.result = "undefined";
		history.push(item);
		this.set({ history : history });
		this.save();
		return this;
	},	
	iframeSetup : function() {
		this.sandboxFrame = $('<iframe width="0" height="0"/>').css({visibility : 'hidden'}).appendTo('body')[0];
		this.sandbox = this.sandboxFrame.contentWindow;
		if (!this.sandbox.eval && this.sandbox.execScript) {
			this.sandbox.execScript("null");
		}
	},
	iframeEval : function(command) {
		if ( !this.sandbox ) this.iframeSetup();
		return this.sandbox.eval ? this.sandbox.eval(command) : this.get('fallback') ? eval(command) : new Error("Can't evaluate inside the iframe - please report this bug along with your browser information!");
	},
	load : function(src) {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = src;
		if ( this.get('iframe') ) {
			return this.sandboxFrame ? this.sandboxFrame.contentDocument.body.appendChild(script) : new Error("sandbox: iframe has not been created yet, cannot load " + src);
		} else {
			return document.body.appendChild(script);
		}
	},
	evaluate: function(command) {
		if ( !command )
			return false;
		var item = {
			command : command
		};
		try {
			item.result = this.get('iframe') ? this.iframeEval(command) : eval.call(window, command);
			if ( _.isUndefined(item.result) ) item._class = "undefined";
			if ( _.isNumber(item.result) ) item._class = "number";
			if ( _.isString(item.result) ) item._class = "string";
		} catch(error) {
			item.result = error.toString();
			item._class = "error";
		}
		return this.addHistory(item);
	}		
});


const SandboxView = Backbone.View.extend({
	
	el : $('#sandbox'),
	
	template: _.template( $('#tplSandbox').html() ),
	format : _.template( $('#tplCommand').html() ),

	initialize : function(){
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.update);
		this.render();
	},
	render : function(){
		this.$el.html(this.template({
			placeholder : this.placeholder
		}));
		return this;		
	},

	events : {
		'keyup textarea' : 'keyup',
		'keydown textarea' : 'keydown',
		'keypress textarea' : 'keypress'
	},

	keyup : function(event){		
		var target = event.target, 
			value = target.value;
		switch(event.which){
			case 13 : this.enter(value); target.value = ''; break;
		}
	},

	keydown : function(event){},
	keypress : function(event){},

	enter : function(string){
		alert(string)
	},

});

const SandboxRouter = Backbone.Router.extend({
	initialize : function(){
		this.model = new SandboxModel();
		this.view = new SandboxView({
			model : this.model
		})
	}
});

function Main(){
	this.router = new Router();
	Backbone.history.start();
}

window.app = new Main();