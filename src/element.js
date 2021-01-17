var parent, child, io, types;

/* v1 */
function element(target, element, attrs, text) {
	parent = document.createElement(element);
	for (var attr in attrs) {
		parent.setAttribute(attr, attrs[attr])
	}
	if (text) {
		child = document.createTextNode(text);
		parent.appendChild(child);
	}
	return target.appendChild(parent);
}

/* v2 */
function element(target, element, options) {
	
	options = (options || {});
	
	parent = document.createElement(element);
	
	/* add attributes to the parent node if keys are present inside the call */
	if(options.class){
		parent.className = options.class;	
	}

	/* Output value to the parent node if key is present */
	if(options.text){
		child = document.createTextNode(options.text);
		parent.appendChild(child);
	}

	else if(options.html){
		parent.innerHTML = options.html;
	}	

	return target.appendChild(parent);
	
}



function createButton(options) {
	
	options = (options || {});
	
	var button = document.createElement("button");

	button.className = options.class;	
	
	if(options.text){
		button.textContent = options.text;		
	} 
	else {
		button.innerHTML = options.html;
	}

	button.setAttribute("data-target", options.target);
	button.setAttribute("data-toggle", options.toggle);
	
	button.setAttribute("aria-pressed", "false");
	
	function looseJsonParse(obj) {
		return Function('"use strict";return (' + obj + ")")();
	}

	button.addEventListener( "click", function (event) {
			var target = event.target;
			var pressed = target.getAttribute("aria-pressed");
			if (!looseJsonParse(pressed)) {
				target.setAttribute("aria-pressed", "true");
				target.classList.add('pressed');
			} else {
				target.setAttribute("aria-pressed", "false");
				target.classList.remove('pressed');
			}
		},
		false
	);

	return button;

}

var json = {
	html : '&#9776;',
	class : 'btn',
	target : '',
	toggle : ''
};

document.body.appendChild(createButton(json));

document.body.appendChild(createButton(json));

document.body.appendChild(createButton(json));


function createSection() {
    var section = document.createElement('section');

    section.className = '';
    section.id = 's1';
    section.setAttribute('aria-hidden', 'true');
}


function createButton2(options) {
    options = (options || {});

    var button = document.createElement('button');

    button.className = options.class;

    button.setAttribute('data-target', options.target);
    button.setAttribute('data-toggle', options.toggle);

    button.setAttribute('aria-pressed', 'false');

    if(options.text){
        button.textContent = options.text;
    } else {
        button.innerHTML = options.html;
    }

    function looseJsonParse(obj) {
        return Function('"use strict";return (' + obj + ')')();
    };

    button.addEventListener('click', function (event) {
        var target = event.target.getAttribute('data-target');
        var selector = document.querySelector(target);
        var pressed = target.getAttribute('aria-pressed');
        if (!looseJsonParse(pressed)) {
            target.setAttribute('aria-pressed', 'true');
            target.classList.add('pressed');
            selector.classList.add('changed');
        } else {
            target.setAttribute('aria-pressed', 'false');
            target.classList.remove('pressed');
            selector.classList.add('changed');
        }
    }, false);

    return button;

}
