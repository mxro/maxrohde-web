---
title: "Maven-Eclipse-Plugin: Problem with Project Dependencies"
date: "2010-06-24"
categories: 
  - "java"
---

**Problem**

When creating eclipse meta-data with the maven-eclipse-plugin for plug-in projects, other related projects, which are part of the same eclipse workspace are not added to the project‘s classpath.

Therewith, the project, although it compiles without problems in maven, shows syntax errors such as „\[class\] cannot be resolved“ and „No available bundle exports \[...\]“.

**Solution**

One way is to manually disable the feature of the plugin, which tries to configure the project references. You can create the projects using the following command:

mvn eclipse:clean clean package eclipse:eclipse -Declipse.pde **\-Declipse.useProjectReferences=false** install

Another way is to change the way you name your projects. Apparently, the plugin expects the project names to be equal to the Maven artifactIds.

You can also provide your own template for project names using -DprojectNameTemplate=\[groupId\]-\[artifactId\].

**Resources**

[Project dependency issue with maven-eclipse-plugin 2.6](http://www.func.nl/community/knowledgebase/project-dependency-issue-maven-eclipse-plugin-26) (Func Community) [JIRA bug on autodiscovery of project dependencies with the plugin](http://jira.codehaus.org/browse/MECLIPSE-552) [maven-eclipse-plugin 2.6 project references](http://maven.40175.n5.nabble.com/maven-eclipse-plugin-2-6-project-references-td117370.html#a117370) (Mail)
