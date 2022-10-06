---
title: 'A Practical Guide on Node Types in onedb'
date: '2012-05-15'
categories:
  - 'java'
---

onedb is at its heart a cloud-based platform [to connect pieces of information from various applications](http://maxrohde.com/2012/05/06/introducing-onedb/ 'onedb overview'). These 'pieces of information' are represented and accessed in various ways in the onedb API.

The article "[onedb Architecture and Design](http://maxrohde.com/2012/05/06/onedb-architecture-and-design/ 'onedb architecture and design')" provides a conceptual definition of most ways in which these 'pieces of information' are represented and the article "[onedb Tutorial: Getting Started and First Steps](http://maxrohde.com/2012/05/06/onedb-tutorial/ 'onedb tutorial')" uses the various representations extensively.

In addition to the two articles mentioned above, this article provides a practical guide to understand and use the various data representations in onedb. In particular, the following four representations are discussed:

1. [Nodes](#nodes 'Nodes')
2. [Addresses and Identities](#addresses_and_identities 'Addresses and Identities')
3. [References](#references 'References')
4. [Value Nodes](#value_nodes 'Value Nodes')

## 1\. Nodes

Nodes are [the central component of onedb's data model](http://maxrohde.com/2012/05/06/onedb-architecture-and-design/#datamodel 'onedb data model'). Basically, every piece of information be it a basic data type such as `String`, `Integer`, etc. a custom object (`new MyPerson()`) or onedb object (`One.newNode(..)`) is managed as a node by the onedb engine.

However, only those objects are nodes, which have been appended and or loaded using the onedb API. For instance, in the following example `text1` is _not_ a node while `text2` is:

```java

String text1="I am just another string";
String text2="I will be a node";

One.append(text2).to(root).in(client);
```

Every node managed by a onedb client has got an address and an identity as described in the following section.

## 2\. Addresses and Identities

Nodes in onedb are identified by a global unique identifier. These global unique identifiers are encoded as [resolvable](http://kidehen.typepad.com/kingsley_idehens_typepad/2010/10/what-is-linked-data-really-1.html) Uniform Resource Identifiers ([URIs](http://kurinchilamp.kurinchilion.com/2009/06/uri-url-urn-relation.html)).

Hence, every piece of information in onedb has a _unique identity_, which can be expressed in form of a _resolvable address_.

Examples for such resolvable addresses usually look as follows:

```text

https://u1.linnk.it/4hxdr8/query/bob
https://u1.linnk.it/zednuw/types/customer
https://u1.linnk.it/4hxdr8/query/This_is_a_1
```

## 3\. References

Most operations in the One API do not work with addresses directly but use so called _references_. A reference is nothing more than a simple wrapper object around an address.

onedb favors the usage of addresses 'wrapped' in reference objects over simply supplying an address in form of a `String` object to distinguish objects, which by chance hold a value which 'looks like' an URI, from objects, which are meant to represent links to entities within onedb.

Given an address in text form, it is very easy to create references...

```java

OneTypedReference<?> reference1 = One.reference("https://u1.linnk.it/4hxdr8/query/bob");
OneTypedReference<?> reference2 = One.newNode("https://u1.linnk.it/4hxdr8/query/bob").asReference();

// reference1.equals(reference2) == true
```

... and to obtain the address, which is wrapped by a reference object:

```java

String address1 = reference1.getId();

// address1.equals("https://u1.linnk.it/4hxdr8/query/bob") == true
```

Moreover, for every object that has been added to a onedb client, a reference can be determined:

```java

String text1="I will be a node";

One.append(text1).to(lr.root()).in(client);

OneTypedReference<Object> ref
               = One.reference((Object) text1).in(client);
```

Note in the example above that the `text1` object has been cast to `Object` in the invocation of the `One.reference(..)` operation. This is necessary for the API to know that no address but a generic object is passed to the operation. For other types of objects (e.g. `Integer`) this explicit cast to `Object` is not necessary.

References can also be used to obtain the _resolved object_ of a node. For instance, the resolved object of the node `text1` in the example above would be "I will be a node". The resolved object of a node given its reference can be obtained as follows:

```java

Integer value1=42;

One.append(value1).to(lr.root()).in(client);

OneTypedReference<Integer> ref
                = One.reference(value1).in(client);

Integer value = One.dereference(ref).in(client);
// value.equals(42) == true
```

## 4\. Value Nodes

While virtually any Java object can become a node (given the object's class implements the `Serializable` interface), there is one special kind of object, which can be added to a onedb client: value nodes.

These objects are special in that they 'know' their own address. For instance, the object `value1` above is of the class `Integer` and there is therefore no possibility this object would know its own address; since the class `Integer` is final in Java and no additional methods/attributes can be defined for instance of this class.

The interface `OneNode` is used to denote classes which have knowledge of their own address. This interface defines a single method `getId()`, which will return the address of the node/object. As it can be seen above, the mentioned reference objects belong to this type of objects.

Value nodes are a special type of object within the `OneNode` category. They are nodes, which implement the interface `OneValue<Type extends Serializable>` These nodes, apart from knowing their own address, define a _value_ object of any type implementing the Serializable interface. This object can be accessed using the method `getValue()`.

In the following example, a value node `bob` is created and its two properties address and decorated object are accessed:

```java

OneValue<String> bob =
        One.newNode("bob").at("https://u1.linnk.it/4hxdr8/query/bob");
bob.getId(); // == "https://u1.linnk.it/4hxdr8/query/bob"
bob.getValue(); // == "bob"
```

Value nodes can turned into back and forth from reference to resolved object like any other object:

```java

OneTypedReference<OneValue<String>> ref
                             = One.reference(bob);

OneValue<String> value = One.dereference(ref).in(client);
value.getValue(); // == "bob"
```

Note that the call to `One.reference(..)` for the value node is made without the addition `.in(client)` as has been done above for the `String` and `Integer` objects. The client does not need to be specified for determining the reference of any object, which by itself 'knows' its own address.

It is usually a good practice to wrap objects whenever possible into value nodes. This allows for better performance, since the onedb engine does not have to derive the address of nodes from their object identity. Since object identities can also change in often unexpected ways, it is also usually safer to work with value objects.

The easiest way to define value nodes is generally by defining the `.atAddress(...)` parameter when [appending a new object to an existing node](http://maxrohde.com/2012/05/06/onedb-tutorial/#append 'onedb Tutorial Appending Nodes'). For instance, in the following example a new value node with the value `alice` is appended to the node `root` with the address `./alice` relative to the root node's address:

```java

One.append("alice").to(root).atAddress("./alice").in(client);
```

Given the root node is defined at the address `http://u1.linnk.it/example/root`, this append statement would result in the creation of the following node arrangement:

```text

One.value("root").at("http://u1.linnk.it/example/root")
--> One.value("alice").at("http://u1.linnk.it/example/root/alice")
```

## Conclusion

This article has discussed the various ways in which data is represented and accessed using the onedb client. Essentially, all data is encoded in form of Java objects:

- Any Java object can be turned into nodes by appending it to node in a onedb client.
- Java objects, which are managed as nodes, have a globally unique address.
- This address can be used to define a lightweight (and portable) reference to the Java object.
- References can used to resolve the original defined Java object.
- Java objects can be wrapped in special value nodes, which allow the onedb engine to manage these objects more effectively and securely.
