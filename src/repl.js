var parent, child, io;

function element(target, element, options) {	
	options = (options || {});	
	parent = document.createElement(element);	
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

function input(){

}

function handler(event) {
	const key = event.which;
	const value = event.target.value;
	switch (key) {
		case 13:
			evaluator(value);
			break;
			//default : return || break;
	}
}


function sanitizer(value) {
	return String(value).replace(/\\"/g, '"').replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
}

function toSource(func) {
	if (func != null) {
		try {
			return Function.prototype.toString.call(func);
		} catch (e) {}
		try {
			return (func + '');
		} catch (e) {}
	}
	return '';
}

function isRegExp(obj) {
	return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
}

function isDate(obj) {
	return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

function isObject(obj) {
	return obj === Object(obj);
}

function isString(obj) {
	return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
}

function isBoolean(obj) {
	return obj === true || obj === false;
}

function isNumber(obj) {
	return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
}

function isNull(obj) {
	return obj === null;
}

function isUndefined(obj) {
	return obj === void 0;
}


function evaluator(string) {
	var result;
	try {
		result = eval(string);
		if (isFunction(result)) {
			result = toSource(result);
		} else if (isRegExp(result)) {
			result = new RegExp(result).toString();
		} else if (isDate(result)) {
			result = ''.concat('', result);
		} else if (isObject(result)) {
			result = '{{'.concat('}} ', result);
		} else if (isString(result)) {
			result = ''.concat('', result);
		} else if (isNumber(result)) {
			result = ''.concat('', result);
		} else if (isBoolean(result)) {
			result = ''.concat('', result);
		} else if (isUndefined(result)) {
			result = ''.concat('', result);
		} else if (isNull(result)) {
			result = ''.concat('', result);
		}
	} catch (er) {
		if (er instanceof TypeError) {
			result = '[['.concat(']] ', er.message);
		} else if (er instanceof SyntaxError) {
			result = '[[ Syntax '.concat(']] ', er.message);
		} else if (er instanceof ReferenceError) {
			result = '[[ Reference '.concat(']] ', er.message);
		} else if (er instanceof RangeError) {
			result = '[['.concat(']] ', er.message);
		} else if (er instanceof EvalError) {
			result = '[['.concat(']] ', er.message);
		} else {
			result = sanitizer(er.stack);
		}
	} finally {
		return result;
	}
}