---
title: "Understanding Creation of GWT Serialization Policy Files (.gwt.rpc)"
date: "2015-08-14"
categories: 
  - "java"
tags: 
  - "gwt"
  - "programming"
---

Today I deep-dived a bit into how GWT creates and reads Serialization Policy files. These are the .gwt.rpc files which are generated beside the JavaScript files for GWT modules.

Chiefly, I learned two things:

- The .gwt.rpc files are only used by the server. The client never reads them.
- The .gwt.rpc files are generated in the [ProxyCreator](https://code.google.com/p/google-web-toolkit/source/browse/trunk/user/src/com/google/gwt/user/rebind/rpc/ProxyCreator.java?r=1228) class.

I have listed some further classes and links below.

### GWT Framework Classes

[ProxyCreator](https://code.google.com/p/google-web-toolkit/source/browse/trunk/user/src/com/google/gwt/user/rebind/rpc/ProxyCreator.java?r=1228): Creates the .gwt.rpc file

[RemoteServiceProxy](https://code.google.com/p/google-web-toolkit/source/browse/trunk/user/src/com/google/gwt/user/client/rpc/impl/RemoteServiceProxy.java?spec=svn4899&r=4899): Manages calls to services

ClientSerializationStreamWriter: Write serialization on client for server

ClientSerializationStreamReader: Read responses from server on client

Serializer: Interface for serialization contract for class

### Links

[The GWT RPC Wire Protocol](https://docs.google.com/document/d/1eG0YocsYYbNAtivkLtcaiEE5IOF5u4LUol8-LL0TIKU/edit)
