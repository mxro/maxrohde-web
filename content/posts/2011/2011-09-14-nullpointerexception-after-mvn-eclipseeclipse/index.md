---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-09-14"
title: NullPointerException after mvn eclipse:eclipse
---

### Problem

Today I came across a strange error when generating eclipse metadata using maven.

Running "mvn eclipse:eclipse" results in :

```


[ERROR] Failed to execute goal org.apache.maven.plugins:maven-eclipse-plugin:2.8:eclipse (default-cli) on project mxGWTUtils: Execution default-cli of goal org.apache.maven.plugins:maven-eclipse-plugin:2.8:eclipse failed. NullPointerException -> [Help 1]

org.apache.maven.lifecycle.LifecycleExecutionException: Failed to execute goal org.apache.maven.plugins:maven-eclipse-plugin:2.8:eclipse (default-cli) on project

[…]

Caused by: java.lang.NullPointerException

at org.apache.maven.artifact.versioning.ComparableVersion.parseVersion(ComparableVersion.java:353)

at org.apache.maven.artifact.versioning.ComparableVersion.<init>(ComparableVersion.java:344)

at org.apache.maven.artifact.versioning.DefaultArtifactVersion.parseVersion(DefaultArtifactVersion.java:111)

at org.apache.maven.artifact.versioning.DefaultArtifactVersion.<init>(DefaultArtifactVersion.java:47)

at org.apache.maven.artifact.DefaultArtifact.compareTo(DefaultArtifact.java:433)

at org.apache.maven.artifact.DefaultArtifact.compareTo(DefaultArtifact.java:43)

at java.util.TreeMap.compare(TreeMap.java:1188)

at java.util.TreeMap.put(TreeMap.java:531)

at java.util.TreeSet.add(TreeSet.java:255)

at org.apache.maven.plugin.ide.AbstractIdeSupportMojo.getProjectArtifacts(AbstractIdeSupportMojo.java:786)

at org.apache.maven.plugin.ide.AbstractIdeSupportMojo.doDependencyResolution(AbstractIdeSupportMojo.java:560)

at org.apache.maven.plugin.ide.AbstractIdeSupportMojo.execute(AbstractIdeSupportMojo.java:507)

at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo(DefaultBuildPluginManager.java:101)

```

### Analysis

After a while, I have found out that this error is caused by using [Maven version ranges](http://maven.apache.org/plugins/maven-enforcer-plugin/rules/versionRanges.html) (e.g. "\[0.2.0,)" meaning any version larger than 0.2.0) rather than exact version numbers.

So, for instance a dependency like the following will cause the NullPointerException:

```


<dependency>

<groupId>de.mxro.thrd.guavagwt</groupId>

<artifactId>thrdGuavaGwt</artifactId>

<version>[0.0.1,)</version>

</dependency>

```

Whereas the following specification of the dependency will cause the NullPointerException to disappear:

```


<dependency>

<groupId>de.mxro.thrd.guavagwt</groupId>

<artifactId>thrdGuavaGwt</artifactId>

<version>0.0.1</version>

</dependency>

```

### Solution

In my case, this problem was **caused by upgrading from Java 1.6 22 to Java 1.7**.

Therefore, downloading a version of Java 1.6 and specifying its directory as JAVA_HOME solves the problem. A short solution that took me long to find. Who would have suspected this bug is cause by Java?
