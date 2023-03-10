---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-09-14"
title: 'Maven and Eclipse: New Website'
---

After having published a number of posts on Maven and integration between Maven and eclipse in particular, I have been thinking for a while to summarize some best practices in a post. I have found that these best practices are actually too long and too interdependent to fit nicely in a blog post. Therefore, I have created a little webpage: [http://eclipsemaven.mxro.de/](http://eclipsemaven.mxro.de 'Eclipse Maven templates').

I will start to publish a number of templates for Maven pom.xml files there. The first two templates are already defined:

- [A Default template for 'normal' projects](http://eclipsemaven.mxro.de/default 'Default Eclipse Maven project pom')
- [A template for including external dependencies](http://eclipsemaven.mxro.de/external-library 'Maven pom to import thrid party projects into eclipse workspace')

Most notably, I have found that it safes lots of trouble to separate clearly between projects, which establish a dependency to a third party library, and those, which implement new logic. This is of particular importance when defining the projects as OSGi bundles. Since the OSGi metadata can be defined automatically by Maven, I think there is no excuse to write any module without OSGi metadata: maybe someone will require it at some point in time and it also aids in improving modularity ([Walls, 2009](http://www.citeulike.org/user/mxro/article/6106622)).
