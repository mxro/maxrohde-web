---
categories:
- java
date: "2012-05-20"
blog: maxrohde.com
title: 'onedb 0.0.3: Client API and Documentation Updated'
---

A new version for the onedb client libraries (0.0.3) is now available for [direct download](http://cms.onedb.de/downloads 'onedb downloads') or as maven dependency.

The new versions will work with any API key obtained from [www.onedb.de](http://www.onedb.de/).

onedb Java Test Toolkit:

```xml

    <dependency>
        <groupId>one.test.jre</groupId>
        <artifactId>oneTestJre.min</artifactId>
        <version>0.0.3</version>
    </dependency>
```

onedb Java Client:

```xml

    <dependency>
        <groupId>one.client.jre</groupId>
        <artifactId>oneClientJre.min</artifactId>
        <version>0.0.3</version>
    </dependency>
```

onedb release repository (in `<project>`):

```xml

    <repositories>
        <repository>
            <id>onedb Releases</id>
            <url>http://dl.dropbox.com/u/957046/onedb/mvn-releases</url>
        </repository>
    </repositories>
```

## API Improvments

This release primarily implements feedback from Michael received by email (Thanks!).

Michael has pointed out:

> The name of the ShutdownCallback class does not 'fit in' with the general naming pattern for callbacks (When\*).

This irregular naming pattern is of course no instance of a [well-designed API](http://kscottmorrison.com/2012/04/20/the-well-designed-api/ 'The Well-Designed API')! To remedy this incoherence, the ShutdownCallback has been renamed to `WhenShutDown` and the primary callback method has been renamed to the usual `thenDo(...)`.

> The select operation returns a list of strings when all children are selected but a list of references in case the children are filtered according to some criteria.

The select operation returned a list of strings primarily for performance reasons. Thanks to some design decisions for engine and API, the list of children returned by the select operation is a direct reference to the internal collection of `ArrayLists`, which is used as a local cache by the onedb client (wrapped, of course, in a unmodifiable list). This allows to access the list of child references with very little memory and CPU overhead.

However, [premature optimization is the root of all ... not good things](http://shreevatsa.wordpress.com/2008/05/16/premature-optimization-is-the-root-of-all-evil/). Therefore, the default return value for the select operation has now been changed to a list of references, which is not only aligned with the other select operations but also allows to use the results of the select operation without having to wrap the returned string values in a `One.reference(...)` call.

Moreover, the option for good performance must not be abandoned. I have added a new operation variant `One.select(...).allChildrenFast()`, which allows to access a list of strings in the same way the `One.select(..).allChildren()` operation did in versions [0.0.1](http://maxrohde.com/2012/05/06/introducing-onedb/) and [0.0.2](http://maxrohde.com/2012/05/14/onedb-0-0-2/ 'onedb 0.0.2 release notes').

## Documentation

All [examples](https://github.com/mxro/onedb-examples) and [tutorials](http://maxrohde.com/2012/05/06/onedb-tutorial/) have been updated to reflect the API changes in version 0.0.3.

A new document has been added to the documentation, which [explains the various representations of nodes in onedb](http://maxrohde.com/2012/05/15/node-types-in-onedb/ 'node types in onedb').

Various little changes have been made to the [onedb tutorial](http://maxrohde.com/2012/05/06/onedb-tutorial/ 'onedb Tutorial') to make some of the more complex issues easier to understand.

## Bugfixes

The signature of the `One.reference(..)` was incorrect and did not allow to obtain the references of generic objects. The method signature has been fixed.

## Compatibility

Clients built with version [0.0.1](http://maxrohde.com/2012/05/06/introducing-onedb/) and [0.0.2](http://maxrohde.com/2012/05/14/onedb-0-0-2/ 'onedb 0.0.2 release notes') will continue to work with the onedb cloud without need for modification.