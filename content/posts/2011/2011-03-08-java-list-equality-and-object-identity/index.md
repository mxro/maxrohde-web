---
title: 'Java List Equality and Object Identity'
date: '2011-03-08'
categories:
  - 'java'
---

## Problem

Java lists manage inserted objects based on their equality ([see List JavaDoc](http://download.oracle.com/javase/1.5.0/docs/api/java/util/List.html)). In some instances, it can be confusing that this equality has a different meaning than an equal _identity_ of objects based on their reference.

This becomes quite apparent in the following example:

```
final List<String> list = new ArrayList<String>();
```

Here, we would usually expect "1" as result, since the String s2 has been inserted after the String s1 (which should have the index 0). However, Java prints "**0**" as answer in above example. 0 is returned since the indexOf(…) method only attempts to find an object which is equal to the passed parameter ("one") and not the identical object to the passed object (s2).

## Solution

Use the IdentityArrayList below:

```java


/**
* Copyright 2011 Max Rohde

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package mx.gwtutils;

import java.util.ArrayList;
import java.util.Collection;

/**
* An array list implemention depending on object identity (==) rather than
* equality (.equals) to identify elements.<br/>
* <br/>
* See: <a href=
* "http://maxrohde.com/2011/03/09/java-list-equality-and-object-identity/"
* >KnowledgeNetworks: Java List Equality and Object Identity</a>
*
* @author <a href="http://www.mxro.de/">Max Rohde</a>
*
* @param <E>
*/
public class IdentityArrayList<E> extends ArrayList<E> {

private static final long serialVersionUID = 1L;

@Override
public boolean remove(final Object o) {
return super.remove(this.indexOf(o)) != null;
}

@Override
public boolean contains(final Object o) {
return indexOf(o) >= 0;
}

@Override
public int indexOf(final Object o) {
for (int i = 0; i < size(); i++)
if (o == get(i))
return i;
return -1;
}

@Override
public int lastIndexOf(final Object o) {
for (int i = size() - 1; i >= 0; i--)
if (o == get(i))
return i;
return -1;
}

public IdentityArrayList() {
super();
}

public IdentityArrayList(final Collection<? extends E> c) {
super(c);
}

public IdentityArrayList(final int initialCapacity) {
super(initialCapacity);
}

}

```

There are a number of further implementation of List and Set in Java, which consider the object identity rather than the object equality:

[IdentityArrayList part of the Sun/Oracle JDK at sun.awt.util (on java2s.com)](http://www.java2s.com/Open-Source/Java-Document/6.0-JDK-Modules-sun/awt/sun/awt/util/IdentityArrayList.java.htm)

[IdentitySet by Sebastian Thomschke (on grepcode.net)](http://grepcode.com/file/repo1.maven.org/maven2/net.sf.oval/oval/1.20/net/sf/oval/internal/util/IdentitySet.java)

But please note that these lists are not part of the Java JRE. Lists are often critical parts of an application (in terms of performance and reliability). Therefore, the best advice might be to tried to work around scenarios as given above, for instance by assigning unique identifiers to objects.

For HashMaps, however, a special implementation utilizing object identity rather than equality checks is provided in the JRE:

[IdentityHashMap JRE 1.5.0 Java Doc](http://download.oracle.com/javase/1.5.0/docs/api/java/util/IdentityHashMap.html)
