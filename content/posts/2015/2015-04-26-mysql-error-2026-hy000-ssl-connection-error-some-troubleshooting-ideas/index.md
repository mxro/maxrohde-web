---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2015-04-26"
tags:
- mysql
- ssl
title: 'MySQL ERROR 2026 (HY000): SSL connection error – Some Troubleshooting Ideas'
---

I just spent a fair amount of time setting up MySQL replication between two servers encrypted by SSL (using MySQL 5.1.73).

I struggled with fixing a nasty error displayed only as '**ERROR 2026 (HY000): SSL connection error**'.

In the following, I have collected a few possible strategies for resolving this error:

- Is the password for the user on your server shorter than 36 characters?
- Do the \*.pem files on the server and client have the right file permissions?
- Do your client and server certificates use a **different** COMMON NAME?
- Have you tried a basic SSL setup with only certificate authority certificate (e.g. ca-cert.pem), server certificate (e.g. server-cert.pem) and server key (e.g. server-key.pem) ([see](http://www.chriscalender.com/setting-up-ssl-for-mysql/)). In theory, client certificates are not required for a basic setup.
- Have you tested your certificates with a simple openssl HTTP server ([see](http://www.percona.com/blog/2012/11/08/debugging-mysql-ssl-problems/))?
- Is your private key in the PKCS#1 format (file starts with '