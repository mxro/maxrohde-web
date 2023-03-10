---
blog: maxrohde.com
categories:
- linux
date: "2014-11-09"
tags:
- virtualbox
title: Clipboard Sharing Between VirtualBox Host and Linux Guest Stops Working
---

**Problem**

You are using VirtualBox with a Linux Guest and the clipboard sharing between Host and Guest stops working.

**Solution**

Open a Terminal on the Linux Guest and run the following two commands:

`killall VBoxClient VBoxClient-all`

**References**

[VirtualBox bidirectional clipboard sharing stops working after some time](http://superuser.com/questions/536827/virtualbox-bidirectional-clipboard-sharing-stops-working-after-some-time)
