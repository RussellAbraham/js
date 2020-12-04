

function shadowRender(string){
	const target = document.getElementById('log');
	const shard = document.createDocumentFragment();
	const node = document.createElement('p');
	try { 
		target.innerHTML = '';
		node.innerHTML = string;		
		shard.appendChild(node); 
	}
	finally { 
		target.appendChild(shard); 
	}
}
function drawDate(){
	shadowRender(`
		<a>${ new Date() }</a>
		<hr>
		<a>${ Date.now() }</a>
	`);
}

setInterval(drawDate, 1000);

function insertTextNodeBefore(text, node){  
	node.insertBefore(text, node.childNodes[0]);
}	

let domNode, textNode;

function append(target, element, attrs, text){    
	domNode = document.createElement(element);  
	for (var attr in attrs) { 	
		domNode.setAttribute(attr, attrs[attr])      
	}  
	if(text){  
		textNode = document.createTextNode(text);
		domNode.appendChild(textNode);    
	}    				  
	return target.appendChild(ele);    
}	

function adjacentHTML(){

}

function render(target){
	const shard = document.createDocumentFragment();

	// compile html

	// innerHTML to node appended to fragment


	target.appendChild(shard);
}


const _console = {

	log : function(prefix, message, suffix, target){

		ul = append(fragment, 'ul', { class : 'standard out' });

		li = append(ul, 'li', { class: 'string' }, message);		

		var ip = append(li, 'input', { placeholder : time(), value : source() });

		li.insertAdjacentHTML('beforeend', ' <span>&#9638; ' + suffix + ' </span> ');
		li.insertAdjacentHTML('afterbegin', ' <span>&#9638; ' + prefix + ' </span> ');

		insertTextNodeBefore(fragment, target);
	}
}

// import { template } from 'underscore.js';

function Data(title, id){
	this.title = title;
	this.id = id;
}

function template(options){
	options = (options || {});	
	const shard = document.createDocumentFragment();	
	// createTextNode(options);
	const node = document.createElement('p');	
	// 
	node.innerHTML = _.template(
		'<%= obj.title %>'+
		'<%= obj.id %>'
	)(new Data(
		options.title, 
		options.id
	));		
	try {
		shard.appendChild(node);
	}
	finally {
		document.body.appendChild(shard);
	}	
}

template({
	title : '<h1>Hello World!</h1>',
	id : Date.now()
});
