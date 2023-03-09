---
authors:
- max
blog: maxrohde.com
categories:
- contemplations
- java
date: "2012-05-05"
title: 'Introducing onedb: Connect Small Data in the Cloud'
---

Data is growing bigger.

The increased scale of contemporary applications is often measured in the currencies of terabytes and thousands of transactions per second. An amazing array of tremendous new and old technologies help in dealing with this increased scale: reaching from clouds in various shapes to scalable NoSQL databases and even emerging, asynchronous programming paradigms.

However, while we get better at handling large quantities of data in high reliability involving dazzling numbers of concurrent transactions, the new mountains of data bring challenges beyond data processing and storage with them. In particular, big data is not smart data. Indeed, making sense of big data has been identified as [one of the most important challenges lying ahead for technologist](http://www.nytimes.com/2012/04/08/us/berkeley-group-tries-to-make-sense-of-big-data.html 'Berkeley Group Digs In to Challenge of Making Sense of All That Data').

The problem to make sense of big data is not an easy one, especially since big data is, well, big and bulky and, generally, in its entirety [difficult to comprehend](http://www.citeulike.org/user/mxro/article/4389709 'Bettis and Prahalad: The Dominant Logic: Retrospective and Extension').

This article introduces [onedb](http://www.onedb.de/ 'onedb'). onedb is a free, cloud-based platform for connected [small data](http://maxrohde.com/2012/05/05/small-data/ 'Small Data'). The platform currently consists of a free web service for Java Developers to store and connect data from any Java app. If you [try out](http://maxrohde.com/2012/05/06/onedb-tutorial/ 'onedb Tutorial') the service, you help me greatly in my [studies](http://www.mxro.de/short-cv)!

In this article, I will first give a brief introduction explaining the background and motivation for onedb. I will then describe the various design goals of the service as well as how onedb helps to support smart and 'small' data.

### Background and Motivation

When I joined graduate school at the University of Auckland some four years ago, I started working on the question of how an individual or a small team can organize their knowledge and information.

There are a number of interesting theories related to this question:

- What makes up 'relevant things to know' for any non-trivial endeavor is unbounded. [We cannot draw all relevant information on a whiteboard or write it down in a manual](http://www.citeulike.org/user/mxro/article/4234698 'Blackler: Knowledge, Knowledge Work and Organizations: An Overview and Interpretation.'). Some part of what we know will be missing from whichever representation we chose. This part is often referred to as 'tacit' knowledge.
- In consequence, data and information, which are generally limited to a fixed number of bytes, are [often poor representations of what we 'know'](http://www.citeulike.org/user/mxro/article/4116 'Thompson and Walsham: Placing Knowledge Management in Context').
- Nonetheless, [information tends to become more useful to aid decisions in complex situations, if it is _connected with other pieces of information_](http://www.citeulike.org/user/mxro/article/973799 'Kwan and Balasubramanian: KnowledgeScope: managing knowledge in context').

These theories point to a solution to the problem described in the introduction: how to make sense of big data. The answer that these theories provide is that if we strive to make big data interconnected, it has the potential to become more useful to us.

There are many technologies to store connected data and information, query connected data and even reason about connected data. However, most of these technologies are very sophisticated and provide many features beyond the simple connection of data, for instance [querying](http://webofdata.wordpress.com/2010/04/09/sparql-query-management/), [reasoning](http://bossam.wordpress.com/about-bossam/) and [applying various graph algorithms on connected data](http://blog.neo4j.org/2010/07/top-seven-news-in-neo4j-11.html). These features, though doubtlessly valuable and crucial for many tasks, often come with the price of increased complexity as well as reduced portability and generalizability of libraries, databases and services. Often, these properties make it difficult to connect data residing on different platforms, servers and applications in an easy and coherent way.

Thus, the motivation to implement onedb was to design a service focusing exclusively on one key feature: to connect data across applications and systems in the simplest way possible.

### onedb Design Goals

While the key requirement for the onedb service is to enable linking data across applications and platforms, a number of secondary design goals have been chosen to differentiate onedb from other solutions. These design goals are: (1) developer productivity, (2) generalizability and simplicity, (3) portability, and (4) testability.

#### Developer Productivity

There is a great difference between a technology, which _allows_ doing something, and a technology, which _enables_ doing something: most technologies can be bended in some form or another to find a solution for a problem (allowing), but few help to find a truly elegant and effective solution (enabling).

Since the feature at the heart of the onedb solution is apparently simple (connect two pieces of data), a lot of the development effort for onedb was spent on effectively supporting this core feature in an enabling fashion. In general, onedb aims to achieve this by _minimizing the steps required to get from idea to connected data_. This is supported by three intertwined design features: (1) minimal configuration, (2) fluent and readable API and (3) powerful conventions. I will give an example in the following to illustrate these three design features.

The following are the minimal but sufficient steps to connect two pieces of data in the onedb cloud:

1. [Get a onedb API key](http://www.onedb.de/#apikeyanchor 'Get onedb API key')
2. [Download the onedb Java client library](http://maxrohde.com/2012/05/06/onedb-tutorial/#downloadclientlibrary 'Download onedb Client Library')
3. [Link the onedb client library to an existing or new Java project](http://maxrohde.com/2012/05/06/onedb-tutorial/#linkingclientlibrary 'Link onedb client library')
4. Add the following statement anywhere in your Java app:

```java

OneJre.init("[your API key here]");

One.createRealm("foo").and(new When.RealmCreated() {

    @Override
    public void thenDo(WithRealmCreatedResult r) {
        One.append("bar").to(r.root()).in(r.client());

        System.out.println("Created " + r.root() + ":" + r.secret());
    }
});
```

\[[full source on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/A_IntroducingOnedb.java 'Source code example')\]

The code listed above will create two nodes in the onedb cloud. The first node "foo" will be a [realm](http://maxrohde.com/2012/05/06/onedb-tutorial/#createrealm 'onedb Realm'): a kind of mini-database, which can be accessed using the generated `secret` token and the address of the node foo. This 'realm' node will be connected to another node "bar". Finally, the application will print out the address of the node "foo" along with the access `secret` necessary to access the node.

Both nodes will be identified with unique [resolvable identifiers](http://milicicvuk.com/blog/2011/07/26/problems-of-linked-data-14-identity/ 'Problems of Linked Data (1/4): Identity') such as:

```text

foo: https://u1.linnk.it/1owvl3/foo
bar: https://u1.linnk.it/1owvl3/foo/bar1
```

It is also possible to access the nodes using a simple REST interface (given the access `secret` is supplied using HTTP BASIC authentication). Various representations such as the following are supported through [URLs](http://damnhandy.com/2007/11/19/uri-vs-url-whats-the-difference/ 'URI vs. URL: What’s the Difference?') such the following:

```text

https://u1.linnk.it/1owvl3/foo.node.xml
https://u1.linnk.it/1owvl3/foo.value.json
https://u1.linnk.it/1owvl3/foo/bar1.value.html
```

The example above describes _all_ the configuration necessary to start storing data using onedb. There is no need to set up a server, to configure databases, buckets or private keys, no definition of tables or keys and no JDBC connection pool. You can further see the [fluent](http://blog.jooq.org/2012/01/05/the-java-fluent-api-designer-crash-course/ 'The Java Fluent API Designer Crash Course') API of the onedb client resembling English sentences ("create realm 'foo' and when realm created then do ..."). But, most importantly, the expressiveness of the code snippet is amplified by a number of powerful conventions embedded in onedb, such as the automatic designation of global identities for all created nodes or the various data representations in formats like JSON or XML, which are available for every node in the onedb cloud.

#### Generalizability and Simplicity

While C and JavaScript as languages both have their well-discussed shortcomings, they are without doubt extremely popular and widely used. One key ingredient to their success is their generalizability. You can literally implement any non-UI logic for any platform in C, while you can implement UIs for most rich client platforms with JavaScript.

There are two ways to achieve generalizability: through simplicity or sophistication. Java, for instance, achieves generalizability through sophistication; by providing many advanced and sometimes complex features (e.g. [Threads](http://www.techrepublic.com/article/avoid-these-java-threading-gotchas/1049534 'Avoid these Java threading gotchas'), [NIO](http://blog.tsunanet.net/2010/08/java-nio-and-overengineering.html 'Java NIO and overengineering'), ..), which allow deploying the language in a large number of use cases. JavaScript, in contrast, achieves generalizability through [simplicity](http://misko.hevery.com/2010/04/07/move-over-java-i-have-fallen-in-love-with-javascript/ 'Move over Java, I have fallen in love with JavaScript'); for one, it's much easier to implement a _basic_ JavaScript interpreter than a JVM+JDK. Moreover, there are only a handful of ([useful](http://www.citeulike.org/user/mxro/article/2742125 'Crockford: JavaScript: The Good Parts')) language features, which makes the language widely supported and known.

onedb strives for generalizability through simplicity in a number of ways:

- A [very basic data model](http://maxrohde.com/2012/05/06/onedb-architecture-and-design/#datamodel 'onedb data model') is used to represent connections: an unlabeled, directed graph.
- onedb's core engine supports only the most basic operations on such graphs: append a node, remove a node, and replace a node.
- Apart from supporting these operations, onedb's core engine supports to synchronize nodes and their connections between multiple locations but nothing else.

This simplicity at the heart of the onedb engine enables the database to support a whole range of more sophisticated data structures, for instance trees, maps, and even labeled graphs.

onedb further strives to be generalizable in that it minimizes the assumptions about your data. For instance, how the data is organized, how it is queried or which data types are used. As an example for the support of a wide diversity of data types, see the example snippet below. All listed operations will work in onedb without need for custom configuration:

```java
public static class Person implements Serializable {
};

...

String bar = "bar";
Integer meaning = 42;
Person p = new Person();

One.append(bar).to(realmRoot).in(client);
One.append(meaning).to(bar).in(client);
One.append(p).to(bar).in(client);
```

\[[full source on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/B_IntroducingOnedbGeneralizability.java 'Generalizability Example App')\]

#### Portability

Data in any application of non-trivial size [ceases to exist and is reborn in sheer endless incarnations](http://theholyjava.wordpress.com/2012/05/12/bad-code-too-many-object-conversions-between-application-layers-and-how-to-avoid-them/ 'Bad Code: Too Many Object Conversions Between Application Layers And How to Avoid Them'). For instance, take a user's last name. Initially the last name will be held by a text field as part of the web browser's DOM. It might begin its journey as element in a [JSON data structure being sent to the application server](http://paulgestwicki.blogspot.co.nz/2011/05/json-vs-xml-for-data-representation-in.html 'JSON vs XML for data representation in GWT') as part of a HTTP message. Next, the last name will be deserialized on the server and live, temporarily, as part of a Java or C# object. Then, after being included in an SQL statement the last name might find its final, persisted resting place ... until it is requested by another browser session.

![System with Distributed Databases](https://docs.google.com/drawings/pub?id=1xYhxvEJADdx5lIHtA