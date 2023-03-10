---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2015-04-24"
tags:
- mysql
- puppet
title: Check if MySQL User Exists on Command Line (and in Puppet)
---

If you are using Linux, there is simple way to check if a user exists in MySQL:

echo \`mysql -u root -p**\[your root password\]** -e 'use mysql; SELECT user FROM user;'\` | grep '**\[user name\]**'

Executing this command will exit with return code 0 if the user exists and otherwise exit with 1.

This is very useful for building puppet scripts. The following execution will create a user if it doesn't exist.

exec { "add user if not exist":

unless => "echo \`mysql -u root -p**\[psw\]** -e 'use mysql; SELECT user FROM user;'\` | grep '**\[username\]**'", path => \["/bin", "/usr/bin"\], command => "mysql -u root -p$mysql_password -e \\"**\[Create User/Grant Rights Here\]**\\"", require => Service\["mysqld"\], }
