function setAttr(selector, attrs){
    var myElement = document.querySelector(selector);
    for(var attr in attrs){
       myElement.setAttribute(attr, attrs[attr])
    }
}
