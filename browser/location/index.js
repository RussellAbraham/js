(function(){

    browser.location = {};

    ['reload', 'replace'].forEach(function(object){
        load('location/' + object);
    });

})();