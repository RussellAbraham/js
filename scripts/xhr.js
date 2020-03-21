(function(){

    var request, response;

    function getjson(){
        request = new XMLHttpRequest();
        request.responseType = 'text';
        request.onload = function(){
            if(request.status === 200){
                response = JSON.parse(request.response);
                populate(response);
            } else {
                console.info('Network request failed ' + request.status + ':' + request.statusText)
            }
        }
        request.send();
    }

    function getimg(){
        request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        request.onload = function(){
            if(request.status === 200){
                var blob = request.response;
                var objUrl = window.URL.createObjectURL(blob);
                populate(response);
            }
        }
        request.send();
    }

    function populate(obj){
        self.postMessage(obj);
    }

})();
