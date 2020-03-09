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

function insertTextNodeBefore(className, text) {
  var newItem = document.createElement("pre");
  var textnode = document.createTextNode(text);
  newItem.className = "list-group-item " + className;
  newItem.appendChild(textnode);
  var list = document.getElementById("output");
  list.insertBefore(newItem, list.childNodes[0]);
} 
