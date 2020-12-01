const express = require("express");
const app = express();
const port = 3000;

function action(object, events) {
    for (var event in events) {
        object.on(event, events[event]);
    }
}

function pending(string) {
    return new Promise(function (resolve, reject) {
        if (string) {
            resolve(string);
        } else {
            reject(string);
        }
    })
}

app.get('/', function(req, res){
    console.log(this);
    res.send('Hello World!');

});

/* declare the server as a constant or variable to shut down with close */
const server = app.listen(port, function(){
    console.log(`Express Server at http://localhost:${port}`, this);
});


function stop() {
    
    pending('signal')

    .then(function(resolve){
        console.info(resolve.concat(" received, closing"));
    })

    .then(function(){
        server.close();
        console.info('closed');        
    })

    .then(function(){
        process.exit(0);
    })

    .catch(function(reject){
        throw Error(reject.concat(' FAIL '))
    })

}

action(process, {
    'SIGINT': stop//,
    //'SIGTERM': stop,
    //'SIGHUP': stop
});
