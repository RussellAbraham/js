const Component = function () {
    this.isConnected = false;
}

Component.prototype = {

    connect : function (){
      if (this.isConnected {
            return false;
        } else {
            this.isConnected = true;
        }
    },

    disconnect : function () {
      this.isConnected = false;
    },
  
  checkConnection : function(){
    if(this.isConnected === false){ return 'Not Connected'; } else { return 'Connected' }
  }

}
