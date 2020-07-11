(function(){

    browser.dialog = {};

    [ 'alert', 'confirm', 'prompt' ].forEach(function(object){
        load('dialog/' + object);
    });

})();