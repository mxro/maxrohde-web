---
title: "Embed HTML Code in JavaScript File"
date: "2014-01-31"
categories: 
  - "javascript"
---

**Problem**

You would like to include HTML code as a String in a JavaScript file.

**Solution**

Firstly, load the HTML code into a JavaScript variable (e.g. by using [jQuery.ajax()](http://api.jquery.com/jquery.ajax/)).

\[sourcecode language="javascript"\]$.ajax({url: 'http://mydomain.com/htmlfile.html'})

.done(function(html) {

\[/sourcecode\]

Then apply the following two simple regular expressions on the html code to generate valid JavaScript code.

\[sourcecode language="javascript"\]var safeHtml = html

.replace(/\\n/g, "\\\\n")

.replace(/\\"/g, "\\\\\\"")\[/sourcecode\]

You can use this String now to build a JavaScript file:

\[sourcecode language="javascript"\]var myScript = 'var html="'+safeHtml+'";';\[/sourcecode\]
