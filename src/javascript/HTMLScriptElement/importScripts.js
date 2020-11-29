function importScripts(){

    function loadScript(src, onload, onerror){
        const script = document.createElement('script');
        script.src = src;
        script.onload = onload;
        script.onerror = onerror || onload;
        return document.head.appendChild(script);
    }

    function success(){
        // map this to {} and return {}
    };

    function failed(){
        // throw error @ path && col:row
    };

    // comma separated values
    [].slice.call(arguments).forEach(function(script){
        loadScript(script, success, failed);
    });

}
