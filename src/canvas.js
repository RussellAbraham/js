(function(application){
    
    const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
    
    canvas.width = 300;
    canvas.height = 300;
    
	function drawLine(ctx, startX, startY, endX, endY, color){
		ctx.beginPath();
	    ctx.moveTo(startX,startY);
	    ctx.lineTo(endX,endY);
	    ctx.stroke();
	}
    
    function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
	    ctx.beginPath();
	    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	    ctx.stroke();
	}
    
    function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
	    ctx.fillStyle = color;
	    ctx.beginPath();
	    ctx.moveTo(centerX,centerY);
	    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	    ctx.closePath();
	    ctx.fill();
	}	

	application['api'] = function(){
		return {
			drawLine:drawLine,
			drawArc:drawArc,
			drawPieSlice:drawPieSlice,
			ctx : ctx
		}
	}

	if(typeof window !== 'undefined'){
		window.app = application.api();
	}

})(new Object());

var data = JSON.stringify({
	0 : [0,0,300,300],
	1 : [0,75,300,300],
	2 : [0,150,300,300],
	3 : [0,300,300,0],
	4 : [0,300,300,70],
	5 : [0,300,300,150]
});

function drawlines(object){
	Object.values(object).forEach(function(r){
		app.drawLine(app.ctx, r[0], r[1], r[2], r[3]);		
	});	
}

drawlines(JSON.parse(data));

/**/
app.drawArc(app.ctx, 150,150,150, 0, Math.PI/3);
app.drawPieSlice(app.ctx, 150,150,150, Math.PI/2, Math.PI/2 + Math.PI/4, '#ff0000');

