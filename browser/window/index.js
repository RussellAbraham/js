(function(){

    browser.window = {};

    [].forEach(function(object){
        load('window/' + object);
    });

})();