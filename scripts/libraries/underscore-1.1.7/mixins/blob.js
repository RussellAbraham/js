/* HTML DOM
 * Blob mixin  
 */
(function(){
  
  _.mixin({
    
    blob: function(file, as){
    
      // pass a string value to file argument
      var output = file;
      
      // create Blob object which contains 
      // a concatenation of all of the data 
      // in the array passed into the constructor
      var blob = new Blob([output], {
        type: 'application/octet-stream'
      });
      
      // create a DOMString containing a URL 
      // representing the object given in the parameter 
      var url = window.URL.createObjectURL(blob);
      
      // todo: add method to remove ObjectURL with
      // URL.revokeObjectURL()
      
      var saveAs = as;
      
      // create DOM node with references to the ObjectURL
      var downloadLink = document.createElement('a');
      downloadLink.download = saveAs;
      downloadLink.innerHTML = 'Download File';
      downloadLink.href = url;
      
      // remove the DOM node when it's used
      downloadLink.onclick = _.cleanup;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
    },
    
    // function to remove the DOM node from _.blob function
    cleanup: function(event){
      document.body.removeChild(event.target);  
    }
    
  });
})();

/* example */
// function helloBlob(){
//   var tmp = 'SGVsbG8gV29ybGQh';
//   var b64 = atob(tmp);
//   _.blob(b64,'helloworld.txt');
// };
