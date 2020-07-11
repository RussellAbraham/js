(function(){

    browser.history = {};

    [].forEach(function(object){
        load('history/' + object);
    });

})();