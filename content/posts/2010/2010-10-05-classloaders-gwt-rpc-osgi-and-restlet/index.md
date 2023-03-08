---
categories:
- java
date: "2010-10-05"
blog: maxrohde.com
title: 'Classloaders: GWT RPC, OSGi and Restlet'
---

**Problem**

Restlet works well with GWT RPC calls. However, for GWT‘s RPC deserialization mechanism, the classes of transmitted objects must reside in the servlet‘s thread classloader. In an OSGi environment, the classes, which need to be deserialized often reside within a different bundle than the servlet. This leads to GWT deserialization exceptions.

**Solution**

In the following case the class Name needs to be deserialized but resides within another bundle. Adding the following code to the ServerResource fixed the problem:

@Override         public Representation handle() {                                                    CompositeClassLoader customCL = new CompositeClassLoader();                  customCL.addClassLoader(Thread.currentThread().getContextClassLoader());                  customCL.addClassLoader(Name.class.getClassLoader());                                   ClassLoader oldCL = Thread.currentThread().getContextClassLoader();                  Thread.currentThread().setContextClassLoader(customCL);                                  Representation rep = super.handle();                                  Thread.currentThread().setContextClassLoader(oldCL);                                  return rep;         }

**Resources**

[GWT Issue 1888: Allow to pass classloader to GWT deserialization](http://code.google.com/p/google-web-toolkit/issues/detail?id=1888)