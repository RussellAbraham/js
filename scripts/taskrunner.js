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