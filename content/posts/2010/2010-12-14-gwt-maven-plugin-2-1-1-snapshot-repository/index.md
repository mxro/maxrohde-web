---
categories:
- java
date: "2010-12-14"
blog: maxrohde.com
title: Gwt-maven-plugin-2.1.1-SNAPSHOT repository
---

I just spend a while to find the right repository for the [gwt-maven-plugin](http://people.apache.org/~olamy/staging-sites/gwt-maven-plugin-2.1.1-SNAPSHOT/index.html) version 2.1.1-SNAPSHOT.

To cut it short, one possible repository is:

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid black .5pt;border-left:solid black .5pt;border-bottom:solid black .5pt;border-right:solid black .5pt;"><p>&lt;pluginRepositories&gt;</p><p>&lt;pluginRepository&gt;</p><p>&lt;id&gt;Codehaus Group Snapshots&lt;/id&gt;</p><p>&lt;url&gt;https://nexus.codehaus.org/content/groups/snapshots-group/&lt;/url&gt;</p><p>&lt;snapshots&gt;</p><p>&lt;enabled&gt;true&lt;/enabled&gt;</p><p>&lt;/snapshots&gt;</p><p>&lt;/pluginRepository&gt;</p><p>&lt;/pluginRepositories&gt;</p></td></tr></tbody></table>

**Resources**

- [Google Groups discussion](http://groups.google.com/group/codehaus-mojo-gwt-maven-plugin-users/msg/2ce5695605f8c958)
- [Olamy's blog](http://olamy.blogspot.com/2010/11/whats-new-in-coming-gwt-maven-plugin.html)
- [Codehaus' official snapshot repository](https://nexus.codehaus.org/content/repositories/codehaus-snapshots/org/codehaus/mojo/gwt-maven-plugin/) (as I checked 2.1.1-SNAPSHOT was not available here, but 1.3-SNAPSHOT is)