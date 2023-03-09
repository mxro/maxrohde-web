---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2012-04-02"
title: Java NIO HttpClients
---

Java's non-blocking IO (NIO) is a complex, yet amazingly powerful addition to Java to build scalable and performant network applications. The capabilities of Java NIO are particularly impressive if compared with alternative ways in the JRE to connect to web resources over http. Here is a small collection of libraries and tutorial, which can aid in building asynchronous Java NIO based http clients.

### Open Source Projects

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:213px;"> <col style="width:213px;"> <col style="width:213px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border:solid .5pt;"><strong>Project</strong></td><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><strong>License</strong></td><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><strong>Dependencies</strong></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><a href="https://github.com/sonatype/async-http-client">Async Http Client</a></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">Apache 2.0</td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">Netty 3.9.1</td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><a href="http://code.google.com/p/httpnio/">httpnio</a></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">LGPL</td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">None</td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><a href="http://nioframework.sourceforge.net/">NIO Framework</a></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">LGPLv3</td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;">None</td></tr></tbody></table>

### Tutorials/Examples

[High-Performance I/O with Java NIO](http://drdobbs.com/jvm/184406242): Nice tutorial with lots of code samples

[The Rox Java NIO Tutorial](http://rox-xmlrpc.sourceforge.net/niotut/): Great in-depth tutorial, including examples for SSL

[SSL Echo Client and SSL Echo Server](http://nioframework.sourceforge.net/?q=node/3): SSL Client/Server example using NIO Framework listed above.

[Java NIO Tutorials by Jakob Jenkov](http://tutorials.jenkov.com/java-nio/index.html): Great tutorials to get started with Java NIO

[SSL NIO from onjava.com](http://onjava.com/onjava/2004/11/03/ssl-nio.html): In depth discussion on SSL and NIO