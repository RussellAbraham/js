(function(){

    const url = 'js';
    const pathSeparator = '/';
    const fileSeparator = '.';
    
    const scripts = [];




})();

var ctx = document.getElementsByTagName('script')[0];

var script;

function loadScript(src, load, error, target){    
    script = document.createElement('script');
    script.src = src;
    script.onload = load || load;
    script.onerror = error;
    return target.appendChild(script)
}

function injectScript(){
    script = document.createElement('script');

}


createElement('script');
appendChild()             
                  

onload = function(){}  
                         



createElement('script');
// createObjectURL(new Blob([], function(){ }.bind({ }, true)))
// '<script src=""></script>
insertBefore()
onreadystatechange = function(){}

