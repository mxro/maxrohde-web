---
title: 'Gwt and Maven Jetty Plugin'
date: '2011-03-01'
categories:
  - 'java'
---

The [Maven Gwt Plugin](http://mojo.codehaus.org/gwt-maven-plugin/) is a powerful tool in developing Gwt applications using Maven Build Management. I have set up my development environment to code and run JUnit test in eclipse IDE (without using eclipse IAM etc but the Maven Eclipse Plugin instead), and I test gwt code using the Maven Gwt Plugin, either using the gwt:run or gwt:test goals.

In combination with the Maven Jetty Plugin it is very easy to deploy Maven dependent Gwt applications into an exploded war or a packed war. Below the required plugins plus versions as well as some sample commands.

# Required Plugins

[Maven War Plugin](http://maven.apache.org/plugins/maven-war-plugin/)

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><span style="font-family:Courier New;">&lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;</span></p><p><span style="font-family:Courier New;">&lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;</span></p><p><span style="font-family:Courier New;">&lt;version&gt;2.1.1&lt;/version&gt;</span></p></td></tr></tbody></table>

Maven Gwt Plugin ([see repository location](http://maxrohde.com/2010/12/14/gwt-maven-plugin-2-1-1-snapshot-repository/))

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><span style="font-family:Courier New;">&lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;</span></p><p><span style="font-family:Courier New;">&lt;artifactId&gt;gwt-maven-plugin&lt;/artifactId&gt;</span></p><p><span style="font-family:Courier New;">&lt;version&gt;2.1.1-SNAPSHOT&lt;/version&gt;</span></p></td></tr></tbody></table>

[Maven Jetty Plugin](http://wiki.eclipse.org/Jetty/Feature/Jetty_Maven_Plugin)

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><span style="font-family:Courier New;">&lt;groupId&gt;org.mortbay.jetty&lt;/groupId&gt;</span></p><p><span style="font-family:Courier New;">&lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;</span></p></td></tr></tbody></table>

# Pom.xml Settings

The jetty server instance will require gwt-servlet.jar. Below a convenient way to define this archive as additional dependency.

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;"><span style="background-color:silver;">dependency</span><span style="color:teal;">&gt;</span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">groupId<span style="color:teal;">&gt;<span style="color:black;">com.google.gwt<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">groupId<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">artifactId<span style="color:teal;">&gt;<span style="color:black;"><span style="text-decoration:underline;">gwt</span>-<span style="text-decoration:underline;">servlet</span><span style="color:teal;">&lt;/<span style="color:#3f7f7f;">artifactId<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">version<span style="color:teal;">&gt;<span style="color:black;">${gwtVersion}<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">version<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">scope<span style="color:teal;">&gt;<span style="color:black;">war<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">scope<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;/<span style="color:#3f7f7f;"><span style="background-color:silver;">dependency</span><span style="color:teal;">&gt;</span></span></span></p></td></tr></tbody></table>

Maven War Plugin configuration

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;"><span style="background-color:silver;">plugin</span><span style="color:teal;">&gt;</span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">groupId<span style="color:teal;">&gt;<span style="color:black;">org.apache.maven.plugins<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">groupId<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">artifactId<span style="color:teal;">&gt;<span style="color:black;"><span style="text-decoration:underline;">maven</span>-war-<span style="text-decoration:underline;">plugin</span><span style="color:teal;">&lt;/<span style="color:#3f7f7f;">artifactId<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">version<span style="color:teal;">&gt;<span style="color:black;">2.1.1<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">version<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p>&nbsp;</p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">configuration<span style="color:teal;">&gt;</span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">warSourceDirectory<span style="color:teal;">&gt;<span style="color:black;">war<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">warSourceDirectory<span style="color:teal;">&gt;</span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;<span style="color:#3f7f7f;">webXml<span style="color:teal;">&gt;<span style="color:black;"><span style="text-decoration:underline;">src</span>/main/<span style="text-decoration:underline;">webapp</span>/WEB-INF/web.xml<span style="color:teal;">&lt;/<span style="color:#3f7f7f;">webXml<span style="color:teal;">&gt;<span style="color:black;"></span></span></span></span></span></span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;/<span style="color:#3f7f7f;">configuration<span style="color:teal;">&gt;</span></span></span></p><p><span style="color:teal;font-family:Courier New;font-size:10pt;">&lt;/<span style="color:#3f7f7f;"><span style="background-color:silver;">plugin</span><span style="color:teal;">&gt;</span></span></span></p></td></tr></tbody></table>

# Deploying & Running

Run jetty from the exploded project contents in your project's directory with your Gwt application.

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>mvn gwt:compile jetty:run –Djetty.port=9990</p></td></tr></tbody></table>

Deploy Gwt application to a packaged war:

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>mvn war:war</p></td></tr></tbody></table>

(should trigger goal gwt:compile)

Extract a generated war and run the exploded war contents in jetty.

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>mvn jetty:deploy-war –Djetty.port=9998</p></td></tr></tbody></table>
