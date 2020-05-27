(function(fragment, observer){
	const factory = function(){
		return {
			fragment : function(){
				return fragment
			},
			observer : function(){
				return observer
			}
		}
	}
	if(typeof window !== 'undefined'){
		window.factory = factory;  
	}
})(new DocumentFragment(), window.MutationObserver || window.WebKitMutationObserver);
