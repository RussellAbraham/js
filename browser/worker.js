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
