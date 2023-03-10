---
authors:
- max
blog: maxrohde.com
date: "2010-12-02"
title: “build.properties does not exist” and Maven Eclipse Plugin
---

**The Problem**

After generating an eclipse project using both the Maven Eclipse Plugin and the Maven Bundle Plugin (BND), eclipse warns that "build.properies does not exist".

**The Solution**

Maybe more a workaround than a solution but it is relatively simple to create the build.properties file manually in the eclipse project. Below an example for a build.properties file for a Maven project, which should not result in any errors.

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:638px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid black .5pt;border-left:solid black .5pt;border-bottom:solid black .5pt;border-right:solid black .5pt;"><p><span style="font-family:Courier New;font-size:10pt;"><span style="color:black;">source.. = </span><span style="color:#2a00ff;">src/test/java,\</span></span></p><p><span style="font-family:Courier New;font-size:10pt;"><span style="color:black;"></span><span style="color:#2a00ff;">src/main/java/</span></span></p></td></tr></tbody></table>
