
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
	
	var Speed = (global.Converter().Speed = function (obj) {
		Ctor.call(this, obj);
		this.name = obj;
	});

	Speed.prototype = Object.create(global.Converter.prototype, {
		constructor: {
			value: Speed,
			writeable: true,
			configurable: true,
			enumerable: true
		}
	});

	Speed.prototype.toString = function () {
		return "[object ".concat(this.name,"]");
	};

	Speed.prototype.valueOf = function () {
		return this;
	};

	Speed.prototype.mph2kph = function(n){
		return n * 1.609344;
	};
	Speed.prototype.mph2knots = function(n){
		return n / 1.150779;
	};
	Speed.prototype.mph2mach = function(n){
		return n / 761.207;
	};
	
	Speed.prototype.kph2mph = function(n){
		return n / 1.609344;
	};
	Speed.prototype.kph2mph = function(n){
		return n / 1.852;
	};
	Speed.prototype.kph2mph = function(n){
		return n / 1225.044;
	};
	
	Speed.prototype.knots2mph = function(n){
		return n * 1.150779;
	};
	Speed.prototype.knots2kph = function(){
		return n * 1.852;
	};
	Speed.prototype.knots2mach = function(n){
		return n / 661.4708;
	};
	
	Speed.prototype.mach2mph = function(n){
		return n * 761.207;
	};
	Speed.prototype.mach2kph = function(n){
		return n * 1225.044;
	};
	Speed.prototype.mach2knots = function(n){
		return n * 661.4708;
	};

	global.speed = new Speed("SpeedConverter");
	
})(this);
