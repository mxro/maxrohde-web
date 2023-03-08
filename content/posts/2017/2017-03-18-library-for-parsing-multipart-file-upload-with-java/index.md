---
categories:
- java
date: "2017-03-18"
blog: maxrohde.com
tags:
- open-source
- programming
title: Library for Parsing multipart File Upload with Java
---

One of the most convinient ways to upload files from the Web Browser to the server is by using [file inputs in HTML forms](https://davidwalsh.name/multiple-file-upload).

Many web servers come with preconfigured modules for parsing this data on the server-side. However, sometimes, your HTTP server of choice might not offer such a module and you are left with the task of parsing the data the browser submits to the server yourself.

I specifically encountered this problem when working with a [Netty-based server](http://netty.io/).

The form will most likely submit the files to your server as part of a [multipart/form-data request](https://www.ietf.org/rfc/rfc2388.txt). These are not that straightforward to parse. Thankfully, there is the library [Apache Commons FileUpload](https://commons.apache.org/proper/commons-fileupload/) which can be used for this purpose.

Unfortunately, processing some arbitrary binary data with this library is not very straightforward. This has motivated me to write a small library - [delight-fileupload](https://github.com/javadelight/delight-fileupload) -  which wraps Commons FileUpload and makes parsing multipart form data a breeze. (This library is part of the [Java Delight Suite](https://github.com/javadelight/delight-main#java-delight-suite)).

Just include the library and let it parse your data as follows:

FileItemIterator iterator = FileUpload.parse(data, contentType);

Where data is a binary array of the data you received from the client and contentType is the content type send via HTTP header.

Then you can iterate through all the files submitted in the form as follows:

while (iter.hasNext()) {
FileItemStream item = iter.next();
if (item.isFormField()) {
... some fields in the form
} else {
InputStream stream = item.openStream();
// work with uploaded file data by processing stream ...
}
}

You can find the library on [GitHub](https://github.com/javadelight/delight-fileupload). It is on [Maven Central](https://search.maven.org/). Just add the following dependency to your Java, Scala etc. application and you are good to go:

<dependency>
 <groupId>org.javadelight</groupId>
 <artifactId>delight-fileupload</artifactId>
 <version>0.0.3</version>
</dependency>

You can also check for the newest version on the [JCenter repostiory](https://bintray.com/javadelight/javadelight/delight-fileupload).

I hope this is helpful. If you have any comments or suggestions, leave a comment here or raise an issue on the [javadelight-fileupload GitHub project](https://github.com/javadelight/delight-fileupload/issues).