---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2013-08-26"
tags:
- gwt
title: GWT RPC Serialization for LocalStorage
---

[GWT RPC](http://www.gwtproject.org/doc/latest/tutorial/RPC.html) is a great technology for sending 'Java' objects from a Java sever to a JavaScript client and vice averse. Since GWT RPC provides facilities for serializing and deseralizing Java objects, it seems like a good option, too, for preparing objects to be stored in a browsers [LocalStorage](http://www.html5rocks.com/en/features/storage).

Unfortunately, the devil lies in the details here, since GWT RPC is implemented in an asymmetrical way:

- The client can only deseralize objects serialized on the server and
- Only the server can deseralize objects serialized on the client.

Fortunately, however, with a few modifications the GWT RPC serialization mechanism can be adjusted to support client-client serialization.

The [gwt-storage project](https://github.com/seanchenxi/gwt-storage) available on GitHub does exactly that for us. Check out the getting started guide for this project [here](https://code.google.com/p/gwt-storage/wiki/GettingStarted). Here a simple example:

StorageExt localStorage = StorageExt.getLocalStorage();

localStorage.put(key, gwtObject);

…

GwtClass gwtObject = localStorage.get(key);

Note that for this code to work, GwtClass must be involved in one of your GWT RPC services.

### Further Information

[Stackoverflow 'How to apply SerializationStreamWriter for storage'](http://stackoverflow.com/questions/10574344/how-to-apply-serializationstreamwriter-for-storage)

[GWT Docs class RPC](http://www.gwtproject.org/javadoc/latest/com/google/gwt/user/server/rpc/RPC.html)

[SerializationStreamWriter](http://www.gwtproject.org/javadoc/latest/com/google/gwt/user/client/rpc/SerializationStreamWriter.html) (client)
