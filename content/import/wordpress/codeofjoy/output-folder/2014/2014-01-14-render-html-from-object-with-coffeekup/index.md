---
title: "Render HTML from Object with CoffeeKup"
date: "2014-01-14"
categories: 
  - "javascript"
---

[CoffeeKup](http://coffeekup.org/) allows to render HTML from multiple sources:

- A String containing valid [CoffeeScript](http://coffeescript.org/) code
- A JavaScript/CoffeeScript object arranged according to CoffeeKup rules

To render HTML from a String is quite straightforward and documented on the [CoffeeeScript reference](https://github.com/mauricemach/coffeekup/blob/master/docs/reference.md): you can use the methods .compile and .render as documented there.

However, to render HTML from a JavaScript/CoffeeScript object can also come in handy, to create a tight link between your logic and markup. The .render method is not only able to process a String but is also able to process [a certain kind of Object as well](https://github.com/mark-hahn/coffeekup-intro).

Here find two examples of how to render JavaScript and CoffeeScript objects into HTML:

**JavaScript Object**

\[sourcecode language="javascript"\]CoffeeKup.render(function() {

return div({ class: 'mydiv' }, 'Hello World');

});\[/sourcecode\]

which results in:

\[code\]"<div class='mydiv'>Hello World</div>"\[/code\]

**CoffeeScript Object**

\[sourcecode language="javascript"\]CoffeeKup.render(div 'mydiv', ->'Hello World'<span style="line-height: 1.5em;">);\[/sourcecode\]

resulting in the same HTML as above.
