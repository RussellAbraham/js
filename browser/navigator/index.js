(function(){
    
    browser.navigator = {};

    [ 'userAgent' ].forEach(function(object){
        load('navigator/' + object);
    });

})();