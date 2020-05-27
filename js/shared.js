
function Controller(name, description, content){
  this.name = name;
  this.description = description;
  this.content = content;
  this.isConnected = false;
}

Controller.prototype = {
  connect : function(){
    this.isConnected = true;
  },
  disconnect : function(){
    this.isConnected = false;
  },
  test : function(){
    var self = this;
    if(this.isConnected){
      return 'testing';
    } else {
      return false;
    }
  }
}
// todo : setup Constructor Chain to use Contoller, 
// var i, len = length;
// for(i = 0;i < len;i++){ clone }
// for(i = 0;i < len;i++){ event }
// var x = new Controller('name', 'stuff', 'things');
