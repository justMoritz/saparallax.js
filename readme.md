# SA(scollimate) Parallax
![SA PARALLAX SAMPLE](http://files.moritzzimmer.com/saparallax.gif)




### VERSION CONFUSION AHEAD! (But don't worry, it's easy, just keep using Version 1.xx)

This release is deemed **1**.2.0, but is technically and technologically newer than the version 2 in the Version History. This version is, however, completely backwards compatible to version 1.0, and therefore preferable for applications that are already using SA Parallax. 

(This version, like Version 2, was pulled from as a standalone version from [scrollimate](https://github.com/justMoritz/scrollimate) )

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
![SA PARALLAX SAMPLE](http://files.moritzzimmer.com/saparallax3.gif)

See how in this example, the top hero-image parallaxes right away, but each following elements (images) only when it comes into view, and consistently for each element? SA Parallax can do that!

*You can tell the `data-sabglayer` attribute how your parallax animation should behave.
By Default, it will simply start at the top and will scroll at half the speed that the page once you start scrolling.
The `data-sabglayer` will take two arguments:*

- Supply a single number like so: `data-sabglayer="0.5"`

If you supply it a single number, this is the speed at which you want the element to scroll relative to the page speed. To create several layers of parallax, or simply to more fine-tune the effect, you can se the `data-sabglayer` attribute to any floating point value between 0 (which will cause the element to scroll normally) and 2 (which will cause the element to appear static on the page). You can also use any number larger than 2, which will cause the element to scroll in the opposite direction of the scroll! And yes, you can also use negative numbers and make the element scroll faster than the page!
  
- Supply two arguments separated by comma like so: `data-sabglayer="-0.5, 0.36"`

With this, you can define the position of parallaxing element. This is useful if you want the element to be positioned “perfectly” when it is scrolled in the center of the page, for example. `0,5` is usually a good start, buy you may need to play around with the number.

*More importantly*, giving this attribute is useful if the element you wish to parallax is not at the top. The element will only _start_ parallaxing _once in view_, and will be offset by the number specified. (If the second argument is not given, the element will start parallaxing from the very moment the page scrolls). If you want to make use of this awesome feature, but do not want to offset, simply set the second number to 0, like so:  `data-sabglayer="1.5, 0"`


## Mobile Control

By default, parallax will not be enabled on screen sizes smaller than 768px.

*You can re-enable* mobile parallax by calling the `enableMobile` Method at any point in your HTML file **after** you included `saparallax.js`: 

	<script> saparallax.enableMobile(); </script>

## OLD VERSION

Fell free to check out the `original` branch if you remember and liked the old version. This version is completely backwards compatible to the original version, however! :)
