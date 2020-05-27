const annoyer = {

    phrases: ["literally", "cray cray", "I can't even", "Totes!", "YOLO", "Can't Stop, Won't Stop"],

    pickPhrase() {
        const {
            phrases
        } = this;
        const idx = Math.floor(Math.random() * phrases.length);
        return phrases[idx]
    },
    start() {
        //Use an arrow function to avoid getting a different 'this':
        this.timerId = setInterval(() => {
            console.log(this.pickPhrase())
        }, 3000)
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
