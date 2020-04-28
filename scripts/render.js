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
