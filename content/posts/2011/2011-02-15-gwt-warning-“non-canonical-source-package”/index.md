---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-02-15"
title: GWT Warning “Non-canonical source package”
---

**The Problem**

Sometimes you might want to include classes from a package in your gwt module, which are not in a sub-package of the package in which you have defined the Gwt module (MyModule.gwt.xml).

For instance, you might have the following directory structure:

/client/ClientService.java

/browser/BrowserEntryPoint.java

/browser/MyModule.gwt.xml

The first natural option would be to define a source dependency in the Gwt module (gwt.xml) as follows:

<source path='../client' />

However, when compiling the module, a "Non-canonical source package" warning is issued. Furthermore, the class in the client package will not be recognized by the Gwt compiler.

![](images/021511_2001_gwtwarningn1.png)

**The Solution**

One clean (but not necessary straightforward) solution is to define a new Gwt module in the client package, and link this in your original module. The directory structure would change to:

/client/ClientService.java

**/client/ClientModule.gwt.xml**

/browser/BrowserEntryPoint.java

/browser/MyModule.gwt.xml

The following dependency would have to be added to MyModule.gwt.xml:

<inherits name='client.ClientModule'></inherits>

**Resources**

[GWT Google Group – Source-Source](http://groups.google.com/group/google-web-toolkit/browse_thread/thread/77ddbae493a34a14)