(function (global) {

	function Ctor(obj) {
		this.name = obj;
	}

	Ctor.prototype.valueOf = function () {
		return this;
	};

	Ctor.prototype.toString = function () {
		return "[object ".concat(this.name, "]");
	};

	global.Converter = function (obj) {
		Ctor.call(this, obj);
		this.name = obj;
		return {};
	};

	global.Converter.prototype = Object.create(Ctor.prototype, {
		constructor: {
			value: global.Converter,
			writeable: true,
			configurable: true,
			enumerable: true
		}
	});
	
	global.Converter.valueOf = function () {
		return this;
	};

	global.Converter.prototype.toString = function () {
		return "[object ".concat(this.name, "]");
	};
	
	var Length = (global.Converter().Length = function (obj) {
		Ctor.call(this, obj);
		this.name = obj;
	});

	Length.prototype = Object.create(global.Converter.prototype, {
		constructor: {
			value: Length,
			writeable: true,
			configurable: true,
			enumerable: true
		}
	});

	global.speed = new Length("LengthConverter");
	
})(this);
