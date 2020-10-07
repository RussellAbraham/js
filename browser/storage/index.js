(function(){
    
    browser.storage = {};

    ['session','local','webSQL','indexedDB'].forEach(function(object){
        load('storage/' + object);
    });

})();