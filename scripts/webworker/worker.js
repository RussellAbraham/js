// ok
console.log('worker connected');
importScripts('../node_modules/underscore/underscore.js');

if(importScripts){
  console.log('imported')
} else {
  console.error('did not import')
}

// ok
self.onmessage = function(){
    // posted(e.data);
    getjson()
}


function getjson(){
    var req = new XMLHttpRequest();
    req.open("GET", "index.json");
    req.responseType = "text";
    req.send();
    req.onload = function(){
      var res = req.response;
      var jsonObj = JSON.parse(res);
      postjson(jsonObj)
    }
    function postjson(jsonObj){
        //console.log(jsonObj);
        self.postMessage(JSON.stringify(jsonObj), null, 2)
        
        //self.postMessage(jsonObj);
        //var obj = _.keys(str);
       // self.postMessage(obj)
    }  
}

// ok
function posted(msg){
    // annoyer.start();
    console.log('@worker ')
    var b64 = btoa(msg)
    self.postMessage(b64);
}
