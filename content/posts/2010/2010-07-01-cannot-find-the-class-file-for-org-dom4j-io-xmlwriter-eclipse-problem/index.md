---
categories:
- java
date: "2010-07-01"
blog: maxrohde.com
title: Cannot find the class file for org.dom4j.io.XMLWriter (Eclipse Problem)
---

**Problem**

Eclipse won‘t compile a project, that is compiled by Maven without problems. The error message is:

„Cannot find the class file for org.dom4j.io.XMLWriter“

**Solution** For me, it solved the problem to provide a bundle, which wraps the dom4j jar, and explicitly import the bundle „org.dom4j.io“ for my project.