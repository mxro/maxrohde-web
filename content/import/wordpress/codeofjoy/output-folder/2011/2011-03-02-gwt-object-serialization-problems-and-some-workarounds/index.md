---
title: 'GWT Object Serialization: Problems and (some) workarounds'
date: '2011-03-02'
categories:
  - 'java'
---

I made the very troublesome discovery that **different rules apply for Gwt to convert Java objects to JavaScript objects and using Java objects as parameters in Gwt's remote procedure calls** (RPC). Following a list of issues arising when using Gwt RPC (but not in Java->JavaScript conversion).

# Immutable Objects (final fields)

_Problem:_

I have already written about [issues concerning immutable objects](http://nexnet.wordpress.com/2011/02/16/serializing-immutable-objects-in-gwt/). **final fields are treated as being transient** and therewith ignored when serializing and deserializing objects.

_Workaround:_

**Remove the final modifier from any fields you require**. This is the only workaround I could find. Even the ([possibly deprecated](http://nexnet.wordpress.com/2011/02/21/gwt-derpc-to-be-deprecated/)) deRPC does not work with final fields.

# Generic Java Objects

_Problem:_

**Gwt RPC does not like fields of the type Object**. If an object with a field of the type Object is to be serialized for Gwt RPC, a SerializationException will be thrown.

_Workaround:_

The only possible workaround I could find is to **replace Object with any other class or interface**. Especially useful in this regard is the interface java.io.Serializable. This interface is implemented by many fundamental classes such as String and Integer. However, using java.io.Serializable can cause the Gwt compile to significantly increase the size of the JavaScript. Essentially, any class, which implements this interface, must be compiled into JavaScript as it might (or might not) be sent via RPC. A possible mitigation of this problem is to manually exclude classes from being prepared for serialization. This can be achieved by utilizing the rpc-blacklist property. Some examples for setting this property are given below:

```
<extend-configuration-property name="rpc.blacklist" value="-.*List"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="-.*Map"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="-.*Collection"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="+java.util.HashMap"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="-java.util.HashSet"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="-java.util.LinkedHashMap"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="+java.util.ArrayList"/>
```

```
<extend-configuration-property name="rpc.blacklist" value="-com.extjs.*"/> <!-- for GXT -->
```

# Resources

[Issue 1833: GWT doesn't allow Object/Serializable parameter in the serializable class](http://code.google.com/p/google-web-toolkit/issues/detail?id=1833)

[Issue 4438: GWT Compiler includes unneeded classes in RPC code](http://code.google.com/p/google-web-toolkit/issues/detail?id=4438) (+example <extend-configuration-property> definitions to reduce generated code size)
