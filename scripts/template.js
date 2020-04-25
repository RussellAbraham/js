var templateSettings = {
	evaluate: /<%([\s\S]+?)%>/g,
	interpolate: /<%=([\s\S]+?)%>/g  
};
    
function template(str, data) {
	var c = templateSettings;
	var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
			'with(obj||{}){__p.push(\'' +
           str.replace(/\\/g, '\\\\')
           .replace(/'/g, "\\'")
           .replace(c.interpolate, function (match, code) {
               return "'," + code.replace(/\\'/g, "'") + ",'";
           })
           .replace(c.evaluate || null, function (match, code) {
               return "');" + code.replace(/\\'/g, "'")
                   .replace(/[\r\n\t]/g, ' ') + "__p.push('";
           })
           .replace(/\r/g, '\\r')
           .replace(/\n/g, '\\n')
           .replace(/\t/g, '\\t') +
           "');}return __p.join('');";
       var func = new Function('obj', tmpl);
       return data ? func(data) : func;
 
};	
