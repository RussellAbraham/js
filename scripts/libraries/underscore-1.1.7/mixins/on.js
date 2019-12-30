/* DOM selector mixin */
(function(){
  _.mixin({
    $: function(selector){
      return document.querySelector(selector); 
    },
    $$: function(selector){
      return document.querySelectorAll(selector)
    },
    id: function(id){
      return document.getElementById(id)
    },
    classNames: function(className){
      return document.getElementsByClassName(className)
    },
    tagNames:function(tagNames){
      return document.getElementsByTagName(tagNames)
    }
  });
})();

/* addeventlistener mixin */
(function(){
  _.mixin({
    on:function(ele,type,listenr){
      return ele.addEventListener(type, listen);
    }
  });
})();

// get DOM elements
// <div id="container"></div>
// var conatiner = _.id("container");
// "<div id='container'></div>"
// "<button id='btn'>Click Me</button>"
// _.on(_.id("btn"), 'click', function(){ alert("You clicked " + this) });

