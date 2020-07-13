(function(){
    
    browser.storage = {};

    [].forEach(function(object){
        load('storage/' + object);
    });

})();