---
categories:
- java
date: "2012-09-15"
blog: maxrohde.com
tags:
- google-web-toolkit
title: Google Releases Tool J2ObjC to convert Java Source Code into Objective-C Source
  Code
---

I love the [Google Web Toolkit](https://developers.google.com/web-toolkit/), a powerful and mature open source library to automatically translate Java Source Code into JavaScript code. While I doubt the merit of using Java to write user interfaces for JavaScript (unfortunately, this is often what the Google Web Toolkit has been advocated for), I think it is a great tool to share **Business Logic** between Java and JavaScript applications.

In this context, I am very happy to see [Google release the free tool J2ObjC](http://jaxenter.com/google-tool-j2objc-translates-java-to-objective-c-44466.html): This library is targeted to translate Java Business Logic code (not UI code!!!) from the Java Source Code into Objective-C source code. The objective of this project really appears to be to share libraries between Java and iOS applications rather than translating entire applications (with UI) from Java into Objective-C: a limitation I think is a great strength!

I hope that soon we will be able to write Business Logic-level code **just once** and then **embed** it everywhere!!!