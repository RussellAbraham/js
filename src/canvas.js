const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('webgl');

// 1, no max iterator
function peek(){
	Object.values([ctx.__proto__]).forEach(function(keys){
		Object.keys(keys).forEach(function(values, index){
			console.log(''.concat(index, ' : ', values));
		})
	})
}

// 2, no max iterator
function getValues(obj) {

    function each(obj, iterator, context) {
        var breaker = {};
        if (obj == null) return;
        if ([].forEach && obj.forEach === [].forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if ({}.hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    }

    function map(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if ([].map && obj.map === [].map) return obj.map(iterator, context);
        each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    }

    function cid(value) {
        return value
    }

    return map(obj, cid);

}

console.log(getValues([ctx.__proto__]));

// crossorigin image request
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
