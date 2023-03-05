---
categories:
- java
date: "2010-10-06"
primaryBlog: maxrohde.com
title: Restlet HTTPS
---

**Problem**

In its 2.0 version, it seems that Restlet has no built in support for HTTPS ([see internal connectors](http://wiki.restlet.org/docs_2.0/13-restlet/48-restlet/86-restlet.html)). If trying to add a new server with the HTTPS protocol

Server server1 = component.getServers().add(Protocol.HTTPS,                           "localhost", 8183);

A warning will be thrown and the server not started.

No available server connector supports the required protocols: 'HTTPS' . Please add the JAR of a matching connector to your classpath.

**Solution**

Restlet offers connectors, for instance with the Jetty web server ([Restlet Wiki Jetty Connector](http://wiki.restlet.org/docs_2.0/13-restlet/28-restlet/78-restlet.html)). These in combination with the org.restlet.ext.ssl extension can be used to provide resources via HTTPS. However, it seems that the current version 2.01 does not support to use these connectors ([Restlet 2.0 Connectors Wiki Page](http://wiki.restlet.org/docs_2.0/13-restlet/21-restlet/171-restlet/61-restlet.html)). Many of these connectors are not part of the downloadable distribution or the maven repository (in version 2.0.1). The apache http client connector, however, is: [Restlet Wiki HTTP Client extension](http://wiki.restlet.org/docs_2.0/13-restlet/28-restlet/75-restlet.html).

**Resources**

[Restlet Wiki Configure HTTPS](http://wiki.restlet.org/docs_2.0/13-restlet/27-restlet/46-restlet/213-restlet.html)

[Create a keystore file](http://www.sslshopper.com/article-most-common-java-keytool-keystore-commands.html) [Restlet Wiki SSL extension](http://wiki.restlet.org/docs_2.0/13-restlet/28-restlet/153-restlet.html) [Restlet Wiki Jetty Connector](http://wiki.restlet.org/docs_2.0/13-restlet/28-restlet/78-restlet.html)

[Restlet Wiki Security Package](http://wiki.restlet.org/docs_2.0/13-restlet/27-restlet/46-restlet.html) [Blog post how to enable SSL with Restlet (might be a bit outdated)](http://www.naviquan.com/blog/restlet-ssl)

[Configure HTTPs with Jetty](http://docs.codehaus.org/display/JETTY/How+to+configure+SSL)