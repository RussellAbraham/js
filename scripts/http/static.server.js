/* https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework */

const http = require('http');
const fs = require('fs');
const path = require('path');


http.createServer(function (request, response) {
    console.log('request ', request.url);
    
// The following lines deal with fixing the request URL if it does not specify a file.
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }
    
// look for the extension of the file being requested and see if it matches with one of our MIME types. 
// If no matches are found, we use the application/octet-stream as the default type
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Lastly, we respond to the client with the file information. 
    // This function reads the file using our previously prepared filePath variable.
    fs.readFile(filePath, function(error, content) {
        if (error) {
        // The first thing we do is to compensate for any possible errors. 
        // Most often, the error will be ENOENT, in which case we reply with a 404 error.
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        // Finally, if there are no errors, we send over the requested file.
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
// Perhaps an extended version serving static files and handling dynamic requests
