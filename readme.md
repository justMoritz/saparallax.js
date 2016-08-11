# SA(scollimate) Expand

### ABOUT:

JQuery Plugin that makes an HTML element expandable from one line to it’s full height.

## _BASIC SETUP_:
By design, SA Expand will take any HTML elemeny, hide it’s full height by changing the height to just 1em (line height). If text is present in the element, text will be truncated using an ellipsis. Upon clicking, it will expand it back to it’s full height.

### 1.) Any HTLM element you wish to make expandable.

Add the follwing custom Data-Attribute to the element that you want to make expandable:

    data-saexpand
    
### 2.) In the body, right before the footer: Include jQuery. Include saexpand.js.

    <script src="path/to/your/scripts/jquery-2.1.4.min.js"></script>
    <script src="path/to/your/scripts/saexpand.js"></script>

---

### Notes:

* You can style the arrow via a class called `saexpand-arrow`. 

---

(c) 2016 by Moritz Zimmer



