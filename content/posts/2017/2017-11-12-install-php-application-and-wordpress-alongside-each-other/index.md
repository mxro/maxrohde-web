---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2017-11-12"
tags:
- wordpress
title: Install PHP Application and WordPress Alongside Each Other
---

### Problem

You have a webpage like http://www.example.com and you would like to serve both WordPress and files from a PHP application from the root domain. For instance, opening

http://www.example.com/my-post

will open a post on WordPress and

http://www.example.com/index.php

will open a page in a PHP application.

### Solution

- Set up your php application in /var/www/html
- Install WordPress /usr/share/wordpress
- Put the following lines into /usr/share/wordpress/.htacces **before** # BEGIN WordPress.

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteCond "/var/www/html%{REQUEST_URI}" -f
RewriteRule ^/?(.\*)$ /app/$1 \[L\]

</IfModule>

# BEGIN WordPress

...

- Put the following line into /etc/httpd/conf/httpd.conf

Alias /app /var/www/html

- Add the following configuration file to /etc/httpd/conf.d/wordpress.conf

Alias /wordpress /usr/share/wordpress
DocumentRoot /usr/share/wordpress

<Directory /usr/share/wordpress/>
AddDefaultCharset UTF-8

AllowOverride All

Require all granted

</Directory>

Restart httpd and you are all done!