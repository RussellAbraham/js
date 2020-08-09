(function(){
    
    browser.storage = {};

    ['local'].forEach(function(object){
        load('storage/' + object);
    });

})();