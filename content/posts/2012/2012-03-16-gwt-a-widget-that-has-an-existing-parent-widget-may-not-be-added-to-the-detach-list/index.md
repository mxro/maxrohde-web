---
blog: maxrohde.com
categories:
- java
date: "2012-03-16"
title: 'GWT: ‘A widget that has an existing parent widget may not be added to the
  detach list’'
---

## Problem

When wrapping an existing DOM element with a GWT widget (e.g. Button.wrap(…), HTML.wrap(…), etc), the GWT module will not load and report the exception like the following:

java.lang.AssertionError: A widget that has an existing parent widget may not be added to the detach list at com.google.gwt.user.client.ui.RootPanel.detachOnWindowClose(RootPanel.java:136) at com.google.gwt.user.client.ui.Label.wrap(Label.java:130)

## Analysis

In GWT it does not seem to be possible, to wrap an element in the document's DOM if any of its parents has been wrapped with a GWT widget before. For instance, see for the following HTML document …

<div style\="display: _none_" id\=_"outer\_element"_\>

<form class\=_"well"_\>

<label\><i class\=_"icon-exclamation-sign"_\></i\> An error occurred while requesting your API key.</label\>

<div id\=_"inner_element"_\>No error message.</div\>

</form\>

</div\>

… if we first wrap the element "_outer_element_" and then the element "_inner_element_" as in the following …

**final** HTML errorForm = HTML._wrap_(DOM._getElementById_("outer_element"));

**final** Label errorMessage = Label._wrap_(DOM._getElementById_("inner_element"));

.. an exception will be thrown, since "_outer_element_" is the parent in the DOM of "_inner_element_".

## Solution

The exception can easily be prevented by wrapping DOM elements as GWT widgets from the inside out. So, the elements nested the deepest in the DOM will be wrapped first. Therefore, the example above will work smoothly, if the order in which the elements are wrapped is reversed, so that the inner element "_inner_element_" is wrapped before the outer element "_outer_element_".

// inner element must be wrapped BEFORE outer element

**final** Label errorMessage = Label._wrap_(DOM._getElementById_("inner_element"));

**final** HTML errorForm = HTML._wrap_(DOM._getElementById_("outer_element"));

## References [gwt - How to add a custom widget to an element - Stack Overflow](http://stackoverflow.com/questions/6183181/how-to-add-a-custom-widget-to-an-element)

[How to wrap an existing div into an HTML widget ? - Google Web Toolkit | Google](http://groups.google.com/group/google-web-toolkit/browse_thread/thread/62ed8f0f9221eb2b 'How to wrap an existing div into an HTML widget ? - Google Web Toolkit | Google Groups')

[java - How to mix html with gwt widgets? - Stack Overflow](http://stackoverflow.com/questions/3685680/how-to-mix-html-with-gwt-widgets 'java - How to mix html with gwt widgets? - Stack Overflow')
