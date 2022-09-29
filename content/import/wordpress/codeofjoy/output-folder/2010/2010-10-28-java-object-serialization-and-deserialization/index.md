---
title: "Java Object Serialization and Deserialization"
date: "2010-10-28"
categories: 
  - "java"
---

In some circumstances, for instance if you want to transfere objects via GWT RPC, it makes sense to assert Objects can be serialized and deserialized without problems. Further there might be some differences between the original object and the deserialized object - for instance some hash tags might have changed and of course the object references.

The following code snippet can be a useful addition to JUnit test cases, which need to test the serialization of complex objects:

http://gist.github.com/650417
