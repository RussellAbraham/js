(function () {
    function elementToInjectToParentHead(target, element, attrs) {
        const myElement = document.createElement(element);
        for (var attr in attrs) {
            myElement.setAttribute(attr, attrs[attr])
        }
        return target.appendChild(myElement);
    }
    if (window.parent) {
        var head = window.parent.document.head;
        elementToInjectToParentHead(head, 'meta', {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, user-scalable=no'
        })
        elementToInjectToParentHead(head, 'link', {
            rel: 'shortcut icon',
            href: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766/favicon.ico',
            type: 'image/x-icon'
        })
    }
})();
