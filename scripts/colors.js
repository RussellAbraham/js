var colors = [];

function changeColors(color){
	//loop through all squares
	// for(var i = 0; i < ln.length; i++){
	// 	 ln[i]
	// }
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor())
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256),//pick a "red" from 0 - 255
	    g = Math.floor(Math.random() * 256),//pick a "green" from  0 -255
	    b = Math.floor(Math.random() * 256);//pick a "blue" from  0 -255
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


function Color(r, g, b, name){
	this.r = r;
	this.g = g;
	this.b = b;
	this.name = name;
}

Color.prototype.innerRGB = function(){
	const root = this;
	const obj= { r:root.r, g:root.g, b:root.b, name:root.name };
	return root.r+","+root.g+","+root.b;	
}

Color.prototype.rgb = function(){
	return "rgb("+this.innerRGB()+")";
}
Color.prototype.rgba = function(a = 1.0){
	return "rgba("+this.innerRGB()+","+a+")";
}
Color.prototype.hex = function(){
	const { r, g, b } = this;
	return (
		'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
	);
}
Color.prototype.hsl = function(){
	const { h, s, l } = this;
	return `hsl(${h},${s}%, ${l}%)`;	
}
Color.prototype.fulllySaturated = function(){
	const { h, l } = this;
	return `hsl(${h},100%, ${l}%)`;	
}
Color.prototype.opposite = function(){
	const { h, s, l } = this;
	const newHue = (h + 180) % 360;
	return `hsl(${newHue},${s}%, ${l}%)`;	
}
Color.prototype.calcHSL = function(){
	let { r, g, b } = this;
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
	if (delta == 0) h = 0;
	else if (cmax == r)
		// Red is max
		h = ((g - b) / delta) % 6;
	else if (cmax == g)
		// Green is max
		h = (b - r) / delta + 2;
	else
		// Blue is max
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0) h += 360;
	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
	this.h = h;
	this.s = s;
	this.l = l;	
}

