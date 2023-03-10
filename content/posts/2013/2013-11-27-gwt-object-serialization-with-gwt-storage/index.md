---
title: 'GWT Object Serialization with gwt-storage'
date: '2013-11-27'
categories:
  - 'java'
tags:
  - 'gwt'
---

## Problem

The [built in Java Serialization](http://docs.oracle.com/javase/7/docs/api/java/io/ObjectOutputStream.html) and [various](https://code.google.com/p/kryo/) [serialization](http://xstream.codehaus.org/) [frameworks](http://jackson.codehaus.org/) available for Java allow to serialize Java objects conveniently into binary or textual representations. Unfortunately, most of these frameworks are not available for Google Web Toolkit client applications.

There is [no easily available built in solution for serializing GWT objects](http://blog.softteco.com/2010/02/serializing-objects-in-gwt-and.html) into text on the GWT client side. This is surprising since GWT evidently has a mechanism to serialize and deserialize objects to support [GWT RPC](http://www.gwtproject.org/doc/latest/tutorial/RPC.html).

## Solution

Seanchenxi has kindly [created](https://groups.google.com/forum/) a convenient wrapper around the GWT RPC serialization mechanism, which makes it very easy to serialize and deserialize objects on a GWT client application into String representations. The project, gwt-storage, is available on github:

[https://github.com/seanchenxi/gwt-storage](https://github.com/seanchenxi/gwt-storage)

You can download the source code and import it to your Java project. I've also uploaded the project to a public Maven repository. You can add it to your Maven project as follows:

```xml


<dependencies>

<dependency>

<groupId>com.seanchenxi.gwt</groupId>

<artifactId>gwt-storage</artifactId>

<version>1.2</version>

</dependency>

</dependencies>

…

<repositories>

<repository>

<id>Appjangle</id>

<url>http://maven.appjangle.com/appjangle/releases/</url>

</repository>

</repositories>

```

With gwt-storage available for your project, you can do the following in GWT client side code:

```java


StorageSerializer serializerImpl = new com.seanchenxi.gwt.storage.client.serializer.StorageRPCSerializerImpl();

try {

MyClass obj = new MyClass("1234");

String serialized = serializerImpl.serialize(Serializable.class, obj);

GWT.log("Serialized Object: "+serialized);

MyClass deserialized = (MyClass) serializerImpl.deserialize(

Serializable.class, serialized);

} catch (SerializationException e) {

throw new RuntimeException(e);

}

```

Note:

- If you download the gwt-storage source code, you might have to change the visibility of the class StorageRPCSerializerImpl() to public (from package).
- MyClass needs to be serializable by GWT RPC; that is, implement Serializable and have non-transient references that are Serializable as well.
- If you change the implementation of the class MyClass, deserialization of Strings created with older versions of the class will probably not be possible.

## References

[Serializing objects in GWT and deserializing them in servlet](http://blog.softteco.com/2010/02/serializing-objects-in-gwt-and.html)

[GWT Google Groups 'GWT client side Java object serialization'](https://groups.google.com/forum/)
