---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-02-16"
title: Serializing Immutable Objects in GWT
---

Immutable objects are an easy yet powerful way to leverage some of the advantages of functional programming languages when writing plain old java. Such immutable objects declare all their attributes as final and are therewith protected from unforeseen state changes and side-effects. However, unfortunately **the GWT RPC mechanism has problems in dealing with immutable objects**. In particular, GWT RPC does not consider final attributes in serialization and deserialization of objects.

**What GWT does support:**

- Serialize many built in Java types like boolean, String, ...
- Serialize custom objects implementing [java.io.Serializable](http://code.google.com/webtoolkit/doc/latest/FAQ_Server.html) and [IsSerializable](http://code.google.com/webtoolkit/doc/latest/DevGuideServerCommunication.html)

**What GWT does not support:**

- Serialize fields with the final modifier ([Issue 1054](http://code.google.com/p/google-web-toolkit/issues/detail?id=1054)) ([Issue 2244](http://code.google.com/p/google-web-toolkit/issues/detail?id=2244))

Final fields will be treated as transient fields (and therewith omitted during serialization). GWT compiler will report for instance "\[WARN\] Field 'public final java.lang.String name' will not be serialized because it is final".

- Serialize objects, which [do not have a non-argument constructor](https://groups.google.com/group/google-web-toolkit/browse_thread/thread/9cde25557851e277?hl=ky) ([must not be public after GWT 1.6](http://code.google.com/p/google-web-toolkit-doc-1-6/wiki/DevGuideSerializableTypes))

GWT compiler will report: "\[Type\] is not default instantiable (it must have a zero-argument constructor or no constructors at all) and has no custom serializer" or "\[Type\] has no available instantiable subtypes"

**What can be done:**

**\-0- Try Direct Eval RPC ?**

There is a newer version of the RPC mechanism called [Direct-Eval RPC](http://code.google.com/webtoolkit/doc/latest/DevGuideServerCommunication.html) (or short deRPC). This mechanism (besides bringing improvements in the client-side deserialization performance) is supposed to allow serializing final fields. However, using GWT 2.1.0 and the gwt-maven-plugin version 2.1.1-SNAPSHOT, final fields would still be ignored during serialization and deserialization. Moreover, the mechanism would still require a no argument constructor. Most sensible immutable objects require a constructor with arguments (to initialize the final fields).

**\-1- Add 'dummy' constructors to your classes:**

Take all possible precautions that this constructor is not used in any other place in your code: (1) Declare as private, (2) Declare as Deprecated (which it will hopefully be if GWT serialization mechanism evolves), (3) add warning Java doc.

/\* #gwtdummyconstrstart \*/

/\*\*

\* Non-argument constructor required for GWT RPC serialization.<br/>

\* <em>DO NOT CALL this constructor manually.</em>

\*/

@SuppressWarnings("unused")

@Deprecated

private Person() {

}

/\* #gwdummytconstrend \*/

**\-2- Remove the final modifier from all fields in classes, which need to be serialized**

Here again, it might be a good idea to somehow make the omitted final modifiers easily replaceable (in hope that future versions of gwt will support immutable objects).

/\* #gwtnofinal \*/ private String name;

**Hints**

deRPC is supposed to support the serialization of classes with non-final fields. However, the compile still issues warnings for all these fields (for good reasons as the final fields were still ignored in my case). It is possible to suppress these warnings by adding the following element to the Gwt module definition (gwt.xml) (see [Issue 2862](http://code.google.com/p/google-web-toolkit/issues/detail?id=2862)):

<set-property name="gwt.suppressNonStaticFinalFieldWarnings" value="true" />

**Resources**

[Direct Evalable RPC GWT Wiki](http://code.google.com/p/google-web-toolkit/wiki/RpcDirectEval)

[GWT Docs Communicate with a Server](http://code.google.com/webtoolkit/doc/latest/DevGuideServerCommunication.html)

[GWT Docs Direct-Eval RPC (deRPC)](http://code.google.com/webtoolkit/doc/latest/DevGuideServerCommunication.html)
