---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-09-02"
title: Maven and Eclipse Indigo
---

It has been a while since the new release of the eclipse IDE, Indigo, [has been released](http://www.eclipse.org/downloads/). One of the most interesting new features seems to be a **better integration with Maven**.

After some very unsuccessful attempts using eclipse IAM and the m2eclipse plugin, I became a bit sceptical of Maven integration into the eclipse IDE. In particular, I want to use the eclipse plugin development environment (PDE) alongside Maven, which seemed impossible at the time. At the moment, I use the [eclipse:eclipse Maven Mojo](http://maven.apache.org/plugins/maven-eclipse-plugin/eclipse-mojo.html) to generate eclipse project files (with PDE support). The projects compile in eclipse and unit test etc run. Just for any Maven specific tasks, I need to change to the command line (eg deploying projects, changing dependencies between projects).

Now I have seen a few negative comments about the new Maven features in eclipse (see below). After spending a lot of time getting eclipse PDE and Maven working together well, I feel a bit anxious to change to eclipse Indigo.

### Resources

[Changing from m2eclipse to m2e (Eclipse 3.7 - Indigo)](http://blog.subshell.com/devblog/2011/06/changing-from-m2eclipse-to-m2e-eclipse-indigo.html)

[Maven and Eclipse, Top Eclipse Indigo Feature #10](http://eclipsesource.com/blogs/2011/06/09/maven-and-eclipse-top-eclipse-indigo-feature-10/) (critique in the comments)
