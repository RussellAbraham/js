
/* mini daemon */

const daemon = {
    
    start : function (ms) {
        if (this.timerId) {
            throw new Error(this.timerId);
        }
        else {
            this.timerId = setInterval(function () {
                // callback
            }, ms);
        }
    },
    
    stop: function () {
        if(this.timerId){
            clearInterval(this.timerId);            
            this.timerId = "";
        }
    }
    
}

/* max daemon */

function Daemon(context, callback, ms, steps, init, start){

    if(context){ this.context = context; }

    this.callback = callback;

    if(isFinite(ms) && ms > 0){ this.ms = Math.floor(ms); }

    if(steps > 0){ this.length = Math.floor(steps); }

    if(init){
        this.onstop = init;
        init.call(context);
    }

    if(start){ this.onstart = start; }

}

Daemon.prototype = {
    context : null,
    callback : null,
    ms : 0,
    length : Infinity,
    onstart : null,
    onstop : null
}

Daemon.forceCall = function(object){
    if(object.callback.call(object.context) === false){ return false; }
    return true;
}

Daemon.prototype.sync = function(){
    Daemon.forceCall(this);
};

function Interval (context, callback, ms, steps) {
	if (!(this && this instanceof Interval)) { return; }
	if (arguments.length < 2) { throw new TypeError("Interval - not enough arguments"); }
	if (context) { this.context = context; }
	this.callback = callback;
	if (isFinite(ms) && ms > 0) { this.ms = Math.floor(ms); }
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
	

/*---------------------------------------*/

function opacity (idx, length, reverse) {
	this.style.opacity = idx / length;
	if (reverse ? idx === 0 : idx === 1) {
		this.style.visibility = reverse ? "hidden" : "visible";
	}	
}

const anchor = document.getElementById("id");

const animate =  new Interval(anchor, opacity, 16, 64);


function opaque(){
	
	const request = new XMLHttpRequest();
	
	request.open('GET', this, false);
	
	request.onload = function(){
		console.log(request.response);
	}
	
	request.send(null);
	
}

const octet = 'data:application/octet-stream, 0';

const stream = new Interval(octet, opaque, 1000, 1);
