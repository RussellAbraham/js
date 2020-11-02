
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
}
