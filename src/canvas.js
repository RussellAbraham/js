const canvas = document.getElementById('canvas');
const ctx2D = canvas.getContext('2d');
const ctxGL = canvas.getContext('webgl');

const ctx = canvas.getContext('webgl');

function peek(object){
	Object.values([object.__proto__]).forEach(function(keys){
		Object.keys(keys).forEach(function(values, index){
			console.log(''.concat(index, ' : ', values));
		})
	})
}

function Texture(src){
	this.image = new Image();
	this.image.src = src;
	this.image.crossOrigin = "Anonymous";
}

function Line(options){
	options = (options || {});
	this.ctx = options.ctx;
	this.startX = options.startX;
	this.startY = options.startY; 
	this.endX = options.endX;
	this.endY = options.endY;
	//this.color = options.color
}

Line.prototype.draw = function(){
	this.ctx.beginPath();
	this.ctx.moveTo(this.startX,this.startY);
	this.ctx.lineTo(this.endX,this.endY);
	this.ctx.stroke();
}

function Arc(options){
	options = (options || {});
	this.ctx = options.ctx;
	this.centerX = options.centerX;
	this.centerY = options.centerY; 
	this.radius = options.radius;
	this.startAngle = options.startAngle;
	this.endAngle = options.endAngle;
}

Arc.prototype.draw = function(){
	this.options.ctx.beginPath();
	this.options.ctx.arc(this.options.centerX, this.options.centerY, this.options.radius, this.options.startAngle, this.options.endAngle);
	this.options.ctx.stroke();	
}

const data = [
	{startX : 0,startY : 0,endX : 100,endY : 100},
	{startX : 0,startY : 0,endX : 100,endY : 100}
]

function lines(){
	data.forEach(function(line){
		var linetest = new Line();
		linetest.draw();
	});
}

const squares = JSON.stringify({
	0 : ['rgba(250,0,0,0.5)',[10, 10, 50, 50]],
	1 : ['rgba(0,250,0,0.5)',[20, 20, 50, 50]],
	2 : ['rgba(0,0,250,0.5)',[30, 30, 50, 50]],
	3 : ['rgba(250,0,0,0.5)',[40, 40, 50, 50]],
	4 : ['rgba(0,250,0,0.5)',[50, 50, 50, 50]],
	5 : ['rgba(0,0,250,0.5)',[60, 60, 50, 50]]
});

function filler(string, array){		
	context.fillStyle = string
	context.fillRect(array[0],array[1],array[2],array[3]);			
}

Object.values(JSON.parse(squares)).forEach(function(object){
	filler( object[0], object[1] )
});


const grid = [
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 
    2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2,     
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1
];
