---
categories:
- java
coverImage: java_programming_language_logo-svg-e1515987274897.png
date: "2018-01-11"
blog: maxrohde.com
tags:
- programming
title: Determine Which JDK Version a JAR/Class File Was Compiled With
---

Today I came across a nasty error which occurred in a deployed Java application only but not during development or integration tests. The error went something like the following:

```java

java.lang.NoSuchMethodError: java.nio.ByteBuffer.rewind()Ljava/nio/ByteBuffer;
at nx.serializerkryo.internal.InternalKryoSerialzer.performToStream(InternalKryoSerialzer.java:33)
at nx.serializerkryo.internal.InternalKryoSerialzer.serialize(InternalKryoSerialzer.java:63)
at nx.serializerkryo.internal.InternalKryoSerialzer.serialize(InternalKryoSerialzer.java:21)
at nx.persistence.jre.internal.OptimizedPersistedNodeSerializer.serialize(OptimizedPersistedNodeSerializer.java:47)
at nx.persistence.jre.internal.OptimizedPe<span 				data-mce-type="bookmark" 				id="mce_SELREST_end" 				data-mce-style="overflow:hidden;line-height:0" 				style="overflow:hidden;line-height:0" 			></span>rsistedNodeSerializer.serialize(OptimizedPersistedNodeSerializer.java:21)
```

Now I had a feeling that this had something to do with me trying to be ahead of the curve and use a Java 9 JDK to compile the application. In order to debug this, I had to confirm which with JDK the classes I was using were compiled with. Thankfully I found a handy thread of [StackOverflow](https://stackoverflow.com/questions/3313532/what-version-of-javac-built-my-jar).

Unfortunately, it wasn't immediately obvious to me which solution listed there would work best, so I decided to provide the solution here in a more condensed form. Simply use the following command:

```
javap -v [path to your class file]
```

The output will then contain the following line (towards the top of the file):

```
public class ...
minor version: 0
major version: 50
flags: ACC_PUBLIC, ACC_SUPER
```

The major version and minor version indicates which version of Java the class was compiled with. The following contains a list of which Java versions which major versions relate to.

Java SE 9 = 53 (0x35 hex), Java SE 8 = 52 (0x34 hex), Java SE 7 = 51 (0x33 hex), Java SE 6.0 = 50 (0x32 hex), Java SE 5.0 = 49 (0x31 hex), JDK 1.4 = 48 (0x30 hex), JDK 1.3 = 47 (0x2F hex), JDK 1.2 = 46 (0x2E hex), JDK 1.1 = 45 (0x2D hex).

Interestingly my files were apparently compiled for Java 6 (Maven compiler plugin was responsible). The problem was that the files were compiled with JDK 9 (though they were compiled for 1.6). Downgrading the JDK used to do the compilation to JDK8 fixed the problem.