function pageLog(node, sMsg){ 
  var oFragm = document.createDocumentFragment(); 
  oFragm.appendChild(document.createTextNode(sMsg)); 
  oFragm.appendChild(document.createElement('br')); 
  document.querySelector(node).appendChild(oFragm); 
} 

function appendContent(node, content) {
  var ele = document.querySelector(node)
  if (ele) {
    ele.insertAdjacentHTML("beforeend", content);
  }
}

function prependContent(node, content) {
  var ele = document.querySelector(node)
  if (ele) {
    ele.insertAdjacentHTML("afterbegin", content);
  }
}

function insertBefore(node, content){
  var ele = document.querySelector(node)
  ele.insertBefore(content, ele.childNodes[0]);
}

function setContent(node, content) {
  var ele = querySelector(node);
  if (ele) { 
    ele.innerHTML = content;
  }
}

// 
var ele;

const selector = document.querySelector.bind(document);
const b = 'beforeend';
const a = 'afterbegin';

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

function adjacentHtml(node, x, content){
    ele = selector(node);
    if (ele) {
        switch(x){
            case 'b' : ele.insertAdjacentHTML('beforeend', content); break;
            case 'a' : ele.insertAdjacentHTML('afterbegin', content); break;
        }
    }
}

