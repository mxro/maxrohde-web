---
blog: maxrohde.com
categories:
- java
date: "2010-06-26"
title: 'Google Docs API: UnsupportedDataTypeException MIME type application/atom+xml'
---

**Problem**

When trying to use the Google Docs API inside an OSGi bundle, the following exception is thrown, for instance when trying to upload a document:

javax.activation.UnsupportedDataTypeException: no object DCH for MIME type application/atom+xml         at javax.activation.ObjectDataContentHandler.writeTo(DataHandler.java:877)         at javax.activation.DataHandler.writeTo(DataHandler.java:302)

**Solution**

Again this problem requires some tweaking with classloaders. The following code added before and after updateMedia helped in my case:

Thread cur = Thread.currentThread();                  ClassLoader ccl = cur.getContextClassLoader();                  ClassLoader classLoader = this.getClass().getClassLoader();                  cur.setContextClassLoader(classLoader); MediaMultipart.loadMimeMappings(); entry.setMediaSource(source); entry.setEtag("\*"); DocumentListEntry e = entry.updateMedia(true); cur.setContextClassLoader(ccl);
