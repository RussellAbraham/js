// add support for NaN and Symbol

function escaped(value) {
	return String(value)
		.replace(/\\"/g, '"')
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

function toSource(func) {
	if (func != null) {
		try {
			return Function.prototype.toString.call(func);
		} catch (e) {}
		try {
			return func + "";
		} catch (e) {}
	}
	return "";
}

function toProps(object) {
	var resultSet = {};
	for (var o = object; o; o = o.__proto__) {
		try {
			var names = Object.getOwnPropertyNames(o);
			for (var i = 0; i < names.length; ++i)
				resultSet[names[i]] = "[" + typeof object[names[i]] + "]";
		} catch (e) {}
	}
	return JSON.stringify(resultSet, null, 2);
}

function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isRegExp(obj) {
	return !!(
		obj &&
		obj.test &&
		obj.exec &&
		(obj.ignoreCase || obj.ignoreCase === false)
	);
}

function isDate(obj) {
	return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
}

function isObject(obj) {
	var type = typeof obj;
	return type === "function" || (type === "object" && !!obj);
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

function getType(value) {
	if (isNull(value)) return "null";
	if (isUndefined(value)) return "undefined";
	if (isFunction(value)) return "function";
	if (isRegExp(value)) return "regexp";
	if (isDate(value)) return "date";
	if (Array.isArray(value)) return "array";
	if (isString(value)) return "string";
	if (isNumber(value)) return "number";
	if (isBoolean(value)) return "boolean";
	if (isObject(value)) return "object";
	return typeof value;
}

function evaluator(str) {
	var result;
	try {
		result = eval.call(this, str);
		var type = getType(result);
		switch (type) {
			case "function":
				return { type, value: toSource(result) };
			case "regexp":
				return { type, value: result.toString() };
			case "date":
				return { type, value: result.toString() };
			case "object":
				return { type, value: toProps(result) };
			case "array":
				return { type, value: result };
			case "string":
			case "number":
			case "boolean":
			case "undefined":
			case "null":
				return { type, value: "".concat(result) };
			default:
				return { type: "unknown", value: result };
		}
	} catch (er) {
		if (er instanceof TypeError) {
			return {
				type: "type-error",
				value: "[[ Type ".concat("]] ", er.message)
			};
		} else if (er instanceof SyntaxError) {
			return {
				type: "syntax-error",
				value: "[[ Syntax ".concat("]] ", er.message)
			};
		} else if (er instanceof ReferenceError) {
			return {
				type: "reference-error",
				value: "[[ Reference ".concat("]] ", er.message)
			};
		} else if (er instanceof RangeError) {
			return {
				type: "range-error",
				value: "[[ Range ".concat("]] ", er.message)
			};
		} else if (er instanceof EvalError) {
			return {
				type: "eval-error",
				value: "[[ Eval ".concat("]] ", er.message)
			};
		} //else if (er instanceof Error) {
			//return {
			//	type: "error-error",
			//	value: "[[ Error ".concat("]] ", er.message)
			//};
		//} 
		else {
			return { 
				type : "error",
				value : er.stack
			}
		}
	}
	
}

// Example : 

const w = "window";

function elm(obj) {
	var span = document.createElement("span");
	span.className = obj.type;
	span.textContent = obj.value;
	return span;
}

// Example expressions to evaluate
const expressions = [
	"true",
	"JSON.parse",
	"2 + 2", // number
	"new Date()", // date
	"['a', 'b', 'c']", // array
	"'Hello World'", // string
	"undefined", // undefined
	"null", // null
	"/\\d+/", // regexp
	"nonExistentFunction()", // reference error
	"var y;y.foo();", // throws TypeError
	"function", // throws SyntaxError
	"x", // throws ReferenceError
	"new Array(-1);", // throws RangeError
	"throw new EvalError('Forced an eval error')", // throws EvalError
	"decodeURI('%')",
	"location"
];

// Select the pre element to append results
const output = document.querySelector("pre");

// Iterate over expressions and append results
expressions.forEach((expr) => {
	const result = evaluator(expr);
	const el = elm(result);
	el.addEventListener('click', function(){
		console.log({
			type : this.className,
			value : this.textContent
		})
	})
	output.appendChild(el);
	output.appendChild(document.createElement("br")); // Add line break between results
});
