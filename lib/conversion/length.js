<<<<<<< Updated upstream
function convertFeetToMeters(num){
    num = parseFloat(num);
    return num / 3.2808;
};

=======
>>>>>>> Stashed changes
function Converter(num){
	this.value = num;
};

<<<<<<< Updated upstream
Converter.prototype.f2m = function(){
=======
Converter.prototype.f2mtr = function(){
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
function convert(n,cb){
	var x = new Converter(n);
	return x[cb]();
};

=======
//
Converter.prototype.m2f = function(){};
Converter.prototype.m2i = function(){};
Converter.prototype.m2c = function(){};
Converter.prototype.m2y = function(){};
Converter.prototype.m2k = function(){};
Converter.prototype.m2mil = function(){};
>>>>>>> Stashed changes
