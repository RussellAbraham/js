var require,
    define;

(function () {
    var modules = {},
    // Stack of moduleIds currently being built.
        requireStack = [],
    // Map of module ID -> index into requireStack of modules currently being built.
        inProgressModules = {},
        SEPARATOR = ".";



    function build(module) {
        var factory = module.factory,
            localRequire = function (id) {
                var resultantId = id;
                //Its a relative path, so lop off the last portion and add the id (minus "./")
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
            } finally {
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
//Export for use in node
if (typeof module === "object" && typeof require === "function") {
    module.exports.require = require;
    module.exports.define = define;
}
	
define('test', function(require, exports, module){
	var test = {
		log : function(string){
			return console.log(string);
		}
	};
	module.exports = test;
});

define('init', function(require, exports, module){
	var breaker = {},
    	ArrayProto = Array.prototype,
    	ObjProto = Object.prototype,
    	hasOwnProperty = ObjProto.hasOwnProperty,
    	nativeForEach = ArrayProto.forEach;	
	function each(obj, iterator, context) {
  	if (nativeForEach && obj.forEach === nativeForEach) {
  	  obj.forEach(iterator, context);
  	} else if (obj.length === +obj.length) {
    		for (var i = 0, l = obj.length; i < l; i++) {
      		if (i in obj && iterator.call(context, obj[i], i, obj) === breaker)
        		return;
    		}
		} else {
			for (var key in obj) {
      	if (hasOwnProperty.call(obj, key)) {
        	if (iterator.call(context, obj[key], key, obj) === breaker) return;
				}
			}
		}
	}
	function injectScript(src, onload, onerror) {
    	var script = document.createElement("script");
    	script.onload = onload;
    	script.onerror = onerror || onload;
    	script.src = src + '.js';
    	document.head.appendChild(script);
	}	
	function successful(){
		console.log('success, loaded: ', this);
	}
	function error(){
		console.log('error');
		console.log(this);
	}	
	const init = function(arr){
		each(arr, function(orr, index, arr){
			injectScript(orr, successful, error);			
		});
		console.log('initialized');
	}
	module.exports = init;
});
