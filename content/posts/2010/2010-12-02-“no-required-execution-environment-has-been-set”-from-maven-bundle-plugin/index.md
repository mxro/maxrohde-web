---
blog: maxrohde.com
date: "2010-12-02"
title: “No required execution environment has been set” from Maven Bundle Plugin
---

**The Problem**

After generating the MANIFEST.MF with the [Apache Felix Maven Bundle Plugin](http://felix.apache.org/site/apache-felix-maven-bundle-plugin-bnd.html) (BND) for an eclipse project, eclipse warns that "No required execution environment has been set".

**The Solution**

The solution is to add an instruction to the configuration of the maven bundle plugin and explicity specify the execution environment as shown below.

<plugin\>

<groupId\>org.apache.felix</groupId\>

<artifactId\>maven\-bundle-plugin</artifactId\>

<extensions\>true</extensions\>

<configuration\>

<instructions\>

<Bundle-SymbolicName\>${project.artifactId}</Bundle-SymbolicName\>

<Bundle-Version\>${project.version}</Bundle-Version\>

<Import-Package\>${module.importedPackages}</Import-Package\>

<Export-Package\>${module.exportedPackages}</Export-Package\>

<Service-Component\>${module.serviceDefinitions}</Service-Component\>

**<Bundle-RequiredExecutionEnvironment\>JavaSE-1.6</Bundle-RequiredExecutionEnvironment\>**

</instructions\>

</configuration\>

</plugin\>
