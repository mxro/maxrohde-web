---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-05-27"
title: 'IdentityHashMap in Google Web Toolkit (GWT): String Identity'
---

### Problem

IdentityHashMap in Google Web Toolkit (2.2.0) JavaScript applications does not seem to work correctly, if String objects are used as key.

#### Source Code:

final IdentityHashMap<Object, List<String>> idsFromObjects = new IdentityHashMap<Object, List<String>>();

final String node1 = "Node 1";

final String id = "value";

final ArrayList<String> ids = new ArrayList<String>();

ids.add(id);

idsFromObjects.put(node1, ids);

final String node1b = new String("Node 1");

GWT.log("Values: "+idsFromObjects.get(node1b));

GWT.log("Contains key?: "+idsFromObjects.containsKey(node1b));

GWT.log("Equals?: "+String.valueOf(node1b == node1));

#### Output (Hosted Mode):

Values: null

Contains Key?: false

Equals?: false

#### Output (Compiled JavaScript):

Values: \[value\]

Contains Key?: true

Equals?: true

Note: This problem does not exist in hosted mode.

### Solution

It seems there is no direct solution. Since the identity test node1b == node1 shows that the two Strings are actually identical for JavaScript, this might be a feature of JavaScript. Maybe JavaScript is keeping track of all the strings created, and does not allocate new memory, when an identical string is created; unlike Java when using the constructor new String(…).

It also appears the Google Web Toolkit JRE emulation, keeps a kind of cache for String hash codes (see the [class String.HashCache](http://google-web-toolkit.googlecode.com/svn-history/r5424/trunk/user/super/com/google/gwt/emul/java/lang/String.java)). A cache is even for their identity hash maps – see System.identityHashCode() in [this commit](http://code.google.com/p/google-web-toolkit/source/detail?spec=svn4790&r=2318)). This might be a result on JavaScripts handling of strings.

However, it is unfortunate that in this scenario running code in GWT's hosted mode leads to different results than running the compiled JavaScript.

A possible **workaround** is to wrap strings in a simple proxy.

public class StringNode {

private final String value;

public StringNode(String value) {

this.value = value;

}

}

Note: This class is not serializable for GWT RPC. See [this post](http://maxrohde.com/2011/03/02/gwt-object-serialization-problems-and-some-workarounds/) for possible workarounds for serialization for immutable objects.

### Resources

Google Groups '[IdentityHashMap emulation](http://groups.google.com/group/google-web-toolkit/browse_thread/thread/089d58ea2dbdca58)'

[SVN trunk IdentityHashMap](https://code.google.com/p/google-web-toolkit/source/browse/trunk/user/super/com/google/gwt/emul/java/util/IdentityHashMap.java?spec=svn9983&r=9983)

[Commit Message Google Web Toolkit Trunk, Stable identity hash values for strings?](http://code.google.com/p/google-web-toolkit/source/detail?spec=svn4790&r=2318)

String.HashCache [JavaDoc](https://www.docjar.com/docs/api/java/lang/String$HashCache.html)

String.HashCache [Source](http://google-web-toolkit.googlecode.com/svn-history/r5424/trunk/user/super/com/google/gwt/emul/java/lang/String.java) (as part of class String)

GWT [Issue 631](http://code.google.com/p/google-web-toolkit/issues/detail?id=631): adding String "watch" to HashSet will break GWT application in Firefox
