
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
