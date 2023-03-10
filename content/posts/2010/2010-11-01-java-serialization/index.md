---
blog: maxrohde.com
categories:
- java
date: "2010-11-01"
title: Java Serialization
---

There are a number of different ways in which objects or object graphs can be serialized and deserialzed in Java. One major distinguishing feature is the intrusiveness of the employed framework. Some, like XStream, can work with any Java object without modification. Others, like JDO, beans serialization frameworks or the standard Java serialization mechanism require you to annotate or write the Java objects in a certain way.

Here just a few quick results of a quick web survey:

- The standard Java serialization mechanism is rather slow.
- It is better to use a framework like [Kryo](http://code.google.com/p/kryo/), which provides much better performance EDIT: There seem to be some issues with Kryo: mainly, (1) objects appearing multiple times in the object graph are serialized once for every occurence and (2) Kryo requires a no-args constructor to be present in the class (see this [blog post](http://www.codesmell.org/blog/2009/09/amf-serialization-followup-faster-serialization/)).
- XStream seems to be a popular and reliable framework to serialize Java objects to XML. However, it can be expected to create larger objects and take more time than tools, which can choose their own serialization format such as Kryo.
- JDO seems to be doing a lot of things automatically. For instance, the updates on fields of persisted objects are tracked in the background. This leaves me with the feeling that complex things might be made a bit too easy by this framework. Also, the tutorial on the DataNucleus website shows that additional configuration files have to be maintained in order to persist the objects. However, JDO is a well-defined standard and interacts with a great choice of data stores.

**Resources**

[A nice comparison of the serialization performance of different frameworks](http://code.google.com/p/thrift-protobuf-compare/wiki/Benchmarking) (just scroll down a bit) or a [newer version of the same benchmark](http://github.com/eishay/jvm-serializers/wiki)
