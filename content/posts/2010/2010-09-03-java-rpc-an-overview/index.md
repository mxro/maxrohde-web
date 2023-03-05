---
categories:
- java
date: "2010-09-03"
primaryBlog: maxrohde.com
title: 'Java RPC: An Overview'
---

**Abstract:** A collection of links to frameworks allowing for Remote Procedure Calls between Java applications. I ultimately went with the Restlet framework due to its simplicity and integration with GWT.

**Frameworks:**

Restlets: Restlet is a framework for Java allowing to create restful web services. [This example shows that it works well both for Java SE and GWT clients](http://wiki.restlet.org/docs_2.0/13-restlet/21-restlet/318-restlet/303-restlet.html). ([Java World article from 2008](http://www.javaworld.com/javaworld/jw-12-2008/jw-12-rest-series-2.html)) ([Blog post showing Restlet performance is comparable to performance of servlets](http://www.naviquan.com/blog/restlet-framework))

[JAX WS](<http://java.dzone.com/articles/jax-ws-hello-world?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+javalobby/frontpage+(Javalobby+/+Java+Zone)>): Uses web services, part of the javax.\* package. ([Should have tool support in eclipse](http://help.eclipse.org/help33/index.jsp?topic=/org.eclipse.stp.sc.doc/tasks/overview.html) ([Videos](http://wiki.eclipse.org/JAXWS/Videos)) and NetBeans)

XML-RPC and [XML-RPC2](http://ws.apache.org/xmlrpc/xmlrpc2/): Apache libraries for RPC calls using XML messages. XML RPCs evolved into WSDL. Provides client and server.

[Using WS-Security with Axis2](http://www.javaranch.com/journal/200709/web-services-authentication-axis2.html): Article showing step by step how to configure Axis 2 to use authentication.

[Axis2 module rampart](http://ws.apache.org/axis2/modules/rampart/1_0/security-module.html): This module can be added to Axis2 in order to support encrypted messages.

[Spring Remote Framework](http://static.springsource.org/spring/docs/2.0.x/reference/remoting.html): Allows to use a number of remoting technologies (RMI, Hessian, Jax RPC, ...) - needs to be configured using Spring Bean XML files.

**Resources**

[Comparison of Axis2, CXF and Sun JAX-WS RI](http://www.predic8.com/axis2-cxf-jax-ws-comparison.htm)