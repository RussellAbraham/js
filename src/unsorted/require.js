(function(root){
	
	var require, define;

	(function(){
  
		var modules = {},
        requireStack = [],
        inProgressModules = {},
        SEPARATOR = ".";
        
		function build(module) {		
			var factory = module.factory;		
			var localRequire = function(id){        			
				var resultantId = id;          			
				if (id.charAt(0) === ".") {      
					resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);            								
				}			
				return require(resultantId);								
			};		
			module.exports = {};    
			delete module.factory;    		
			factory(localRequire, module.exports, module);    		
			return module.exports;
		}
		
		require = function (id) {
			if (!modules[id]) {
				throw "module " + id + " not found";        
			} else if (id in inProgressModules) {
				var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
				throw "Cycle in require graph: " + cycle;
			}
			if (modules[id].factory) {
				try {
					inProgressModules[id] = requireStack.length;
					requireStack.push(id);
					return build(modules[id]);
				} 
				finally {
					delete inProgressModules[id];
					requireStack.pop();
				}
			}
			return modules[id].exports;
		};
		    
		define = function (id, factory) {        
			if (modules[id]) {
				throw "module " + id + " already defined";
			}
			modules[id] = {
				id: id,
				factory: factory
			};    
		};
    		
		define.remove = function (id) {    
			delete modules[id];    
		};
  		
		define.moduleMap = modules;
	
	})();
	
	if (typeof module === "object" && typeof require === "function") {
        module.exports.require = require;
        module.exports.define = define;
	}
	
	if(typeof root !== 'undefined'){
		root.require = require;
		root.define = define;
	}
	
})(this);
	
define('test', function(require, exports, module){
	var test = {
		log : function(string){
			return console.log(string);
		}
	};
	module.exports = test;
});

var test = require('test');