---
title: "Subversion and Maven"
date: "2010-05-31"
categories: 
  - "java"
---

Maven and subversion both manage different versions of development projects but they have different focusses. While Maven focusses on the management of whole modules/projects/packages, subversion manages each and every file of the development.

In Maven, the version that is currently under development is annotated with the version postfix „-SNAPSHOT“. In subversion, the current development version is usually found in the folder „trunk“ (see [discussion of subversion and directory structure](http://www.germane-software.com/~ser/R_n_R/subversion.html)).

The basic setup to use maven and subversion is to have a -SNAPSHOT project in Maven and a corresponding trunk folder in subversion.

A more sophisticated setup involves managing releases. Maven can be configured to create a new folder in Subversion‘s „tags“ directory for every release version in maven (that is versions, which do not end on „-SNAPSHOT“). Below are some tutorials, which describe the process.

It is also rather easy to create these tags versions with the IDE. In eclipse, for instance, just right click the project and select Team / Tag ... to create a new tagged folder for a release. A bit of manual work but you have a clear track of what is happing.

When using an IDE, I would recommend to use the built-in subversion functionality (or the subversion plugins in case of eclipse), for the every day development, and the Maven plugin to explicitly handle releases.

**Resources**

[Tutorial showing how to setup subversion to use with Maven](http://wiki.gxdeveloperweb.com/confluence/display/GXDEV/Maven+and+Source+Control+Management+in+Subversion) [Tutorial showing how the maven release plugin is used](http://weblogs.java.net/blog/2008/08/31/using-maven-release-plugin) [A simple example using Maven and Subversion](http://institute.expressionist.nl/icookbook1/maven/maven103/) [Documentation of maven-release plugin](http://maven.apache.org/guides/mini/guide-releasing.html) [Adding Cruise Control to an Maven/SVN environment](http://lijinjoseji.wordpress.com/2008/04/29/configuring-cruise-control-with-maven2-and-svn-146-for-continuous-build-environment/) for Continuous Integration [Reuse subversion build number for Maven build](http://blog.redstream.nl/2008/06/26/using-the-subversion-buildnumber-with-maven/)
