// small script to add random messages like advertisements to the page

const webworker = new Worker("/js/worker.js");

const annoyer = {
  
  phrases: [  
    "Updating..", "Adding..", "Deleting..", "Testing..", "Searching..", "Please Wait.."  
  ],

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

      console.log(this.pickPhrase(), this)
      webworker.postMessage(this.pickPhrase());

    }, 10000)  
  },
  
  stop() {
    clearInterval(this.timerId);
    console.log("PHEW THANK HEAVENS THAT IS OVER!")  
  }

  
}

annoyer.start();
// annoyer.stop();


webworker.onmessage = function(e){
  console.log(
    "I Document, Received Message From " + this + "\n" +
    "Message: " + e.data
  );
}
