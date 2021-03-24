requirejs.config({
    baseUrl : '',
    paths : {
        jquery : '',
        underscore : '',
        backbone : ''
    }
});

requirejs(['main'], function(Main){
    var debug = new Main();
    console.log(debug);
});