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

/**/
function Alerts(){
    this.levels = [
        "green", 
        "blue", 
        "yellow", 
        "orange",
        "red"
    ];
}

Alerts.prototype = {
    
    randomLevel : function(){
        const idx = Math.floor(Math.random() * this.levels.length);
        return this.levels[idx];
    },

    start : function(ms){
        this.cid = setInterval(function(){
            console.log(this.randomLevel()) 
        }, ms);
    },
    stop : function(){
        clearInterval(this.cid);
    }
}

const alerts = {

    levels : [
        "green", 
        "blue", 
        "yellow", 
        "orange",
        "red"
    ],

    indexLevel : function(){
        const levels = alerts.levels.length;
        const idx = Math.floor(Math.random() * levels);
        return levels[idx];
    },
    start : function(ms){
        
        this.cid = setInterval(function(){
            console.log(this.pickPhrase())        
        }, ms);
    },
    stop() {
        clearInterval(this.timerId);
        console.log("PHEW THANK HEAVENS THAT IS OVER!")
    }
}

const taskrunner0 = {
    array: ['one', 'two', 'three'],
    pick: function () {
        const ids = Math.floor(Math.random() * this.array.length);
        return this.array[ids]
    },
    start: function () {
        var self = this;
        this.timerId = setInterval(function () {

            console.log(self.pick())

        }, 1000);

    },
    stop: function () {
        clearInterval(this.timerId);
        console.log('taskrunner may have stopped');
        // clear the timerId so it can start again
        this.timerId = "";
    }
}

const taskrunner = {
    start: function () {
        // if the timerId exists, dont start another one
        if (this.timerId) {
            console.log('already running')
            return false
        }
        // if timerId does not exist, start the interval
        else {
            this.timerId = setInterval(function () {
                // execute function
            }, 1000);
        }
    },
    stop: function () {
        clearInterval(this.timerId);
        console.log('taskrunner may have stopped');
        // clear the timerId so it can start again
        this.timerId = "";
    }
}
// taskrunner.start();
// taskrunner.stop();

// todo: run more tests on separate threads
const factoryWorker = function () {
    return {
        start: function () {
            var root = this;
            if (root.timerId) {
                return false;
            } else {
                root.timerId = setInterval(function () {
                    console.log('from factory worker')
                }, 500)
            }
        },
        stop: function () {
            var root = this;
            clearInterval(root.timerId);
            console.log('factory worker may have stopped')
        }
    }

}


const FactoryWorker = function () {
    this.isRunning = false;
}

FactoryWorker.prototype = {

    start: function () {
        var self = this;
        if (this.isRunning) {
            return false;
        } else {
            self.idx = new Worker('data:application/javascript, const myConst = this;');
            this.isRunning = true;
        }
    },

    stop: function () {
        var self = this;
        self.idx.terminate();
        this.isRunning = false;
    },

}



