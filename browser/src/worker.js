/* document */
var blob = new Blob(
    [].map.call(
        document.querySelectorAll('script[type=\'text\/js-worker\']'), 
        function (script) {  
            return script.textContent;  
        }), { type: 'text/javascript;charset=UTF-8'	 }
);
document.worker = new Worker(window.URL.createObjectURL(blob));
document.worker.onmessage = function(event) { }
/**/

/* Function */
function fn2workerURL(fn) {
    var blob = new Blob(['('+fn.toString()+')()'], {	
        type: 'application/javascript'		
    })  	
    return URL.createObjectURL(blob)	
}
/**/

/* XHR */
self.onmessage = function(event){
    var msg = event.data;
    getjson(msg);
}
function getjson(url){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = "text";
  request.send();
  request.onload = function(){
    var msg = request.response;
    var parser = JSON.parse(msg);
    self.postMessage(parser);
  }
}
/**/
