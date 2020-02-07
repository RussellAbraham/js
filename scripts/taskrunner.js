const taskrunner = {
  start: function () {
    if (this.timerId) {
      console.log('already running')
      return false
    } else {
      this.timerId = setInterval(function () {
        // execute function
      }, 1000);
    }
  },
  stop: function () {
    clearInterval(this.timerId);
    console.log('taskrunner may have stopped');
    this.timerId = "";
  }
}
// taskrunner.start();
// taskrunner.stop();
