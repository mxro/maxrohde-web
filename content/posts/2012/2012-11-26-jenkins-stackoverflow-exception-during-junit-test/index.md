---
categories:
- java
date: "2012-11-26"
blog: maxrohde.com
tags:
- jenkins
- junit
- maven
title: Jenkins StackOverflow Exception during JUnit Test
---

**Problem**

The build of a Maven job in Jenkins fails due to a StackOverflowException or a OutOfMemoryException during a JUnit test.

**Analysis**

Most likely, there is a bug in your application, which leads to infinite recursion or an infinite allocation in resources. So first try to run your test in a different environment (for instance in eclipse, directly through Maven or as plain Java application).

However, sometimes, as in my case, the application works correctly and just requires more memory/stack size than is provided by the JVM during default settings. In this case, you will need to adjust the JVM settings in order to allow for more memory/stack size.

**Solution**

The JVM parameters, which allow to allocate more memory or stack size to a JVM are:

1.

```
-Xss(x)m
```

where x is the size of the stack you would like to use. For instance: -Xss4m for a 4 MB stack size.

2.

```
-Xmx(x)m
```

where x is the size of the Java heap space (=memory) you would like to use. For instance: -Xmx1024m for a 1024 MB heap space.

Unfortunately, there are multiple places in which these parameters can be configured. Essentially, if the increased heap space requirement is in your application, you will need to adjust the parameters **for the JUnit test runner in Maven**:

```xml


<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-surefire-plugin</artifactId>
 <version>2.12.4</version>
 <configuration>
 <argLine>-Xss18m</argLine>
 </configuration>
 </plugin>

```

However, if the adjusted parameters are required for building your application, you might have to adjust them for the **Maven Build Process**.

This can be done by adding the parameters to MAVEN_OPTS either:

- for your job: \[Your Job\] / Configure / Build / Advanced / MAVEN_OPTS
- or for the Jenkins instance: Jenkins / Manage Jenkins / Configure System / Maven Project Configuration / Global MAVEN_OPTS

The last possible culprit might be the **Jenkins server itself**.

You can set the JVM parameters for Jenkins either by specifying them when:

- starting Jenkins through java \[your JVM parameters here\] -jar jenkins.war or
- by editing the jenkins.xml in your JENKINS_HOME folder.

**Resources**

[Increasing Memory of junit Testcases](http://www.keith-chapman.org/2008/06/increasing-memory-of-junit-testcases-in.html 'Increasing Memory of junit Testcases')

[Stackoverflow - Jenkins build fails after running Cucumber tests on Java heap space exception](http://stackoverflow.com/questions/13381977/jenkins-build-fails-after-running-cucumber-tests-on-java-heap-space-exception)

[Increase heap size in java](http://stackoverflow.com/questions/1565388/increase-heap-size-in-java)

[Stackoverflow - How to give Jenkins more heap space when it´s started as a service under Windows?](http://stackoverflow.com/questions/5936519/how-to-give-jenkins-more-heap-space-when-its-started-as-a-service-under-windows)