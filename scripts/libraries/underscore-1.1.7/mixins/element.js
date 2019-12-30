// function to create a DOM node with attributes
(function(){
  _.mixin({
    element:function(target, element, attrs){
      // set element as type of DOM node 
      var myElement = document.createElement(element);
      // loop through objects key/value pairs and set the DOM nodes attributes
      for(var attr in attrs){
        myElement.setAttribute(attr, attrs[attr])
      }
      // append the node to a target element or document.head, document.body
      return target.appendChild(myElement)
    }
  })
})();

// _.element(document.body,'textarea',{
//   placeholder:'HelloWorld!',
//   id:"txt",
//   name:"txt",
//   onkeyup:"filter('txt')",
//   onkeydown:"filter('txt')"
// });
// function filter(e){
//   var txf = document.getElementById(e);
//   var rgx = [/</,/>/];
//   txf.value = txf.value
//     .replace(rgx[0],"&lt;")
//   .replace(rgx[1],"%gt;")
// }
