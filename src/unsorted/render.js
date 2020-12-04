var ele;

const selector = document.querySelector.bind(document);

function pageLog(node, sMsg){ 
  var oFragm = document.createDocumentFragment();
  oFragm.appendChild(document.createTextNode(sMsg)); 
  oFragm.appendChild(document.createElement('br')); 
  selector(node).appendChild(oFragm); 
} 

function appendHtml(node, content){
    ele = selector(node);
    ele.appendChild(content);
}

function insertHtml(node, content){
    ele = selector(node);
    ele.insertBefore(content, ele.childNodes[0]);
}

function innerHtml(node, content){
    ele = selector(node);
    ele.innerHTML = content;
}

function adjacentHtml(node, side, content){
    ele = selector(node);
    if (ele) {
        switch(side){
            case 'b' : ele.insertAdjacentHTML('beforeend', content); break;
            case 'a' : ele.insertAdjacentHTML('afterbegin', content); break;
        }
    }
}
function insertAdjacentHTML(obj, where, htmlStr)
{
	if (gbBsIE || gbBsOpera7)
	{
		obj.insertAdjacentHTML(where, htmlStr);
	}
	else if (gbBsNS6 || gbBsSafari)
	{
		var r = obj.ownerDocument.createRange();
		r.setStartBefore(obj);
		var	parsedHTML = r.createContextualFragment(htmlStr);
		
		switch (where){
		case 'beforeBegin':
			obj.parentNode.insertBefore(parsedHTML,obj);
			break;
		case 'afterBegin':
			obj.insertBefore(parsedHTML,obj.firstChild);
			break;
		case 'beforeEnd':
			obj.appendChild(parsedHTML);
			break;
		case 'afterEnd':
			if (obj.nextSibling){
			obj.parentNode.insertBefore(parsedHTML,obj.nextSibling);
			} else {
			obj.parentNode.appendChild(parsedHTML);
			}
			break;
		}
	}
}

(function(){	
	const fragment = new DocumentFragment();
	var ele,txt,ul,li;
	function append(target, element, attrs, text){    
		ele = document.createElement(element);  
		txt = document.createTextNode(text);      
		for (var attr in attrs) { 	
			ele.setAttribute(attr, attrs[attr])      
		}  
		if(text){  
			ele.appendChild(txt);    
		}    				  
		return target.appendChild(ele);    
	}
	function insertTextNodeBefore(text, node){  
		node.insertBefore(text, node.childNodes[0]);
	}
	const log = {
		error : function(prefix, message, suffix, target){
			ul = append(fragment, 'ul', { class : 'standard error' });
			li = append(ul, 'li', { class: 'error-message' }, message);
			li.insertAdjacentHTML('beforeend', ' <span class="error-suffix"> ' + suffix + ' </span> ');
			li.insertAdjacentHTML('afterbegin', ' <span class="error-prefix"> ' + prefix + ' </span> ');
			insertTextNodeBefore(fragment, target);
		},
		out : function(prefix, message, suffix, target){
			ul = append(fragment, 'ul', { class : 'standard out' });
			li = append(ul, 'li', { class: 'string' }, message);
			li.insertAdjacentHTML('beforeend', ' <span> ' + suffix + ' </span> ');
			li.insertAdjacentHTML('afterbegin', ' <span> ' + prefix + ' </span> ');
			insertTextNodeBefore(fragment, target);
		}
	}
	if(typeof window !== 'undefined'){
		window.log = log;
	}
})();

