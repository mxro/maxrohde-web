---
title: 'onedb Architecture and Design'
date: '2012-05-05'
categories:
  - 'java'
---

This article gives a brief overview of a number of key design concepts underlying the [onedb](http://www.onedb.de 'onedb') service:

- [Architecture Overview](#architecture)
- [Core Data Model](#datamodel)
- [Realms](#realms)
- [Core Operations](#operations)
- [Client Sessions](#clients)
- [Synchronization](#synchronization)

For an introduction to onedb and the motivation for this service, please check the article "[Introducing onedb: Connect Small Data in the Cloud](http://maxrohde.com/2012/05/06/introducing-onedb/ 'onedb: Connect Small Data in the Cloud')".

You can sign up for a free API key on the [onedb homepage](http://www.onedb.de 'onedb').

## Architecture Overview

A problem in many cloud-based databases is the increased latency when accessing data on a remote server. In onedb, all data manipulation and query operations are executed against a local replication of data from the cloud to reduce latency. Data of this local replication is kept in sync with the cloud through an automated synchronization process.

![onedb architecture](https://docs.google.com/drawings/pub?id=13vsObXPNhafBL1gUjKTBwjoeV2HU1hRL4LyMoyE3CKI&w=325&h=187)

Working with a local copy of data from the server rather than sending API calls to the server allows reducing the latency of many operations and reduce traffic between client and server. Of course, a similar result can be achieved by using caches. However, to implement and maintain these is often a labor-intensive matter (for another approach/architecture to synchronization [check Kresten Thorup's presentation on synchronization using the Riak NoSQL database](http://www.infoq.com/presentations/Bringing-Riak-to-the-Mobile-Platform 'Presentation: Bringing Riak to the Mobile Platform')).

## Core Data Model: Nodes and Global Connections

The data model of onedb is based on two components: nodes and global connections.

### Nodes

**Nodes**, in essence, are values expressed as basic data types (text, numbers, dates, ...) or user-defined objects such as the following:

```java
String node1 = "foo";
Integer node2 = 42;
Object node3 = new MyObject();
Object node4 = One.newNode().asPublicReadToken();
Object node5 = One.newNode("foo").at("http://u1.linnk.it/efffe/foo");
```

Every node in onedb has one or more physical locations and one globally unique virtual address expressed as [URI](http://www.ietf.org/rfc/rfc2396.txt 'RFC 2396 URI') such as the following:

```text
https://u1.linnk.it/1owvl3/foo (value "foo")
https://u1.linnk.it/nkzzku/42 (value 42)
```

The virtual address of every node is resolvable the spirit of Linked Data. In particular, a node can have multiple resolvable representations, for instance:

```text
XML  : https://u1.linnk.it/1owvl3/foo.value.xml
HTML : https://u1.linnk.it/1owvl3/foo.value.html
JSON : https://u1.linnk.it/1owvl3/foo.value.json
```

Although every node has got a globally unique virtual address, there are two different ways in which these addresses are assigned: internally and externally.

#### Internal Addresses

Nodes have an internal address, if the address of the node is defined when the node is created. For instance, the following statement creates a node with an internal address:

```java
OneNode homepage =
        One.newNode("homepage")
           .atAddress("https://u1.linnk.it/ud06vg/home");
```

Although using the `newNode` operation it is possible to assign any URI to a newly created node, there is only a limit range of URIs, which will be accepted by the onedb cloud. In particular, it is not allowed to define nodes with URIs, which lie outside the URI range of a known realm.

```text
Realm    : https://u1.linnk.it/jxb247/realm
Allowed  : https://u1.linnk.it/jxb247/realm/mynode
Forbidden: https://u1.linnk.it/mynode
```

To aid in defining valid URIs for nodes, the append statement allows to define an `.atAddress(..)` parameter. This parameter will append the specified value with the specified URI relative to the node it is appended to. For instance, the following statement ...

```java
OneNode news =
  One.append("news").to(realmRoot).atAddress("./news").in(client);
```

... will create a node with the value `"news"` and an internal address relative to the realm root such as:

```text
Realm root: https://u1.linnk.it/ud06vg/home
News node : https://u1.linnk.it/ud06vg/home/news
```

It is generally a good practice to define nodes with internal addresses, since they allow the onedb engine to identify these nodes with greater speed and accuracy.

#### External Addresses

One major disadvantage of nodes with an internal address is that they must implement the interface `OneNode` to provide their address to the onedb engine. This is often not possible for legacy classes or conflicts with building ['pure' POJO](http://thomassundberg.wordpress.com/2010/01/19/how-to-convert-a-pojo-to-xml-with-jaxb/ 'How to convert a POJO to XML with JAXB ') objects. The onedb engine therefore allows defining nodes in the onedb cloud, which do not implement the `OneNode` interface.

For these nodes, consequently, addresses need to be generated and managed externally when a node is added to the onedb cloud. For instance, appending an object such as the following ...

```java
One.append("news").to(realmRoot).in(client);
```

.. will define a new node "news" in the onedb cloud with an address such as the following:

```text
Realm root: http://u1.linnk.it/eff32/realm
News node : http://u1.linnk.it/eff32/realm/news1
```

### Global Connections

**Global connections** allow to connect any node with any other node. Connections between nodes are extrinsic, in that node value and the connections of a node can be changed without affecting each other.

There are two different types of connections: direct connections and indirect connections. A direct connection is a connection between nodes with virtual URI addresses, which indicate the destination node lying within the folder of the source node. See the following example where node 1 is the direct parent of node 2.

```text
Node 1: https://u1.linnk.it/1owvl3/foo (parent)
Node 2: https://u1.linnk.it/1owvl3/foo/bar1 (direct child)
```

Indirect connections are all connections, which are not direct connections. In the following example, node 1 is no direct parent of node 2.

```text
Node 1: https://u1.linnk.it/wefewf/foo
Node 2: https://u1.linnk.it/8nogl3/bar/42
```

All connections in onedb are uni-directional and unlabeled (connections do not have properties). Nodes also do not have properties or any meta-data associated to them. Nodes and connections make up the core of onedb’s data model. All other features (e.g. security, properties, etc.) are built upon this core data model.

## Authorization: Realms

Realms are a thin logic layer on top of nodes and connections which provide fine-grained access control for nodes. Every realm is defined by a root node. These are nodes, which do not have an incoming direct connection.

Realms can be protected with access tokens. These tokens define an authorization level as well as the secret required to be granted the defined authorization. onedb currently support the following authorization levels:

```text
ReadWrite: Allows reading and writing values and adding, removing and querying connections.
ReadOnly: Allows reading values and querying connections.
WriteOnly: Allows writing values and adding connections.
PublicRead: Allows anyone to read values and query connections.
```

All direct children of the realm root node inherit the authorizations of the realm root. However, these children can also define their own, additional authorization rules.

## Core Operations

onedb provides four atomic operations to manipulate node values and node connections (append, insert, remove, and update), and one operation to query data (select).

The **append** and **insert** operations allow to define new connections between nodes. Insert differs from append in that it allows specifying a particular position within a node's connections for a new connection. Append and insert also assure that undefined nodes will be added to the onedb cloud.

The **remove** operation allows removing connections between nodes. It will also remove tangling nodes (those without any incoming direct connections) from the onedb cloud.

The **update** operation allows changing the value of a node.

The **select all children** operation allows retrieving a list of the outgoing connections of a node.

## Client Sessions

All of the operations listed in the previous session require the context of a valid client session. Client sessions contain the local replication of the nodes mentioned in the architecture section above.

A new client session can be established in two ways: through the creation of a new realm or through loading a node, which is already defined on the server. The operations createRealm and load respectively allow this.

The **createRealm** operation requests a new realm on the onedb cloud. The realm root node of the created realm will be made available in a new client session.

The **load** operation makes a node from a remote system available in local client session.

## Synchronization

As already mentioned in the section architecture above, a client application interacts with a local replication of remote nodes and their connections. This means that all atomic operations (append, insert, remove, update, and select) are executed against a local database (with in-memory performance).

Synchronization in onedb, however, can also be used to synchronize data between clients. In particular, if a node is loaded in more than one client, the background synchronization process will synchronize the state of this node between the local replications of the node on multiple clients.

The synchronization process will automatically try to merge conflicts automatically. In the example below, a node (1) is loaded in two clients. Client 1 appends a node (2), while client 2 appends a node (3). Regardless of the temporal order of these operations, node (1) will have both node (2) and node (3) appended after synchronization is performed.

![onedb Synchronization Example](https://docs.google.com/drawings/pub?id=19wNxtgCHPXnFh97_symM433nfxxhsT-Fv5n7uixoOW4&w=201&h=230)

If conflicts cannot be merged automatically, onedb will attempt to resolve them using a [last writer wins policy](http://www.citeulike.org/user/mxro/article/10595657 'SWOOKI: A Peer-to-peer Semantic Wiki'). In the example below, the value of node (1) is changed first on client 1 to "B" (T=2) and then changed on client 2 to "C" (T=3). Since the change from client 2 occurred later than the change on client 1, the value of node (1) after synchronization will be "C".

![onedb Synchronization Last Writer Wins](https://docs.google.com/drawings/pub?id=1ZtoxsU1G7vZvQ15m-FNUGQYNIvaAMawo39EN5ySeg9A&w=201&h=230)

In case a conflict cannot be resolved, onedb will issue a descriptive error message and allow for an explicit resolution of the conflict. In the example below, client 1 appends a node (2) to node (1). Client 2, however, deletes the node (1), which renders the operation on client 1 invalid. On client 1, in result, an error message will be reported.

![onedb Synchronization Conflict](https://docs.google.com/drawings/pub?id=1rnAQEjulAffwfqDMIPhDXMcePQfX6J06WSPhJDYf7Yg&w=201&h=230)

The synchronization between clients is a very useful feature in onedb to build distributed systems. Indeed, most of the implementation and testing effort was spend on this feature.

## Further Information

Check the [other articles on cms.onedb.de](http://cms.onedb.de/articles 'onedb articles') for further information.
