---
title: 'Functional Java'
date: '2010-09-30'
categories:
  - 'java'
---

**+++Google Guava+++**

[Google Guava](http://code.google.com/p/guava-libraries/) is a collection of libraries provided by google under Apache licence to support a number of common problems in developing Java. It also provides a number of interfaces and implementations, which allow to develop in a more functional style. A good tutorial on these can be found [here](http://java.dzone.com/articles/touch-functional-style-plain?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+javalobby%2Ffrontpage+%28Javalobby+%2F+Java+Zone%29) and [here](http://java.dzone.com/articles/touch-functional-style-plain-0).

**+++Lambdaj**+++

I think it is a very interesting approach to use Java‘s flexibility to write Java code, which matches the style of other programming paradigms. In this context, the [lambdaj project](http://code.google.com/p/lambdaj/) seems to be an interesting and already quite mature framework.

**Advantages:** I stumbled across this project after checking out [Hamcrest](http://code.google.com/p/hamcrest/wiki/UsesOfHamcrest), which seems to be a quite popular tool for JUnit test. I was asking myself why, when it is easier to define test cases in this functional way, why not write code like this in the first place. And I believe for at least some instances writing code in lambdaj style can be much easier to read and understand.

**Limitations seem to be:**

- Many operations take around three times longer than the traditional java solution
- There seem to be some limitations in regards to generics
- Although this might not be relevant for many, the heavy use of reflection in lambdaj prevents from using the library in GWT applications.
