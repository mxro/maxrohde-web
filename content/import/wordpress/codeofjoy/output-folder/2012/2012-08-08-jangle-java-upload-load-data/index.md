---
title: 'Jangle Java: Upload &amp; Load Data'
date: '2012-08-08'
categories:
  - 'java'
---

This tutorial illustrates in a few simple steps how to upload and download data from a Java application into the [appjangle](http://appjangle.com 'appjangle') platform.

You can find the source code of the completed steps 2 & 3 on github:

[T_JangleJavaShort_Upload.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/T_JangleJavaShort_Upload.java)

[U_JangleJavaShort_Load.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/U_JangleJavaShort_Load.java)

## Step 1: Link Client Libraries

To upload data to appjangle from a Java application, the onedb Java Client API will be required. Download the latests version of the 'onedb Java client' from the onedb downloads page:

[http://cms.onedb.de/downloads](http://cms.onedb.de/downloads 'onedb client libraries download')

Drop the client library into a Java project of your favorite IDE or assure they are added to the classpath of your Java app in another way of your choice.

## Step 2: Upload Data

Define a new Java class and add a main method. Add the following code to your app:

```java

final CoreDsl dsl = OneJre.init();

final OneClient client = dsl.createClient();

dsl.seed(client, new WhenSeeded() {

	@Override
	public void thenDo(final WithSeedResult sr) {

		final OneNode parlor = dsl.append("My Pizza Parlor")
				.to(sr.seedNode()).atAddress("./pizzaParlor")
				.in(client);

		dsl.append("Awsome Pizza!").to(parlor).in(client);

		System.out.println("Pizza Parlor Created:");
		System.out.println("at node      : " + parlor.getId());
		System.out.println("access secret: " + sr.accessToken());

		dsl.shutdown(client).and(WhenShutdown.DO_NOTHING);
	}
});
```

Running the application should result in an output such as the following.

```

Pizza Parlor Created:
at node      : https://u1.linnk.it/lnzvwp/sd1/3/h/sd/pizzaParlor
access secret: rfa______1rd
```

**Important:** Save the _node_ and _access secret_ for step 3.

The application above defines a number of interconnected data items on the appjangle platform:

1. a seed root node is created by the call to the `seed` operation.
2. a node with the value 'My Pizza Parlor' is appended to this seed node at the address `./pizzaParlor` (where `.` denotes the seed root node)
3. a node with the value 'Awsome Pizza!' is appeneded to the 'pizza parlor' node.

Each of these data items and their interconnections are uploaded to the appjangle platform, and, using their respective identifiers (URIs), they can be accessed from any Internet connected device using various mechansims:

1. If the device supports Java and/or JavaScript, the data itmes can be accessed using the onedb client libraries.
2. Per REST in various formats, for instance:

   1. XML: [pizzaParlor/Awsome_Piz0.value.xml](http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor/Awsome_Piz0.value.xml)
   2. JSON: [pizzaParlor/Awsome_Piz0.value.json](http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor/Awsome_Piz0.value.json)
   3. HTML: [pizzaParlor.node.html](http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor.node.html)

## Step 3: Load Data

While new data was defined on the appjangle platform in the previous step, in this step, the defined data is loaded and extended.

For this, define a new Java class with the following main method. Replace the _node_ and _access secret_ with the ones you have saved in the previous step:

```java

final CoreDsl dsl = OneJre.init();

final OneClient client = dsl.createClient();

dsl.load("[your node]").withSecret("[your secret]")
		.in(client).and(new WhenLoaded() {

			@Override
			public void thenDo(final WithLoadResult<Object> lr) {

				final OneNode servings = dsl.append("servings")
						.to(lr.loadedNode()).atAddress("./servings")
						.in(client);

				dsl.append("Pizza!").to(servings).in(client);

				System.out.println("Servings defined.");

				dsl.shutdown(client).and(WhenShutdown.DO_NOTHING);
			}
		});
```

Running the app, will result in the following:

1. The previously defined 'pizza parlor' node is loaded into a local client context.
2. A node 'servings' is appended to the pizza parlor node at the specific address `./servings`.
3. One value "Pizza!" is added to the servings node.
4. The local client context is closed using the shutdown operation and all changed data is uploaded to the appjangle platform.

Browsing the the pizza parlor node will now show two nodes attached to this node, the descriptive node 'Awsome Pizza' as well as a node containing the servings such as the following:

[http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor](http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor)

## Learning More

Please check the second part of this tutorial:

[Jangle Java: Synchronization](http://maxrohde.com/2012/08/08/jangle-java-synchronization/ 'appjangle java synchronization tutorial')

You can also find more information on various aspects touched upon in this tutorial on the [onedb documentation page](http://cms.onedb.de/articles 'onedb documentation').
