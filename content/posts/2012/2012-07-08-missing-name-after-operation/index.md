---
date: "2012-07-08"
blog: maxrohde.com
title: Missing Name After . Operation
---

## Problem

While accessing a GWT/Java class using the JSNI interface from JavaScript, GWT reports an exception along the lines of '**missing name after . operation**'.

This might also happen when using the automated Java à JavaScript API converter [gwt-exporter](http://code.google.com/p/gwt-exporter/).

## Analysis

This problem is caused by invalid JavaScript statements. In particular, if any of the Java packages and sub-packages contain words, which are **reserved words in JavaScript but not in Java**, JavaScript will not be able to evaluate the line referencing the Java object.

For instance:

com.mycomp.export.User is invalid, since the package name 'export' is a reserved word in JavaScript.

## Solution

Avoid package names, which equal reserved JavaScript words such as export, var, goto, …

Refactor your existing classes and move them to packages with names not including any JavaScript reserved words.

## References

[JavaScript reserved words](http://www.javascripter.net/faq/reserved.htm)

[Discussion Thread JSNI Reserved Word](http://comments.gmane.org/gmane.org.google.gwt/49488)