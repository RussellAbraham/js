// request json, parse and post to main thread
console.log('I Worker, Connected ', this);

self.onmessage = function(e){
  var msg = 'I Worker, am working. \n'
  console.log(
    msg + 
    e + 
    '\n' + 
    this 
    + e.data
  );
  
  posted(e.data);

}

function posted(msg){
  console.log('I Worker, have posted ', this)
  self.postMessage(msg);
}
