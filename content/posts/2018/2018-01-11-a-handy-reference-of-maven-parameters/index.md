---
categories:
- java
coverImage: maven-logo-black-on-white.png
date: "2018-01-11"
blog: maxrohde.com
tags:
- maven
title: A Handy Reference of Maven Parameters
---

I cannot count the times I have looked up the following through Google. Thus I decided to put together a few handy parameters (or properties or whatever is the correct term) for Maven builds.

All the below are given with the goal install but they can safely be used with any other Maven goal as well.

### Skip Tests

mvn install -DskipTests

### Build Only From Specified Project

This is only relevant in a multi pom.

mvn install -rf :\[artifactId\]

### Don't Compile JavaDoc

\-Dmaven.javadoc.skip=true

### Don't Compile GWT

\-Dgwt.compiler.skip=true