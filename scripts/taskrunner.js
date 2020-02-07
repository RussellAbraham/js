// continues running a function every tick of the timer

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
