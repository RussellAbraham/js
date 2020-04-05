function loader(secs,elem) {
    var element = document.getElementById(elem);
    element.innerHTML = "Please wait for "+secs+" seconds";
    if(secs < 1) {
        clearTimeout(timer);
        element.innerHTML = '<h2>Countdown Complete!</h2>';
        element.innerHTML += '<a href="#">Click here now</a>';
    }
    secs--;
    var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
}


function countDown(num){
    if(num <= 0) {
        console.log("All done!");
        return;
    }
    console.log(num);
    num--;
    countDown(num);
    
}
function recurse(num){
  if (num <= 0) {
    console.log("Complete");
    return;
  }
  num--;
  setTimeout(function(num){
  num = num || 0;      
      recurse(num);
      console.log(num--);
  }, 3000, num);

}
