function convertFeetToMeters(num){
    num = parseFloat(num);
    return num / 3.2808;
};

function Converter(num){
	this.value = num;
};

Converter.prototype.f2m = function(){
	return this.value / 3.2808;
};

Converter.prototype.f2i = function(){
	return this.value * 12;
};

Converter.prototype.f2cm = function(){
	return this.value / 0.032808;
};

Converter.prototype.f2y = function(){
	return this.value * 0.33333;
};

Converter.prototype.f2mil = function(){
	return this.value * 0.00018939;
};

function convert(n,cb){
	var x = new Converter(n);
	return x[cb]();
};

