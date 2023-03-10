---
authors:
- max
blog: maxrohde.com
date: "2015-05-10"
title: Share Folders With Windows Homegroup Through Command Line / Batch File
---

If you have a folder

**C:\\Test**

and you would like to share it with your [Windows Homegroup](http://windows.microsoft.com/en-au/windows7/products/features/homegroup), you can do so in the Windows Command line (cmd.exe) or in a Batch file with the [net share](https://technet.microsoft.com/en-us/library/bb490712.aspx) tool.

The folder above could be shared with the name "Test" as follows:

**net share Test="C:\\Test" /GRANT:"HomeUsers",FULL**
