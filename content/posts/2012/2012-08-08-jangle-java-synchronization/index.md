---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2012-08-08"
title: 'Jangle Java: Synchronization'
---

This tutorial is a continutation of the '[Jangle Java: Upload & Load](http://maxrohde.com/2012/08/08/jangle-java-upload-load-data/)' tutorial. Make sure to follow the steps of this tutorial first before doing this one.

This tutorial shows the synchronization capabilities of the appjangle Java client. In particular, the well known producer-consumer scenario is applied on the simple pizza parlor data defined in the upload & load tutorial.

You can find the source code of the completed tutorial on github: [V_JangleJavaShort_Synchronize.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/V_JangleJavaShort_Synchronize.java).

## Step 1: Define the Producer

The producer in this simple scenario adds nodes with the value `"Pizza!"` to the `./servings` node defined for the pizza parlor.

For this, define a new Java class `Producer` as shown below. Please replace the pizza parlor _node path_ with the path to the pizza parlor data created in the upload & load tutoria and replace the _access secret_ as well.

```java

static class Producer implements Runnable {

	final CoreDsl dsl = OneJre.init();
	final OneClient client = dsl.createClient();

	@Override
	public void run() {
		try {
			Thread.sleep(600);
		} catch (final InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println("Making pizza ...");
		dsl.load(
				"[your node]/servings")
				.withSecret("[your secret]").in(client)
				.and(new WhenLoaded() {

					@Override
					public void thenDo(final WithLoadResult<Object> sr) {

						dsl.append(new String("Pizza!"))
								.to(sr.loadedNode()).in(client);

						dsl.commit(client).and(WhenCommitted.DO_NOTHING);

						System.out.println("... pizza made!");
						run();

					}

				});

	}

}
```

Calling the `run()` method of this class will start a recursive loop in which nodes with the value "Pizza!" will be appended to `pizzaParlor/servings`. The resulting changes to the local client data will be uploaded to the server via the `commit` operation.

## Step 2: Defining the Consumer

The consumer in this scenario will 'monitor' the pizza parlor's `servings` node for any changes. If a change occurs, the consumer will replace all "Pizza!" values with outcries of yummy!

Define a new class Consumer as follows (again replace address and access secret!):

```java

class Consumer implements Runnable {

	private volatile int eaten = 0;

	@Override
	public void run() {
		final CoreDsl dsl = OneJre.init();
		final OneClient client = dsl.createClient();

		dsl.monitor(
				dsl.reference("[your node]/servings"))
				.inInterval(Interval.FAST).withSecret("[your secret]")
				.in(client).and(new WhenNodeChanged() {

					@Override
					public void thenDo(final WithNodeChangedContext context) {

						checkForPizza(dsl, client, context);

					}

				});
	}
```

This class so far will install a monitor on the `./servings` node and call a `checkForPizza` method every time a change has been made to the servings node.

The `checkForPizza` method can be defined as follows:

```java

private void checkForPizza(final CoreDsl dsl, final OneClient client,
		final WithNodeChangedContext context) {
	dsl.selectFrom(context.changedNode()).theChildren()
			.ofType(String.class).in(client)
			.and(new WhenChildrenSelected<OneTypedReference<String>>() {

				@Override
				public void thenDo(
						final WithChildrenSelectedResult<OneTypedReference<String>> csr) {

					for (final OneTypedReference<String> pizza : csr
							.children()) {

						if (!dsl.dereference(pizza).in(client)
								.equals("Pizza!")) {
							continue;
						}

						dsl.replace(pizza)
								.with("Yummy (" + eaten + ")!")
								.in(client);
						eaten++;
						System.out.println("Ate " + eaten
								+ " Pizza(s)!");
					}

					dsl.commit(client).and(WhenCommitted.DO_NOTHING);

					if (eaten > 10) {
						System.out.println("Had enough pizza.");
						context.monitor().stop(WhenShutdown.DO_NOTHING);
						System.exit(0);
					}
				}
			});
}
```

This method does the following:

1. All child nodes, which have the class `String.class` are selected from the `pizzaParlor/servings` node through calling the method `selectFrom(...)`.
2. All children of the class String are checked whether their value equals "Pizza!".
3. If so, the respective value is replaces with the value "Yummy (x)!".
4. Lastly, all changes made to the servings node are committed to the appjangle cloud.

Producer and consumer can be assembled in an application such as given [here](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/V_JangleJavaShort_Synchronize.java). Running this application should result in an output such as the following:

```
Making pizza ...
Ate 1 Pizza(s)!
... pizza made!
Making pizza ...
... pizza made!
Making pizza ...
... pizza made!
Ate 2 Pizza(s)!
Ate 3 Pizza(s)!
Making pizza ...
... pizza made!
Making pizza ...
Ate 4 Pizza(s)!
... pizza made!
Making pizza ...
```

While such a producer/consumer example is easily accomplished using threads and shared resources, the producer and consumer in the given example need not be part of one application. Indeed, producer and consumer can run on seperate Java-compatible devices as long as these are connected to the Internet.

The work of producer and consumer can further be traced through the various REST interfaces as seen for instance on the following page:

[http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor/servings.node.html](http://u1.linnk.it/lnzvwp/sd1/2/h/sd/pizzaParlor/servings.node.html)

## What's more?

To learn more about the capabilities of appjangle and onedb, you can check:

- the extensive [onedb tutorial](http://maxrohde.com/2012/05/06/onedb-tutorial/ 'onedb tutorial')
- other articles on the [onedb documentation](http://cms.onedb.de/articles 'onedb documentation') page.
- [subscribe to this blog](http://maxrohde.com/feed/)!
- [example apps on github](https://github.com/mxro/onedb-examples/tree/master/src/main/java/one/examples/features 'appjangle example apps')