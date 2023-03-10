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
- Is your private key in the PKCS#1 format (file starts with '-----BEGIN RSA PRIVATE KEY-----')? ([see](https://bugs.mysql.com/bug.php?id=71271), [see](http://askubuntu.com/questions/194074/enabling-ssl-in-mysql))
- Did you generate your certificates with [TinyCA](http://www.ghacks.net/2009/09/16/create-your-own-certificate-authority-with-tinyca/) with the **default settings**?
- Did you try connecting to the server WITHOUT using the certificate authority certificate (e.g. ca-cert.pem) BUT WITH specifying a client certificate and key?
  - mysql --ssl --ssl-cert=\[client_cert\] --ssl-key=\[client_key\] -u\[ssluser\] -h\[server\] -p\[ssluser psw\]
- Is your certificate 'simple enough' for the MySQL SSL implementation e.g. not a chained certificate tree? ([see](http://dev.mysql.com/doc/refman/5.6/en/ssl-options.html)) Or did you use a wildcard certificate (which are not supported) ([see](http://stackoverflow.com/questions/20459056/mysql-and-ssl-connection-failing-error-2026-hy000)).

Good luck :)

# Resources

- [Create your own CA with TinyCA2 (part 1)](http://theworldofapenguin.blogspot.com.au/2007/06/create-your-own-ca-with-tinyca2-part-1.html)
- [Encrypt Replication Traffic](http://mysql.wingtiplabs.com/documentation/ssl27yzv/encrypt-replication-traffic) – excellent tutorial
- [Setting Up SSL Certificates and Keys for MySQL](https://dev.mysql.com/doc/refman/5.1/en/creating-ssl-certs.html)
- [Create Certificates and Use SSL with MySQL and the ADOdb Database Abstraction Library for PHP](http://blog.jamesrossiter.co.uk/2011/12/05/create-certificates-and-use-ssl-with-mysql-and-adodb-database-abstraction-library-for-php/)
