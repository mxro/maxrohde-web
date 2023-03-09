---
authors:
- max
blog: maxrohde.com
date: "2012-05-13"
title: 'onedb 0.0.2: Update for Client Libraries'
---

I have just uploaded new [onedb client libraries](http://cms.onedb.de/downloads 'onedb client libraries') with version number 0.0.2.

The new client libraries mainly incorporate an advice from Java API expert [Lukas Eder](http://blog.jooq.org/ 'Java, SQL, and jOOQ / jOOX') (check out [JOOQ - a neat way to access SQL databases using a fluent Java API](http://www.jooq.org/ 'Java SQL')): All callback methods in the core API now have only **one** parameter; a simple data object, which allows access to the information, which before was handed to the callback method in form of parameters. For instance, the create realm operation in version 0.0.1 had the following primary callback method:

```java
@Override
public void thenDo(OneClient client, OneNode realmRoot, String secret, String partnerSecret) {
...
```

In version 0.0.2, the callback method for the create realm operation has been changed to contain only one parameter:

```java
@Override
public void thenDo(WithRealmCreatedResult r) {
...
```

The individual parameters (`client`, `realmRoot`, `secret`, `partnerSecret`) can now be accessed through the `WithRealmCreatedResult` object:

```text

client       : r.client()
realmRoot    : r.root()
secret       : r.secret()
partnerSecret: r.partnerSecret()
```

This has numerous advantages:

- Since callback methods are defined very often in code using onedb, source code size is reduced: instead of listing all parameters and their types, only callback result objects have to be defined in the method signatures.
- This reduction in source code, plus the avoidance of (unnecessary) type information increases the readability of the source code.
- The API is much easier to change without breaking client code; since methods/data can be added to the `*Result` objects without having to change the callbacks in the client code.

The [tutorial](http://maxrohde.com/2012/05/06/onedb-tutorial/ 'onedb Tutorial') has been updated to reflect the changes of the revised API.

All clients using the API version 0.0.1 will continue to work.