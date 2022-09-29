---
title: "Maven Module for gwt-exporter"
date: "2012-07-08"
categories: 
  - "java"
---

[gwt-exporter](http://code.google.com/p/gwt-exporter/) is an awesome library to generate usable JavaScript APIs for [Google Web Toolkit](https://developers.google.com/web-toolkit/) applications.

It allows writing powerful libraries in Java and reuse the features these libraries provide in JavaScript applications!

I have assembled a small Maven Module for gwt-exporter 2.4 (M1), which readily configures gwt-exporter to be used as part of an OSGi-enabled project. This is particularily useful, if one wants to develop using the excellent eclipse plug-in development platform (which is useful for far more than developing eclipse plugins).

The source code is hosted as part of the [osgi-maven](https://github.com/mxro/osgi-maven/) project: [thrdGwtExporter24](https://github.com/mxro/osgi-maven/tree/master/thrdGwtExporter24).

The Maven dependency and repository are as follows:

**Dependency:**

```xml


 <dependency>
 <groupId>de.mxro.thrd.gwtexporter24</groupId>
 <artifactId>thrdGwtExporter24</artifactId>
 <version>0.0.1</version>
 </dependency>

```

**Repository:**

```xml


<repositories>
 <repository>
 <id>onedb Releases</id>
 <url>http://dl.dropbox.com/u/957046/onedb/mvn-releases</url>
 </repository>
</repositories>

```

If you would like to use gwt-exporter in a vanilla Maven project (without OSGi), you can use the gwt-exporter artefact hosted on Maven central:

```xml


<dependency>
 <groupId>org.timepedia.exporter</groupId>
 <artifactId>gwtexporter</artifactId>
 <version>2.4.0-M1</version>
 <scope>provided</scope>
 <exclusions>
<exclusion>
<groupId>com.sun</groupId>
<artifactId>tools</artifactId>
</exclusion>
 </exclusions>
</dependency>

```

(The exclusion is necessary to avoid dependencies to the Sun/Oracle JVM.)
