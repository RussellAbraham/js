// mostly pseudo code

function _cat() {
  
    // whatever object this is a partof has to pass in a string to determine what read method will be used 
    var format = '';

    // file reader constructor handles input
    var cat = new FileReader();
    
    // blob constuctor handles output
    var blob = new Blob([], {});

    cat.onload = function(event){}

    switch(format){
        case 'txt':cat.readAsText(); break;
        case 'bin':cat.readAsBinaryString(); break;
        case 'arr':cat.readAsArrayBuffer(); break;
        case 'url':cat.readAsDataURL(); break;
    }

}
