
function Doctor(name){
	this.name = name;
};

Doctor.prototype.treat = function(){
	return "treated";
};

Doctor.prototype.toString = function(){
	return "[Doctor "+this.name +"]";
};

function Surgeon(name,type){
	Doctor.call(this,name);
	this.name = name;
	this.type = type;
};

Surgeon.prototype = Object.create(Doctor.prototype,{
    constructor: {
	    configurable : true,
	    enumerable: true,
	    value:Surgeon,
	    writable:true
    }
});

Surgeon.prototype.treat = function(){
	return Doctor.prototype.treat.call(this)+ " operated";
};

Surgeon.prototype.toString = function(){
	return "[Surgeon "+this.name +" type "+this.type +"]";
};

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

Primitive.prototype.prefix = function(){
	return "prefixed";
};

Primitive.prototype.suffix = function(){
	return "suffixed";
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

Precision.prototype.prefix = function(){
	return Primitive.prototype.prefix.call(this)+ " %";
};

Precision.prototype.suffix = function(){
	return Primitive.prototype.suffix.call(this)+ " %";
};

Precision.prototype.toString = function(){
	return "[Precision "+this.value +" type "+this.type +"]";
};

var prime = new Primitive(0);
var doctor = new Doctor("John");
var surgeon = new Surgeon("Bob","Dental");

console.log(doctor.treat());
console.log(surgeon.treat());

console.log(doctor.toString());
console.log(surgeon.toString());

console.log(doctor instanceof Doctor);
console.log(doctor instanceof Object);

console.log(surgeon instanceof Doctor);
console.log(surgeon instanceof Surgeon);
console.log(surgeon instanceof Object);