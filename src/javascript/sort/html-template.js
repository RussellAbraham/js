const fragment = new DocumentFragment();
const urls = [];
const processed = [];
const downloads = [{
        "guid": "fn3StEQEHW64",
        "title": "article1",
        "index": 0,
        "dateAdded": 1585700823940000,
        "lastModified": 1585700861695000,
        "id": 0,
        "typeCode": 1,
        "tags": "html",
        "type": "text/html",
        "uri": "?name=article1&size=size&opinion=opinion&origin=origin&purpose=purpose&color=color&material=meterial&noun=noun"
    },
		{
        "guid": "",
        "title": "article2",
        "index": 1,
        "dateAdded": 1585700823940000,
        "lastModified": 1585700861695000,
        "id": 1,
        "typeCode": 1,
        "tags": "html",
        "type": "text/html",
        "uri": "?name=article2&size=size&opinion=opinion&origin=origin&purpose=purpose&color=color&material=meterial&noun=noun"
    },
		{
        "guid": "",
        "title": "article3",
        "index": 2,
        "dateAdded": 1585700823940000,
        "lastModified": 1585700861695000,
        "id": 2,
        "typeCode": 1,
        "tags": "html",
        "type": "text/html",
        "uri": "?name=article3&size=size&opinion=opinion&origin=origin&purpose=purpose&color=color&material=meterial&noun=noun"
    }									 
]

function ParseParameters(url) {
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split("#")[0];
    var arr = queryString.split("&");
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split("=");
      var paramName = a[0];
      var paramValue = typeof a[1] === "undefined" ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === "string") paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, "");
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

downloads.forEach(function(title){
	var card = { 
		title : title.title, 
		uri : ParseParameters(title.uri) 
	}
	processed.push(card);
});

processed.forEach(function(card){	
	var link = document.createElement('a');
	link.className = "btn btn-sm text-primary";
	link.textContent = card.title;
	link.href =  '#' + encodeURIComponent(card.title);
	fragment.appendChild(link);
});

var template = 
    '<div class="card text-wrap">'+
		'<div class="card-header">%name%</div>'+
		'<div class="card-body">'+
      '<p class="text-primary">Opinion: %opinion%</p>' +
			'<p class="text-secondary" name="">Size: %size%</p>' +
			'<p class="text-success">Shape: %shape%</p>' +
			'<p class="text-warning">Color: %color%</p>' +
			'<p class="text-danger">Origin: %origin%</p>' +
			'<p class="text-dark">Material: %material%</p>' +
			'<p class="text-muted">Purpose: %purpose%</p>' +
			'<p class="text-light bg-dark">Noun: %noun%</p>' +
    '</div><div class="card-footer"></div>'+
		'</div><hr>';

function templateHTML(){
  processed.forEach(function(post) {
		var component = document.createElement('a');
		component.name = decodeURIComponent(post.uri.name);
    var tmp = template;
    tmp = tmp
			.replace(/%name%/gi, decodeURIComponent(post.uri.name))
			.replace(/%opinion%/gi, post.uri.opinion)
			.replace(/%size%/gi, decodeURIComponent(post.uri.size))
			.replace(/%shape%/gi, post.uri.shape)
			.replace(/%color%/gi, post.uri.color)
			.replace(/%origin%/gi, decodeURIComponent(post.uri.origin))
			.replace(/%material%/gi, decodeURIComponent(post.uri.material))
			.replace(/%purpose%/gi, post.uri.purpose)
			.replace(/%noun%/gi, post.uri.noun)			
    component.innerHTML = tmp;
		fragment.appendChild(component);
  });  
}


function onHashChange(e){
	var hash = window.location.hash;
	switch(hash){
		case '#article1':
			console.log('a 1');
			break;
		case '#article2':
			console.log('a 2');
			break;
		case '#article3':
			console.log('a 3');
			break;			
		default:
			console.log('default');
			
	}
	console.log(e);
}

function init(){
  templateHTML();
  document.body.appendChild(fragment);
	//window.location.hash = '#'
}

init();

(function(xs){
	for(var i = 0;i < xs.length;i++){ 
		if(xs[i].dataset){ 
			console.log(xs[i]);
			xs[i].querySelectorAll('a').forEach(function(x){
					
			})			
		} 
	}  
})(document.querySelectorAll('.card'));

window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', onHashChange);
