---
categories:
- java
date: "2010-06-30"
primaryBlog: maxrohde.com
title: Maven Bundle Plugin Configuration
---

In a previous post, I have provided an example of a possible [Maven configuration to use the maven eclipse plugin with eclipse PDE](http://maxrohde.com/2010/06/29/maven-eclipse-plugin-and-eclipse-pde-the-right-configuration/). Besides these settings, which are the same for every project, each bundle needs to be configured as OSGi bundle in order to be usable by eclipse PDE.

<properties\>                 <module.group\></module.group\> <!-- Maven groupId -->                 <module.name\></module.name\> <!-- Maven artifactId -->                 <module.version\></module.version\> <!-- Maven artifact version -->                 <module.description\></module.description\>                 <module.url\>[http://www.mxro.de/](http://www.mxro.de/)</module.url\>                 <module.importedPackages\>\*                 </module.importedPackages\>                 <module.exportedContents\></module.exportedContents\>                 <module.exportedPackages\>                         </module.exportedPackages\>                 <module.embeddedDependencies\>                 </module.embeddedDependencies\>                 <module.embedTransitive\>false                 </module.embedTransitive\>                 <module.serviceDefinitions\>                 </module.serviceDefinitions\>         </properties\>

The project settings need to to be specified later in the pom:

<groupId\>${module.group}</groupId\>         <artifactId\>${module.name}</artifactId\>         <version\>${module.version}</version\>         <name\>${module.name}</name\>         <description\>${module.description}</description\>         <url\>${module.url}</url\>         <packaging\>bundle</packaging\>

The remainder of the pom is composed of the elements necessary for the maven eclipse plugin and and the following additional Maven bundle plugin.

<!-- FOR BUNDLE MANAGEMENT -->                         <!-- The Maven bundle plugin generates Meta-data required for OSGi -->

<plugin\>                                 <groupId\>org.apache.felix</groupId\>                                 <artifactId\>maven\-bundle-plugin</artifactId\>                                 <extensions\>true</extensions\>                                 <configuration\>                                         <instructions\>                                                 <Bundle-SymbolicName\>${pom.artifactId}</Bundle-SymbolicName\>                                                 <Bundle-Version\>${pom.version}</Bundle-Version\>                                                 <Import-Package\>${module.importedPackages}</Import-Package\>                                                 <Export-Package\>${module.exportedPackages}</Export-Package\>                                                 <Service-Component\>${module.serviceDefinitions}                                                 </Service-Component\>                                                 <Embed-Dependency\>${module.embeddedDependencies}                                                 </Embed-Dependency\>                                                 <Embed-Directory\>target/dependency</Embed-Directory\>                                                 <Embed-Transitive\>${module.embedTransitive}</Embed-Transitive\>                                                 <\_exportcontents\>${module.exportedContents}</\_exportcontents\>                                         </instructions\>                                 </configuration\>                         </plugin\>