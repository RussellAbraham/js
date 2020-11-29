(function(scope){

/* [Event Emitter]
 *  Asynchronous 
 *  Objects
 *  Functions
*/
  function EventEmitter(){
  	this.handlers = {};
  };
  
  EventEmitter.prototype = {
  	
  };
  
  const Events = {};

  Events.on = function(event, listener){

  };


  Events.off = function(event){

  };


  Events.trigger = function(event, listener){

  };

  function Listeners(){};

  Listenters.prototype = {};  

  

/* [Base]
 *  constructor
 *  prototype
 *  chain
*/
  
  class Base {
		
      constructor(object){
        	
        	if (object instanceof Base) return object;
		
        	if(!this instanceof Base){ return new Base(object); }
        	
        	this.preinitialize.apply(this, arguments);
        
			this.initialize.apply(this, arguments);
        
		}
      
		preinitialize (){}
		
      	initialize (){}
      
	};

	with(Events){
    	Base.on = on;
      	Base.off = off;
    }


/* 
	The Model is a component of the Controller Class. 
	Data is represented and given methods to track and respond to logic from a parent context. aka [Program Controller] 
*/

class Model extend Base {
	preinitialize (){
		
	}
	initialize (){

	}
};

/*
	The View is a component of the Controller Class.
	DOM is represented and given methods to track and respond to logic from a parent context. aka [Program Controller]
	instanceof Controller.bind HTMLElement events
		this is confusing, but a must and how
	Controller.prototype model callback view closure
*/
class View extends Base {
	preinitialize (){}
	initialize (){
		this.$main = document.getElementById('main');
		this.$header = this.$main.querySelector('header');
		this.$article = this.$main.querySelector('article');
		this.$create = this.$header.querySelector('#create');
		this.$destroy = this.$article.querySelectorAll('.destroy');
	}
	render(closure){
		const callbacks = {
			create : function(){},
			destroy : function(){}
		};
		callbacks[closure]();
	}
	bind(event, handler){
		switch(event){

			case 'create' : this.$create.addEventListener('click',function(event){  
				handler();
			}, false);

			case 'destroy' : this.$destroy.forEach(function(destroy){
				const id = destroy.getAttribute('data-id');
				destroy.addEventListener('click', function(event){
					handler(id);
				}, false);
			})
		}
	}

};


/* 
	The Controller acts as interface between objects passed as arguments to new instances of Controller 
*/

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.view.bind('create', function(id){
			this.create(id);
		});
		this.view.bind('destroy', function(id){
			this.destroy(id);
		});
	}
	create (id){
		var self = this;
		this.model.create(id, function(id){
			self.view.render('create',id);
		})
	}	
	destroy (id){
		var self = this;
		this.model.destroy(id, function(id){
			self.view.render('destroy',id);
		})
	}

}

class Application {
	constructor (name){
		this.sync = new Sync(name);
		this.model = new Model(this.sync);
		this.template = new Template();
		this.view = new View(template);
		this.controller = new Controller(this.model,this.view);
	}
};










class WebWorker {
	constructor (id){
		this.id = id;
		this.id.worker = new Worker(URL.createObjectURL(new Blob([],{})));
		this.id.worker.addEventListener('message',this.message.bind(this), false);
	}
	close (id){
		this[id].worker.terminate();
	}
	post(id,message){
		this[id].postMessage(new Message(message));
	}
	message(event){
		return event.data;
	}
}




})(this);














