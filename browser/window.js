(function(){
    var innerWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    var innerHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var open = window.open,
        close = window.close,
        moveTo = window.moveTo,
        resizeTo = window.resizeTo,
        resizeBy = window.resizeBy    
     console.log([
        "Browser inner window width: " + innerWidth + ", height: " + innerHeight + ".",
        open,
        close,
        moveTo,
        resizeTo,
        resizeBy    
    ])   
})();