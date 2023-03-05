---
categories:
- java
date: "2010-10-11"
primaryBlog: maxrohde.com
title: Java Code Reusability
---

The Java world is in movement. After Oracle‘s purchase of Sun there is a great amount of uncertainty regarding the future of this programming language.

How can we deal with this uncertainty? One approach is to understand that Java is not Java. Indeed, the way we write Java code greatly influences, in how far we are bound to a particular vendor or technology.

1\. The code can be compiled with/for and/or runs in

- Sun‘s now Oracle‘s JVM
- [Apache Harmony](http://harmony.apache.org/)
- OSGi runtime environments ([Equinox](http://www.eclipse.org/equinox/), [Felix](http://felix.apache.org/site/index.html), [Knopflerfish](http://www.knopflerfish.org/), ...) (a useful tool for this purpose can be [Pax Exam](http://wiki.ops4j.org/display/paxexam/Documentation))
- Dalvik JVM (Android)
- Compiles into JavaScript using Google Web Toolkit

2\. The resulting objects can be serialized for/with:

- Objects can be serialized to XML using XStream
- Objects can be serialized for RPC calls (eg for GWT RPC) (optional since might require to add the Serializable interface)

1. 3\. All dependencies meet the same requirements.

Of course it is highly unlikely that any but the most trivial applications will meet all these requirements for all of their code. However, it is often possible to write significant portions of the application adhering to these requirements. Code which violates these requirements, particularly code, which leverages third party libraries, can be carefully separated from this ‚portable‘ code. One possibility to loosely couple the portable and non-portable code are for instance OSGi declarative services.