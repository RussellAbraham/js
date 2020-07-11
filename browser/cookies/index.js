(function(){
    
    browser.cookies = {};

    [ 'get', 'set', 'check' ].forEach(function(object){
        load('cookies/' + object);
    });

})();