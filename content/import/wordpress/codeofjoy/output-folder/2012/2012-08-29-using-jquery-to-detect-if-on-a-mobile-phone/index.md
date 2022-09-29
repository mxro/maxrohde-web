---
title: "Using JQuery to Detect If on a Mobile Phone"
date: "2012-08-29"
categories: 
  - "javascript"
tags: 
  - "jquery"
  - "mobile"
---

JQuery and/or JavaScript have no native mechanism to determine whether a page is loaded on a mobile phone or not. However, CSS media queries offer this capability. I found the following [nice trick on stackoverflow](http://stackoverflow.com/a/10364620/270662) to utilize media queries to help JS/JQuery applications to determine whether they run in a mobile.

First, insert an arbitrary div somewhere in the body of your HTML document such as:

<div id="mobileDetector"></div>

Then, add the following CSS:

\[sourcecode language="css"\]@media only screen and (max-width: 480px) { #mobileDetector { display: none; } }\[/sourcecode\]

(Note: You can also use the width 767px or so to also capture tablets).

Finally, the following JQuery function can be used to determine if on a mobile or not:

\[sourcecode language="javascript"\](function($) { $.isMobile = function() { return $('#mobileDetector').css('display') === 'none'; } }) (jQuery);\[/sourcecode\]
