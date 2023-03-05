---
categories:
- java
date: "2010-10-11"
primaryBlog: maxrohde.com
title: POJO Persistence
---

There are surprisingly few frameworks, which allow to persist and query Java objects independent of relational database management systems. To me, at least for implementations not bound to using existing relational databases, storing information in interrelated tables seems an arbitrary step in object-oriented development. Below a few links ...

**Frameworks/Technologies**

[db4o](http://developer.db4o.com/)

When you use db4o you either need to purchase the commercial license or GPL your product)

[JDO](http://db.apache.org/jdo/why_jdo.html) ([Oracle Specification](http://www.oracle.com/technetwork/java/index-jsp-135919.html))

The Java Data Objects standard seems to be supported by the [DataNucleus Access Platform](http://www.datanucleus.org/products/accessplatform_2_1/index.html). This platform in turn depends on various data stores such as a relational database system or other storage systems.

[JOAFIP](http://joafip.sourceforge.net/howitworks/howitworks.html)

An interesting framework, which allows to persist graphs of Java objects to the file system. Allows for ‚lazy loading‘ of Collections if they are too large to be held in memory.

[JenaBean](http://code.google.com/p/jenabean/)

JenaBean persists Pojos using the Jena Semantic Web framework. Therewith, the serializations are in Semantic Web formats. The dependency to Jena is rather complex. JenaBean provides a Maven project file, which handles these dependencies.

[ObjectDB](http://www.objectdb.com/)

**Further Resources**

[Wikipedia entry on POJOs](http://en.wikipedia.org/wiki/Plain_Old_Java_Object)