/* Event Listener Helper Functions */

function on(element, event, callback){
  return element.addEventListener(event, callback);
}

/* Example
on(docuement.getElementById('myId'), 'input', function(event){
  console.log(event.target);
}); 
*/

function listen(element, events){
  for(var event in events){
    element.addEventListener(event, events[event]);
  }
}

/* Example
listen(this, {
  'click' : function(){},
  'mouseover' : function(){},
  'mousemove' : handleUpdate,
  'mouseout' : function(){},
  'touchstart' : function(),
	'touchend' : function(),
	'touchcancel' : function(),
	'touchmove' : function(),
  'dragstart' : function(){},
  'dragend' : function(){},
  'dragover' : function(){},
  'dragenter' : function(){},
  'dragleave' : function(){},
  'dragexit' : function(){},
  'drop' : function(){},  
});
*/
