---
blog: maxrohde.com
categories:
- java
date: "2012-05-06"
title: 'onedb Tutorial: Getting Started and First Steps'
---

[onedb](http://www.ononedb.com 'onedb homepage') is the database engine at the heart of the [appjangle](http://appjangle.com) platform. This tutorial gives an overview of a number of capabilities of the onedb engine.

The following topics are discussed in this tutorial:

**Part I: Set Up**

1. [Getting an API key](#getapikey)
2. [Download the client library](#downloadclientlibrary)
3. [Linking the client library](#linkingclientlibrary) (eclipse or maven)
4. [Initializing onedb engine](#initializingengine)

**Part II: Core Operations**

1. [Create Realm](#createrealm)
2. [Interlude: REST access using web browser](#restaccess)
3. [Load](#load)
4. [Append](#append)
5. [Select](#select)
6. [Replace](#replace)
7. [Remove](#remove)

**Part III: Advanced Operations**

This part is still work in progress :)

1. Commit (TBA)
2. \*Safe (TBA)
3. Monitor (TBA)
4. Post (TBA)
5. Managing Authorizations (TBA)
6. Clear Versions (TBA)

For further information about the motivation, concepts and design behind onedb, please check out [the other articles on the onedb website](http://cms.onedb.de/articles 'onedb articles').

## Part I: Set up

### 1\. Getting an API key

onedb is a cloud based database and therefore requires a cloud service provider to work.

Currently, onedb is deployed as part of the [appjangle](http://appjangle.com 'appjangle: application platform') platform.

Just head to the appjangle page and sign up. You will receive an email with a key for appjangle. You can use this key to initialize the onedb engine.

[![](images/appjangle-email1.png 'appjangle email')](http://nexnet.files.wordpress.com/2012/05/appjangle-email1.png)

### 2\. Download the client library

Although onedb provides a simple REST interface, far superior usability and performance is provided by the supplied client libraries. You can download the latest version so the client libraries at

> [http://cms.onedb.de/downloads](http://cms.onedb.de/downloads 'onedb downloads')

Note that there are two different client libraries:

**onedb Java Client**: This client library provides all base features required to connect with the onedb cloud.

**onedb Java Test Toolkit**: Apart from all features of the onedb Java Client, the test toolkit includes a stripped down version of the onedb cloud. This allows to start up a local test cloud for unit tests (starting a test cloud should take less than 200ms).

Both libraries do not have any dependencies and are minified for reduced application size and optimal performance.

For this tutorial, pleas download the most recent version of onedb Java Test Toolkit from the [downloads page](http://cms.onedb.de/downloads). If you want to deploy an application to your users, please link the onedb Java Client instead.

### 3\. Linking the client library (eclipse or maven)

The onedb client libraries can be linked to any Java application by adding them to the Java application's classpath. Since this is rarely done manually, I will instead briefly describe how the library can be linked to an eclipse project or added to a Maven project. If you are already familiar with these procedures, feel free to skip to the next section.

#### Eclipse (Windows)

Link onedb to a new eclipse project by following the steps below:

1. Download the onedb Java Test Toolkit library as discussed above and store the 'oneTestJre.min-x.x.x.jar' file on your local machine.
2. You will need to download and extract a suitable eclipse distribution. The [Eclipse IDE for Java Developers](http://www.eclipse.org/downloads/packages/eclipse-ide-java-developers/indigosr2 'Eclipse IDE for Java Developers') will do fine to begin with.
3. Start eclipse and create a new Java project through Menu File / New / Java Project

![Create a new eclipse project](https://docs.google.com/drawings/pub?id=1Jbuv1_M9e_irGDZzqDaRDt5e7t9njsV_DbmOrR7Adeo&w=535&h=358)

1. Provide a 'Project name' such as "exploreonedb" and press \[Finish\]
2. Drag and drop the file 'oneTestJre.min-x.x.x.jar' onto the project you have just created in the eclipse 'Package Explorer'

![Drop JAR file](https://docs.google.com/drawings/pub?id=1McFNE1cKyyk7L5JNVLYoIgqO02cpAd5rBdzW_baE0Gs&w=381&h=421)

1. Select 'Copy files' when prompted for a 'File Operation'
2. Expand the "exploreonedb" project on the eclipse workspace by clicking the small triangle left to the project name.
3. Right click the file 'oneTestJre.min-x.x.x.jar' in the project folder and select Build Path / Add to Build Path in the context menu

![Add jar to classpath](https://docs.google.com/drawings/pub?id=1P6AALeFcvJqwE4ZUp18UOP3IbrRr1rL9ueX9paQHlrw&w=744&h=394)

Now you can start using the onedb client library in the eclipse project. Go to [step 4](#initializingengine 'Step 4: Initialize onedb engine') to continue.

#### Maven

You can link the onedb client libraries to your Maven projects by using the following dependency declarations (in `<dependencies>`):

For onedb Java Test Toolkit

```xml

    <dependency>
        <groupId>one.test.jre</groupId>
        <artifactId>oneTestJre.min</artifactId>
        <version>x.x.x</version> <!-- replace with most recent version -->
    </dependency>
```

For onedb Java Client:

```xml

    <dependency>
        <groupId>one.client.jre</groupId>
        <artifactId>oneClientJre.min</artifactId>
        <version>x.x.x</version> <!-- replace with most recent version -->
    </dependency>
```

You will also need to add the onedb release repository (in `<project>`):

```xml

    <repositories>
        <repository>
            <id>onedb Releases</id>
            <url>http://dl.dropbox.com/u/957046/onedb/mvn-releases</url>
        </repository>
    </repositories>
```

### 4\. Initializing the onedb engine

After adding the onedb libraries to a Java project, the onedb engine must be initialized. Adding the following statement anywhere in your application will initialize the onedb engine and prepare the engine to make request to the onedb cloud:

```java
OneJre.init("[Your API Key]");
```

Please note that you will need to replace `[Your API Key]` with the API key you have obtained by email as described above.

If you have linked the onedb Java Test Toolkit, you can initialize the onedb engine as above (`OneJre.init(..)`) but also have the option to initialize the engine in test mode. The test toolkit can recreate a local version of the onedb cloud on a per test case basis. Just add the following statement instead of the statement listed above to any of your JUnit, TestNG, ... test cases:

```java
OneTestJre.init();
```

Note that since this will create a local onedb cloud, you will not need to supply an API key. Also note that the local onedb cloud will not respond to any REST requests for any created resources (for performance and portability reasons).

## Part II: Core Operations

onedb uses only a handful of core operations to compose flexible and expressive data structures. The operations described in the following are a comprehensive list of the core operations supported by the onedb engine.

### 1\. Create Realm

Realms are essential in working with onedb. Every item of data stored in the onedb cloud must be part of a realm. You can check the article "[onedb Architecture and Design](http://maxrohde.com/2012/05/06/onedb-architecture-and-design 'onedb Architecture and Design')" to learn about the design concepts behind realms. This tutorial will walk through the practical steps necessary to create realms using the onedb Java API.

If you have followed the steps above to link the downloaded library in eclipse, you will have an empty eclipse project, including a link to the library 'oneTestJre.min-x.x.x'. I will describe the following steps using eclipse in detail. If you are an eclipse whizz or [use another IDE](http://developer4life.blogspot.co.nz/2012/01/intellij-vs-eclipse.html 'Intellij vs. Eclipse ') (or [no IDE at all](http://tellspk.wordpress.com/2011/07/24/using-vim-for-java-programming-maven-integration/ 'Using Vim for Java programming – Maven Integration')), please feel free to skip any of following steps.

You can add a Java file by right-clicking on the 'src' folder in your project and selecting New / Class. Add a new class ExploreOneDb as follows:

![Create a new Java class](https://docs.google.com/drawings/pub?id=1LYXL15rJfXmtSsuNBs8S_vUqcta0m9E-3_oGcAOeHOY&w=552&h=647)

Add the statement `OneJre.init(..)` with your API key.

![Initialize onedb engine](https://docs.google.com/drawings/pub?id=1p3-zVYz83W7Vn6WFFzFJUXPuvQCwrPTXioatb5OBBKc&w=383&h=183)

The main entry point to interact with the onedb client library is the class `one.common.One`. You can see all fundamental operations the onedb client library provides by typing `One.` and waiting for the context help to appear (below a screenshot for eclipse but the same will work in IntelliJ and NetBeans as well).

![Context help for One class in eclipse](https://docs.google.com/drawings/pub?id=1B-IzGXBtg7fnCQOHU9E-i5yrWZpNXdrxxkyahDyjd0I&w=532)

Chose the option `createRealm(String withTitle)`:

![Option Select realm selected](https://docs.google.com/drawings/pub?id=1sZwC79VfkjL2YAHbu1NXLTJlkc2FVu1LTF4Mg4IbVKo&w=387)

The onedb client now requires the specification of a title of the realm, which is to be created. Realm titles have no special significance apart from that they help to [build descriptive URIs](http://looselyconnected.wordpress.com/2011/03/10/managing-relationships-between-resources-with-uris/ 'Managing Relationships between Resources with URIs') for any nodes stored in the realm. Chose the title `"exploration"` and add a `.` after the closing brackets to see the context options for the `createRealm(..)` operation:

![Context options for Create Realm](https://docs.google.com/drawings/pub?id=1sYZQKUvglRksWJ7QSnjcpq05h8yeX_XyotpLcxfxpPU&w=634&h=320)

We can either specify a client session by choosing the `.in(OneClient client)` option or specify the operation, we would like to perform after the realm has been created successfully by choosing the option `.and(RealmCreated callback)`. Since there is no existing client session, we chose the second option.

The parameter type `RealmCreated` or more precisely `When.RealmCreated` will help to define a so called [callback](https://codexplo.wordpress.com/2012/05/02/how-to-implement-callback-method-in-java-using-java-reflection/ 'How to implement callback method in java using java reflection?') for the operation. A callback defines a method, which will be called once a remote operation is completed. Callbacks are used throughout the onedb APIs for all operations, which depend on remote systems.

Realms are managed by the onedb cloud and, therefore, the operation of requesting a realm needs to make a call to the remote onedb cloud. The duration of this call can vary significantly depending on your network connection and the way [messages are sent through the Internet](http://www.stevesouders.com/blog/2010/07/13/velocity-tcp-and-the-lower-bound-of-web-performance/ 'Velocity: TCP and the Lower Bound of Web Performance'). In any case, the call to the remote cloud takes, in terms of computer time, very long. Using a callback enables your application to do some other useful work while it is waiting for the response from the onedb cloud.

To define the callback for the `createRealm(..)` operation, chose the option `and(..)` and type within the brackets after `and`: `new When.`. This will show the available callbacks in the onedb API. Select the callback definition, which corresponds to the required parameter type indicated on top of the parameter.

![Select Callback](https://docs.google.com/drawings/pub?id=1B0ZsSvzFXhkDAbjXCR4IF0_gWiZfz5PHePwu8e1OgHc&w=766&h=417)

A bit of cleanup needs to be performed before proceeding: A semicolon needs to be added at the end of the (now completed) statement and the `When` class containing the callback definitions needs to be added to the imports.

![Clearing Syntax Errors](https://docs.google.com/drawings/pub?id=1YppsEUJ21dwrIuiZS96io7_SDi7bQfmkw4l-3-6M25w&w=624&h=386)

The method `thenDo(..)` will be called 'back' upon successful creation of the new realm on the onedb cloud. If the parameter name for the thenDo(..) method are something as informative as `arg0` .., we can rename the parameter with a more descriptive name such as `result` or `r`:

```java
@Override
public void thenDo(WithRealmCreatedResult r) {
```

The result object will carry the following values:

_r.client()_: The createRealm operation will create a new client session, which can be accessed through the `client` parameter. This session will also have the realmRoot and its children available for further operations.

_r.root()_: The realmRoot parameter points to the root node of the newly create realm; to this node, new nodes to be stored as part of the realm can be appended.

_r.secret()_: The secret parameter holds a `String`, which must be supplied when the realmRoot is accessed using the onedb Java Client or the REST API (It's a kind of access token).

_r.partnerSecret()_: This parameter will hold no value after the conducted invocation of the createRealm operation. This parameter will hold a secret, which will allow to write (but not read) a node for a postbox type realm.

While the application as given above will successfully create a realm, we will not be able to access this realm after the application is closed, since we will neither know the address of the realm nor the secret token to access it.

To save the realm's address and access secret, we can, for now, print them to the console by adding a few print statements as follows:

```java

@Override
public void thenDo(WithRealmCreatedResult r) {
    System.out.println("realmRoot: "+r.root());
    System.out.println("secret: "+r.secret());
}
```

Running the application should result in an output such as the following:

```text
realmRoot: One.reference("https://u1.linnk.it/bkesvc/explora")
secret: maqi______z94
```

You will notice that applications starts, then prints the output above after a few seconds, but will not stop. In order to terminate our application correctly, we have to shut down every client session we have created. In our case, this is the one client session created by the createRealm operation.

To shut down the client session, we can add the following to the existing application after the last System.out statement:

```java
...
System.out.println("secret: "+r.secret());

One.shutdown(r.client()).and(new When.Shutdown() {

    @Override
    public void thenDo() {
        System.out.println("Session is shut down.");
    }

});
...
```

When we start the application again, it should now terminate as expected after printing the access information for the realm.

```text
realmRoot: One.reference("https://u1.linnk.it/bgbpce/explora")
secret: gv3______0nx
Session is shut down.
```

**Save** both the URL of the node (".../explora") and the printed secret for the next steps of the tutorial in a text or source file. You can also rerun the application at any time to obtain this information again.

Note that although we have not changed any parameters of the createRealm operation, the second invocation resulted in a different realm root and a different secret being reported.

[\[full source code of example on github\]](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/F_GettingStarted_ExploreOnedb.java)

### 2\. Interlude: REST access using web browser

We can access the newly created realm(s) using any web browser using the REST API of onedb: just type in the URI of the realm root reported by your application (e.g. https://u1.linnk.it/bgbpce/explora) into the browsers address bar and hit enter.

If you are greeted by the following friendly message, just select \[Proceed anyway\] or the available equivalent of your browser.

![Add SSL Exception](https://docs.google.com/drawings/pub?id=14wH2qnIaLAsGULK57v1LDyJanJ6AXLszYh_pTionVQE&w=540&h=506)

Supply as authentication the username 'token' along with the secret access token reported by your application (e.g. gv3etqoingxe0nx) and press login.

![Http Basic authentication](https://docs.google.com/drawings/pub?id=1xjmCGMhNL1mFXrtkThcuQN6avXdYaExCTJx4HEjpFpE&w=366&h=249)

Select save password if you are given the option. You should see the sparse contents of your node displayed by the web browser.

![Node rendered as html](https://docs.google.com/drawings/pub?id=1iNZoAgjbGIQTfMcb9WyDj-Bu8U9yDpxnLsd0AXKEYcw&w=557&h=262)

You can see different representations of your node by appending a variant (.node. or .value.) and a data format (.html, .xml or .json) to the URI of your node such as:

```text
https://u1.linnk.it/bgbpce/explora.value.xml or
https://u1.linnk.it/bgbpce/explora.node.json
```

The variant value with the format XML, for instance, should be rendered as follows:

![XML Value representation](https://docs.google.com/drawings/pub?id=1vBtS6p_Sx-v4mcENZcdVMjt2xV_jjN3kGxP53GdeJSA&w=583&h=272)

### 3\. Load

While it is convenient to access nodes using the provide REST interface, it is far easier to access the created nodes using the onedb API. As long as we know the access token (secret) and address of a node, we can access it from any system linked to the onedb library.

For the purposes of this tutorial, we can create another class in our Java application to emulate another app accessing the node. Add a class to your project 'Load' and add a main method to this class.

![New Class Load](https://docs.google.com/drawings/pub?id=1JFfpJfNYmLe4KEN2qBbCQVUu-zdPdSEFtvcs7V6VcPE&w=697)

Although both ExploreOneDb and Load are part of the same eclipse project, they form two distinct applications for Java, since both classes have independent main methods. The onedb engine must be initialized _once_ for every Java application. Since Load defines a new application, we need to initialize the onedb engine as follows:

```java
OneJre.init("[your API key here]");
```

Next we type `One.` once again but this time chose the operation `load(Object node)`:

![Select Load Operation](https://docs.google.com/drawings/pub?id=1WIFh5xKuKSsNIw4J7QmMg1btu9ZxqkX2LgLXHdacJ5M&w=549&h=335)

The load operation now requires the specification of an `Object node`. This object specifies what is to be loaded. The only information we have available from the invocation of the ExploreOnedb example app is the address of the root node of the realm (e.g. https://u1.linnk.it/bgbpce/explora) plus its access secret you have saved (if not, just rerun the ExploreOnedb application).

onedb distinguishes between resolved nodes with a value and references to nodes. Node references have a unique identity but have no value. We can use such a reference to specify, which node we want to load, for instance:

```java
One.reference("https://u1.linnk.it/bgbpce/explora");
                        // ^-- replace with your URI
```

Replace the address in above statement with the address you have saved after running the ExploreOnedb example and provide the reference definition as the node to be loaded for the load operation. Again type a `.` after the closing bracket to see the further parameters for the load operation. Select the parameter `.withSecret(String secret)`:

![Parameters for Load Operation](https://docs.google.com/drawings/pub?id=16Z6DERGOX1AszGFsgwzurShykvJgJR6JbZthIgfiEok&w=811&h=301)

Supply the access token secret you saved earlier (e.g. "gv3**\_\_**0nx"). Finally, you should define the callback by selecting the option `.and(...)`:

![Specifying Callback Parameter](https://docs.google.com/drawings/pub?id=1FPwYiP9QbL_kGjDTgGMJHJAGAA0fHt9zSTLQgR-Toic&w=484&h=318)

Proceed in the same way as specifying the callback for the `createRealm(..)` operation, but this time chose the callback `new When.Loaded(..)`. Your application should now look as follows:

```java
OneJre.init("[your API key here]");

One.load(One.reference("https://u1.linnk.it/bgbpce/explora"))
                               // ^-- replace
   .withSecret("gv3______nx")
   .and(new When.Loaded() {

        @Override
        public void thenDo(WithLoadResult<Object> lr) {

        }
});
```

The callback method (`thenDo(..)`) returns a load result with a reference to the node, we have just loaded (`lr.loadedNode()`). The load result also returns a [client session](http://maxrohde.com/2012/05/06/onedb-architecture-and-design/#clients 'Client Sessions in onedb') (`lr.client()`). We can retrieve the resolved loaded node as follows:

```java
@Override
public void thenDo(WithLoadResult<Object> lr) {
    Object realmRoot = One.dereference(lr.loadedNode()).in(
            lr.client());

    System.out.println("Node reference: " + lr.loadedNode());
    System.out.println("Resolved node: " + realmRoot);
}
```

For an in-depth discussion of the various node types and the `One.dereference(..)` operation please check the article "[A Practical Guide on Node Types in onedb](http://maxrohde.com/2012/05/15/node-types-in-onedb/ 'onedb node types')".

Run the application and you should get an output such as the following:

```text
Node reference: One.reference("https://u1.linnk.it/bgbpce/explora")
Resolved node: Nx.define(exploration).at(https://u1.linnk.it/bgbpce/explora)
```

\[[full source code of example on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/G_GettingStarted_Load.java 'Source code for Load Example')\]

### 4\. Append

Thus far, this tutorial walked through the steps of setting up a Java project, creating a realm and accessing this realm using a REST interface and the onedb API. Although [creating a realm inevitably results in the creation of one node](http://maxrohde.com/2012/05/06/onedb-architecture-and-design/#realms 'onedb Realms') (the realm root), we have not really done a lot of work with nodes, for instance establishing connections. In this section, I will explain the most important operation to define nodes and connections between them: append.

First create a new class `NodeOperations` and add a main method, which creates a new realm (check the creating a realm section above for details regarding the following code snippet):

```java
public static void main(String[] args) {
    OneJre.init("[Your API Key]");

    One.createRealm("ops").and(new When.RealmCreated() {

        @Override
        public void thenDo(WithRealmCreatedResult r) {

        }
    });
}
```

Let's assume the following scenario: We would like to define a customer in the newly created name with the name "Bob" who lives at "26 Short Av". To express this information using a proven and tested object-oriented approach should not be too difficult: First, we define a class `Customer` and subsequently create an instance for Bob.

Class definition:

```java
public static class Customer {
    public String name;
    public String address;
}
```

Instance Creation:

```java
Customer bob = new Customer();
bob.name = "Bob";
bob.address = "26 Short Av";
```

We need to make one small modification before we can upload the Bob object to the onedb cloud: The customer class will need to implement the Serializable interface, in order for onedb to be able to transport objects of this type safely to the onedb cloud. This is easy enough; just change the class definition to:

```java
public static class Customer implements Serializable {
    public String name;
    public String address;
}
```

We can now append the `bob` object to the 'ops' realm root node as follows:

```java

@Override
public void thenDo(WithRealmCreatedResult r) {
    Customer bob = new Customer();
    bob.name = "Bob";
    bob.address = "26 Short Av";

    One.append(bob).to(r.root()).in(r.client());

    System.out.println("Created " + r.root() + ":" + r.secret());
    // do shutdown ...
}
```

\[[full source code on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/H_GettingStarted_AddClass.java 'Example Adding Object with Class Definition')\]

You can run the application and should receive the login information for the test realm such as `Created One.reference("https://u1.linnk.it/crd87h/ops"):hhz______ni`. We can use this reference to load both the realm and the associated `bob` object using the One API as described above under the [load operation](#load).

We can also access the newly created realm using a web browser as described in the [REST section](#restaccess) above.

![REST Access to realm](https://docs.google.com/drawings/pub?id=1AbMDuP1rdMxsvGVUdZKKXWMXF2yha-kRS_xt6WvxJRs&w=565&h=260)

The picture above points to a problem with the approach taken so far: Although the customer has been added to the realm as a `SerializedNode` (`class NodeOperations$Customer`), the data associated with this node cannot easily be interpreted through the REST interface. Indeed, also other Java applications would have difficulties in 'deciphering' the data of this node without the definition of the class `Customer` in byte code. This stays in contrast with the ideals of a small data system!

A better approach is to decompose the information a `Customer` instance expresses into various nodes with 'standard' data types (such as String, Integer ...). One way to do this could be as follows:

> The root node of the realm is designated to represent the `bob` entity. We append a node with the text "Bob" to this realm root node to indicate the name. We also append another node with the text "26 Short Av" to the realm root. To indicate the 'type' of the used nodes, we further append two generic nodes _Address_ and _Customer_, which do not hold any particular value to "26 Short St" and the realm root respectively.

The described arrangement of nodes can be visualized as follows:

![Example Scenario](https://docs.google.com/drawings/pub?id=1i5hDlipsuXY6yLNqgEMtAgWrDS_IW5y4u7vDmKlwUyM&w=262)

We can create a new class `NodeOperationsBetter` and again specify the logic for creating a new realm. The following code snippet shows how to define a node arrangement as described above using the onedb API.

```java
OneJre.init("[Your API Key here]");

One.createRealm("ops").and(new When.RealmCreated() {

    @Override
    public void thenDo(WithRealmCreatedResult r) {
        OneClient client = r.client();
        Object bob = r.root();

        One.append("Bob").to(bob).in(client);

        String addressValue = "26 Short Av";
        One.append(addressValue).to(bob).in(client);
        One.append("an Address").to(addressValue).in(client);

        One.append("a Customer").to(bob).in(client);

        System.out.println("Created " + r.root() + ":" + r.secret());
        // shutdown client ...
    }
});
```

\[[full source code on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/I_GettingStarted_AddNodes.java 'Customer Example with Nodes')\]

If we access the realm created with the logic above using the REST interface, the data should be presented in a more accessible manner such as below:

![Screenshot: Bob Node](https://docs.google.com/drawings/pub?id=1w0KfcEA9Zg65Hc9pXqrnvn41UIZKvYOP6DtfJ8zmWuQ&w=531&h=220)

The REST interface allows navigating from one node to another. If we click on '26 Short Av', the node representing the address value will be displayed:

![Screenshot: Street Value Node](https://docs.google.com/drawings/pub?id=17QiuxtGr-E9vkxCVIwKIjUdL3E89Z-grvY27wV-YHEs&w=547&h=177)

Apart from presenting the information associated with the customer in a more accessible manner, following a connection-oriented approach makes the data semantically richer. For instance, we will have implicitly created a globally accessible type 'address' (linked to 26 Short Av Node). The type URI for address will look something like the following:

```text
https://u1.linnk.it/l8hpud/ops/26_Short_A2/an_Address0
```

However, this URI does not appear to be very 'pretty' and portable. In specific, the part '26_Short_A2' does appear to be in conflict with the intention to define a reusable identity for the type 'address'.

It is usually a good practice to define 'type' nodes in their own independent realm. This way their reusability can be increased and also shorter and more succinct URIs can be created. Type nodes can be appended to a realm like any other node. We can write a little application such as the following to define the type nodes required for the example:

```java

One.createRealm("types").and(new When.RealmCreated() {

    @Override
    public void thenDo(WithRealmCreatedResult r) {
        Object typesRoot = r.root();

        Object addressType = One.append("an Address").to(typesRoot)
                .atAddress("./address").in(r.client());

        Object customerType = One.append("a Customer").to(typesRoot)
                .atAddress("./customer").in(r.client());

        System.out.println("Address type: " + addressType);
        System.out.println("Customer type: " + customerType);
        System.out.println("Types realm " + r.root() + ":" + r.secret());
        // shutdown ...
    }
});
```

\[[full source code on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/J_GettingStarted_CustomerTypes.java 'App Creating Customer Types')\]

Note here the slightly changed append statements with an added `atAddress(..)` parameter. Specifying the `atAddress` parameter allows to specify a precise address to be used for nodes; if `atAddress` is not specified, onedb will attempt to generate a suitable address.

Running the above application should result in an output such as the following:

```text
Created One.reference("https://u1.linnk.it/zednuw/types"):ip_______ib5
Address type: One.value(an Address).at("https://u1.linnk.it/zednuw/types/address")
Customer type: One.value(a Customer).at("https://u1.linnk.it/zednuw/types/customer")
```

Save the output of your application in a text file or somewhere else for the next steps.

Using the newly created 'type' nodes, we can rewrite the definition of customer `bob` as follows (please remember to change the type nodes in the examples to the type nodes you have created):

```java
// -- reference types
Object addressType =
  One.reference("https://u1.linnk.it/zednuw/types/address");
                             // ^-- replace with your type!
Object customerType =
  One.reference("https://u1.linnk.it/zednuw/types/customer")
                             // ^-- replace with your type!
// -- build data
OneClient client = r.client();
Object bob = r.root();
One.append(customerType).to(bob).in(client);
One.append("Bob").to(bob).in(client);

String addressValue = "26 Short Av";
One.append(addressValue).to(bob).in(client);
One.append(addressType).to(addressValue).in(client);
```

\[[full source code on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/K_GettingStarted_CustomerDefinition.java 'Example App Define Customer Bob')\]

Now, if we were to define a customer [Alice](http://xkcd.com/177/ 'Alice and Bob'), we could reuse the type nodes for 'address' and 'customer' used for the definition of Bob.

### 5\. Select

Querying data in onedb is done on a recursive from-node-to-node basis much in the spirit of [Linked Data](http://blog.typoplanet.de/2011/03/28/query-linked-data-cloud-typo3/ 'Query the Linked Data Cloud using TYPO3'). In order to aid the navigation from node to node, onedb provides three operations to query the children of a node:

`selectFrom(node).allChildren()`: Will return a list of the references of all children appended to the node.

`selectFrom(node).allChildrenFast()`: Will return a list of addresses as `Strings` of all children appended to the node.

`selectFrom(node).theChildren().withType(type)`: Will return a list of references to all children of the node with the specified (Java) `type`.

`selectFrom(node).theChildren().linkingTo(reference)`: Will return a list of references to all children of the node, which have the specified `reference` as one of their children. For instance, in the example node arrangement given below, selecting all children from the node `persons` linking to `Customer` will return the nodes `bob` and `alice`.

![Example Arrangement linkingTo](https://docs.google.com/drawings/pub?id=1VqDoDowUkojZ44MVKGzCHXHR0BpUT9-Wpl0fF30qyTM&w=341)

Create a new Java class with main method, initialize the onedb engine, create a realm and define the following nodes for the realm:

```java
One.append("This is a test realm").to(r.root()).in(r.client());
Object bob = One.append("bob").to(r.root()).atAddress("./bob")
        .in(r.client());
One.append(
        One.reference("https://u1.linnk.it/zednuw/types/customer"))
                           // ^-- replace with your type node
        .to(bob).in(r.client());
```

\[[full source on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/L_GettingStarted_SelectCreateData.java 'Source code for creating data')\]

Note that you will have to replace the reference to the customer type defined above (`"https://u1.linnk.it/zednuw/types/customer"`) with the customer type you have created in the previous section.

Run the application and you should save the link and access token for the realm you have created (e.g. `One.reference("https://u1.linnk.it/4hxdr8/query"):zt________y2`).

Then, create another Java class with main method, initialize the onedb engine and load the node you have just created using the link and secret you have saved:

```java
One.load(One.reference("[your query realm]"))
        .withSecret("zta_____1y2")
        .and(new When.Loaded() {

            @Override
            public void thenDo(WithLoadResult<Object> lr) {
...
```

Note that you will have to replace the reference and supplied secret with the details of the `query` realm you have created above.

Within the `thenDo(..)` callback of the load operation, you can retrieve the references to all children of the loaded node:

```java
System.out.println("All Children: "+
    One.selectFrom(lr.loadedNode()).allChildren().in(lr.client()));
```

You can filter the children of the loaded node by their type:

```java

One.selectFrom(lr.loadedNode())
        .theChildren()
        .ofType(String.class)
        .in(lr.client())
        .and(new When.ChildrenSelected<OneTypedReference<String>>() {

            @Override
            public void thenDo(
                    WithChildrenSelectedResult<OneTypedReference<String>> sr) {
                System.out.println("Found Messages:");
                for (OneTypedReference<String> node : sr.children()) {
                    System.out.println("  "
                            + One.dereference(node).in(
                                    sr.client()));
                }
            }

        });
```

Note that the operation to select children by type in difference to the previous one (select all children) requires the specification of another callback (`When.ChildrenSelected`). As a general rule, onedb will always require the specification for all operations, which may need to send a remote message to the onedb cloud. The initial loading of the root node of the realm, will download the root node from the onedb cloud including the _references_ to all its children. A reference, however, is not sufficient to determine the (Java) type of a node. Therefore, the select operation with type parameter will need to assure all child nodes have been downloaded from the onedb cloud.

The same applies for specifying the `linkingTo(..)` parameter. Since the load operation initially only loads the children of a node but not its children’s children, a remote request must possibly be sent to the onedb cloud, requiring the specification of a callback:

```java

One.selectFrom(lr.loadedNode())
        .theChildren()
        .linkingTo(
                One.reference("https://u1.linnk.it/zednuw/types/customer"))
                                 // ^-- replace with your customer type
        .in(lr.client())
        .and(new When.ChildrenSelected<OneTypedReference<Object>>() {

            @Override
            public void thenDo(
                    WithChildrenSelectedResult<OneTypedReference<Object>> sr) {
                System.out.println("Found Customers:");

                for (OneTypedReference<Object> node : sr.children()) {
                    System.out.println("  "
                            + One.dereference(node).in(
                                    sr.client()));
                }
            }

        });
```

\[[full source code on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/M_GettingStarted_SelectQueryData.java 'Source code querying data')\]

Running your application should result in an output such as shown below.

```text
All Children: [One.reference("https://u1.linnk.it/4hxdr8/query/NxAuth.rea0"), One.reference("https://u1.linnk.it/4hxdr8/query/This_is_a_1"), One.reference("https://u1.linnk.it/4hxdr8/query/bob")]
Found Messages:
  This is a test realm
Found Customers:
  One.value(bob).at("https://u1.linnk.it/4hxdr8/query/bob")
All queries completed.
```

The select example makes heavy use of references (`One.reference(...)`) and value nodes (`One.value(..).at(..)`. For an in-depth discussion of these different node types and how one node type can be converted into another, please check the article '[A Practical Guide on Node Types in onedb](http://maxrohde.com/2012/05/15/node-types-in-onedb/)'.

### 6\. Replace

Apart from creating realms and appending nodes in complex and deep arrangements, onedb supports to replace the value of nodes as well as removing nodes. However, it is often a good idea to avoid these operations whenever possible. onedb in its core is designed to enable distributed systems: any piece of data or node might be opened by multiple clients on the same or different devices.

The operations remove and replace add one significant factor of uncertainty: mutability. While immutability is a [nice property of any software system](http://faisalferoz.wordpress.com/2007/12/21/immutable-design-pattern/ 'Immutable Design Pattern'), it is crucial to the [success of distributed systems](http://pettermahlen.com/2010/05/04/immutability-a-constraint-that-empowers/ 'Immutability: a constraint that empowers').

As long as we constrain ourselves to using the operations of createRealm, append and select, the data stored in onedb will be immutable. For instance, when we append a node representing the type customer to a 'types' node, it can be guaranteed that this node will be available to any client working with the system.

The operation `remove`, in particular, can lead to unexpected and undesired situations in a system with many involved clients. However, there are cases, where using update and remove is just by far the [simplest](http://blog.williamgill.de/2012/02/19/simplicity/ 'Simplicity') solution. To support these cases, onedb offers operations both to update and remove nodes from the network.

The update operation will replace a node value with another node value. The connections of a node remain unaffected by the update operation. The value of nodes with externally managed address can easily be updated as shown in the following:

```java
String phase1 = "phase1";
One.append(phase1).to(realmRoot).in(client);

Object phase2 = "phase2";
One.replace(phase1).with(phase2).in(client);
```

The example above will first add a node "phase1" to the onedb cloud and then replace this node with a node with the value "phase2". Please note that although the value of the node has been changed, the address of the node will stay the same:

Before update:

```text
Value  : "phase1"
Address: https://u1.linnk.it/di14a2/update/phase11
```

After update:

```text
Value  : "phase2"
Address: https://u1.linnk.it/di14a2/update/phase11
```

In general, it is not allowed to change the _address_ of a node using the update operation. This can become tricky when working with nodes with internally managed addresses. For instance, the following operations present a BAD practice:

```java
OneNode phase1Node = One.append("phase1").to(realmRoot)
        .atAddress("./p1").in(client);

One.replace(phase1Node)
        .with("phase2"))) // WRONG !!!
        .in(client);
```

The above example would replace a node `"phase1"` WITH a specified address `"./p1"` with a node value `"phase2"` WITHOUT a specified address.

The correct way to update a node with an internally managed address would be as follows:

```java
OneNode phase1Node = One.append("phase1").to(realmRoot)
        .atAddress("./p1").in(client);

One.replace(phase1Node)
        .with(One.newNode("phase2").at(phase1Node.getId()))
        .in(client);
```

\[[full source on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/N_GettingStarted_Replace.java 'Source code example Replace')\]

onedb stores a version every time a node is changed (e.g. replaced, a child is appended, a child is removed ..). Therefore, calling `One.clearVersions(...)` for nodes, which are frequently changed, can significantly increase the performance of loading and manipulating data. You can find an [example on github on how to use the clear versions operation](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/Nb_GettingStarted_Replace_With_Clear_Versions.java 'Example Clear Versions').

### 7\. Remove

As already mentioned in the previous section, replace and remove are operations, which should be used with care in environments, where one node is synchronized between multiple clients. Remove, in this regard, is more 'dangerous' than replace, since replace guarantees that once defined nodes are available to other parts of a distributed system. Remove, in contrast, can render nodes unavailable to other components of a system. Therefore, remove should always be used with caution when working with the onedb cloud!

The remove operation can basically be used for two purposes: First, removing one node from another node will delete the connection between these nodes (if a connection has been defined before). However, remove can also be used to remove a node from the onedb cloud; a node will be removed from the onedb cloud, if the connection to its direct parent is removed.

The following snippet will first append a node `"to be removed"` to the realm root and define it in the onedb cloud. Then, this node will be removed from the realm root AND the onedb cloud.

```java

    // remove connection AND node
    OneNode toBeRemovedNode = One.append("to be removed")
            .to(realmRoot).atAddress("./toBeRemoved").in(client);
    One.remove(One.reference(toBeRemovedNode)).fromNode(realmRoot)
            .in(client);
```

If, however, a connection between nodes, which are in no direct parent-child relationship is removed, ONLY the connection will be removed and not the connected node. In the following example, the node `"to be kept"` will still be defined in the onedb cloud even after it has been removed from the node `"another node"`.

```java

    // remove ONLY connection
    OneNode toBeKeptNode = One.append("to be kept").to(realmRoot)
            .atAddress("./toBeKept").in(client);

    OneNode anotherNode = One.append("another node").to(realmRoot)
            .atAddress("./anotherNode").in(client);

    One.append(toBeKeptNode).to(anotherNode).in(client);
    One.remove(toBeKeptNode).fromNode(anotherNode).in(client);
```

\[[full source on github](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/z_articles/O_GettingStarted_Remove.java 'onedb Remove Example')\]
