---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2015-08-06"
tags:
- javascript
- jdk-nashorn
- jdk-rhino
- programming
title: Sandboxing JavaScript in Java App – Link Collection
---

The JVM is by design an insecure environment and it is generally difficult to run untrusted code in a sandboxed environment.

However, it seems that is relatively easy to sandbox JavaScript code running in Oracle Nashorn. The instructions are [here](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html#classfilter_introduction). Strangely, this was not easy to find through a Google search.

Below I have listed some further sources on Sandboxing JavaScript and Java code. Although there is plenty of material on Rhino, I would not recommend using this engine. I think Nashorn has been designed with support for Sandboxed code in mind from the very beginning while in Rhino the functionality feels kind of bolted on.

**UPDATE** I have implemented two little libraries which takes care of the grunt work of sandboxing Nashorn and Rhino code in Java:

[Nashorn Sandbox](https://github.com/javadelight/delight-nashorn-sandbox) (on GitHub)

[Rhino Sandbox](https://github.com/javadelight/delight-rhino-sandbox) (on Github)

### Sandboxing JavaScript

#### Nashorn

[Restricting Script Access to Specified Java Classes](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html#classfilter_introduction): From the Oracle Nashorn docs. Shows how to restrict access to specific Java classes.

#### Rhino

[Class ContextFactory](http://www-archive.mozilla.org/rhino/apidocs/org/mozilla/javascript/ContextFactory.html): Useful for monitoring and setting restrictions on Rhino code.

[Method initSafeStandardObjects](http://mozilla.github.io/rhino/javadoc/org/mozilla/javascript/Context.html): Useful for creating sandboxed Rhino code.

[Rhino Sandbox](https://github.com/cloudbees/rhino-sandbox): A small library for sandboxing JavaScript code running in Rhino.

[Sandboxing Rhino in Java](http://codeutopia.net/blog/2009/01/02/sandboxing-rhino-in-java/): Blog post

[Securing Rhino in Java6](https://metlos.wordpress.com/2012/02/06/securing-rhino-in-java6/): Blog post

#### DynJS

[Sandboxing JavaScript Execution in Java](http://source.coveo.com/2015/04/26/sandboxing-javascript-execution-in-java/): Blog post

### Sandboxing Java

[Example Code Monitoring Threads](http://stackoverflow.com/a/1681076/270662): Example code how thread CPU usage can be monitored.

[The Java Sandbox](http://blog.datenwerke.net/p/the-java-sandbox.html): A library for sandboxing any Java code. Might be useful to sandbox the Java code with runs the script.
