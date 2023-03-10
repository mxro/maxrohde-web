---
blog: maxrohde.com
categories:
- java
date: "2012-05-26"
title: Threads in GWT?
---

While it is widely reported that [Google Web Toolkit](https://developers.google.com/web-toolkit/ 'Google Web Toolkit') does [not support Java Threads](http://stackoverflow.com/questions/2590850/threading-in-gwt-client 'Threading in GWT') and [multi-threading](http://groups.google.com/group/google-web-toolkit/browse_thread/thread/2e76af2687b8ecda?pli=1 'java.lang.Thread in GWT'), a number of aspects of concurrent applications can be emulated in GWT's single thread JavaScript world.

The particular features that are relatively easy to emulate are:

- Timers
- Background Execution
- Locks
- 'Thread-safe' Collections

An important theme in my implementation of [onedb](http://www.onedb.de/ 'onedb') was to write code in Java, which can be used both in a JVM environment and a GWT/JavaScript environment. Unfortunately, even though the Java Concurrency API and GWT's concurrency features often provide similar features, their APIs are incompatible.

For instance, a codebase, which uses a [java.util.Timer](http://docs.oracle.com/javase/6/docs/api/java/util/Timer.html 'Java Timer'), cannot use a [com.google.gwt.user.client.Timer](http://google-web-toolkit.googlecode.com/svn/javadoc/latest/com/google/gwt/user/client/Timer.html 'Timer in GWT') at the same time.

This motivated me to write a simple abstract API ([oneUtils](https://github.com/mxro/oneUtils 'oneUtils: Concurrency API for JRE/GWT')), into which implementations for either a JVM environment or a GWT environment can be injected. Code, which uses this abstract API, can therewith be shared between JVM and GWT apps.

The abstract API currently supports the following features:

```java

public interface Concurrency {

    public abstract TimerFactory newTimer();

    public abstract ExecutorFactory newExecutor();

    public abstract void runLater(Runnable runnable);

    public abstract OneLock newLock();

    public abstract CollectionFactory newCollection();

}
```

An implementation for JVM environments is included in the library ([JreConcurrency](https://github.com/mxro/oneUtils/blob/master/oneUtils/src/main/java/one/utils/jre/concurrent/JreConcurrency.java 'Concurrency API Implementation for JRE Environment')), an implementation for a GWT environment is provided in the following gist:

[Gist: Default Implementation of Concurrency API in GWT](https://gist.github.com/2791639)

Below a few usage examples for the API:

[Usage of Executor API](https://github.com/mxro/oneUtils/blob/master/oneUtils/src/test/java/one/utils/tests/ExamplesExecutors.java) [Usage of Timer API](https://github.com/mxro/oneUtils/blob/master/oneUtils/src/test/java/one/utils/tests/ExamplesTimers.java) [Usage of Thread-Safe Collections API](https://github.com/mxro/oneUtils/blob/master/oneUtils/src/test/java/one/utils/tests/ExamplesCollections.java)

Please feel free to use the API + implementations. You can either [grab the project from github](https://github.com/mxro/oneUtils 'oneUtils on github') or link to the project via Maven:

Dependency:

```xml

<dependency>
    <groupId>one.utils</groupId>
    <artifactId>oneUtils</artifactId>
    <version>0.0.3</version>
</dependency>
```

Repository:

```xml

<repositories>
    <repository>
        <id>onedb Releases</id>
        <url>http://dl.dropbox.com/u/957046/onedb/mvn-releases</url>
    </repository>
</repositories>
```
