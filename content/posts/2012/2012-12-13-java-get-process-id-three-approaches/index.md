---
title: "Java Get Process Id: Three Approaches"
date: "2012-12-13"
categories: 
  - "java"
tags: 
  - "tutorial"
---

Java provides no robust way to obtain the id of the OS process in which the application is running.

That does not mean, however, that there is no way. There are actually a couple of ways, each with its own advantages and disadvantages. I will describe three possible ways in the following:

**1\. ManagementFactory.getRuntimeMXBean().getName()**

The class [ManagementFactory](http://docs.oracle.com/javase/6/docs/api/java/lang/management/ManagementFactory.html) in the package java.lang.management provides access to the "managed bean for the runtime system of the Java virtual machine". The getName() method of this class is described as:

> Returns the name representing the running Java virtual machine.

This name, as it happens, contains the process id in the Sun/Oracle JVM implementation of this methods in a format such as.

```java


System.out.println(ManagementFactory.getRuntimeMXBean().getName());

// --> 742912@localhost

```

Through applying a simple String split, this thus allows to obtain the pid of the current process through the following expression:

```java


ManagementFactory.getRuntimeMXBean().getName().split("@")[0]

```

_Advantages:_

- Quick and dirty

_Disadvantages:_

- Not guaranteed to work on all JVM implementations

**2\. Use Java Native Interface**

At least on most UNIX based systems, it is relatively easy to write a [quick JNA wrapper to the C library](http://jna.java.net/javadoc/overview-summary.html#library-mapping).

```java


// Alternative 1: interface-mapped class, dynamically load the C library
public interface CLibrary extends Library {
 CLibrary INSTANCE = (CLibrary)Native.loadLibrary("c", CLibrary.class);
}

```

You can then add a mapping to the getpid function:

```java


public interface CLibrary extends Library {
CLibrary INSTANCE = (CLibrary)Native.loadLibrary("c", CLibrary.class);

int getpid ();

}

```

And call this mapper as follows:

```java


int mypid = CLibrary.INSTANCE.getpid();

```

_Advantages:_

- Guaranteed to work as long as C library is available
- Depends on JNA under com.sun. ....

_Disadvantages:_

- Only works on UNIX based systems

**3\. Use the Java Virtual Machine Process Status Tool (jps)**

If your JVM comes with the utility [Java Virtual Machine Process Status Tool](http://docs.oracle.com/javase/1.5.0/docs/tooldocs/share/jps.html) you can call this tool by spawning a new process, and analyse its output to obtain the id of your Java process.

Since there are a million ways to get starting a process from Java and reading its output wrong, I will use the utility [java-start-process](https://github.com/mxro/java-start-process) for this:

```java


public static void getProcessId(final Class<?> mainClass,
 final Callback<String> callback) {

Spawn.startProcess("jps -l", null, new ProcessListener() {

@Override
 public void onProcessQuit(final int returnValue) {

}

@Override
 public void onOutputLine(final String line) {
 final String[] parts = line.split(" ");
 if (parts.length > 1 && parts[1].endsWith(mainClass.getName())) {
 callback.onDone(parts[0]);
 }
 }

@Override
 public void onErrorLine(final String line) {

}

@Override
 public void onError(final Throwable t) {

}
 });

}

```

_Advantages:_

- Works on both Windows and Linux when Oracle/Sun Java is installed and on classpath

_Disadvantages:_

- Complex
- Requires Sun JVM

**Resources**

[stackoverflow - How can a Java program get it's own process ID?](http://stackoverflow.com/questions/35842/how-can-a-java-program-get-its-own-process-id)

[stackoverflow - How do I obtain the PID of a spawned java process](http://stackoverflow.com/questions/7834270/how-do-i-obtain-the-pid-of-a-spawned-java-process)

 [](http://stackoverflow.com/questions/7834270/how-do-i-obtain-the-pid-of-a-spawned-java-process)
