---
categories:
- java
date: "2012-08-17"
primaryBlog: maxrohde.com
title: Regular Expression to Find HTML Comments in Java
---

## Problem

You would like to select the contents of all comments in an HTML (or XML) document using Java Regular Expressions.

For instance:

<html>

<!-- FOR ME TO SELECT -->

</html>

## Solution

There is a powerful regular expression, which can be found on [this page](http://ostermiller.org/findhtmlcomment.html).

static final String commentRegex = "(// )?\\\\<!\[ \\\\r\\\\n\\\\t\]\*(--(\[^\\\\-\]|\[\\\\r\\\\n\]|-\[^\\\\-\])\*--\[ \\\\r\\\\n\\\\t\]\*)\\\\>";

However, this regular expression might lead to your application to 'hang' if there are (bad, bad input) documents with starting comments without matching comment end, like:

<html>

<!-- I AM SO EVIL

</html>

To prevent your application to hang in this case, you can search for the beginnings and ends of comments with two separate matchers:

static final String matchCommentStart = "\\\\<!\[ \\\\r\\\\n\\\\t\]\*--";

static final String matchCommentEnd = "--\[ \\\\r\\\\n\\\\t\]\*\\\\>";

You can find a live example for this code in [this class](https://github.com/mxro/ajMicroSync/blob/master/ajMicroSync/src/main/java/aj/apps/microsync/internal/engine/SyncEngine.java).