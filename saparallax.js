/* moritzzimmer.com
 *
 * written by Moritz Zimmer, 2016 – 2017
 * http://www.moritzzimmer.com
 *
 * (c) 2017 CC Attribution 4.0
 * https://creativecommons.org/licenses/by/4.0/legalcode
 *
 */
var saparallax = (function( $ ){

  var _global = {
    wp:   0,
    prlx: false,
    speed: 1,
    saBgLay: [],
    saItHgt: [],
    saWinHi: '',
    mobileEnabled: false,
  };


  /* * Parallax Functionality * */
  var __parallaxHelperFunction = function( saBg, tOfSet, winHi, spd, elHeight, left, flag ){
    if(flag === 0){
      tOfSet = 0;
      winHi = 0;
      elHeight = 0;
    }
    $(saBg).css("transform", "translate3d("+left+", "+Math.floor((((_global.wp-tOfSet+winHi)/2)*spd)+elHeight)+"px, 0px)");       
    $(saBg).css("-ms-transform", "translate("+left+", "+Math.floor((((_global.wp-tOfSet+winHi)/2)*spd)+elHeight)+"px)"); 
  };

  var _parallaxAnimation = function($saBgLayers){
    // loops through each element that is in the scrollimateBgLayers array
    for (i = 0 ; i < $saBgLayers.length ; i++){

      var posFlag = 0;
      var topoffset = $($saBgLayers[i]).offset().top; 
      var elHeight  = $($saBgLayers[i]).css('height');
      elHeight = parseInt(elHeight, 10);
      // elHeight = elHeight*0.125;

      // parses the data-attribute to read the arguments. First one is speed, second is position
      var dataBgAttributes = $($saBgLayers[i]).attr('data-sabglayer').split(', ');

      // if only more than argument is given set posFlag to 1,
      //  which will cause the element to only start parallaxing once in view, and will be offset by the number specified
      if( dataBgAttributes.length > 1 ){
        posFlag = 1;
        elHeight = elHeight*dataBgAttributes[1];
      }
      // if the second argument is not given, the element will  start parallaxing from the very moment the page loads

      if( topoffset < _global.wp+_global.saWinHi){
        // offsets the scrolling in a paralax sort of way.
        // we are taking the initial height, adding it and then moving it accordingly in the opposite direction of the scroll.

        // if we have a number in the data-sabglayer, use as speed, if not, default to standard
        if ( $($saBgLayers[i]).attr("data-sabglayer") === "" )  {
          $speed = 1;
        }
        else{
          $speed = dataBgAttributes[0]; 
        }

        // keep the translateX attribute currently present
        if ($($saBgLayers[i]).css("transform") === "translateX(-50%)"){
            __parallaxHelperFunction( $saBgLayers[i], topoffset, _global.saWinHi, $speed, elHeight, '-50%', posFlag);
        }
        else{
            __parallaxHelperFunction( $saBgLayers[i], topoffset, _global.saWinHi, $speed, elHeight, '0px', posFlag);
        }
          // }
      }
    }
  };

  var _saParallax = function () {     
    // gets all elelemts with the data-sabglayer attribute
    _global.saBgLay = $("[data-sabglayer]");  

    // Only run functionality if there are no elements
    if( _global.saBgLay.length !== 0 ){

      // variable to hold the initial position from the top of each element.
      _global.saItHgt = [];  

      // gets the initial position from the top of each element
      // (needed for absolutely positioned elements)
      for (i = 0 ; i < _global.saBgLay.length ; i++){
          _global.saItHgt[i] = $(_global.saBgLay[i]).offset().top;
      }

      // makes sure evertyhing is drawn the first initial time.
      _parallaxAnimation(_global.saBgLay);

      // makes sure the boxes are drawn accodringly if the window is resized
      $(window).resize(function(){
          _parallaxAnimation(_global.saBgLay); 
      });
      
      console.log('parallax initiated');
      _global.prlx = true;
    }
  };


  /* * Init Function * */
  var init = function(input){

    // Document Ready 
    $(function(){

      _saParallax();

      // height of viewport (window Height)
      _global.saWinHi = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight; 
      // updates in case of window resize
      $(window).resize(function(){
        _global.saWinHi = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight; 
      });

      if (input === 'enableMobile'){
        _global.mobileEnabled = true;
      } 
      else{
        _global.mobileEnabled = false;
      }

      // when the window is scrolled
      $(window).scroll( function(){
        // updates the window position variable
        _global.wp = $(window).scrollTop();

        if(_global.mobileEnabled === true){
          // runs the parallax animation function, ONLY if the global prlx indicates the parallax function has been initiated
          if(_global.prlx === true){ _parallaxAnimation(_global.saBgLay); }   
        }
        else{
          // only execute the when we are on a mobile screen
          if ( $(window).width() > 767) {      
            // runs the parallax animation function, ONLY if the global prlx indicates the parallax function has been initiated
            if(_global.prlx === true){ _parallaxAnimation(_global.saBgLay); }   
          } 
        } 
        
      });

    });
  };


  /* 
   * Public Methods
   */
  return{
    init: init,
  };
})(jQuery);


