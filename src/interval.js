function Interval (context, callback, ms, steps) {
		if (!(this && this instanceof Interval)) { return; }
		if (arguments.length < 2) { throw new TypeError("Interval - not enough arguments"); }
		if (context) { this.context = context; }
		this.callback = callback;
		if (isFinite(ms) && ms > 0) { this.ms = Math.floor(ms); }
		if (steps > 0) { this.length = Math.floor(steps); }
	}
	// config values
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
	
	// INTERVAL_CALL
	Interval.forceCall = function (object) {
		object.INDEX += object.BACK ? -1 : 1;
		if (object.callback.call(object.context, object.INDEX, object.length, object.BACK) === false || object.isAtEnd()) { object.pause(); return false; }
		return true;
	};
	
	
	Interval.prototype.isAtEnd = function (){
		return this.BACKW ? isFinite(this.length) && this.INDEX < 1 : this.INDEX + 1 > this.length;
	};
	
	Interval.prototype.synchronize = function () {
		if (this.PAUSED) { return; }
		clearInterval(this.SESSION);
		this.SESSION = setInterval(Interval.forceCall, this.ms, this);
	};
	
	Interval.prototype.pause = function () {
		clearInterval(this.SESSION);
		this.PAUSED = true;
	};
	
	Interval.prototype.start = function (reverse) {
		var bBackw = Boolean(reverse);
		if (this.BACK === bBackw && (this.isAtEnd() || !this.PAUSED)) { return; }
		this.BACK = bBackw;
		this.PAUSED = false;
		this.synchronize();
	};
	

// tests

// task runner animation
function opacity (idx, length, reverse) {
	this.style.opacity = idx / length;
	if (reverse ? idx === 0 : idx === 1) {
		this.style.visibility = reverse ? "hidden" : "visible";
	}	
}
                          // context,                    callback,  milleseconds,  steps
var fadeout =  new Interval(document.getElementById("id"), opacity,    0.25,        256);


// task runner network i/o 
function netpacity(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', this, true);
	xhr.onload = function(){
		console.log(this)
	}
	xhr.send();
}

//                        context, callback, milleseconds, steps
var scraper = new Interval(location.href, netpacity, 1000, 16);
