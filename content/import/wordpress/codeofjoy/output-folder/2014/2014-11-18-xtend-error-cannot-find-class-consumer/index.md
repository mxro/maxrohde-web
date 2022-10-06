---
title: 'Xtend Error: Cannot find class Consumer'
date: '2014-11-18'
categories:
  - 'java'
---

**Problem**

When deploying you Xtend application to a different environment than your development environment you might encounter an error such as:

\[ERROR\] symbol: class Consumer \[...\] \[ERROR\] cannot find symbol

**Solution**

This error is caused by Xtend trying to use Java 8 features. It does so when your development machine runs Java 8.

For **eclipse**, you can fix this by using a Java 7 JDK under Window / Preferences / Java / Installed JREs. Then 'Clean' your project and all references to the Consumer class should be obliterated.

For **Maven**, you can find more information on this [page](https://bugs.eclipse.org/bugs/show_bug.cgi?id=438764).
