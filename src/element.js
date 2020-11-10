var parent, child, io, types;

/* v1 */
function element(target, element, attrs, text) {
	parent = document.createElement(element);
	for (var attr in attrs) {
		parent.setAttribute(attr, attrs[attr])
	}
	if (text) {
		child = document.createTextNode(text);
		parent.appendChild(child);
	}
	return target.appendChild(parent);
}

/* v2 */
function element(target, element, options) {
	
	options = (options || {});
	
	parent = document.createElement(element);
	
	/* add attributes to the parent node if keys are present inside the call */
	if(options.class){
		parent.className = options.class;	
	}

	/* Output value to the parent node if key is present */
	if(options.text){
		child = document.createTextNode(options.text);
		parent.appendChild(child);
	}

	else if(options.html){
		parent.innerHTML = options.html;
	}	

	return target.appendChild(parent);
	
}

