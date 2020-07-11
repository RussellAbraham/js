(function(){

  browser.dialog.alert = function(){
    return alert(arguments[0]);
  }
  
  browser.dialog.alerts = function(){
    return [].slice.call(arguments).forEach(function(object){
      alert(object);
    });
  }

})();
