const fragment = new DocumentFragment();

let parent, child, io, types;

function insertTextNodeBefore(text, node) {
	node.insertBefore(text, node.childNodes[0]);
}

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
	
	if(options.class){
		parent.className = options.class;	
	}
	
	if(options.text){
		child = document.createTextNode(options.text);
		parent.appendChild(child);
	}
	
	return target.appendChild(parent);
	
}


/* use */

function node(object, string){
  parent = element(fragment, 'ul', { class : '' });
  child = element(parent, 'li', { class : '' });
	io = element(child, 'code', object, string);
  return main.appendChild(fragment);
}

node({
	class:'a', 
	text: 'test' 
});
