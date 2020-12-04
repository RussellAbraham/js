const channel = new MessageChannel();
const port1 = channel.port1;


const iframe = document.createElement('iframe');

iframe.addEventListener('load', function(event){
    
    this.postMessage('init', '*', [channel.port2]);

}, false);

document.body.appendChild(iframe);

iframe.contentWindow.document.open();

iframe.contentWindow.document.write(document.getElementById('textarea').value);

iframe.contentWindow.document.close();


