(function(){

    browser.timing = {};

    ['interval', 'timeout'].forEach(function(object){
        load('timing/' + object);
    });

})();