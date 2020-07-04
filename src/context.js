

(function (context, root){
    
    context['api'] = function(){ 
        return {
            test : test
        } 
    }

    root.ctx = context.api();


    object.onmessage = function(event){
        var data = event.data;
        return init(data)
    }

    function init(event){
        //
        var str = '';
        exec(str)
    }
    
    function parse(str){
        return str.split(/\s+/);
    }

    function format(arr){
        // return str
    }

    function exec(str){
        arr = parse(str);
        arr = format(arr);

        // ctx[fn]

    }


})(new Object(), this);

