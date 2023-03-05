---
categories:
- java
date: "2015-08-07"
primaryBlog: maxrohde.com
tags:
- gwt
- jdk-nashorn
title: Run GWT Generated Code in Nashorn
---

[GWT](http://www.gwtproject.org/) is a very useful tool to compile Java code into JavaScript.

[Nashorn](<https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)>) is Oracle's new JavaScript implementation which runs JavaScript scripts in Java.

In order to run JavaScript server-side code within a Java server I now want to make an extensive GWT library available to this JavaScript code.

For this I need to load code generated in GWT into a Nashorn engine.

This is not very easy since the load process of GWT libraries includes various 'hacks' which involve the DOM.

I don't know yet how I am going to do this exactly. I found the [gwt-node](https://github.com/cretz/gwt-node) project. This project is meant to run GWT code on Node.js.

I think by working with the custom linker developed there ([GwtNodeLinker.java](https://github.com/cretz/gwt-node/blob/master/src/org/gwtnode/dev/linker/GwtNodeLinker.java)) I might be able work something out.