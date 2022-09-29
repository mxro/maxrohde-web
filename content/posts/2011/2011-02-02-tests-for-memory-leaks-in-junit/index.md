---
title: "Tests for Memory Leaks in JUnit"
date: "2011-02-02"
categories: 
  - "java"
---

Although Java features an automatic garbage collector automatically clearing up unused objects and therewith unused memory, memory leaks can occur (and do occur from time to time). This is often caused by 'circular' references between objects.

There are a few ways, to automatically test for memory leaks using JUnit. There seems to be an interesting method being part of the NetBeans framework assertGC() (see [Tor Norbye's weblog – How to write a memory leak unit test](https://blogs.oracle.com/tor/entry/leak_unit_tests)). However, this method is not easily available when working with generic JUnit. A generic approach is described in [Palantir – Writing JUnit tests for memory leaks](http://blog.palantir.com/2007/11/06/writing-junit-tests-for-memory-leaks/). However, both these approaches should be taken with a pinch of salt. They depend on the assumption that setting an object reference to null + calling System.gc() will actually 'clean up' the object, which is not to asserted in the JVM specifications.

**Resources**

[Tor Norbye's weblog – How to write a memory leak unit test](https://blogs.oracle.com/tor/entry/leak_unit_tests)

[StackOverflow - Automated way to find JUnit tests that leak memory](http://stackoverflow.com/questions/863948/automated-way-to-find-junit-tests-that-leak-memory)

[Palantir – Writing JUnit tests for memory leaks](http://blog.palantir.com/2007/11/06/writing-junit-tests-for-memory-leaks/)
