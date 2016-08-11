// parallax Animation, used in some elements
function parallaxAnimation($saBgLayers, $saInitialHeight, $windowPos, $speed){
    // loops through each element that is in the scrollimateBgLayers array
    for (i = 0 ; i < $saBgLayers.length;i++){
        // offsets the scrolling in a paralax sort of way.
        // we are taking the initial height, adding it and then moving it accordingly in the opposite direction of the scroll.

        // math used if element is positioned absolutely
        if( $($saBgLayers[i]).css("position") === "absolute" ){
            
            if ($($saBgLayers[i]).attr("data-sabglayer") === "centered"){
                $($saBgLayers[i]).css("transform", "translate3d(-50%, "+Math.floor((($windowPos/2)*$speed))+"px, 0px)");       
            }
            else{
                // if we don't have an undefined (aka no bglayer attribute, use input as speed)
                if ( $($saBgLayers[i]).attr("data-sabglayer") != "" )  {
                    var $speed = $($saBgLayers[i]).attr("data-sabglayer");
                }
                
                $($saBgLayers[i]).css("transform", "translate3d(0px, "+Math.floor((($windowPos/2)*$speed))+"px, 0px)");   
            }
        }
        // math used if elemented is not absolute
        else{
            if ($($saBgLayers[i]).attr("data-sabglayer") === "centered"){
                $($saBgLayers[i]).css("transform", "translate3d(-50%, "+Math.floor((($windowPos/2)*$speed))+"px, 0px)");       
            }
            else{
                // if we have a number in the data-sabglayer, use as speed, if not, default to standard
                if ( $($saBgLayers[i]).attr("data-sabglayer") === "" )  {
                    var $speed = 1;
                }
                else{
                    var $speed =  $($saBgLayers[i]).attr("data-sabglayer"); 
                }
                
                $($saBgLayers[i]).css("transform", "translate3d(0px, "+Math.floor((($windowPos/2)*$speed))+"px, 0px)");   
            }
        }
    }
}

// document ready function
$(function(){
    
    var $speed = 1;
    
    // height of viewport (window Height)
    var $initialHeight = "innerHeight" in window 
               ? window.innerHeight
               : document.documentElement.offsetHeight; 
    
    
    // PREP THE DOCUMENT:
    // gets all elelemts with the data-sabglayer attribute
    var $scrollimateBgLayers = $("[data-sabglayer]");   
    
        // variable to hold 
    var $saPopInArray = [];  
    // variable to hold the initial position from the top of each element.
    var $scrollimageInitialHeight = [];  
    //array to hold each scrollto element
    var $saScrollToList = [];
    
    
    // windowposition variable defines the amount of pixes scrolled from the top
    var $windowPos = 0;
    
    // gets the initial position from the top of each element
    // needed for absolutely positioned elements
    for (i = 0 ; i < $scrollimateBgLayers.length ; i++){
        $scrollimageInitialHeight[i] = $($scrollimateBgLayers[i]).offset();
    }

    // makes sure evertyhing is drawn the first initial time.
    parallaxAnimation($scrollimateBgLayers, $scrollimageInitialHeight, $windowPos, $speed);

    
    // makes sure the boxes are drawn accodringly if the window is resized
    $(window).resize(function(){
        // redraws the boxes
        parallaxAnimation($scrollimateBgLayers, $scrollimageInitialHeight, $windowPos, $speed); 
    });
    
    // when the window is scrolled
    $(window).scroll( function(){
        
        // updates the window position variable
        $windowPos = $(window).scrollTop();
        
        // runs the parallax animation function
        parallaxAnimation($scrollimateBgLayers, $scrollimageInitialHeight, $windowPos, $speed);
        
    });
    
});
        