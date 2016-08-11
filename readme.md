# SA(scollimate) Parallax

### ABOUT:

A little jQuery Plugin that adds a customizable Parallax Scrolling Effect to any element.

Parallax Scrolling simply means that as you scroll down the page, elements (usually in the background) scroll slower than the foreground, giving an impression of depth and space. This is the same effect that, when riding a train, makes trees zoom past at seemingly high speed, while the mountains in the background seem to move by much slower, and clouds appear almost stationary.

### BASIC SETUP:

#### 1.) Select the elements which you want to scroll at a slower speed:

Add the follwing custom Data-Attribute to the element that is supposed to scroll slower.

    data-sabglayer
    
#### 2.) In the body, right before the footer: Include jQuery. Include saparallax.js.

    <script src="path/to/your/scripts/jquery-2.1.4.min.js"></script>
    <script src="path/to/your/scripts/saparallax.js"></script>

#### 3.) That's it!

You're good to go, enjoy the parallax effect!

#### Notes:

SA Parallax will honour both relatively and absolutely positioned elements. Since it is usind the translate3D property, it is only supported by browsers that support this functionality, and may override existing styling done with the transform: translate3D property. 

#### BUT!

If you are using the `left: 50%; translate: transformX: -50%` to center items on the page, _you can still use saparallax_. Keep reading to find out how!


---


### ADVANCED SETUP:

#### 1.) Centered elements

As described above, if you are styling an element using  `left: 50%; translate: transformX: -50%` , simply set the data-sabglayer attribute to centered as such: 
    
    data-sabglayer="centered"
    
#### 2.) Speed of scrolling  

To create several layers of parallax, or simply to more fine-tune the effect, you can se the `data-sabglayer` attribute to any floating point value between `0` (which will cause the element to scroll normally) and `2` (which will cause the element to appear static on the page). You can also use any number larger than `2`, which will cause the element to scroll in the opposite direction of the scroll!

Leaving the attribute blank will default the default parallax speed, which is half the normal scroll speed, or the value `1`.

    
---

#### Notes:

At this point, you cannot use both the centered and speed at the same time. When using the centered attribute, the speed will default to the default speed, which is `1`.

---

(c) 2016 by Moritz Zimmer



