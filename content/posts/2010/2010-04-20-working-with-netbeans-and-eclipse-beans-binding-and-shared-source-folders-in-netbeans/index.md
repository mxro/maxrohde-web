---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-04-20"
title: 'Working with NetBeans and Eclipse: Beans Binding and Shared Source Folders
  in NetBeans'
---

NetBeans and eclipse can work together fairly well. So the strength of both platforms can be leveraged for application development. One way is to share the source folders as discussed in this post. A more advanced approach is to use Maven, which [I described in a number of other posts](http://maxrohde.com/2010/05/26/java-modularity-tutorials-osgi-declarative-services-and-maven/).

A few issues regarding shared source folders are discussed in the following:

**Identical package names in multiple projects**

In eclipse, packages with similar names can reside in different source folders. For instance, the package de.mxro is both in the source folders /data/mxro/ and /data/portablemxro/. However, NetBeans is not able work with these two source folders. Only the classes in one of these folders will be recognized.

Solution: rename one of the source packages, e.g. you have afterwards de.mxro and de.mxrox.

**Beans Binding**

Beans binding in NetBeans is reflected in the project configuration files of the NetBeans project. I was not able to find a way yet, to transfer these configurations to the eclipse project. However, I got beans binding to work after adding the beansbinding jar to the eclipse project - this library is included in the NetBeans installation; I used version „beanbinding-1.2.1.jar. The maven artifact is:

<dependency>         <groupId>org.jdesktop</groupId>         <artifactId>beansbinding</artifactId>         <version>1.2.1</version> </dependency>

**Shared Source Folders in Multiple Projects**

The import and synchronization feature in NetBeans (File / Import / eclipse project) works fairly well. However, there can be issues that some source folders are recognized as test folders (to fix this right-click on project and select preferences and change the source paths). Also, the default encoding for sources in NetBeans is UTF-8 and in eclipse it is Mac Roman. It is advisable to change the encoding in NetBeans to MacRoman before compiling the project.

In eclipse, I share source folders between multiple folders. However, this does not work in NetBeans. [Here is a workaround](http://balaji-chopparapu.blogspot.com/2010/02/sharing-source-files-across-projects-in.html).
