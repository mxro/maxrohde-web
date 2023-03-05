---
categories:
- java
date: "2012-05-27"
primaryBlog: maxrohde.com
title: New Repository for OSGi-ready Maven Artifacts
---

**UPDATE 2015:**

For good repositories for OSGi artifacts also check:

[SpringSource Enterprise Bundle Repository](http://ebr.springsource.com/repository/app/)

[Eclipse Bundle Recipes Project](http://eclipse.org/proposals/rt.ebr/)

Here the original post:

Although the [onedb](http://www.onedb.de/) libraries are currently deployed as vanilla Java JAR files ([onedb downloads](http://cms.onedb.de/downloads)), I have used the [PDE tooling of eclipse](http://www.eclipse.org/pde/) heavily in the development process.

One core advantage of using OSGi in the development process is that OSGi allows to [enforce information hiding](http://www.citeulike.org/user/mxro/article/6106622) between modules in a large Java application.

Unfortunately, most open source projects do not provide versions of their libraries, which are ready made for an OSGi environment. There is some great tooling available to create bundles from vanilla Java Jars, my favorite one being the [Maven Bundle Plugin](http://svn.apache.org/repos/asf/felix/releases/maven-bundle-plugin-2.3.7/doc/site/index.html), which wraps the [BND](http://www.aqute.biz/Bnd/Bnd/) tool.

However, it can still be an annoyance to create your own OSGi-enabled maven artifacts for every dependency you want to use in your OSGi project.

This is my motivation to [publish OSGi wrappers](https://github.com/mxro/osgi-maven) for all the third party dependencies I come across in my projects:

\-> [osgi-maven on github](https://github.com/mxro/osgi-maven) <-

Basically, these wrappers provided nothing more but a simple pom, which is pre-configured to generate valid OSGi declarations for the wrapped dependency:

![OSGi Wrapper Artifacts](https://docs.google.com/drawings/pub?id=1socrS69ers7vZh8RtPC_Xxaex_lEk3cg8uwIP4GBqak&w=484&h=173)

If the project is easy to build and/or there is no single artifact available, which could be wrapped, the wrapper might also contain the source code of the third party dependency. Therefore, please make sure that you use all wrappers in accordance with the source code license of the **wrapped** artifact.

Currently, the wrapper artifacts provide the following key features:

- You can use the artifacts from the provided repository to link the third party project as OSGi-bundles/Maven artifact (see included [libraries](https://github.com/mxro/osgi-maven/blob/master/README.md#libraries)).
- You can download the projects from the github repository and [generate MANIFEST.MF declarations](https://github.com/mxro/osgi-maven/blob/master/README.md#create-manifestmf 'Create MANIFEST.MF Declarations') as well as use the [maven eclipse plugin](http://maven.apache.org/plugins/maven-eclipse-plugin/) to [create eclipse projects](https://github.com/mxro/osgi-maven/blob/master/README.md#create-eclipse-pde-projects) for the dependencies (this is very useful for eclipse PDE projects).

The following libraries are defined in the [repository](https://github.com/mxro/osgi-maven):

- [thrdHamcrestGWT](https://github.com/mxro/osgi-maven/tree/master/thrdHamcrestGWT): A wrapper for a variant of the [Hamcrest](http://code.google.com/p/hamcrest/) library, which can be deployed as GWT module.
- [thrdNetty3](https://github.com/mxro/osgi-maven/tree/master/thrdNetty3): A wrapper for the [Netty NIO framework](http://www.jboss.org/netty)
- [thrdAsyncHttpClient17](https://github.com/mxro/osgi-maven/tree/master/thrdAsyncHttpClient17): A wrapper for the [async-http-client](https://github.com/sonatype/async-http-client) library
- [thrdJavaxMail14](https://github.com/mxro/osgi-maven/tree/master/thrdJavaxMail14): A wrapper for the [Java Mail API](http://javamail.kenai.com/nonav/javadocs/javax/mail/package-summary.html)
- [thrdJTidy](https://github.com/mxro/osgi-maven/tree/master/thrdJTidy): A wrapper for the [JTidy](http://jtidy.sourceforge.net/) library (Version 8.0)
- [thrdSwingApplicationFramework](https://github.com/mxro/osgi-maven/tree/master/thrdSwingApplicationFramework): A wrapper for the [Swing Application Framework](http://java.net/projects/appframework/)
- [thrdJenaBean](https://github.com/mxro/osgi-maven/tree/master/thrdJenaBean): A wrapper for the [jenabean](http://code.google.com/p/jenabean/) library.
- [thrdSwingActionManager](https://github.com/mxro/osgi-maven/tree/master/thrdSwingActionManager): A wrapper for the [Swing Action Manager](http://java.net/projects/sam) library.
- [thrdShef](https://github.com/mxro/osgi-maven/tree/master/thrdShef): A wrapper for the [SHEF](http://shef.sourceforge.net/) Swing library.
- [thrdGWTUser24](https://github.com/mxro/osgi-maven/tree/master/thrdGWTUser24): A wrapper for the GWT client libraries version 2.4.
- [thrdGWTUser](https://github.com/mxro/osgi-maven/tree/master/thrdGWTUser): A wrapper for the GWT client libraries version 2.2.0.
- [thrdBabuDb05](https://github.com/mxro/osgi-maven/tree/master/thrdBabuDb05): A wrapper for the [BabuDB](http://code.google.com/p/babudb/) key-value store.
- [thrdJDVM2V22](https://github.com/mxro/osgi-maven/tree/master/thrdJDVM2V22): A wrapper for the [jdbm2](http://code.google.com/p/jdbm2/) key-value store.
- [thrdJettison12](https://github.com/mxro/osgi-maven/tree/master/thrdJettison12): A wrapper for the [Jettison](http://jettison.codehaus.org/) library.
- [thrdDom4j](https://github.com/mxro/osgi-maven/tree/master/thrdDom4j): A wrapper for the [dom4j](http://dom4j.sourceforge.net/) library.
- [thrdGwtGxt](https://github.com/mxro/osgi-maven/tree/master/thrdGwtGxt): A wrapper for the [Ext Gwt](http://www.sencha.com/store/gxt/) library.
- [thrdApacheVFS](https://github.com/mxro/osgi-maven/tree/master/thrdApacheVFS): A wrapper for the [Apache Commons VFS](http://commons.apache.org/vfs/) library.

... and more coming.