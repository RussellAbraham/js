(function(){

    var request, response, blob;

    function getjson(url){
        request = new XMLHttpRequest();
        request.responseType = 'text';
        request.onload = function(){
            if(request.status === 200){
                response = JSON.parse(request.response);
                populate(response);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);
            }
        }
        request.send();
    }

    function getimg(url){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        request.onload = function(){
            if(request.status === 200){
                response = request.response;
                blob = window.URL.createObjectURL(response);
                populate(blob);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText);            
            }
        }
        request.send();
    }

    function populate(obj){
        self.postMessage(obj);
    }

})();
