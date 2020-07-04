function isObjectLike(object) {
    return (
        !!object && (typeof (object) === 'object') && (typeof (object.length) === 'undefined')
    );
}

function isArrayLike(object) {
    if (typeof (object) == 'array') return true;
    return (
        !!object && (typeof (object) === 'object') && (typeof (object.length) != 'undefined')
    );
}

function serialize(obj, glue){

	if (!glue) glue = ':';
    
    var stream = '';
	
	if (typeof(obj) == 'boolean') {
		stream += (obj ? 'true' : 'false');
	}
    
    else if (typeof(obj) == 'number') {
		stream += obj;
	}
    
    else if (typeof(obj) == 'string') {
		stream += '"' + obj.replace(/([\"\\])/g, '\\$1').replace(/\r/g, "\\r").replace(/\n/g, "\\n") + '"';
	}
    
    else if (isObjectLike(obj)) {
		var num = 0;
		var buffer = [];
		for (var key in obj) {
			buffer[num] = (key.match(/^[A-Za-z]\w*$/) ? key : ('"'+key+'"')) + glue + serialize(obj[key], glue);
			num++;
		}
		stream += '{' + buffer.join(',') + '}';
	}
    
    else if (isArrayLike(obj)) {
		var buffer = [];
		for (var idx = 0, len = obj.length; idx < len; idx++) {
			buffer[idx] = serialize(obj[idx], glue);
		}
		stream += '[' + buffer.join(',') + ']';
	}
    
    else {
		stream += '0';
	}
	
    return stream;
    
}
