---
categories:
- java
date: "2010-11-26"
blog: maxrohde.com
title: Virtual File Systems (VFS) in Java
---

Many different solutions to persistence follow a similar structure: a hierarchical organization into files and folders. It appears sensible to access these representations using a common application interface.

Initially, I implemented my own little library, which was capable of accessing files on the hard disk and keeping them in memory. Now I found the Apache Commons VFS library ([http://commons.apache.org/vfs/](http://commons.apache.org/vfs/)), which offers similar functionality and more. I am thinking now to migrate my libraries to this library. However, I think also in one of the coming releases of Java a common API for file access should be included.

However, the VFS library is not trivial to get ready to plug into a Maven project. This can be achieved by the following steps:

- Checkout the current trunk using 'svn co http://svn.apache.org/repos/asf/commons/proper/vfs/trunk vfs' (I tested with revision 1032448)
- In the checked out files, go to the directory 'core'
- Test and package the current release (it was 2.1-SNAPSHOT as I tested, far higher than the version 1.0 available on public maven repositories or the 2.0-SNAPSHOT version on the apache snapshots repository): 'mvn compile package'
- Now you can upload the created commons-vfs-2.1-SNAPSHOT.jar from the folder /core/target to your local maven repository (the pom file is located in the directory /core/pom.xml.

You can start using the library using:

<groupId\>org.apache.commons</groupId\> <artifactId\>commons-vfs</artifactId\> <version\>2.1-SNAPSHOT</version\>

The created archive also has a MANIFEST.MF file with exported packages etc required for an OSGI environment.

**Resources**

[Examples of using Apache Commons VFS](http://commons.apache.org/vfs/api.html)

[Usage Example for SFTP](http://consultingblogs.emc.com/danielpipe/archive/2009/07/07/apache-commons-vfs-a-single-java-api-for-multiple-file-systems.aspx)

[A GUI written on top of Commons VFS](http://commons-vfs-ui.sourceforge.net/)