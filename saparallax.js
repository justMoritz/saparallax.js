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


  /* * Parallax Functionality * * /
   * 
   *
   * The Parallax Animation Chain works as follows: 
   * 1.) Init -> 
   * 2.) -> saParallax (setup); 
   *
   * 3.) Scroll Listener (inside Init) -> 
   * 4.) -> _saParallaxAnimation ->
   * 5.) -> __saParallaxHelperFunction
   *
   * 
   * 5: __saParallaxHelperFunction: 
   *    Takes the inputOpject object generated inside _saParallaxAnimation 
   *    to do the actual calculations as they are applied to the individual 
   *    Elements. 
   *    This function also checks whether or not the code is run in a mobile
   *    viewport size, and if so, whether or not it has been indicated that
   *    the code will run in mobile (which by default it does not) 
   *
   *    In case of non-parallax mobile, the final else statement resets all 
   *    transformations that may have already happened. This is useful in case
   *    The window is resized from a non-mobile size to a mobile size after 
   *    transformations have already occurred.
   */
  var __saParallaxHelperFunction = function(inputObject){

    var ___executeHelperFunction = function(){
      if(inputObject.flag === 0){
        inputObject.tOfSet = 0;
        inputObject.winHi = 0;
        inputObject.elHeight = 0;
      }
      $(inputObject.saBg).css("transform", "translate3d("+inputObject.left+", "+Math.floor((((_global.wp-inputObject.tOfSet+inputObject.winHi)/2)*inputObject.spd)+inputObject.elHeight)+"px, 0px)");       
      $(inputObject.saBg).css("-ms-transform", "translate("+inputObject.left+", "+Math.floor((((_global.wp-inputObject.tOfSet+inputObject.winHi)/2)*inputObject.spd)+inputObject.elHeight)+"px)"); 
    };
     
    if(_global.mobileEnabled === true){
      ___executeHelperFunction();
    }
    else{
      if ( $(window).width() > 767) {
        ___executeHelperFunction();
      }
      /* Resets all transformations that may have already happened before the window was resized below 768px */
      else{
        _global.saBgLay.css('transform', 'translate3d(0, 0, 0)');
      }
    }      
  };

  /**
   *
   * 4: _saParallaxAnimation: 
   *    Loops through each of the saBgLayers elements. (from saParallax function),
   *    parses and splits the data-attribute arguments. First is speed, second is position.
   *
   *    If only more than argument is given set posFlag to 1, which will cause the
   *    element to only start parallaxing once in view, and be offset by the number specified.
   *    elHeight gets passed into the __saParallaxHelperFunction.
   *    If second argument is not given, element starts parallaxing from the moment page loads.
   *
   *    A parallaxHelperConfig object gets passed to __saParallaxHelperFunction,
   *    which does the actual calculation. If an element been positioned in CSS with 
   *    translateX(50%) to achieve centering, the 'left' entry in the object is changed accordingly.
   *    Because of the horizontal nature of parallax scrolling, saParallax does not currently
   *    support the prevervation of translateY(-50%), though this feature is planned for the future
   */
  var _saParallaxAnimation = function($saBgLayers){
    for (i = 0 ; i < $saBgLayers.length ; i++){
      var posFlag   = 0,
          $curEl    = $($saBgLayers[i]),
          topoffset = $curEl.offset().top,
          elHeight  = $curEl.css('height');

      elHeight = parseInt(elHeight, 10);

      var dataBgAttributes = $curEl.attr('data-sabglayer').split(', ');

      if( dataBgAttributes.length > 1 ){
        posFlag = 1;
        // if set to center, math will attempt to keep the item always in view.
        if (dataBgAttributes[1] === 'center'){
          elHeight = -(elHeight/2)*dataBgAttributes[0];
        }
        // otherwise, use tranditional logic.
        else{
          elHeight = elHeight*dataBgAttributes[1];
        }
      }

      // if( topoffset < _global.wp+_global.saWinHi){
        if ( $curEl.attr("data-sabglayer") === "" )  {
          $speed = 1;
        }
        else{
          $speed = dataBgAttributes[0]; 
        }

        parallaxHelperConfig = {
          saBg: $saBgLayers[i],
          tOfSet:  topoffset,
          winHi: _global.saWinHi,
          spd: $speed,
          elHeight: elHeight,
          left: '0px' ,
          flag: posFlag
        };

        if ($curEl.css("transform") === "translateX(-50%)"){
          parallaxHelperConfig.left = '-50%';
        }

        __saParallaxHelperFunction( parallaxHelperConfig );
      // }
    }
  };

  /**
   *
   * 2: saParallax: 
   *    Intial Setup, parsing and first draw:
   *
   *    Selects all the elelemts with the data-sabglayer attribute. These are stored inside 
   *    a variable within the _global object, because it needs to stay accessible in the 
   *    entire application, as it is continually used in the $(window).scroll and resize
   *    functions initialized within the init method.
   *  
   *    Method only runs functionality if there are elements present (not no elements).
   *    Then runs the initial parallax animation.
   *
   *    Also finally sets the _global.prlx to true to make sure the scroll and resize functions
   *    in the init method only calculate and call this function if everything is set.
   */
  var _saParallax = function () {     

    _global.saBgLay = $("[data-sabglayer]");  
    _global.saBgLay.css('will-change', 'transform');

    if( _global.saBgLay.length !== 0 ){
      _saParallaxAnimation(_global.saBgLay);
      
      console.log('parallax initiated');
      _global.prlx = true;
    }
  };


  /** 
  * If this Method is called, Parallax will work even in mobile.
  */
  var enableMobile = function(){
    _global.mobileEnabled = true;
  };


  /** 
  * Init Function 
  * 
  * On Document Ready, calculates the height of viewport (window Height)
  *
  * On Window Resize, re-calculate the window height, and re-run parallax, if is enabled
  * On window scroll, update the window position variable (_global.wp), and re-run parallax, if enabled
  *
  */
  var init = function(input){

    /** 
     * Backwards compatibility fix:
     *
     * if and ONLY IF there are no sabglayer attributes present, fall back to the old sabglayer.
     * In order to maintain some sort of discipline, please use one or the other. This feature
     * is NOT present in the scrollimate release. Please use ONLY data-sabglayer in scrolliamte
     */
    var tempElementStore = $("[data-sabglayer]");  
    if(tempElementStore.length === 0){
      tempElementStore = $("[data-bglayer]");  
      for(i=0; i<tempElementStore.length; i++){
        var currentElement = $(tempElementStore[i]);
        var tempstore = currentElement.attr('data-bglayer');
        currentElement.attr('data-sabglayer', tempstore);
      }
    }

    _saParallax();

    $(function(){
      _global.saWinHi = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight; 


      $(window).resize(function(){
        _global.saWinHi = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight; 

        if( _global.prlx ){
          _saParallaxAnimation(_global.saBgLay); 
        }
      }); // end window resize

      $(window).scroll( function(){
        _global.wp = $(window).scrollTop();

        if( _global.prlx ){
          _saParallaxAnimation(_global.saBgLay); 
        }
      }); // end window scroll

    }); // end document ready

  };


  /**
   * Public Methods
   */
  return{
    enableMobile: enableMobile,
    init: init,
  };
})(jQuery);

/**
 * Initializes automaticall on document ready
 */
$(function(){
  saparallax.init();
});