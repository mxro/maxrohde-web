---
blog: maxrohde.com
categories:
- java
date: "2011-10-14"
title: A Quick Reflection on Exceptions in Java
---

Exceptions are a necessary evil of most software development endeavours. As much as we would like to design applications, which are equivalent to mathematical functions 'give me one input and always I will trustfully return you the same output', the real world IOExceptions, OutOfMemoryExceptions, DivideByZeroExceptions and their various evil cousins force us to consider a versatile and often unpredictable state often out of our control.

The Java programming language, for instance, fundamentally provides four ways to inform a caller of a method of an 'exceptional' state:

- **Return Values** of methods allow passing information of an invalid state to the caller of the method. Often, a specific "null" value is used to denote "Sorry, I can't do what you ask me to do, 'cause of some unknown condition".
- **Checked Exceptions** can be added to the signature of methods to indicate that these methods could not be executed as planned. In difference to using return values, Checked Exceptions allow to express richer descriptions of the failure conditions. For instance, an IOException can be cast if an unexpected error occurred while reading/writing data from a source other than the memory.
- **Unchecked Exceptions** can be thrown anywhere and must not be declared as part of message signatures. Unchecked Exceptions where originally envisioned to capture unexpectable exceptions, for instance an OutOfMemoryException when the JVM runs out of memory.
- **Callbacks** are usually not as prominently used in Java as they are in JavaScript or node.js etc. However, they can be a powerful tool in Java. In principle, rather than return the result of a method as a return value, an object is passed to the method and the method calls specific methods of this object depending on the result of the method. The [GWT RPC mechanism](http://code.google.com/webtoolkit/doc/latest/tutorial/RPC.html) is a nice example for this, where a call to the remote server results either in a method onSuccess(…) or onFailure(…) to be called.

## Some Advantages and Disadvantages

Choice always comes with its challenges, so we remain with the question, which of these mechanisms to use to report unexpected states during the execution of a method to the consumer of the method. Below, a brief discussion of potential advantages and disadvantages of the types discussed so far:

### Return Values

Reporting unexpected states during the execution of a method in a return value is usually not a very good idea. The reason for this is that interpreting the result of the method becomes significantly more complex for the caller of this method. For instance, if the method divide(x,y) would report the divide by 0 exception through the return value, it would not be possible to use a number-based type such as Integer as the return type. Instead, a type like IntegerOrException would have to returned, which complicates using the method greatly.

### Checked Exceptions

Once propagated as innovative feature of the Java programming language, checked exceptions are now often portrayed as one of its most serious design flaws. Like reporting unexpected conditions in return values, defining checked exceptions significantly complicates consuming methods. This is particularly paramount since Java has adopted a quite verbose syntax for dealing with exceptions, which quickly undermines the elegance of any code fragment. Basically, any call to a method with checked exceptions quickly explodes from 1 LOC to 5 LOC (try … catch …).

### Unchecked Exceptions

Unchecked Exceptions are the unfriendly brothers of checked exceptions. They cause an application to immediately stop working and displaying a lengthy error report. Although it seems unintuitive at first, to write applications which are constantly on the verge of total collapse (e.g. an unchecked exception is thrown), relying on unchecked exceptions can lead to surprisingly reliable applications. Moreover, it is also possible to explicitly handle unchecked exceptions (using the good ol' try … catch …) to avoid a production system from crashing on unexpected exceptions. However, the number of such explicit 'checkpoints' for unchecked exceptions is usually far lower than for checked exceptions.

For me, unchecked exceptions actually come in two flavours: those caused by 'throw new RuntimeException(…)' statements and those cause by violated [assertions](http://download.oracle.com/javase/1.4.2/docs/guide/lang/assert.html) (assert text !=null). The latter are specific in that these exceptions will most likely be thrown only in development environments. For production, all assertions can be 'switched off', which can increase execution speed and a reduction in 'application breaking' exceptions being thrown.

### Callbacks

Callbacks, in my opinion, are an underused 'feature' of the Java programming language. The node.js folks are not too wrong claiming that any operation depending on external resources (remote server, file system, …) should be done in an asynchronous ways. This is enabled by callbacks, since it is undefined, when the return methods will be called. Callbacks are usually a good choice if the caller of a method needs to respond differently to different unexpected states. Was there an error reading from the filesystem or sending a call to the server, or both? In this case, callbacks allow for an elegant way to make the caller of a service aware of these states, which must be handled, since each state can be represented by one method on the callback object.

## Conclusion: A User-Centric Perspective

It is difficult to say which is the 'right' way of handling unexpected states since each one has their own advantages and disadvantages. I think one could sometimes even make a case for checked exceptions. In general, I find it very helpful to aid my decisions by thinking of the type of the unexpected state as well as the nature of the user of the provided method.

### Do you think the unexpected state is 'impossible'?

**Yes.** Sometimes the program can be expected to work in a certain way and an unexpected condition is simply unthinkable. An example for such a condition would be one key being existent in a Map twice. In such a case, **_assertions_** are the way to go, assume that after the application is tested and goes in production such highly dysfunctional conditions should have been eradicated.

**No.** If the exception condition can be expected, assertions are not a good option. For instance, an error might be encountered while reading a file from the disk. Such exceptional circumstances are likely to happen in production environments. Therefore, I would use **_callbacks_** to inform the caller of the method of potential exceptions occurring during execution of the method.

### Is the unexpected state caused by an improper use of your interface?

**Yes.** Every object, even those not explicitly extending an interface have the programmatic interface of the sum of methods it implements. Conceptually, there are certain rules how these methods need to be used above providing the right data types for the parameters. For instance, it is not sensible to insert an element into a set, which is already defined in this set. In this case, I prefer to use **unchecked exceptions**, which provide the user of your interface with a clear message of what is going wrong (e.g. 'Element X cannot be inserted since it is already defined in the set'). Note that the [preconditions in Google Guava](http://www.shirmanov.com/2010/06/using-preconditions-from-google-guava.html) are a nice tool for this purpose.

**No**. If the unexpected state is not cause by an improper use of your interface, the impossibility question listed above can be applied to determine wither to use assertions or callbacks.

**Resources**

Blog post "[Programming antipatterns](http://glenndejaeger.wordpress.com/2010/04/05/programming-antipatterns/ 'Programming Antipattern')"
