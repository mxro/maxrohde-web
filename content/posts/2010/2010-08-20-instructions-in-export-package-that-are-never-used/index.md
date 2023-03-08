---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-08-20"
title: Instructions in Export-Package that are never used
---

**Problem**

The Maven BND plugin does not add a package to the MANIFEST.MF of a bundle although the bundle is declared as exported package in the pom.xml

<plugin\> <groupId\>org.apache.felix</groupId\> <artifactId\>maven\-bundle-plugin</artifactId\> <extensions\>true</extensions\> <configuration\> <instructions\> <Bundle-SymbolicName\>${pom.artifactId}</Bundle-SymbolicName\> <Bundle-Version\>${pom.version}</Bundle-Version\> <Import-Package\>${module.importedPackages}</Import-Package\> <Export-Package\>de.linnk.application</Export-Package\> <Service-Component\>${module.serviceDefinitions} </Service-Component\> <Embed-Dependency\>${module.embeddedDependencies} </Embed-Dependency\> <Embed-Directory\>target/dependency</Embed-Directory\> </instructions\> </configuration\> </plugin\>

Maven reports in the output:

\[WARNING\] Warning building bundle de.linnk.fatclient:lnFatClient:bundle:0.0.1-SNAPSHOT : **Instructions in Export-Package that are never used: de\\.linnk\\.application** \[WARNING\] Warning building bundle de.linnk.fatclient:lnFatClient:bundle:0.0.1-SNAPSHOT : **Superfluous export-package instructions:** \[de.linnk.application\]

**Solution**

Double check if all bundles declared under "Export-Package" really exist in the bundle. In my case, the packaged specified under "Export-Package" did not exist in the bundle. This can, for instance, happen after refactoring package names and forgetting to update the package names in the manifest (Thanks, [royp](http://skirmishing.wordpress.com)).

The warning messages here could really be a little bit more explicit.