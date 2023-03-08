---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-06-06"
title: 'OSGi: Libraries Requiring Access to Bundle ClassLoader'
---

**The Problem**

Some libraries like XStream or Beans serialization require direct access to the classloader of the bundles, which use them. These libraries need access the classes, in order to deserialze them. Otherwise expections like the one below occur:

SCHWERWIEGEND: Application class de.mxro.textedit.gdocseditor.gui.GoogleDocsEditorGUIApp failed to launch com.thoughtworks.xstream.converters.ConversionException: de.mxro.textedit.gdocseditor.GDocsEditorData$GDocNode : de.mxro.textedit.gdocseditor.GDocsEditorData$GDocNode \