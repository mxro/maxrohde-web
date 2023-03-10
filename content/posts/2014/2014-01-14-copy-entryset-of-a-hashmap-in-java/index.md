---
blog: maxrohde.com
categories:
- java
date: "2014-01-14"
title: Copy EntrySet of a HashMap in Java
---

All the key-value pairs of a [Map](http://docs.oracle.com/javase/7/docs/api/java/util/Map.html) in Java can be accessed through the method .[entrySet()](<http://docs.oracle.com/javase/7/docs/api/java/util/Map.html#entrySet()>) on the Map interface. Sometimes it might be required to create a copy of the resulting list.

A straightforward approach would be to utilize the constructor of the [ArrayList](http://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html) class, which accepts a list as parameter, such as

List<Entry<...> copy = new ArrayList<Entry<...>>(map.entrySet());

Unfortunately, this approach does not work in all cases, for instance when using [GWT](http://www.gwtproject.org/). The problem is that the individual Entries in the entrySet are not guaranteed to contain the keys and value of the map. Thus, in order to create a safe copy of an entry set, the following steps are required:

- Add the class [MyEntry](http://stackoverflow.com/a/3110644/270662) to your application.
- Create a new ArrayList with the size of your entrySet: copy = new ArrayList(map.entrySet().size());
- Loop through the entry set of the map and create individual copies of all entries:

for (Entry<...> e : map.entrySet()) {

copy.add(new MyEntry<...>(e.getKey(), e.getValue()));

}

Not too easy but worth the effort; since if you don't create a copy of an entrySet like this, your application becomes dependend on the internals of the map implementation of your choice. You might also want to consider to create a copy of the whole map and then use the entrySet of the copied map. This can be accomplished in less lines of code but will be less performant, since the internal index for the map would have to be recreated.
