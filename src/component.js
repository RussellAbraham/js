function Component(){
  this.isConnected = false;
}


Component.prototype = {

    connect : function (){
      this.isConnected = true;
    },
    
    disconnect : function(){
      this.isConnected = false;
    },

    toggle : function(){
      if (this.isConnected){
        this.isConnected = false;
      } else {
          this.isConnected = true;  
      }
    }

}
