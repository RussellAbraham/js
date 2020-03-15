function action(object, events){	
	for(var event in events){
		object.on(event, events[event])
	}
}
function trigger(object, events){	
	for(var event in events){	
		object.trigger(event, events[event])	
	}			
}
function listen(element, events){
	for(var event in events){
		element.addEventListener(event, events[event])
	}
}
