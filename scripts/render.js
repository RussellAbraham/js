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

