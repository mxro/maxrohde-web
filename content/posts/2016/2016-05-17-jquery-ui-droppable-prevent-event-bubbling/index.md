---
authors:
- max
blog: maxrohde.com
categories:
- javascript
date: "2016-05-17"
title: 'JQuery UI Droppable: Prevent Event Bubbling'
---

[JQuery UI Droppable](https://jqueryui.com/droppable/) is a great framework for implementing drag and drop features in a web application.

Here I will show two ways how it can be prevented that multiple droppable elements on the same page can receive the same drop events.

**If the one droppable is the parent of the other:**

In this case, it is sufficient to add the property [greedy: true](http://api.jqueryui.com/droppable/#option-greedy). Easy.

**If there is no parent-child relationship between the elements:**

This is a bit tricky, since setting the greedy property will only prevent events bubbling up to the parent. If the two elements are independent (but somehow one floats on top of the other), we need to add some extra code to the drop handlers for both elements:

elem.droppable({
...
drop: function( event, ui ) {

var elementAtPoint = document.elementFromPoint(event.pageX-1, event.pageY-1);

if (!$.contains(elem\[0\], elementAtPoint)) {
// not really meant for this element
return;
}

// handle drop for this element

}
...
});

Replace elem with the two respective elements that are droppable.

This code will assure that the event will only be triggered on the element that is visible for the user.
