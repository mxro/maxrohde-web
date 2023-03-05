---
categories:
- javascript
date: "2012-08-21"
primaryBlog: maxrohde.com
title: 'Internet Explorer ‘SCRIPT1002: Syntax error’: Help!?!'
---

## Problem

A script that otherwise is interpreted by other major browsers (Chrome/ Firefox) without problems, prompts Internet Explorer to issue an error along the lines of:

SCRIPT1002: Syntax error  
[edit-snapshot, line 2230 character 1](0)

## Analysis

I think this error can broadly be interpreted as: **there is some seriously illegal markup in your script** (according to IE's definition)

## Solution

The script error will usually (unhelpfully) point to the end of the script definition, the </script> tag. Essentially, the best strategy I could come up with, to sift through your script and search for anything unusual. For instance:

- Does your JavaScript define new '<script></script>' elements by using the exact string '<script>'
- Does your JavaScript markup resembling HTML/XML style comments, such as \`<!--' or '-->'

## Resources

[JAVASCRIPT WITHIN AJAX FAILS TO LOAD IN IE - ERROR 80020101](http://bugs.jquery.com/ticket/9221)