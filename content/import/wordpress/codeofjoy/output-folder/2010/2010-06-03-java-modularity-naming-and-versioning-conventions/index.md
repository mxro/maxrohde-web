---
title: 'Java Modularity: Naming and Versioning Conventions'
date: '2010-06-03'
categories:
  - 'java'
---

**General Guidelines**

- Use the same version number for the bundles and Maven artifacts for releases
- For snapshots, append .SNAPSHOT for the bundle version and -SNAPSHOT for Maven (E.g. Bundle: 0.0.1.SNAPSHOT, Artifact: 0.0.1-SNAPSHOT)
- Use the same name for bundle name and artifact ID
- When a number of bundles belong to one project, define a Java package and a prefix for this project (e.g. package „de.mxro“, prefix: „mx“)
- Use the prefix for the name of the module (and therewith for bundle name and artifact ID). Start the name of the module with a capital letter after the prefix (e.g. mxJena, mxApplicationFramework)
- Use the part of the module name de-capitalized to define a unique package for the module. (eg. mxJena --> de.mxro.jena, mxApplicationFramework --> de.mxro.applicationframework)
- Try to organize all the classes in the module under the unique package for this module.

**Handling of third party modules**

There are two main problems with third party libraries: (1) They often do not provide Maven artifact data (no pom.xml) (2) They often do not provide OSGi Metadata (in META-INF/MANIFEST.MF)

In case (1) there are two options: (1) Manually create a pom.xml for these libraries and upload them to your Maven repository (eg Nexus). (2) Directly embed the libraries in your modules as JAR files, as extracted class files or as source files (see [OSGi: Libraries Requiring Access to Bundle ClassLoader](http://nexnet.wordpress.com/2010/06/06/osgi-libraries-requiring-access-to-bundle-classloader/)).

The first option still leaves the problem that these libraries, though they now have become proper Maven dependencies, will not work in the OSGi container at Runtime as they are lacking OSGi meta-data.

The second option makes the libraries immediately available and useable by the bundle, which requires them. However, if more than one module requires this library, the same library would have to be delivered multiple times with the project (as it is embedded in all the modules, which require the library).

In my opinion, it is a good option to directly embed the libraries, if it can be assumed that the library will only be used by one module. I place the libraries under main/src/resources and make them available to the bundles classpath. I like this option as it hides the complete library in the bundle, which uses it. If the library is made available as OSGi bundle, often all the packages of the library need to be exported.

In a OSGi environment, it is usually not as easy as just uploading the library to your local repository. OSGi meta-data needs to be provided. For this, I again see two options:

(1) Download the source code of the library and add the OSGi meta-data (2) Download the binary/jar of the library and embed them to an otherwise empty project and add the OSGi meta-data.

In both cases, a new project needs to be created. I use a special prefix for these projects „thrd“ and use a unique group id, starting with „de.mxro.thrd“. This breaks up the rule that the classes in the package should be under the group id, but I rather have all third party libraries in one place in the repository.
