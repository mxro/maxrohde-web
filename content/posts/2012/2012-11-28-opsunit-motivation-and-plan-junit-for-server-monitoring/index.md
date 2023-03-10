---
authors:
- max
blog: maxrohde.com
date: "2012-11-28"
title: OpsUnit Motivation and Plan (JUnit for server monitoring)
---

While the infrastructure for [Appjangle](http://appjangle.com/) and [Nextweb](http://nextweb.io) has been humming along without any major problems, I have been thinking about ways to improve the long-time stability of the servers.

Being lazy in the sense that I dread any tasks, which I believe could be automated, I have created a few bash scripts on the cloud servers. These do some regular checks and restart the servers in periodic intervals.

Mainly, I seek to assure that the servers remain operational, even if no one is available to watch them.

However, the current solution is somewhat deficient, since with every server restart, there is a period of about 2 to 3 seconds, in which RPC calls and web requests are delayed.

Ideally, I would like to restart the servers only when it would be necessary to restart them (some unexpected error occurs), not all the time.

My plan is to build a simple monitoring process, which will do periodic checks of the deployed server infrastructure. In case any of the monitored services performs unsatisfactorily (low performance or no performance), this monitoring process should then perform some operations to restore the server (restart a component of the server or the OS level process if worst comes to worst).

While I am sure there are a number of solutions out there to achieve this, I am, as always, seeking something that is as lightweight as possible ([JMX](http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html), for instance, in my view, is too heavyweight).

I will have a try at building a simple framework, which will utilize JUnit tests to do periodic checks on the server and then perform a set of simple actions, once one of the tests fails.  
The basic architecture of the system is composed of the following components:

**JUnit Test**  
These can be vanilla JUnit test cases, which perform actions on the cloud servers through the same means as a normal client would.  
**JUnit Test Runner**  
The unit tests can be run by a standard Junit test runner (The [Text-based variant](http://junit.sourceforge.net/junit3.8.1/javadoc/junit/textui/TestRunner.html)).  
**Response**  
A simple interface, such as [Runnable,](http://docs.oracle.com/javase/1.4.2/docs/api/java/lang/Runnable.html) which allows to specify an action to be taken in case a unit test (executed by the test runner fails). Each response should also have an escalation level. Meaning that multiple responses can be chained and executed in order of increasing escalation (for instance from restart server component to restart server gracefully to kill server process :) ).**Job**  
A periodical job, which will execute a number of JUnit test cases and run the appropriate responses as required. A job shall have the following properties:

- A list of unit tests
- A list of responses
- An interval in which the job is to be executed

**Job Runner**  
A simple manager, which will run the jobs as required by their specified intervals.

I’ve set up a [github project](https://github.com/mxro/opsunit), opsunit; but not much there yet. I think I will get to set up this framework in the next days.
