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


