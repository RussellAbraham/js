//todo:setup init to draw in steps with Interval

(function(application){
    
    const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
    
    canvas.width = 300;
    canvas.height = 300;
    
	function drawLine(ctx, startX, startY, endX, endY, color){
		ctx.beginPath();
	    ctx.moveTo(startX,startY);
	    ctx.lineTo(endX,endY);
	    ctx.stroke();
	}
    
    function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
	    ctx.beginPath();
	    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	    ctx.stroke();
	}
    
    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
	    ctx.fillStyle = color;
	    ctx.beginPath();
	    ctx.moveTo(centerX,centerY);
	    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	    ctx.closePath();
	    ctx.fill();
	}	
    
    function Interval (context, callback, ms, steps) {
		if (!(this && this instanceof Interval)) { return; }
		if (arguments.length < 2) { throw new TypeError("Interval - not enough arguments"); }
		if (context) { this.owner = context; }
		this.task = callback;
		if (isFinite(ms) && ms > 0) { this.rate = Math.floor(ms); }
		if (steps > 0) { this.length = Math.floor(steps); }
	}	
	Interval.prototype = {
		context : null,
		callback : null,
		ms : 100,
		steps : Infinity,
		SESSION : -1,
		INDEX : 0,
		PAUSED : true,
		BACK : true
	}
	Interval.forceCall = function (object) {
		object.INDEX += object.BACKW ? -1 : 1;
		if (object.task.call(object.owner, object.INDEX, object.length, object.BACKW) === false || object.isAtEnd()) { object.pause(); return false; }
		return true;
	};
	Interval.prototype.isAtEnd = function (){
		return this.BACKW ? isFinite(this.length) && this.INDEX < 1 : this.INDEX + 1 > this.length;
	};
	Interval.prototype.synchronize = function () {
		if (this.PAUSED) { return; }
		clearInterval(this.SESSION);
		this.SESSION = setInterval(Interval.forceCall, this.rate, this);
	};
	Interval.prototype.pause = function () {
		clearInterval(this.SESSION);
		this.PAUSED = true;
	};
	Interval.prototype.start = function (reverse) {
		var bBackw = Boolean(reverse);
		if (this.BACKW === bBackw && (this.isAtEnd() || !this.PAUSED)) { return; }
		this.BACKW = bBackw;
		this.PAUSED = false;
		this.synchronize();
	};
	application['api'] = function(){
		return {
			Interval : Interval,
			drawLine:drawLine,
			drawArc:drawArc,
			drawPieSlice:drawPieSlice,
			ctx:ctx
		}
	}
	if(typeof window !== 'undefined'){
		window.app = application.api();
	}
})(new Object());

var data = JSON.stringify({
	0 : [0,0,300,300],
	1 : [0,75,300,300],
	2 : [0,150,300,300],
	3 : [0,300,300,0],
	4 : [0,300,300,70],
	5 : [0,300,300,150]
});

function drawlines(object){
	Object.values(object).forEach(function(r){
		app.drawLine(app.ctx, r[0], r[1], r[2], r[3]);		
	});	
}

drawlines(JSON.parse(data));

/**/
app.drawArc(app.ctx, 150,150,150, 0, Math.PI/3);
app.drawPieSlice(app.ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, '#ff0000');

