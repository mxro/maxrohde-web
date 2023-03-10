---
blog: maxrohde.com
categories:
- javascript
date: "2012-09-11"
title: Converting youtube video link to embed link with JavaScript
---

Videos on youtube usually have a URI such as the following:

> http://www.youtube.com/watch?v=nCgQDjiotG0

These URIs cannot be used to embed the video in an iframe such as the following:

In order to work as part of an embedded iframe, youtube video links must be in the following format:

> http://www.youtube.com/embed/nCgQDjiotG0

Luckily, given any 'normal' youtube link, it is very easy to generate such an embed link. In JavaScript, this can be done with the following function:

```JavaScript
function createYouTubeEmbedLink (link) {
 return link.replace("http://www.youtube.com/watch?v=", "http://www.youtube.com/embed/");
 }

```
