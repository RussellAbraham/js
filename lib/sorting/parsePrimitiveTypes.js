function encodeString(string) {
	return "data:application/octet-stream;base64,".concat(btoa(string));
}

function stringToUint8(input) {
	var i,
		data = atob(input.split(",")[1]),
		length = data.length,
		output = [];
	var dataView = new ArrayBuffer(data.length);
	for (i = 0; i < length; i++) {
		dataView[i] = data.charCodeAt(i);
		output.push(dataView[i]);
	}
	return output;
}

function toTypedArray(string) {
	return stringToUint8(encodeString(string));
}

(function (global) {
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

	function span(options) {
		options = options || {};
		var prefix = '<code class="'.concat(options.class, '">\n  <data class="');
		var suffix = '" value="'.concat(options.value.length, '">\n');
		var tail = "\n </data>\n</code>";
		return prefix
			.concat(options.class)
			.concat(suffix)
			.concat(options.value)
			.concat(tail);
	}

	function Str(value) {
		this.value = value;
	}

	Str.prototype.prefix = function () {
		return ">";
	};
	Str.prototype.toString = function () {
		return "".concat(this.value);
	};
	Str.prototype.valueOf = function () {
		return this;
	};

	function Message(value) {
		Str.call(this, value);
		this.value = value;
	}

	Message.prototype = Object.create(Str.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Message,
			writable: true
		}
	});

	Message.prototype.prefix = function () {
		return Str.prototype.prefix.call(this) + ">";
	};

	function Primitive(value) {
		this.value = value;
	}

	Primitive.prototype.cat = function () {
		return "+";
	};

	Primitive.prototype.toString = function () {
		return "".concat(this.value);
	};
	Primitive.prototype.valueOf = function () {
		return this;
	};

	Primitive.prototype.post = function (string) {
		return new Message(string);
	};

	function Ctor(value) {
		Primitive.call(this, value);
		this.value = value;
		this.type = "";
	}

	Ctor.prototype = Object.create(Primitive.prototype, {
		constructor: {
			configurable: true,
			enumerable: true,
			value: Ctor,
			writable: true
		}
	});

	Ctor.prototype.cat = function () {
		return Primitive.prototype.cat.call(this) + ";";
	};
	
  /*
	Ctor.prototype.toString = function () {
		return "".concat(this.value);
	};

	Ctor.prototype.valueOf = function () {
		return this;
	};
	*/

	Ctor.prototype.post = function (string) {
		return new Message(string);
	};

	var ctor = new Ctor("super");

	global.evaluator = function (string) {
		var result;

		if (string === "who") {
			return '..who>\n' + toProps(ctor);
		}
		
		else if(string === 'where'){
			return '..where>\n' + toProps(location);
		}
		
		else if(string === 'what'){
			return '..what>\n' + toProps(navigator);
		}
		
		else if(string === 'when'){
			return new Date().toString();
		}
		
		else if(string === 'why'){
			return '..why>'
		}
		
		else if(string === 'while'){
			return '..while>'
		}
		
		else if(string === 'with'){
			return '..with>'
		}		
		
		else {
			
			try {
			
				result = eval.call(this, string);

				if (isFunction(result)) {
					result = span({
						class: "function",
						value: toSource(result)
					});
				} else if (isRegExp(result)) {
					result = span({
						class: "regexp",
						value: new RegExp(result).toString()
					});
				} else if (isDate(result)) {
					result = span({
						class: "date",
						value: "".concat(result, "")
					});
				} else if (isObject(result)) {
					result = span({
						class: "object",
						value: toProps(result)
					});
				} else if (isString(result)) {
					result = span({
						class: "string",
						value: "".concat(result, "")
					});
				} else if (isNumber(result)) {
					result = span({
						class: "number",
						value: "".concat(result, "")
					});
				} else if (isBoolean(result)) {
					result = span({
						class: "boolean",
						value: "".concat(result, "")
					});
				} else if (isUndefined(result)) {
					result = span({
						class: "undefined",
						value: "".concat(result, "")
					});
				} else if (isNull(result)) {
					result = span({
						class: "null",
						value: "".concat(result, "")
					});
				}
			} catch (er) {
				if (er instanceof TypeError) {
					result = span({
						class: "type-error",
						value: "[[ Type ".concat("]] ", er.message)
					}).concat(er.message);
				} else if (er instanceof SyntaxError) {
					result = span({
						class: "syntax-error",
						value: "[[ Syntax ".concat("]] ")
					}).concat(er.message);
				} else if (er instanceof ReferenceError) {
					result = span({
						class: "reference-error",
						value: "[[ Reference ".concat("]] ")
					}).concat(er.message);
				} else if (er instanceof RangeError) {
					result = span({
						class: "range-error",
						value: "[[ Range ".concat("]] ")
					}).concat(er.message);
				} else if (er instanceof EvalError) {
					result = span({
						class: "eval-error",
						value: "[[ Eval ".concat("]] ")
					}).concat(er.message);
				} else {
					result = escaped(er.stack);
				}
			} finally {
				return ctor.post(result);
			}
		}
	};
})(this);


function parso(obj){
	return JSON.parse(evaluator(obj).value.split('>')[2].split('<')[0])
}
