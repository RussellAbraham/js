function Channel(){
    this.channel = new MessageChannel();
    this.port1 = this.channel.port1;
    this.iframe = document.getElementById('frame');
    this.intialize();
}

Channel.prototype = {
    intialize : function(){
        this.iframe.contentWindow.postMessage('init', '*', [this.channel.port2]);

    },
    post : function(message){
        this.port1.postMessage(message);
    }
}

const c1 = new Channel();