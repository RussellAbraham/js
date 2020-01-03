
// "/" = "https://russellabraham.github.io/"
// "./" = "https://russellabraham.github.io/javascript/webworker/"

const webworker = new Worker("./worker.js");

const annoyer = {
  
  phrases: [  
    "Updating..", "Adding..", "Deleting..", "Testing..", "Searching..", "Please Wait.."  
  ],

  pickPhrase() {
    const { phrases } = this;
    const idx = Math.floor(Math.random() * phrases.length);
    return phrases[idx]
  },
  
  start() {
    //Use an arrow function to avoid getting a different 'this':
    this.timerId = setInterval(() => {
      let msg = this.pickPhrase();
      console.log(msg, this)
      webworker.postMessage(msg);
      setText(target, msg);
    }, 1000)  
  },
  
  stop() {
    clearInterval(this.timerId);
    console.log("PHEW THANK HEAVENS THAT IS OVER!")  
  }
  
}

// annoyer.start();
// annoyer.stop();

webworker.onmessage = function(e){
  console.log(
    "I Document, Received Message From " + this + "\n" +
    "Message: " + e.data
  );
  setHTML(outputbody, "I Document, Received Message: " + "<code>" + e.data + "</code>");
};
