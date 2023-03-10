---
authors:
- max
blog: maxrohde.com
categories:
- aws
- linux
date: "2017-03-01"
tags:
- mysql
title: Upgrade MySQL 5.5 to 5.6 on EC2/CentOS/RHEL
---

### Problem

You would like to upgrade MySQL 5.5 to MySQL 5.6 on an existing server that uses the [YUM software package manager](https://fedoraproject.org/wiki/Yum).

### Solution

Just enter the following few simple commands and you should be good to go. But, please, do a thorough full backup of your system before you do the upgrade just in case.

**\[1\]** Create a MySQL dump from which you will load the data into the upgraded server:

mysqldump -u root -p --add-drop-table --routines --events --all-databases --force > data-for-upgrade.sql

**\[2\]** Stop your MySQL server

sudo service mysqld stop

**\[3\]** Remove MySQL 5.5

yum remove mysql55-server mysql55-libs mysql55-devel mysql55-bench mysql55

**\[4\]** Clear the MySQL data directory

sudo rm -r /var/lib/mysql/\*

**\[5\]** Install MySQL 5.6

sudo yum install mysql56 mysql56-devel mysql56-server mysql56-libs

**\[6\]** Start MySQL server

sudo service mysqld start

**\[7\]** Set the root password

/usr/libexec/mysql56/mysqladmin -u root password 'xxx'

**\[8\]** Import your data

mysql -u root -p --force < data-for-upgrade.sql

**\[9\]** Verify all tables will work in 5.6

sudo mysql_upgrade -u root -p --force

**All done!**

### Notes

- Upgrade to 5.7 should work in a similar way, once 5.7 is available on your RPM repos (it isn't by the time of the writing for the Amazon Linux Repo).

### Sources

- [MySQL Docs: Performing a Logical Upgrade](https://dev.mysql.com/doc/refman/5.6/en/upgrading.html#upgrade-procedure-logical)
- [How To Install MySQL on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-centos-7)
- [Amazon Linux Update Notes](https://aws.amazon.com/blogs/aws/now-available-amazon-linux-ami-2015-09/)
