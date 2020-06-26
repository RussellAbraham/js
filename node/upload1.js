function Upload1(url, file) {
    
    var fs = new FileSlicer(file);
    var socket = new WebSocket(url);

    socket.onopen = function() {
       socket.send(fs.getNextSlice());
    }
    
    socket.onmessage = function(event){

        var data = event.data;
        
        if(data === "ok"){

            fs.slices--;
           
            if(fs.slices>0) socket.send(fs.getNextSlice());
        
        } else {
        
            // handle the error code here.
        
        }
    
    }
    
}
