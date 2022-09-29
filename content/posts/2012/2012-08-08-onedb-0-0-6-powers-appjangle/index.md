---
title: "onedb 0.0.6 powers appjangle"
date: "2012-08-08"
categories: 
  - "java"
---

The last few weeks a great number of improvements and changes have been made to the onedb database. Chiefly, with the development of the JavaScript API, onedb has been integrated into the new [appjangle](http://appjangle.com "appjangle") platform.

This platform is designed to enable not only to store data from applications from various platforms but also to aid you in developing and deploying these applications. Please note that the appjangle platform is currently in PREVIEW and various features are in the process of being completed.

Currently, all already documented features of onedb are available on appjangle. However, it is not possible anymore to obtain an API key from the onedb website. Instead, [signing up for appjangle](http://appjangle.com/signup "appjangle sign up") will get you an API key you can use to develop Java applications.

There is a new, short tutorial helping to get started developing Java apps with appjangle/onedb. Check out:

[Jangle Java: Upload & Load Tutorial](http://maxrohde.com/2012/08/08/jangle-java-upload-load-data/)

[Jangle Java: Synchronization Tutorial](http://maxrohde.com/2012/08/08/jangle-java-synchronization/)

## New Features

Here a short list of the additional capabilities of the onedb engine in version 0.0.6:

### Seed operation

The `seed` operation has been added as further element operation to the client API. The seed operation allows creating a root node on the appjangle platform. This root node is meant as a space for a small amount of data, required if it is not possible to connect to a registered user’s database. It's great for creating a space to try out the various features, too.

Currently, it is encouraged to limit nodes appended to a seed node to about 50 nodes. All nodes appended to a seed are by default protected by a private write secret but they do allow public read.

If more data is to be uploaded or the data should also be private read protected, the `createRealm` operation can be used.

A usage example for the seed operation can be found in the following Java App:

[RapidDataUploadFromAnywhere.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/features/RapidDataUploadFromAnywhere.java "seed operation data upload example")

### Binary Nodes

It is now possible to upload nodes with binary content such as images to the appjangle platform.

You can create a new node with binary content as follows:

\[sourcecode language="Java"\]byte\[\] myData = ... OneBytes node = one.common.nodes.newByteData(myData, "image/png"); One.append(node).to(parent).atAddress("./mypic").in(c);\[/sourcecode\]

You can then access this picture through the REST server, for instance:

[http://u1.linnk.it/xxzv0z/imgTst/odblogo.value.png](http://u1.linnk.it/xxzv0z/imgTst/odblogo.value.png)

Note that you will need to add ".value.png" to the nodes address to assure it is rendered as binary data. Other currently supported formats for binary data are:

- .value.jpg
- .value.jpeg
- .value.ico
- .value.gif

### Markdown Serialization

Text nodes, which contain content in the [Markdown format](http://daringfireball.net/projects/markdown/ "Markdown"), can now be rendered into HTML automatically. Just add the marker `One.reference("https://u1.linnk.it/6wbnoq/Types/isMarkdown")` to your plain text node.

A sample Java app is available on github:

[ServerSideMarkdownRendering.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/features/ServerSideMarkdownRendering.java "Server side markdown rendering example")

### Template Rendering

A simple syntax allows now to embed text nodes within other text nodes. This is a feature heavily utilized for the appjangle JavaScript source files.

See the sample Java app on github, which illustrates the template feature:

[EmbeddingTextNodes.java](https://github.com/mxro/onedb-examples/blob/master/src/main/java/one/examples/features/EmbeddingTextNodes.java "EmbeddingTextNodes.java")

Using a slight variation of the syntax, it is also possible to embed HTML rendered from a Markdown template into a HTML page. The syntax for this is:

```
<!-- embedMarkdown("[path to node]") -->
```

### User Registration/Login

The onedb client engine now allows to interface with the user login and registration of the appjangle platform. For this, the two operations `registerUser(..)` and `loginUser(..)` have been added to the core API.

These operations do not only allow to register and login a user for the appjangle platform but also build login/registration capabilities for your own apps. These operations require to specify a `applicationNodeUri`. This can be an address to any node on the appjangle platform. The specified node can then function as a global unique identifier for your application and associated registered users.

Have a look at the appjangle [login module](http://u1.linnk.it/0fs7dr/Apps1/aj-core-0.0.1.value.js "appjangle login module") and the appjangle [signin module](http://u1.linnk.it/0fs7dr/Apps1/appjangle_login.value.html) (you will need to check the page's source) for examples of usage of this API. The Java API works very similar to the JavaScript version and examples for this will be added shortly.

## Bug Fixes

A number of bugs in the onedb core engine have been fixed. Chiefly:

- References to nodes stored on other server instances would sometimes not be resolved correctly. To fix this issues, all references are always assumed to be _resolvable_. In consequence, it is not permitted anymore to add a reference object to a network, if there is no resolvable node defined for this reference.
- Fixed a bug in the authorization system. If a child node would have a matching security token with insufficient authorization but the parent node would have a security token with sufficient authorization, the token in the parent node would not be recognized.
- A number of stability improvements have been made to the routines rendering HTML nodes.
