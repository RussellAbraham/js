// request json, parse and post to main thread
console.log('I Worker, Connected ', this);

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

}

function posted(msg){
  console.log('I Worker, have posted ', this)
  self.postMessage(msg);
}
