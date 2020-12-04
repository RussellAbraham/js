// This just demonstrates how to render text without reflow which causes repaint

function render(text) {
    
    const article = document.querySelector('article');    
    const fragment = document.createDocumentFragment();

    article.innerHTML = '';

    fragment.appendChild(document.createTextNode(text));

    // The fragment is the last thing, and only thing you append to your target. 

    // It counts as One Touch to the DOM
    
    // Even if the fragment has several nodes with its own tree 

    article.appendChild(fragment);
 
}