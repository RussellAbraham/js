/* var domNodeParent, domNodeChild, domNodeFragment = new DocumentFragment(); */
function element(target, element, attrs, text){	
	const myElement = document.createElement(element);
	const myTextNode = document.createTextNode(text);
	for(var attr in attrs){
		myElement.setAttribute(attr, attrs[attr])
	}
  	if(text){
		myElement.appendChild(myTextNode);
	}
	return target.appendChild(myElement);
}
