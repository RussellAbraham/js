function element0(target, element, attrs){
    const myElement = document.createElement(element);
    for(var attr in attrs){
      myElement.setAttribute(attr, attrs[attr])
    }
    return target.appendChild(myElement);
}
element0(document.body, 'textarea', {
	placeholder: 'textarea'
});

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
element(
	document.body, 
	'h1', 
	{ 
		id:'container',
		class: 'container',
		style: 'font-family:monospace;',
		onclick:'fn()'
	}, 
	'Hello World'
);
