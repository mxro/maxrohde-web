---
title: 'Get Free Memory on Unix System in Java'
date: '2013-01-02'
categories:
  - 'java'
---

## Background

The [opsunit](https://github.com/mxro/opsunit) framework allows to continuously run a number of [JUnit](http://junit.sourceforge.net/) unit tests and do some maintenance/repair work upon any failed test.

The latest addition to the test suite for the [Appjangle](http://appjangle.com) platform is a simple unit test, which checks the remaining free memory on the server node. If the free memory goes beyond a certain threshold (e.g. 150 mb), some maintenance work is conducted in order to free memory on the node.

Since the server nodes are running a UNIX derivate, the Java unit test therefore needs to be able to determine the currently available system memory.

## Problem

How to determine the available free system memory on a UNIX system from a Java program?

## Solution

The first starting point is the 'vmstat' application. This application prints out all different kinds of information for the current system. Together with a few other GNU programs, it can be moulded to return the available free memory:

vmstat -s -S M | egrep -ie 'memory|swap' | grep 'free memory'

It is possible to run this shell script from Java. There are multiple ways to achieve this, [many of them troublesome](http://intekhabsadekin.wordpress.com/2009/03/05/java-runtimegetruntimeexec-will-and-will-not-work/) and I ALWAYS do it wrong. Therefore I have assembled my hard-learned best practices (and those of others I could find) in the project [java-start-process](https://github.com/mxro/java-start-process). Using this project, we can determine the free memory for a UNIX system using the following function:

```java


public static int getFreeMemoryUnixInMb() {
 try {

final String expr = Spawn
 .runCommand(
 new String[] { "/bin/bash", "-c",
 "vmstat -s -S M | egrep -ie 'memory|swap' | grep 'free memory'" },
 null);
 // expr sth like " \t \t778 M free memory "

final String[] elems = expr.split(" |\t");
 for (final String elem : elems) {

try {
 return Integer.valueOf(elem);
 } catch (final Throwable t) {

}
 }

throw new RuntimeException(
 "Could not find free memory within: Elements="
 + Arrays.asList(elems) + " Raw Result=[" + expr
 + "]");

} catch (final Throwable t) {
 throw new RuntimeException(t);
 }
}
```

## Resources

[vmstat :: Detect Problems That Can Adversely Affect System Performance](%20Detect%20Problems%20That%20Can%20Adversely%20Affect%20System%20Performance)

[Executing shell commands in java](http://www.overclock.net/t/533327/executing-shell-commands-in-java)

[executing shell script from java](http://www.coderanch.com/t/379834/java/java/executing-shell-script-java)
