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

```javascript
$.ajax({url: 'http://mydomain.com/htmlfile.html'})

.done(function(html) {

```

Then apply the following two simple regular expressions on the html code to generate valid JavaScript code.

```javascript
var safeHtml = html

.replace(/\n/g, "\\n")

.replace(/\"/g, "\\\"")
```

You can use this String now to build a JavaScript file:

```javascript
var myScript = 'var html="'+safeHtml+'";';
```
