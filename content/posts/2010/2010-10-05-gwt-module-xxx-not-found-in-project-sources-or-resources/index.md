---
blog: maxrohde.com
categories:
- java
date: "2010-10-05"
title: GWT Module XXX not found in project sources or resources.
---

**Problem**

After adding a dependency to a GWT module, which is declared as Maven dependency, GWT Maven plugin does not compile correctly.

\[INFO\] ------------------------------------------------------------------------ \[ERROR\] BUILD ERROR \[INFO\] ------------------------------------------------------------------------ \[INFO\] GWT Module org.restlet.Restlet not found in project sources or resources. \[INFO\] ------------------------------------------------------------------------

**Solution**

The solution in this case was rather simple. The module name was not correct (it was org.restlet.gwt.GWT).

However, other causes might be: - an old version of the GWT Maven plugin - in that case make sure to use the 1.3-SNAPSHOT or 1.3.1.google versions - the jar archive downloaded from the Maven repository might not include \*.java sources. In this case a better version for this JAR must be found. The compileSourcesArtifacts might also help ([Writing a GWT Library](http://mojo.codehaus.org/gwt-maven-plugin/user-guide/library.html); [Maven plugin documentation compileSourcesArtifacts](http://mojo.codehaus.org/gwt-maven-plugin/compile-mojo.html#compileSourcesArtifacts))

**Resources**

[Writing a GWT Library](http://mojo.codehaus.org/gwt-maven-plugin/user-guide/library.html) with Maven GWT plugin [GWT Maven Plugin 2.1 (???)](http://people.apache.org/~nicolas/gwt-maven-plugin-2.1/index.html) [Maven plugin documentation compileSourcesArtifacts](http://mojo.codehaus.org/gwt-maven-plugin/compile-mojo.html#compileSourcesArtifacts) [Post Maven and GWT can live together](http://amitmisra.wordpress.com/2010/06/18/maven-and-gwt-can-live-together/) [Configure Maven, GWT and eclipse](http://jefferyhaynes.net/2010/02/15/gwt-and-maven-oh-the-agony/) [Example how to set up GWT with Maven dependencies (Vaadin)](https://vaadin.com/forum/-/message_boards/message/149157) [JIRA Bug report for inherited modules not being compiled by GWT maven plugin](http://jira.codehaus.org/browse/MGWT-147) [Mojo class, which generates the error message](http://grepcode.com/file/repo1.maven.org/maven2/org.codehaus.mojo/gwt-maven-plugin/1.2/org/codehaus/mojo/gwt/AbstractGwtModuleMojo.java) [Nabble message](<http://old.nabble.com/-jira--Created:-(MGWT-41)-Unable-fire-up-GWT-Shell-if-noServer-=-true-and-runTarget-=-http:--localhost:8080-test.html-td23131759.html>) [Another mail group discussion](http://markmail.org/message/h52xvo4j52msambe#query:+page:1+mid:rv644kzftwo27hnc+state:results)
