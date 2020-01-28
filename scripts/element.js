function element(target, element, attrs){
    const myElement = document.createElement(element);
    for(var attr in attrs){
      myElement.setAttribute(attr, attrs[attr])
    }
    return target.appendChild(myElement);
}