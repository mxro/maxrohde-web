---
categories:
- java
date: "2010-06-23"
primaryBlog: maxrohde.com
title: Version Ranges in OSGi and Maven
---

Version ranges have slightly different meaning in OSGi and Maven.

in OSGi: 1.0.0 is an earlier version than 1.0.0-SNAPSHOT, therewith 1.0.0-SNAPSHOT is in \[1.0,2.0)

in Maven: 1.0.0 is a later version than 1.0.0-SNAPSHOT, therewith 1.0.0-SNAPSHOT is not in \[1.0,2.0)

The usual practice in Maven is the following: (1) Artifact is released in version 1.0.0 (2) Development is continued with version 1.0.1-SNAPSHOT (3) Artifact is released with version 1.0.1

**Resources**

[EclipseCon presentation Maven, Eclipse and OSGi working together](http://www.eclipsecon.org/2008/sub/attachments/Maven_Eclipse_and_OSGi_working_together.pdf)