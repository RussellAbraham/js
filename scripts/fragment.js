(function(fragment){

	fragment.append = function(element){
		return fragment.appendChild(element)	
	}
	
	fragment.render = function(target){
		return target.appendChild(fragment)
	}
	
	if(typeof window !== 'unefined'){
		window.fragment = fragment;
	}
	
})(new DocumentFragment());

// use
fragment.append(document.createElement('textarea'))
fragment.render(document.body)
