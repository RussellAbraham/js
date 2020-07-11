(function () {
  var clearInterval = window.clearInterval,
      clearTimeout = window.clearTimeout,
      setInterval = window.setInterval,
      setTimeout = window.setTimeout;
  console.log('Timing: ', [
    clearInterval,
    clearTimeout,
    setInterval,
    setTimeout
  ]);
})()

const taskrunner = {
  start: function () {
    this.timerId = setInterval(function () {
      console.log('executing')
    }, 200);
  },
  stop: function () {
    clearInterval(this.timerId);
    console.log('taskrunner may have stopped')
  }
}

function recurse(num) {
  if (num <= 0) {
    console.log("Complete");
    return;
  }
  num--;
  setTimeout(function (num) {
    num = num || 0;
    recurse(num);
    console.log(num--);
  }, 200, num);
}


recurse(5); 

taskrunner.start();

taskrunner.stop();

 
function MiniDaemon (oOwner, fTask, nRate, nLen) {
	if (!(this && this instanceof MiniDaemon)) { return; }
	if (arguments.length < 2) { throw new TypeError("MiniDaemon - not enough arguments"); }
	if (oOwner) { this.owner = oOwner; }
	this.task = fTask;
	if (isFinite(nRate) && nRate > 0) { this.rate = Math.floor(nRate); }
	if (nLen > 0) { this.length = Math.floor(nLen); }
}
 
MiniDaemon.prototype.owner = null;
MiniDaemon.prototype.task = null;
MiniDaemon.prototype.rate = 100;
MiniDaemon.prototype.length = Infinity;
 
/* These properties should be read-only */
 
MiniDaemon.prototype.SESSION = -1;
MiniDaemon.prototype.INDEX = 0;
MiniDaemon.prototype.PAUSED = true;
MiniDaemon.prototype.BACKW = true;
 
/* Global methods */
 
MiniDaemon.forceCall = function (oDmn) {
	oDmn.INDEX += oDmn.BACKW ? -1 : 1;
	if (oDmn.task.call(oDmn.owner, oDmn.INDEX, oDmn.length, oDmn.BACKW) === false || oDmn.isAtEnd()) { oDmn.pause(); return false; }
	return true;
};
 
/* Instances methods */
 
MiniDaemon.prototype.isAtEnd = function () {
	return this.BACKW ? isFinite(this.length) && this.INDEX < 1 : this.INDEX + 1 > this.length;
};
 
MiniDaemon.prototype.synchronize = function () {
	if (this.PAUSED) { return; }
	clearInterval(this.SESSION);
	this.SESSION = setInterval(MiniDaemon.forceCall, this.rate, this);
};
 
MiniDaemon.prototype.pause = function () {
	clearInterval(this.SESSION);
	this.PAUSED = true;
};
 
MiniDaemon.prototype.start = function (bReverse) {
	var bBackw = Boolean(bReverse);
	if (this.BACKW === bBackw && (this.isAtEnd() || !this.PAUSED)) { return; }
	this.BACKW = bBackw;
	this.PAUSED = false;
	this.synchronize();
};


//global timeout references we can use to stop them
var timeouts = {};

//timer demo function with normal/self-adjusting argument
function timer(form, adjust, morework) {
  //create the timer speed, a counter and a starting timestamp
  var speed = 50,
    counter = 0,
    start = new Date().getTime();

  //timer instance function
  function instance() {
    //if the morework flag is true
    //do some calculations to create more work
    if (morework) {
      for (var x = 1, i = 0; i < 1000000; i++) {
        x *= i + 1;
      }
    }

    //work out the real and ideal elapsed time
    var real = counter * speed,
      ideal = new Date().getTime() - start;

    //increment the counter
    counter++;

    //display the values
    form.ideal.value = real;
    form.real.value = ideal;

    //calculate and display the difference
    var diff = ideal - real;
    form.diff.value = diff;

    //if the adjust flag is true
    //delete the difference from the speed of the next instance
    if (adjust) {
      timeouts[form.id] = window.setTimeout(function() {
        instance();
      }, speed - diff);
    } else {
      //otherwise keep the speed normal
      timeouts[form.id] = window.setTimeout(function() {
        instance();
      }, speed);
    }
  }

  //now kick everything off with the first timer instance
  timeouts[form.id] = window.setTimeout(function() {
    instance();
  }, speed);
}

//bind a submit handler to the normal form
document.getElementById("normal").onsubmit = function() {
  //call the timerdemo function with no flags
  timer(this, false, false);

  //cancel the normal submit
  return false;
};

//bind a reset handler to stop it
document.getElementById("normal").onreset = function() {
  //stop the form's timer
  window.clearTimeout(timeouts[this.id]);

  //cancel the normal reset
  return false;
};

//bind a submit handler to the more-work form
document.getElementById("morework").onsubmit = function() {
  //call the timerdemo function with a morework flag
  timer(this, false, true);

  //cancel the normal submit
  return false;
};

//bind a reset handler to stop it
document.getElementById("morework").onreset = function() {
  //stop the form's timer
  window.clearTimeout(timeouts[this.id]);

  //cancel the normal reset
  return false;
};

//bind a submit handler to the self-adjusting form
document.getElementById("adjusting").onsubmit = function() {
  //call the timerdemo function with both flags true
  timer(this, true, true);

  //cancel the normal submit
  return false;
};

//bind a reset handler to stop it
document.getElementById("adjusting").onreset = function() {
  //stop the form's timer
  window.clearTimeout(timeouts[this.id]);

  //cancel the normal reset
  return false;
};

function fast(){
  function addUpTo(n) {
    return n * (n + 1) / 2;
  }
  var time1 = performance.now();
  addUpTo(1000000000);
  var time2 = performance.now();
  console.log(`Time Elapsed: ${(time2 - time1) / 1000} seconds.`)
}

function slow(){
  function addUpTo(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
      total += i;
    }
    return total;
  }
  var t1 = performance.now();
  addUpTo(1000000000);
  var t2 = performance.now();
  console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`)
}