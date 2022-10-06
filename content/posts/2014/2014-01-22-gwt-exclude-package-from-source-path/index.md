---
title: 'GWT Exclude Package From Source Path'
date: '2014-01-22'
categories:
  - 'java'
tags:
  - 'google-web-toolkit'
  - 'gwt'
---

**Problem**

The [Google Web Toolkit](http://www.gwtproject.org/) Java to JavaScript transpiler is a powerful tool to convert Java source code into JavaScript files. Unfortunately, not all Java code can be transpiled into JavaScript code by GWT.

Sometimes, a project contains a mix of Java code that can be converted into JavaScript and Java code that doesn't. In that case, the GWT compiler issues errors such as '**No source code is available for type ...**'.

**Solution**

GWT module definitions (.gwt.xml) files allow to specify [fine-grained rules](http://www.gwtproject.org/doc/latest/DevGuideOrganizingProjects.html#DevGuidePathFiltering) which files in a project are to be converted and which files should not. The rules are based on [Ant patterns](http://ant.apache.org/manual/dirtasks.html), which can be difficult to wrap one's head around. Below are a few handy examples.

_Exclude all files in packages with the name '/jre/'_

```xml
<source path='' >

    <exclude name="**/jre/**" />
</source>
```

_Exclude the file 'ForJre.java':_

```xml
<source path='' >
   <exclude name="**/ForJre.java" />
</source>
```
