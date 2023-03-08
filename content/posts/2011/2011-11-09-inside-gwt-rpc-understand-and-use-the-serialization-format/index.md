---
categories:
- java
date: "2011-11-09"
blog: maxrohde.com
title: 'Inside GWT RPC: Understand and Use the Serialization Format'
---

[GWT RPC](http://code.google.com/webtoolkit/doc/latest/tutorial/RPC.html) is a technology with both great promises as well as many practical pitfalls. On the one hand, GWT RPC magically handles the transport of objects from a Java server to a JavaScript based client, without any need to create and maintain legacy data formats (e.g. in JSON). On the other hand, caused by the architecture of GWT RPC, it is easy to bloat up the size of JavaScript clients, since any for any object transported from server to client, the client needs a type-specific scaffold to instantiate the types in JavaScript. Calling eval(…), in contrast, is a much more lightweight solution. Moreover, serializing and deserializing large object graphs can be a performance hog, both for server and client.

Below a collection of a few interesting links, which can help in understanding GWT RPC better and using it beyond its initially devised use cases. In particular:

- To have a detailed understanding of how the GWT serialization format works on the inside ("Understand the GWT Serialization Format"),
- How to consume a GWT RPC service from a Java (JSE) client ("Consume GWT RPC using a Java Client"), and
- How to generate messages in the GWT serialization format using an environment different from the GWT provided servlet ("Generate Textual Representations of Java Objects using GWTs Serialization Format")

### Understand the GWT Serialization Format

[Stackoverflow "GWT RPC data format"](http://stackoverflow.com/questions/6135590/gwt-rpc-data-format)

This discussion provides details on the GWT serialization format, particularly by referring to [this presentation](https://www.owasp.org/images/7/77/Attacking_Google_Web_Toolkit.ppt). Looking at the format in detail, it indeed seems to resemble a remote method invocation protocol (RMI) rather than a sole remote procedure call protocol. This is not necessarily good, since a lot of meta-data has to be sent with every request (e.g. class on which method is to be invoked).

### Consume GWT RPC using a Java Client

[Stackoverflow "Invoke a GWT RPC service from Java directly"](http://stackoverflow.com/questions/1330318/invoke-a-gwt-rpc-service-from-java-directly)

It appears that attempting to consume GWT RPC services from Java clients has mostly been pursued for testing purposes. However, it seems that some of the discussed libraries might be out-dated and might necessarily work with the most recent version of GWT (since the GWT serialization format can change from version to version).

### Generate Textual Representations of Java Objects using GWTs Serialization Format

[Simpler and Speedier GWT with Server Side RPC Serialization – TechHui](http://www.techhui.com/profiles/blogs/simpler-and-speedier-gwt-with)

This article describes how data can be serialized using GWTs server side serialization and written into the initially downloaded HTML. This can speed up startup time of applications, since it leads to a reduction of RPC calls. I am not quite sure but there might have been mention of this technique in one of the Goolge IO talks on GWT performance. There can be other use cases for attempting to do the GWT serialization 'by hand', for instance if one wants to avoid using a Servlet container (tomcat, jetty) and replace it by something nicer like netty. The JavaDoc of the following classes are a good starting point to explore further how to perform GWT serialization [Google Web Toolkit JavaDoc Class RPC](http://google-web-toolkit.googlecode.com/svn/javadoc/latest/com/google/gwt/user/server/rpc/RPC.html), [Restlet JavaDoc Class Object Representation](http://www.restlet.org/documentation/snapshot/jse/ext/org/restlet/ext/gwt/ObjectRepresentation.html)