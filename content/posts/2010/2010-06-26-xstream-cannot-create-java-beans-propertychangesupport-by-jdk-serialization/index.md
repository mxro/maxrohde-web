---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-06-26"
title: 'XStream: Cannot create java.beans.PropertyChangeSupport by JDK serialization'
---

**Problem**

When attempting to serialize a bean, which uses property change support, XStream throws the following exepection.

message : Cannot create java.beans.PropertyChangeSupport by JDK serialization : null cause-exception : com.thoughtworks.xstream.converters.reflection.ObjectAccessException

**Solution**

The only solution I found was to ignore the field pointing to the PropertyChangeSupport class in the class, which is to be serialized by adding **„transient**“.

private transient PropertyChangeSupport propertySupport;
