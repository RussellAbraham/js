const Component = function () {
    this.isRunning = false;
}

Component.prototype = {

    connect : function (){
      if (this.isRunning) {
            return false;
        } else {
            this.isRunning = true;
        }
    },

    disconnect : function () {
      this.isConnected = false;
    },
  
  checkConnection : function(){
    if(this.isConnected === false){ return 'Not Connected'; } else { return 'Connected' }
  }

}
