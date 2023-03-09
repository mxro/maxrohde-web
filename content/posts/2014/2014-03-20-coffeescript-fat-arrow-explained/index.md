---
authors:
- max
blog: maxrohde.com
categories:
- javascript
date: "2014-03-20"
title: CoffeeScript Fat Arrow (=&gt;) explained
---

Anyone who has worked with JavaScript for anything but a very short time will have come across the problem that the meaning of 'this' is often ambiguous at best. [CoffeeScript](http://coffeescript.org/) attempts to mitigate this problem somewhat by introducing the [Fat Arrow operator](http://coffeescript.org/#fat-arrow) (=>). This operator can be used as a replacement for the thin arrow operator (->) used extensively in CoffeeScript for defining functions.

Unfortunately, it is not easy to understand what the fat arrow operator does.I hope the following rules provide some guidance on how to use this operator in CoffeeScript:

> **Rule 1**: You Don't Need the Fat Arrow If You Don't Use: class, this, and @

If you are a beginner in JavaScript and/or CoffeeScript, I would recommend keeping your hands of the language constructs 'this', 'class' and '@'. You can implement any application you like without having to use these constructs and it will make your applications more robust and bug free.

> **Rule 2**: Use the Fat Arrow when You Use @ in a Callback Definition in a Method

If you use [classes](http://coffeescript.org/#classes) in your code and you want to create a new anonymous function to be passed as a callback (such as to listen to an onclick event or to defined setTimeout function), define this function with the fat arrow operator. This will assure that you still have access to the methods and properties of the class you are working with.

The fat arrow will 'override' the default meaning of the @ operator as follows, to assure that 'this' refers to what we would expect it:

_CoffeeScript_

```
delayedAction = =>
  alert(@messsage)

setTimeout(delayedAction, 100);
```

_JavaScript_

```
delayedAction = (function(_this) {
  return function() {
    return alert(_this.messsage);
  };
})(this);

setTimeout(delayedAction, 100);
```

> **Rule 3**: Don't Use Methods as Callbacks and Avoid the Fat Arrow Operator in All Other Circumstances

There is one more use case for the Fat Arrow operator, which is that it has a special meaning when used for the definition of class methods. This is useful when the methods of a class are to be passed as a callback. I personally don't think that's a very useful feature and it's better to define an anonymous function to handle a callback and then call a method of your class/object from within this callback. Following this rule enables us not having to worry about whether to define a method with a thin or fat arrow - which is otherwise tricky since the right choice here is external to the class we are writing.

### More Reading

[Karl Seguin - Ten Features I Like About CoffeeScript](http://openmymind.net/2012/5/16/Ten-Features-I-Like-About-CoffeeScript/)

[Michael Kramer - The Simplified Fat Arrow Guide for CoffeeScript](http://michaeljosephkramer.com/2013/03/12/the-simplified-fat-arrow-guide-for-coffeescript/)

[Azat Mardanov - Understanding Fat Arrows (=>) in CoffeeScript](http://webapplog.com/understanding-fat-arrows-in-coffeescript/)

[Giang Nguyen - Coffeescript: Fat arrow vs thin arrow](http://giangnguyen.net/2014/02/16/coffeescript-fat-arrow-vs-thin-arrow/)