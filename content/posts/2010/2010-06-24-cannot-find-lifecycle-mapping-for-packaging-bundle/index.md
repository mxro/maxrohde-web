---
blog: maxrohde.com
categories:
- java
date: "2010-06-24"
title: 'Cannot find lifecycle mapping for packaging: ''bundle''.'
---

**Problem**

When trying to package or install a project using the maven-bundle-plugin, an error message as the following is given:

```

[ERROR] BUILD ERROR
[INFO] ------------------------------------------------------------------------
[INFO] Cannot find lifecycle mapping for packaging: 'bundle'.
Component descriptor cannot be found in the component repository: org.apache.maven.lifecycle.mapping.LifecycleMappingbundle.
```

**Solution**

I could resolved the problem by including the element <extensions>true</extensions> to the plugin definition for the maven-bundle-plugin.

<plugin>                                 <groupId>org.apache.felix</groupId>                                 <artifactId>maven-bundle-plugin</artifactId>                                 <extensions>true</extensions>                                 <configuration>                                         <instructions>                                                 <Bundle-SymbolicName>${pom.artifactId}</Bundle-SymbolicName>                                                 <Bundle-Version>${pom.version}</Bundle-Version>                                                 <Embed-Dependency>${module.embeddedDependencies}                                                 </Embed-Dependency>                                                 <Embed-Directory>target/dependency</Embed-Directory>                                                 <Import-Package>${module.importedPackages}</Import-Package>                                                 <Export-Package>${module.exportedPackages}</Export-Package>                                         </instructions>                                 </configuration>                         </plugin>

**Resources**

[Probblem with maven-bundle-plugin ("Cannot find lifecycle mapping for packaging: 'bundle")](http://www.mail-archive.com/users@felix.apache.org/msg03502.html) (Felix Mailing list)
