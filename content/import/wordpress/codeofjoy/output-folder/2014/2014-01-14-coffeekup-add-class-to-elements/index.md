---
title: 'CoffeeKup: Add Class to Elements'
date: '2014-01-14'
categories:
  - 'javascript'
---

[CoffeeKup](http://coffeekup.org/) is a very succinct and flexible templating engine to define HTML documents in a less verbose manner. It is based on [CoffeeScript](http://coffeescript.org/).

Unfortunately, the documentation of CoffeeKup I could find was not very clear on how to perform one of the most basic tasks in creating HTML documents:

**How do I assign a class to an element?**

And here is the answer:

```javascript
div class: 'myclass', ->

  div class: 'nested'
```

Which will result in the HTML document:

```html
<div class="myclass">
  <div class="nested"></div>
</div>
```

Or in more succinct form:

```javascript
div 'myclass', ->

  div 'nested', ->
```

Please note the '->' after the declaration of the class for the second div. Without it, CoffeeKup would render 'nested' as text and not as element.

**Resources**

[CoffeeKup Reference](https://github.com/mauricemach/coffeekup/blob/master/docs/reference.md)

[CoffeeKup Login Example](https://github.com/mauricemach/coffeekup/blob/master/examples/express/views/login.coffee)
