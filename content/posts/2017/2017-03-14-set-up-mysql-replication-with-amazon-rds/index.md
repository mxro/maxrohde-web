---
date: "2017-03-14"
blog: maxrohde.com
tags:
- aws
- devops
- mysql
title: Set up MySQL Replication with Amazon RDS
---

### Problem

You have an existing server that runs a MySQL database (either on EC2 or not) and you would like to replicate this server with a [Amazon RDS MySQL instance](https://aws.amazon.com/rds/mysql/).

After you follow the [instructions from Amazon](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.External.Repl.html), your slave reports the IO status:

Slave_IO_State: Connecting to master

... and the replication does not work.

### Solution

AWS provides very good documentation on how to set up the replication: [Replication with a MySQL or MariaDB Instance Running External to Amazon RDS](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.External.Repl.html).

Follow the steps there but be aware of the following pitfall:

In step 6 \`**create a user that will be used for replication**\`: It says you should create a user for the domain 'mydomain.com'. That will in all likelihood not work. Instead, try to find out the IP address of the Amazon RDS instance that should be the replication slave.

One way to do this is as follows:

- Create the 'repl_user' for the domain '%', e.g.:

CREATE USER 'repl_user'@'%' IDENTIFIED BY '<password>';

- Also do the grants for this user

GRANT REPLICATION CLIENT, REPLICATION SLAVE ON \*.\* TO 'repl_user'@'%' IDENTIFIED BY '<password>';

- Open port 3306 on your server for any IP address.
- Then the replication should work.
- Go to your master and run the following command:

SHOW PROCESSLIST;

- Find the process with the user repl_user and get the IP address from there. This is the IP address for your Amazon RDS slave server.
- Delete the user 'repl_user'@'%' on the master
- Create the user 'repl_user'@'\[IP address of slave\]' on the master
- Modify your firewall of your master to only accept connections on port 3306 from the IP address of the slave.
- Restart replication with

call mysql.rds_stop_replication;
call mysql.rds_start_replication;

- And check the status with

show slave status\\G

The slave IO status should now be "Waiting for master to send event".