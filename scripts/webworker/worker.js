// request json, parse and post to main thread
console.log('I Worker, Connected ', this);

self.importScripts('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/underscore-min.js');

function getjson(){
  var req = new XMLHttpRequest();
  req.open("GET", "data.json");
  req.responseType = "text";
  req.send();
  req.onload = function(){
    var res = req.response;
    var jsonObj = JSON.parse(res);
    postjson(jsonObj)
  }
  function postjson(jsonObj){
    var arr = jsonObj['elements'];
    var keys = JSON.stringify(arr, null, 2);
    self.postMessage(keys);
  }
}

self.onmessage = function(e){
  var text = e.data;
  var encrypt = btoa(text);
  var msg = 'I Worker, am working. \n'
  console.log(
    msg + 
    e + 
    '\n' + 
    this 
    + e.data
  );
  
  posted(encrypt);
  getjson();

}

function posted(msg){
  console.log('I Worker, have posted ', this)
  self.postMessage(msg);
}
