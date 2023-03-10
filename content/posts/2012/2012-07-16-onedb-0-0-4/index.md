---
blog: maxrohde.com
categories:
- java
date: "2012-07-16"
title: onedb 0.0.4
---

The version 0.0.4 of the core client library and the test library for [onedb](http://www.onedb.de 'onedb cloud database') have been released. In addition to a small enhancement and bugfix also some documentation has been added. Please find the details below.

The development of onedb has made extensive use of the OSGi platform to assure that the library is truly modular and no unwanted interdependencies between different components 'creep' into the codebase. I use OSGi also in other projects and, since it is often difficult to find OSGi ready versions of Maven artifacts, I have [uploaded a number of such artifacts on github](https://github.com/mxro/osgi-maven).

Apart from the smaller changes made to the client libraries, some bigger changes are in the works on the server-side. In particular, a number of changes have been made to accommodate the almost ready JavaScript API. I will write a separate post about these changes once they have been fully tested.

All older client libraries (0.0.1-0.0.3) should continue to function. No API breaking changes have been introduced in 0.0.4 (for apps written against the API of 0.0.3).

## Documentation

There is now a small [Java swing example application](https://github.com/mxro/oneDesktop/) available on github. At the moment, only two screens are implemented:

- [Screen 1](https://github.com/mxro/oneDesktop/blob/f43af0cf6d8d4b2a70a1ed69f1c640c30a877379/oneDesktop/src/main/java/one/app/desktop/internal/CreateRealmForm.java): Provides a simple user interface to create new realms (note, you will need to obtain an API key from the onedb website for this feature)
- [Screen 2](https://github.com/mxro/oneDesktop/blob/f43af0cf6d8d4b2a70a1ed69f1c640c30a877379/oneDesktop/src/main/java/one/app/desktop/internal/UploadTextForm.java): Provides a simple user interface to upload node with text to onedb.

## Enhancements

- It is now possible to 'identify' security tokens with the URI of the node, for which they grant access. This helps client and server negotiate the correct required secret for a node. For instance:

one.newNode("mysecret").asReadTokenWithIdentification("[http://u1.linnk.it/erg/myrealm](http://u1.linnk.it/erg/myrealm)");

## Bugfixes

- The pom.xml file for oneTestJre.min and oneClientJre.min could lead to problems in some cases, since they included a dependency to the internal artefact oneClientJre. The pom.xml files for the 0.0.4 artifacts resolve this problem.
