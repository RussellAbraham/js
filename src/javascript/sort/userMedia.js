
var takePhoto = function(){
    this.snapshot = false;

}

takePhoto.prototype = {

    startCamera: function(){
        var _this = this;
        navigator.webkitGetUserMedia({video: true, audio: true, toString : function() {return "video,audio";} }, 
        function(stream){
             var source = window.webkitURL.createObjectURL(stream);
             _this.video.autoplay = true;
             _this.video.src = source;
            _this.streamFeed();
             
         }, 
         function(error){
             console.log(error);
         });      
    },
    takePhoto: function(){
        this.snapshot = true;
    },
    cancel: function(){
        this.snapshot = false;           
        window.webkitRequestAnimationFrame(this.streamFeed.bind(this));             
    },
    
    render: function(){            

        this.video = document.getElementById('video');
        var cameraLayer = document.getElementById('camera');
        var overlay = document.getElementById('overlay')

        window.cameraLayer = cameraLayer;
        window.overlay = overlay;            

        this.startCamera();
        return this;
    }

}

define([
	
	"text!./template.html",
	"link!./style-hdpi.css",
	
	], function(template){
		
  	takePhotoView = Backbone.View.extend({
 		
 		tagName:  "section",
 		
 		//set up click events
 		events: {
 		  'click #snap' : 'takePhoto',
 		  'click #cancel' : 'cancel'
 		},
 		
 		snapshot: false,
 		
 		className: "take-photo-view",
 		
		layoutTemplate: _.template($(template).html()),
		//this ensures we cache our views, so that they don't re-render when the pages are revisited
 		destructionPolicy: "never",
        
        startCamera: function(){
          var _this = this;
          navigator.webkitGetUserMedia({video: true, audio: true, toString : function() {return "video,audio";} }, 
           function(stream){
               var source = window.webkitURL.createObjectURL(stream);
               _this.video.autoplay = true;
               _this.video.src = source;
              _this.streamFeed();
           }, 
           function(error){
               console.log(error);
           });
        },
        
		streamFeed: function(){
		    //check if a snapshot is being taken
		    if(!this.snapshot)
                window.webkitRequestAnimationFrame(this.streamFeed.bind(this));
            
            //feed the video frame by frame to the canvas
            var cameraLayerContext = window.cameraLayer.getContext('2d');     
            
            //getting ready for keyboard-series device      
            if(window.innerHeight > 720)
                cameraLayerContext.drawImage(this.video, 0, -200, 768, 1024);
            else
                cameraLayerContext.drawImage(this.video, -100, -85, 720, 720);
               
        },
        
		takePhoto: function(){
            this.snapshot = true;
            this.snap.style.display = "none";           
	        this.cancel.style.display = "block";  
		},
		
		cancel: function(){
		    this.snapshot = false;
		    
            //refresh canvas to show next frame
   		    window.webkitRequestAnimationFrame(this.streamFeed.bind(this));
		    
		    this.snap.style.display = "block";           
            this.cancel.style.display = "none";     
		},
		
        render: function(){            
            //append rendered template.html to this view
            this.$el.append(this.layoutTemplate);
            
            //cache elements for later use
            this.video = this.el.querySelector("#video");

            //storing the output into a global variable
            var cameraLayer = this.el.querySelector("#camera");
            var overlay = this.el.querySelector("#moustaches");
            
           
            //set up dimensions
            if(window.innerHeight > 720){
                cameraLayer.width = 768,
                cameraLayer.height = 702,
                overlay.width = 768,
                overlay.height = 702;
            }
            else{                
               cameraLayer.width = 550,
               cameraLayer.height = 550,
               overlay.width = 550,
               overlay.height = 550; 
            }
            
            //define canveses as global variables, this way we can access them from any other module
            window.cameraLayer = cameraLayer;
            window.overlay = overlay;            
            //cache elements for fast re-use
            this.snap = this.el.querySelector("#snap"); 
            this.cancel = this.el.querySelector("#cancel");
            //start Camera
            this.startCamera();
            return this;
        }
        
	});
});