const taskrunner = {
    // todo: if taskrunner has started, it should not start again, unless implicit
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
