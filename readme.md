# SA(scollimate) Parallax
![SA PARALLAX SAMPLE](http://files.moritzzimmer.com/saparallax.gif)


(This version was pulled from as a standalone version from [scrollimate](https://github.com/justMoritz/scrollimate) )

## ABOUT:

Parallax Scrolling simply means that as you scroll down the page, elements (usually in the background) scroll slower than the foreground, giving an impression of depth and space. This is the same effect that, when riding a train, makes trees zoom past at seemingly high speed, while the mountains in the background seem to move by much slower, and clouds appear almost stationary.


## BASIC SETUP:

### 1.) Select the elements which you want to scroll at a slower speed:

Add the following custom Data-Attribute to the element that is supposed to scroll slower.

    data-sabglayer

Alternatively, you can also keep using the old data-attribute

    data-bglayer

Just make sure you use one or the other, but not both :)
    
### 2.) In the body, right before the footer: Include jQuery. Include saparallax.js.

	<script src="path/to/your/scripts/jquery-2.1.4.min.js"></script>
	<script src="path/to/your/scripts/saparallax.js"></script>

### That's it!

Have fun parallaxing around!


## ADVANCED SETUP:
*You can tell the `data-sabglayer` attribute how your parallax animation should behave.
By Default, it will simply start at the top and will scroll at half the speed that the page once you start scrolling.
The `data-sabglayer` will take two arguments:*

### Adjust scroll speed

- Supply a single number like so: `data-sabglayer="0.5"`

Supply it a single number, this is the speed at which you want the element to scroll relative to the page speed. To create several layers of parallax, or simply to more fine-tune the effect, you can se the `data-sabglayer` attribute to any floating point value between 0 (which will cause the element to scroll normally) and 2 (which will cause the element to appear static on the page). 

You can also use any number larger than 2, which will cause the element to scroll in the opposite direction of the scroll. And yes, you can also use negative numbers and make the element scroll faster than the page!

### Centering / Offset Control 

![SA PARALLAX SAMPLE](http://files.moritzzimmer.com/saparallax3.gif)

*See how in this example, the top hero-image parallaxes right away, but each following elements (images) only when it comes into view, and consistently for each element? SA Parallax can do that!*


You can supply more than one argument to SA Parallax. This is useful if the element you wish to parallax is not at the top. Supplying two elements will cause the eement to only _start_ parallaxing _once in view_. 

**NEW in 1.3:**

#### Keep Elements Centered

 - Supply two arguments (separated by comma), with the second argument set to *center* like so: `data-sabglayer="-0.5, center"`

This will calculate the parallax so that the element will be in it's “ideal” position when centered vertically on the screen. Plus, (ideally) you would never see it parallax out of view in either direction. (Mileage may vary...)

#### Custom Offset Elements
  
- Supply a second argument separated by comma like so: `data-sabglayer="-0.5, 0.25"`

With this, you can define the position of parallaxing element. This is useful if you want the fine-control the element’s be position. This number is the fraction it is offset by it’s own hight. For example, `0.5` on a 500px tall element will cause it to be offset by 250px, `1` by 500px, etc.

If you don't want the element to be offset, but not start parallaxing until in view, simply set the second number to 0, like so:  `data-sabglayer="1.5, 0"`


#### <a name="saParallaxMobile"></a>MOBILE CONTROL ####

By default, parallax will not be enabled on screen sizes smaller than 768px. (Sidenote: This applies to initial screen-size: Whatever your page loaded with, determined whether or not parallax is enabled. This is by design so that check is not performed over and over).

*You can re-enable* mobile parallax by calling the `enableMobile` before the saParallax method like so: 
    `<script> scrollimate.init(['enableMobile', 'saParallax']); </script>`
(If you are running the init function with other methods the order doens't matter, as long as saParallax gets called last).