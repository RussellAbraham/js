(function(require){
	
})([ function(module, exports, require) {	 'use strict'; eval("const webworker = new Worker('/scripts/worker.js');"); } ]);

(function(require){
	
})([ function(module, exports, require) {	 'use strict'; return Function('"use strict";return ()')();  } ]);

(function(blob){
	
})(new Blob([].map.call(document.querySelectorAll('script[type=\'text\/js-worker\']'), function (script) {  return script.textContent;  }), { type: 'text/javascript;charset=UTF-8'	 }))
