
/* a bootstrap plugin to generate and render bootstrap alerts */

(function () {

    var parent, child;

    function element(target, element, attrs, text) {
        parent = document.createElement(element);
        child = document.createTextNode(text);
        for (var attr in attrs) {
            parent.setAttribute(attr, attrs[attr])
        }
        if (text) {
            parent.appendChild(child);
        }
        return target.insertBefore(parent, target.childNodes[0])
    }

    var myAlert, myBtn, mySpan, time;

    function alerts(str, type, target) {

        time = Date.now();

        myAlert = element(target, 'div', {
            class: 'alert alert-dismissible fade show',
            role: 'alert',
            'data-time': time
        }, str);

        myBtn = element(myAlert, 'button', {
            class: 'close',
            'data-dismiss': 'alert',
            'aria-label': 'Close'
        });

        mySpan = element(myBtn, 'span', {
            'aria-hidden': 'true'
        }, 'x');

        if (type === 'primary') {
            myAlert.classList.add("alert-primary")
        }
        if (type === 'secondary') {
            myAlert.classList.add("alert-secondary")
        }
        if (type === 'success') {
            myAlert.classList.add("alert-success")
        }
        if (type === 'danger') {
            myAlert.classList.add("alert-danger")
        }
        if (type === 'warning') {
            myAlert.classList.add("alert-warning")
        }
        if (type === 'info') {
            myAlert.classList.add("alert-info")
        }
        if (type === 'light') {
            myAlert.classList.add("alert-light")
        }
        if (type === 'dark') {
            myAlert.classList.add("alert-dark")
        }
    }

    if (typeof window !== 'undefined') {
        window.alerts = alerts;
    }

})();