---
date: "2014-09-08"
blog: maxrohde.com
tags:
- gradle
- maven
title: Force Android Studio to Update Maven Snapshot Dependencies
---

## Problem

You are using Gradle to build your Android Studio project and you have linked Maven SNAPSHOT modules.

When you build your project, Gradle/Android Studio does not grab the latest version of the SNAPSHOT module but instead uses a cached version.

## Solution

Add the following to your build.gradle:

configurations.all {

resolutionStrategy {

cacheChangingModulesFor 0, 'seconds'

}

}

## References

[Gradle DSL Documentation - Resolution Strategy](http://www.gradle.org/docs/current/dsl/org.gradle.api.artifacts.ResolutionStrategy.html)

[Gradle Documentation Chapter 50, Section 50.9.22 Refresh](http://www.gradle.org/docs/current/userguide/dependency_management.html)

[Gradle Forum – Use latest version of changing module](http://forums.gradle.org/gradle/topics/downloading_locally_cached_artifact)