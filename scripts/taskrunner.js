
const taskrunner = {
    start:function(){
        this.timerId = setInterval(function(){
        //
        }, 3000);
    },
    stop:function(){
        clearInterval(this.timerId);
        console.log('taskrunner may have stopped')
    }
}

// taskrunner.start();
// taskrunner.stop();


// factory function 
const makeRunner = () => {
    return {
        start: function(){
            this.timeId = setInterval(function(){
                //
            }, 1000)
        },
        stop: function(){
            clearInterval(this.timerId);
            console.log('stopped');
        }
    }
}

// const r1 = makeRunner();
// r1.start();
// r1.stop();
// 
// const r2 = makeRunner();
// r2.start();
// r2.stop();
