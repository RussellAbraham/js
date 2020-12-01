const client_target = document.getElementById('main');
const geval = eval;

(function () {

    var ul, li, input, code;
    
    const textNode = document.createTextNode.bind(document);

    function domNode(string) {
        return document.createElement(string);
    }

    var csslink =
        'data:text/css,' +
        'body{margin:0;}' +
        '.console{margin:0 0 0 0;padding:0 0 0 1em;}.disabled{opacity:0.50;}' +
        '.date{color:black;}.function{color:teal;}.array{color:coral;}.string{color:blue;}.number{color:green;}.boolean{color:purple;}.object{color:violet;}' +
        '.prompt{list-style-image:url(https://assets.codepen.io/1674766/prompt.svg);}' +
        '.out{list-style-image:url(https://assets.codepen.io/1674766/out.svg);}' +
        '.error{list-style-image:url(https://assets.codepen.io/1674766/error.svg);}';

    var link = domNode('link');
    link.href = csslink;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    function listen(object, events) {
        for (var event in events) {
            object.addEventListener(event, events[event]);
        }
    }

    function createInput() {
        ul = domNode('ul');
        ul.className = 'console prompt';
        li = domNode('li');
        input = domNode('input');
        listen(input, {
            'keyup': function (event) {
                if (event.which === 13) {
                    evaluator(event.target.value);
                    event.target.disabled = true;
                    event.target.className = 'disabled';
                }
                27 === event.which && (
                    event.target.blur()
                )
            },
            'keydown': function (event) {
                var val, beforeTab, afterTab, caratPos;
                9 === event.which && (
                    event.preventDefault(),
                    val = input.value,
                    caratPos = input.selectionStart,
                    beforeTab = val.substring(0, input.selectionStart),
                    afterTab = val.substring(input.selectionEnd),
                    input.value = beforeTab + "\t" + afterTab,
                    input.setSelectionRange(caratPos + 1, caratPos + 1)
                );
            }
        });

        li.appendChild(input);
        ul.appendChild(li);
        client_target.appendChild(ul);
        if (document.querySelectorAll('.console').length > 1) {
            input.focus();
        }

    }

    function createOutput(string) {
        ul = domNode('ul');
        ul.className = 'console out';
        li = domNode('li');
        if (_.isFunction(string)) {
            li.className = 'function'
        }
        if (_.isDate(string)) {
            li.className = 'date'
        }
        if (_.isString(string)) {
            li.className = 'string'
        }
        if (_.isArray(string)) {
            li.className = 'array'
        }

        //if(_.isObject(string)){li.className='object'}
        if (_.isBoolean(string)) {
            li.className = 'boolean'
        }
        if (_.isNumber(string)) {
            li.className = 'number'
        }
        if (_.isNull(string)) {
            li.className = 'null'
        }
        if (_.isUndefined(string)) {
            li.className = 'undefined'
        }
        code = domNode('code');
        code.appendChild(textNode(string));
        li.appendChild(code);
        ul.appendChild(li);
        client_target.appendChild(ul);
        createInput();
    }

    function evaluator(string) {
        var result;
        try {
            result = geval(string);
        } catch (er) {
            throw '' + er.stack + '';
        } finally {
            createOutput(result);
        }
    }

    setTimeout(createInput, 1);

    function client() {
        return {
            createInput: createInput,
            createOutput: createOutput,
            evaluator: evaluator
        }
    }

    if (typeof window !== 'undefined') {
        window.client = client();
    }

})();