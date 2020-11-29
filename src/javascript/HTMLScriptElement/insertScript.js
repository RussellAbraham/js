// Insert Method will execute the code from the parent script tag this script tag is inserted within.

// This will connect an interfaces runtime scope to the DOM, 

// but both sides of the interface must be handled by a parent object

// reusable, 
// async, 
// forkable, cascadeable 

function insertScript() {
    
    if(document.getElementById('js') !== null){
        const js = document.getElementById('js');
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = js.innerHTML;
        js.parentNode.insertBefore(script, js);
        // Remove it at the end, 
        js.parentNode.removeChild(script);        
    }

  };
  