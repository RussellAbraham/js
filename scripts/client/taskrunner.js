const taskrunner = {

    // todo: if taskrunner has started, it should not start again, unless implicit
    start(){
        this.timerId = setInterval(() => {
            // 
        }, 3000);
    },
    stop(){
        clearInterval(this.timerId);
        console.log('taskrunner may have stopped')
    }

}