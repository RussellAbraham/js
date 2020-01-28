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