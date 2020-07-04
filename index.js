

(function(){
    
    'use strict';

    const Index = function(name){
        this.storage = new app.store(name);
        this.model = new app.model(this.storage());
        this.view = new app.view(this.template());
    }

    const index = new Index('local-index');

})();