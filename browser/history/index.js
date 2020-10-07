(function(){

    browser.history = {};

    ['forward', 'back', 'pushState', 'replaceState'].forEach(function(object){
        load('history/' + object);
    });

})();