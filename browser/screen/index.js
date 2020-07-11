(function(){
    
    browser.screen = {};

    [ 'fullscreen' ].forEach(function(object){
        load('screen/' + object);
    });

})();