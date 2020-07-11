(function () {
    var protocol = window.location.protocol,
        pathname = window.location.pathname,
        hostname = window.location.hostname;
        port     = window.location.port,
        href     = window.location.href;
    console.log([  
        protocol,
        pathname,
        hostname,
        port,
        href
    ])    
})();