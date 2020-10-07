(function(){

    browser.window = {};

    ['stop', 'open','moveTo','resizeTo'].forEach(function(object){
        load('window/' + object);
    });

})();