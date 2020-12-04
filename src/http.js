const methodMap = {
    acl: 'ACL',
    bind: 'BIND',
    checkout: 'CHECKOUT',
    connect: 'CONNECT',
    copy: 'COPY',
    delete: 'DELETE',
    read: 'GET',
    head: 'HEAD',
    link: 'LINK',
    lock: 'LOCK',
    msearch: 'M-SEARCH',
    merge: 'MERGE',
    mkactivity: 'MKACTIVITY',
    mkcalendar: 'MKCALENDAR',
    mkcol: 'MKCOL',
    move: 'MOVE',
    notify: 'NOTIFY',
    options: 'OPTIONS',
    patch: 'PATCH',
    create: 'POST',
    pri: 'PRI',
    propfind: 'PROPFIND',
    proppatch: 'PROPPATCH',
    purge: 'PURGE',
    update: 'PUT',
    rebind: 'REBIND',
    report: 'REPORT',
    search: 'SEARCH',
    source: 'SOURCE',
    subscribe: 'SUBSCRIBE',
    trace: 'TRACE',
    unbind: 'UNBIND',
    unlink: 'UNLINK',
    unlock: 'UNLOCK',
    unsubscibe: 'UNSUBSCRIBE'
}


function pending(string) {
    return new Promise(function (callback, er) {
        if (string) {
            callback(string);
        } else {
            er(string);
        }
    });
}

function sync(method, options) {
    
    options || (options = {});

    var type = methodMap[method];

    switch (type) {

        case 'create':
            pending()
                .then()
                .catch();
            break;

        case 'read':
            pending()
                .then()
                .catch();
            break;

        case 'update':
            pending()
                .then()
                .catch();
            break;

        case 'destroy':
            pending()
                .then()
                .catch();
            break;

    }

}