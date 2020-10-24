
const browser = {}; 

function load(){
    var stack = [];
    function scriptNode(src, onload, onerror){
        var script = document.createElement('script');
        script.src = src + '.js';
        script.onload = onload;
        script.onerror = onerror || onload;
        return document.head.appendChild(script);
    }
    function scriptLoad(){
        stack.push(this);
    }
    function scriptError(){
        stack.push(this);
    }
    [].slice.call(arguments).forEach(function(string){
        scriptNode(string, scriptLoad, scriptError);
    });
}
function loadJSON() {
	function jsonNode(src, onload, onerror) {
		const request = new XMLHttpRequest();
		request.open("GET", src, true);
		request.onload = onload;
		request.onerror = onerror || onload;
		return request.send(null);
	}
	function jsonLoad() {
		// JSON.parse(this.response);
	}
	function jsonError() {
		//
	}
	[].slice.call(arguments).forEach(function(string) {
		jsonNode(string, jsonLoad, jsonError);
	});
}

function init(){
    [ 'cookies', 'dialog', 'history', 'location', 'navigator', 'screen', 'storage', 'timing', 'window' ].forEach(function(object){
        load(object + '/index');
    });
}

setTimeout(init, 1);
