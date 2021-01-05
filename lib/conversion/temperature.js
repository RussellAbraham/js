
function f2c(n){
	n = parseFloat(n);
	return (n - 32) / 1.8;
};

function f2k(n){
	n = parseFloat(n);
	return ((n - 32) / 1.8) + 273.15;
};

function c2f(n){
	n = parseFloat(n);	
	return (n * 1.8) + 32;
};

function c2k(n){
	n = parseFloat(n);	
	return n + 273.15;
};

function k2f(n){
	n = parseFloat(n);	
	return ((n - 273.15) * 1.8) + 32;
};

function k2c(n){
	n = parseFloat(n);	
	return n - 273.15;
};

/* library */

(function (global) {

	function Ctor(obj) {
		this.name = obj;
	}

	Ctor.prototype.valueOf = function () {
		return this;
	};

	Ctor.prototype.toString = function () {
		return "".concat(this.name);
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

	var Temperature = (global.Converter().Temperature = function () {
		Ctor.call(this, arguments);
		this.result = null;
	});

	Temperature.prototype = Object.create(global.Converter.prototype, {
		constructor: {
			value: Temperature,
			writeable: true,
			configurable: true,
			enumerable: true
		}
	});

	Temperature.prototype.toString = function () {
		var output = "".concat(this.result);
		this.result = null;
		return output;
	};

	Temperature.prototype.valueOf = function () {
		return this;
	};

	Temperature.prototype.f2c = function (n) {
		n = parseFloat(n);
		return (n - 32) / 1.8;
	};

	Temperature.prototype.f2k = function (n) {
		n = parseFloat(n);
		return (n - 32) / 1.8 + 273.15;
	};

	Temperature.prototype.c2f = function (n) {
		n = parseFloat(n);
		return n * 1.8 + 32;
	};

	Temperature.prototype.c2k = function (n) {
		n = parseFloat(n);
		return n + 273.15;
	};

	Temperature.prototype.k2f = function (n) {
		n = parseFloat(n);
		return (n - 273.15) * 1.8 + 32;
	};

	Temperature.prototype.k2c = function (n) {
		n = parseFloat(n);
		return n - 273.15;
	};

	/* this function exposes the others as a string and may be better to interface with */
	Temperature.prototype.calc = function (str, n) {
		var output = this[str](n);
		return output;
	};

	global.temperatureConverter = new Temperature("[object TemperatureConverter]");
	
})(this);
