---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-09-02"
title: 'Axis2 on Tomcat using Ubuntu: Internal Server Error'
---

**Problem**

Following the tutorials for bottom-up web services for eclipse, I created a dynamic web project and added a few services using Axis2. These web services run without a problem on the local installation of tomcat. However, when I export the web project as war and deploy this war to a tomcat installation on ubuntu, a number of problems occur.

Basically, the war get deployed and started, but after clicking on „Services“ an „Internal Server Error“ occurs. This error depends on a number of exceptions:

„java.lang.NoClassDefFoundError: org/apache/http/HttpResponseFactory “

„load() exception java.lang.ClassNotFoundException: org.apache.axis2.transport.http.AxisAdminServlet“

„org.apache.axis2.AxisFault: The system is attempting to engage a module that is not available: addressing“

**Solution**

The first exception HttpResponseFactory can be resolved by adding httpcore-4.0.1.jar to the folder WEB-INF/lib (just drag and drop in the folder in eclipse).

The other exceptions are a bit tricker. What I found was that the „standard“ installation of tomcat 6 using apt-get does not work correctly.

My problem was resolved after I manually installed Tomcat 6.0.29 loosely following the instructions [here](http://kmtk.cs.ait.ac.th/knowledge-center/how-to/install-tomcat-6-on-ubuntu-server-8.0.4).

**Resources**

[Download tomcat 6.0](http://tomcat.apache.org/download-60.cgi) (get the location of the jar for apt-get) <a href="http://mail-archives.apache.org/mod\_mbox/axis-java-user/201006.mbox/">Mail list: Try to add axis2-core-m1.jar ([Complete thread](http://web.archiveorange.com/archive/v/XzGGBNQaQw3XU2UUzhCZ))
