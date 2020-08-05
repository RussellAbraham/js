(function(){
    var innerWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    var innerHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var open = window.open,
        close = window.close,
        moveTo = window.moveTo,
        resizeTo = window.resizeTo,
        resizeBy = window.resizeBy    
     console.log([
        "Browser inner window width: " + innerWidth + ", height: " + innerHeight + ".",
        open,
        close,
        moveTo,
        resizeTo,
        resizeBy    
    ])   
})();

// testing window.open()

function test1() {	
	var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
	oPrntWin.document.open();
  oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"\">" + document.title + "<\/body><\/html>");
  oPrntWin.document.close();
}

// likely to be more computationally expensive with variable lookup and eval, I have not noticed.. with is very usefull
function test2() {
	with(window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes")){
		document.write(
			'<!DOCTYPE html>' +
			'<html>' +
			'<head></head>' +
			'<body></body>' +
			'<html>'
		);
		document.close();
	}
	void 0
}