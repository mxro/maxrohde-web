---
title: "Maven and OSGi Roundup"
date: "2010-05-21"
categories: 
  - "java"
---

A number of links concerning Maven and OSGi. Also see the [Java Modularity Tutorials (OSGi, Declarative Services and Maven)](http://nexnet.wordpress.com/2010/05/26/java-modularity-tutorials-osgi-declarative-services-and-maven/).

**Maven + NetBeans**

[Maven Best Practices for NetBeans](http://wiki.netbeans.org/MavenBestPractices) For instance, link Maven goals with IDE actions (so you can right-click the project and „Run on Felix“ [NetBeans Quick Start using Maven](http://platform.netbeans.org/tutorials/nbm-maven-quickstart.html) Shows how a NetBeans Platform application can be created using Maven [An overview of many advantages using Maven with NetBeans offers](http://edemmorny.wordpress.com/2010/03/23/netbeans-6-8-and-maven-–-the-perfect-combination/)

**OSGi + Maven + NetBeans**

[Creating OSGi Bundles and Deploying them to GlassFish](http://blog.arungupta.me/2010/04/totd-125-creating-an-osgi-bundles-using-netbeans-and-deploying-in-glassfish/) (Creates the OSGi bundles stand alone and then directly deploys to the server) Creating a simple web application where one module consumes a service from the second [Part 1](http://www.sinati.com/blog/2010/glassfish/building-osgi-declarative-service-maven-using-netbeans) [Part 2](http://www.sinati.com/blog/2010/glassfish/writing-client-access-osgi-service-methods)

**OSGi + NetBeans**

[NetBeans Platform Quick Start Using OSGi](http://platform.netbeans.org/tutorials/nbm-osgi-quickstart.html) (Shows how a OSGi container can be created - based on a sample Felix/Equinox application) [Overview of the approach taken by NetBeans to integrate with OSGi](http://wiki.netbeans.org/OSGiAndNetBeans) [Create OSGi Bundles and Project in Maven and Maven NetBeansModule with NetBeans support](http://wiki.netbeans.org/STS_69_Maven_OSGI)

**OSGi + Maven + eclipse**

[Use eclipse plugin project for Maven projects](http://sinnema313.wordpress.com/2009/11/21/osgi-maven-eclipse/) (!!!) [Presentation giving a good overview (but 2 years old)](http://www.eclipsecon.org/2008/sub/attachments/Maven_Eclipse_and_OSGi_working_together.pdf) Best practices from a project experience ([Part 1](http://blog.infinitechaos.com/2009/07/08/building-a-modern-java-app-with-eclipse-maven-osgi-and-spring-dm-part-1/), [Part 2](http://blog.infinitechaos.com/2009/07/09/building-a-modern-java-app-with-eclipse-maven-osgi-and-spring-dm-part-2/), [Part 3](http://blog.infinitechaos.com/2009/08/04/building-a-modern-java-app-with-eclipse-maven-osgi-and-spring-dm-part-3/), [Part 4](http://blog.infinitechaos.com/2009/08/05/building-a-modern-java-app-with-eclipse-maven-osgi-and-spring-dm-part-4/))

**OSGi**

[OSGi Services](http://www.knopflerfish.org/osgi_service_tutorial.html) Creating these OSGi services without Spring

**OSGi + Spring**

[Spring Dynamic Modules for OSGi Spring](http://www.springsource.org/osgi) framework to make the calls to OSGi services clearer (remove them from the classes code) Modular Java Book (Walls, 2009)

**OSGi + Declarative Services**

[Good overview presentation with nice illustrations](http://www.slideshare.net/heiko.seeberger/jax-09-osgi-service-components-models) [Apache Example using XML files](http://felix.apache.org/site/apache-felix-service-component-runtime.html) [Declare OSGi Services with annotations](http://felix.apache.org/site/apache-felix-maven-scr-plugin.html) (using apache flex maven scr plugin) [Example](http://blogs.sun.com/arungupta/entry/totd_124_osgi_declarative_services) [Slides Good Overview of Services in OSGi and details regarding Maven SCR](http://www.slideshare.net/bdelacretaz/tales-from-the-osgi-trenches) [Felix Distribution Download](http://felix.apache.org/site/downloads.cgi) ([iPojo, Eclipse extensions and Spring DM are alternatives to declarative services](http://www.eclipsezone.com/articles/extensions-vs-services/)) - [slides describing the different approaches](http://www.slideshare.net/njbartlett/component-oriented-development-in-osgi-with-declarative-services-spring-dynamic-modules-and-apache-ipojo) more alternatives: Peaberry (Google Guice), Blueprint Service (Spring DM in OSGi standard) [Howto OSGi Declarative Services](http://hexor2k.wordpress.com/2008/08/27/osgi-declarative-services/) (German) [Mail List discussion about the differences between Declarative Services in Felix and Equinox](http://www.mail-archive.com/osgi-dev@mail.osgi.org/msg00092.html)

**OSGi + Declarative Services + Felix SCR**

[A 7 part series on using Services in Felix using SCR](http://in-the-sling.blogspot.com/2008/09/sling-osgi-track-pt-7-configuring.html) [Maven SCR PLugin to generate XML files from Java/JavaDoc Annotations](http://felix.apache.org/site/apache-felix-maven-scr-plugin.html) (Official documentation) [Apache Felix SCR Plugin Introduction](http://felix.apache.org/site/apache-felix-maven-scr-plugin.html) [Tips on configuring declarative services correctly using Felix SCR](http://isurues.wordpress.com/2009/07/26/two-possible-mistakes-when-using-osgi-declarative-services/) [Few Examples of Using the Maven SCR Annotations](https://issues.apache.org/jira/browse/FELIX-1010?page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel&focusedCommentId=12709556#action_12709556)

**OSGi + Declarative Services + eclipse**

[Declarative Services Using Eclipse](http://www.vogella.de/articles/OSGi/article.html#declarativeservices)

**OSGi + Maven**

[Another Example of Using Declarative Services using GlassFish](http://blogs.sun.com/arungupta/entry/totd_124_osgi_declarative_services) [The Bundle Plugin for Maven](http://felix.apache.org/site/apache-felix-maven-bundle-plugin-bnd.html) [Creating an OSGi Project with Maven](http://www.sonatype.com/people/2009/09/maven-tips-and-tricks-creating-an-osgi-project-with-maven/)

**OSGi Alternatives**

Surely there are the NetBeans Modules. As part of JDK 6, the ServiceLoader class can be used. However, to my understanding, this class does not allow for different versions of JAR files in the classpath and is not as dynamic as OSGi.

[Use ServiceLoader with annotations](http://wiki.netbeans.org/DeclarativeRegistrationUsingAnnotations) [Discussion of ServiceLoader/OSGi differences](http://stackoverflow.com/questions/1959991/when-to-use-serviceloader-over-something-like-osgi) [Discussion of Differences Between NetBeans Modules and ServiceLoader](http://java.sun.com/developer/technicalArticles/javase/extensible/index.html)

**OSGi + Swing**

[Example of Application which integrates Swing and OSGi](http://max-server.myftp.org/trac/pm) [My question on Maven and OSGi in NetBeans](http://stackoverflow.com/questions/2879254/link-maven-osgi-to-maven-netbeans-platform-project)

**OSGi + GWT**

[Example GWT Application in a OSGi bundle](http://lsd.luminis.nl/using-gwt-to-create-an-osgi-aware-web-application/)
