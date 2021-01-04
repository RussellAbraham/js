/* sigh, this is the way */

function Primitive(value){
	this.value = value;
}

/* indeed */

Primitive.prototype.evaluate = function(n){
	with(this){
		return eval(''.concat(value,n));	
	} void 0
};

Primitive.prototype.treat = function(){
	return "treated";
};

Primitive.prototype.toString = function(){
	return "[Primitive "+this.value +"]";
};

Primitive.prototype.valueOf = function(){
	return this;
};

function Precision(value,type){
	Primitive.call(this,value);
	this.value = value;
	this.type = type;
};

Precision.prototype = Object.create(Primitive.prototype,{
	constructor: {
		configurable : true,
		enumerable: true,
		value:Precision,
		writable:true
	}
});

Precision.prototype.treat = function(){
	return Primitive.prototype.treat.call(this)+ " operated";
};

Precision.prototype.toString = function(){
	return "[Precision "+this.value +" type "+this.type +"]";
};

var prime = new Primitive(0);

var mph = new Precision(0,"MPH");
var kph = new Precision(0,"KPH");
var knot = new Precision(0,"KNOT");
var mach = new Precision(0,"MACH");

/* below works but the lookup is not setup right to be efficient */

function Ctor(num){
	this.value = num;
};

Ctor.prototype.evaluate = function(n){
	with(this){
		return eval(''.concat(value,n));	
	} void 0
};

Ctor.prototype.toString = function(){
	return ''.concat(this.value);
};

Ctor.prototype.valueOf = function(){
	return this;
};

function Converter(num){
	Ctor.call(this, num);
	this.value = parseFloat(num);
};

Converter.prototype = Object.create(Ctor.prototype, {
	constructor : {
		writeable : true,
		enumerable : true,
		value : Converter,
		configurable : true
	}
});

Converter.prototype.toString = function(){
	return ''.concat(this.value);
};

Converter.prototype.valueOf = function(){
	return this;
};

Converter.prototype.setValue = function(n){
	this.value = n;
	return this;
};

Converter.prototype.getValue = function(n){
	return n;
};

Converter.prototype.mph2kph = function(n){
	return n * 1.609344;
};
Converter.prototype.mph2knots = function(n){
	return n / 1.150779;
};
Converter.prototype.mph2mach = function(n){
	return n / 761.207;
};

Converter.prototype.kph2mph = function(n){
	return n / 1.609344;
};
Converter.prototype.kph2mph = function(n){
	return n / 1.852;
};
Converter.prototype.kph2mph = function(n){
	return n / 1225.044;
};

/* KNOT > MPH */
Converter.prototype.knots2mph = function(n){
	return n * 1.150779;
};
/* KNOT > KPH */
Converter.prototype.knots2kph = function(){
	return n * 1.852;
};
/* KNOT > MACH */
Converter.prototype.knots2mach = function(n){
	return n / 661.4708;
};


/* MACH > MPH */

Converter.prototype.mach2mph = function(n){
	return n * 761.207;
};

/* MACH > KPH */

Converter.prototype.mach2kph = function(n){
	return n * 1225.044;
};

/* MACH > KNOTS */

Converter.prototype.mach2knots = function(n){
	return n * 661.4708;
};
