(function(root){

	function $(object){
		if (object instanceof $) return object;
		if (!(this instanceof $)) return new $(object);
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) { 
			exports = module.exports = $; 
		} exports.$ = $; 
	} 

	else { root.$ = $; }	
  
	/* */

	if (typeof define === 'function' && define.amd) {
    	define('dom', [], function() {
      		return $;
    	});
	  }	
	  
})(this);

(function(root){

	function _(object){
		if (object instanceof _) return object;
		if (!(this instanceof _)) return new _(object);
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) { 
			exports = module.exports = _; 
		} exports._ = _; 
	} 

	else { root._ = _; }	
  
	/* */

	if (typeof define === 'function' && define.amd) {
    	define('util', [], function() {
      		return _;
    	});
	  }	
	  
})(this);

(function (factory) {
    var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global;
    if (typeof define === 'function' && define.amd) { 
		define(['util', 'dom', 'exports'], function (_, $, exports) { 
			root.Base = factory(root, exports, _, $); 
		}); 
	} 
	else if (typeof exports !== 'undefined') { 
		var _ = require('util'), $; try { $ = require('dom'); } catch (e) {} factory(root, exports, _, $); 
	} 
	else { 
		root.Base = factory(root, {}, root._, root.$); 
	}
})(function (root, Base, _, $) {

    /*  */

    return Base;
});


/* *** *** */

function Api(object){
	if (object instanceof Api) return object;
	if (!(this instanceof Api)) return new Api(object);
};

const Plugins = {
	Stores : {},
	Models : {},
	Templates : {},
	Views : {},
	Controllers : {}
};







