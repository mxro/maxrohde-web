---
categories:
- java
date: "2011-04-27"
blog: maxrohde.com
title: Large WAR file cannot be deployed in Tomcat 7
---

### Problem

When uploading a WAR file larger than 50 MB, the Tomcat 7 Manager application reports:

The server encountered an internal error () that prevented it from fulfilling this request.

Exception java.lang.IllegalStateException:

org.apache.tomcat.util.http.fileupload.FileUploadBase$SizeLimitExceededException:

the request was rejected because its size (XXX) exceeds the configured maximum (52428800)

### Solution

- Go to the web.xml of the manager application (for instance it could be under /tomcat7/webapps/manager/WEB-INF/web.xml.
- Increase the max-file-size and max-request-size:

<multipart-config>

<!-- 50MB max -->

<max-file-size>**52428800**</max-file-size>

<max-request-size>**52428800**</max-request-size>

<file-size-threshold>0</file-size-threshold>

</multipart-config>

### Resources

[Mail List "The request was rejected because its size (102811565) exceeds the configured maximum (52428800)"](http://readlist.com/lists/tomcat.apache.org/users/20/102932.html)

[Mail List "Can't upload large war to Tomcat 7, worked in Tomcat 6"](http://old.nabble.com/Can't-upload-large-war-to-Tomcat-7,-worked-in-Tomcat-6-td30713540.html)