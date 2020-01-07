const webworker = new Worker('worker.js');

const annoyer = {
    phrases: [  
      "Hello World!", "Random Text", "Goodbye World!", "Testing Text", "More Text"  
    ],
    pickPhrase() {
      const { phrases } = this;
      const idx = Math.floor(Math.random() * phrases.length);
      return phrases[idx]
    },  
    start() {
      this.timerId = setInterval(() => {
        webworker.postMessage(this.pickPhrase());
      }, 1000)  
    },  
    stop() {
      clearInterval(this.timerId);
      console.log("PHEW THANK HEAVENS THAT IS OVER!")  
    }
  }

  webworker.onmessage = function(e){
    if(isObject(e.data)){
      console.log('its obj');
      console.log(e.data);
    } else if(isString(e.data)) {
      var obj = JSON.parse(e.data);
      console.info('was str now obj');
      console.log(obj);
      populate(obj)
    } else {
      console.error('its not what you thot')
    }
    annoyer.stop()
  };

  var arr = [];
  function populate(obj){
    console.info('ok DOM got obj');  
    //console.log(obj);
    arr.push(_.values(obj))
    console.log(_.values(obj));
    //console.log(_.values(obj)[0]);
   
  }


//
//  var x = arr[0][2]
//
//  var y = x[0].children;
//
//  console.log(y[0].path)



// var x = arr[0][2];
// var css = x[0].children;
// var js  = x[2].children;
// var svg = x[10].children;
